const fs = require('fs');
const os = require('os');
const path = require('path');
const { assessOrgIntelligenceFreshness } = require('./org-intelligence-freshness');
const cardSchema = require('../assets/info-card-schema');

const root = path.resolve(__dirname, '..');
const digestPath = path.join(root, 'digest.md');
const dataDir = path.join(root, 'data');
const operationsDir = path.join(root, 'operations');
const infoStatusPath = path.join(dataDir, 'info-feed-status.json');
const legacyStatusJsonPath = path.join(operationsDir, 'info-library-status.json');
const legacyStatusMdPath = path.join(operationsDir, 'info-library-status.md');
const dailyDir = path.join(root, 'daily');
const dailyReportDir = path.join(root, 'daily-report');
const weeklyDir = path.join(root, 'weekly');
const privateOrgDailyLogDir = process.env.ORG_INTELLIGENCE_DAILY_LOG_DIR
  || path.join(os.homedir(), 'Documents', 'New project', 'research', 'private-industry-bigtech-watch', 'daily-log');

const MIN_LATEST_ITEMS = 8;
const MAX_LATEST_ITEMS = 15;
const MIN_LATEST_PLATFORMS = 4;
const MIN_LATEST_LINKS = 6;
const MIN_CHANNEL_TYPES = 4;
const MIN_INSIGHT_CHARS = 24;
const RECENT_DAY_COUNT = 7;
const PRIVATE_SIGNAL_WARN_RATIO = 0.25;
const PRIVATE_SIGNAL_FAIL_RATIO = 0.4;
const SUBTOPIC_WARN_RATIO = 0.4;
const SUBTOPIC_FAIL_RATIO = 0.6;

const INFO_TYPES = ['新增事实', '旧线复核', '弱信号', '缺口记录'];
const CHANNEL_TYPES = ['官方', '媒体', '报告学术', '社媒公众号', 'JD薪酬'];
const CONFIDENCE_LEVELS = ['L1', 'L2', 'L3', 'L4'];
const LOCAL_PATH_PATTERN = new RegExp([
  '\\/' + 'Users\\/',
  '\\/' + 'private\\/' + 'tmp',
  '\\/' + 'private\\/' + 'var',
  '\\.' + 'work' + 'buddy',
  'WorkBuddy\\/' + 'Claw',
  'file:\\/\\/',
].join('|'), 'i');

function parseFieldLine(line) {
  const fieldMatch = line.match(/^- \*\*(事件摘要|来源|来源平台|来源可信度|信息类型|渠道类型|结论置信度|验证问题|OD启示|标签|抓取时间)\*\*[：:]\s*(.*)/);
  if (!fieldMatch) return null;
  return { field: fieldMatch[1], value: fieldMatch[2].trim() };
}

function extractUrls(text) {
  return (text.match(/https?:\/\/[^\s）)\]>"]+/g) || [])
    .map((url) => url.replace(/[，。；、]+$/g, ''));
}

function normalizeHashTags(text) {
  return text.match(/#[\w\u4e00-\u9fff-]+/g) || [];
}

function parseDigest(markdown) {
  const lines = markdown.split('\n');
  const days = [];
  let currentDay = null;
  let currentItem = null;

  for (const line of lines) {
    if (line.includes('<!--')) continue;

    const dayMatch = line.match(/^## (\d{4}-\d{2}-\d{2})\b/);
    if (dayMatch) {
      if (currentDay && currentDay.items.length > 0) days.push(currentDay);
      currentDay = { date: dayMatch[1], items: [] };
      currentItem = null;
      continue;
    }

    if (!currentDay) continue;

    const titleMatch = line.match(/^### \[([A-Za-z0-9-]+)\]\s+(.+)/);
    if (titleMatch) {
      currentItem = {
        id: titleMatch[1],
        title: titleMatch[2].trim(),
        summary: '',
        source: '',
        sourceUrl: '',
        sourceUrls: [],
        platform: '',
        trust: '',
        infoType: '',
        channelType: '',
        conclusionConfidence: '',
        verificationQuestion: '',
        insight: '',
        tags: [],
        time: '',
        explicitFields: {},
      };
      currentDay.items.push(currentItem);
      continue;
    }

    if (!currentItem) continue;

    const parsed = parseFieldLine(line);
    if (!parsed) continue;

    const { field, value } = parsed;
    currentItem.explicitFields[field] = true;

    if (field === '事件摘要') currentItem.summary = value;
    if (field === '来源') {
      currentItem.source = value;
      currentItem.sourceUrls = extractUrls(value);
      currentItem.sourceUrl = currentItem.sourceUrls[0] || '';
    }
    if (field === '来源平台') currentItem.platform = value;
    if (field === '来源可信度') currentItem.trust = value;
    if (field === '信息类型') currentItem.infoType = value;
    if (field === '渠道类型') currentItem.channelType = value;
    if (field === '结论置信度') currentItem.conclusionConfidence = value;
    if (field === '验证问题') currentItem.verificationQuestion = value;
    if (field === 'OD启示') currentItem.insight = value;
    if (field === '标签') currentItem.tags = normalizeHashTags(value);
    if (field === '抓取时间') currentItem.time = value;
  }

  if (currentDay && currentDay.items.length > 0) days.push(currentDay);
  return days;
}

function readExistingStatus() {
  if (!fs.existsSync(infoStatusPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(infoStatusPath, 'utf8'));
  } catch {
    return null;
  }
}

function countMissing(items, field) {
  return items.filter((item) => !item[field] || (Array.isArray(item[field]) && item[field].length === 0)).length;
}

function listMarkdownDates(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .map((file) => file.match(/^(\d{4}-\d{2}-\d{2})\.md$/))
    .filter(Boolean)
    .map((match) => match[1])
    .sort();
}

function detectAbcStyle(text) {
  const patterns = [
    /\bmanager\b/i,
    /\btitle\b/i,
    /\bcapability map\b/i,
    /\bskills-based\b/i,
    /\baccountability\b/i,
    /\bgovernance literacy\b/i,
    /\brepeatable systems\b/i,
    /\bmeasurable impact\b/i,
    /\bowner\b/i,
  ];
  return patterns.filter((pattern) => pattern.test(text)).length;
}

function inferInfoType(item) {
  const text = `${item.title} ${item.summary} ${item.tags.join(' ')}`;
  if (/缺口|未发现|无新增|扫描缺口|低新增/i.test(text)) return '缺口记录';
  if (/弱信号|线索|待验证|候选|传闻|社媒|context|Context/i.test(text)) return '弱信号';
  if (/旧线|复核|跟踪|回看|再验证|baseline|基线/i.test(text)) return '旧线复核';
  return '新增事实';
}

function inferChannelType(item) {
  const text = `${item.source} ${item.platform} ${item.title} ${item.summary}`.toLowerCase();
  if (/job|jobs|career|careers|linkedin|薪酬|salary|pay|compensation|招聘|jd/.test(text)) return 'JD薪酬';
  if (/wechat|微信|公众号|x\.com|twitter|linkedin|blind|脉脉|小红书|reddit|社媒/.test(text)) return '社媒公众号';
  if (/mckinsey|bcg|deloitte|pwc|ey|gartner|harvard|hbr|stanford|mit|arxiv|report|whitepaper|报告|学术|论文|研究/.test(text)) return '报告学术';
  if (/reuters|bloomberg|financial times|wall street journal|techcrunch|36氪|晚点|财新|虎嗅|界面|媒体|新闻/.test(text)) return '媒体';
  if (/official|官网|官方|press release|newsroom|blog|worklab|handbook|sec|annual report|investor|about\.amazon|openai\.com|anthropic\.com|microsoft\.com|gitlab\.com/.test(text)) return '官方';
  return '未归类';
}

function inferConclusionConfidence(item) {
  const text = `${item.infoType} ${item.trust} ${item.summary} ${item.insight}`;
  if (/L[1-4]/.test(item.conclusionConfidence)) return item.conclusionConfidence.match(/L[1-4]/)[0];
  if (/缺口记录|弱信号|待验证|线索|传闻|💬/.test(text)) return 'L1';
  if (/旧线复核|复核|Context|context/i.test(text)) return 'L2';
  if (/机制|制度|多源|互证|稳定模式|L4/.test(text)) return 'L3';
  if (/官方|⭐|高|报告|研究/.test(text)) return 'L2';
  return 'L1';
}

function enrichLatestItems(items) {
  return items.map((item) => {
    const inferredInfoType = cardSchema.informationType(item.infoType);
    const inferredChannelType = item.channelType ? cardSchema.channelType(item.channelType) : inferChannelType(item);
    const inferredConfidence = CONFIDENCE_LEVELS.includes(item.conclusionConfidence.slice(0, 2))
      ? item.conclusionConfidence.slice(0, 2)
      : 'L1';
    return {
      ...item,
      normalizedInfoType: inferredInfoType,
      normalizedChannelType: inferredChannelType,
      normalizedConclusionConfidence: inferredConfidence,
    };
  });
}

function distribution(items, field) {
  return items.reduce((stats, item) => {
    const key = item[field] || '未标注';
    stats[key] = (stats[key] || 0) + 1;
    return stats;
  }, {});
}

function normalizeConclusionConfidence(value) {
  const match = String(value || '').match(/L[1-4]/);
  return match ? match[0] : '';
}

function classifySubtopic(item) {
  const text = `${item.title} ${item.summary} ${item.insight} ${item.tags.join(' ')}`.toLowerCase();
  const rules = [
    ['AI交付与部署', /fde|forward deployed|deployment|applied ai|客户部署|交付|落地|实施/],
    ['AI治理与安全', /治理|governance|安全|security|red team|风险|审计|control|guardrail|passport/],
    ['组织层级与管理', /层级|扁平|中层|manager|管理者|领导力|组织结构|span|coach/],
    ['岗位与职业架构', /岗位|job|role|title|career|序列|族群|能力图谱|skills|capability/],
    ['人才密度与流动', /人才密度|talent density|招聘|hiring|裁员|layoff|晋升|promotion|薪酬|pay|salary|流动/],
    ['劳动力与公共治理', /劳动力|workforce|worker|州政府|公共|政策|就业|skills academy|training/],
  ];
  const found = rules.find(([, pattern]) => pattern.test(text));
  return found ? found[0] : '其他';
}

function isPrivateOrgSignal(item) {
  const text = `${item.title} ${item.summary} ${item.source} ${item.platform} ${item.tags.join(' ')}`;
  if (item.sourceUrl) return false;
  return /内部|私有|匿名|员工体感|脉脉|Blind|社群|群聊|非公开|脱敏/.test(text);
}

function isLikelyOldLine(item) {
  const text = `${item.title} ${item.summary} ${item.tags.join(' ')}`;
  return /旧线|复核|跟踪|回看|再验证|Context|context|不是今日新增|仍需|维持|基线/.test(text);
}

function isWeakOverclaimed(item) {
  return item.normalizedInfoType === '弱信号'
    && ['L3', 'L4'].includes(item.normalizedConclusionConfidence);
}

function hasValidGapRecord(items) {
  return items.some((item) => {
    if (item.normalizedInfoType !== '缺口记录') return false;
    const text = `${item.title} ${item.summary} ${item.verificationQuestion} ${item.insight}`;
    return /扫描|检索|覆盖|渠道|范围/.test(text) && /缺口|未发现|不足|未形成|待验证|原因/.test(text);
  });
}

function fieldWarningsForItems(items, scopeLabel) {
  const requiredNewFields = [
    ['信息类型', 'infoType'],
    ['渠道类型', 'channelType'],
    ['结论置信度', 'conclusionConfidence'],
    ['验证问题', 'verificationQuestion'],
  ];
  return requiredNewFields
    .map(([label, field]) => ({
      scope: scopeLabel,
      field: label,
      missing: items.filter((item) => !item.explicitFields[label] || !item[field]
        || (field === 'infoType' && cardSchema.informationType(item[field]) === '未标注')
        || (field === 'channelType' && cardSchema.channelType(item[field]) === '未归类')).length,
    }))
    .filter((entry) => entry.missing > 0);
}

function analyzeDay(day, digestText) {
  const items = enrichLatestItems(day.items).map((item) => ({
    ...item,
    normalizedConclusionConfidence: normalizeConclusionConfidence(item.normalizedConclusionConfidence) || 'L1',
    subtopic: classifySubtopic(item),
    isPrivateSignal: isPrivateOrgSignal(item),
  }));
  const latestPlatforms = [...new Set(items.map((item) => item.platform || item.source).filter(Boolean))];
  const sourceUrlMissingItemIds = items
    .filter((item) => item.normalizedInfoType !== '缺口记录' && !item.sourceUrl)
    .map((item) => item.id);
  const channelTypes = [...new Set(items.map((item) => item.normalizedChannelType).filter((type) => type && type !== '未归类'))];
  const infoTypeStats = distribution(items, 'normalizedInfoType');
  const channelStats = distribution(items, 'normalizedChannelType');
  const confidenceStats = distribution(items, 'normalizedConclusionConfidence');
  const subtopicStats = distribution(items, 'subtopic');
  const nonGapItems = items.filter((item) => item.normalizedInfoType !== '缺口记录');
  const newFactItems = items.filter((item) => item.normalizedInfoType === '新增事实');
  const gapRecords = items.filter((item) => item.normalizedInfoType === '缺口记录');
  const privateSignalCount = items.filter((item) => item.isPrivateSignal).length;
  const privateSignalRatio = items.length ? Number((privateSignalCount / items.length).toFixed(3)) : 0;
  const largestSubtopicCount = Math.max(0, ...Object.values(subtopicStats));
  const subtopicConcentration = items.length ? Number((largestSubtopicCount / items.length).toFixed(3)) : 0;
  const oldLineDisguisedAsNew = items
    .filter((item) => item.normalizedInfoType === '新增事实' && isLikelyOldLine(item))
    .map((item) => item.id);
  const weakSignalsOverclaimed = items
    .filter((item) => isWeakOverclaimed(item))
    .map((item) => item.id);
  const fieldWarnings = fieldWarningsForItems(items, day.date);
  const thinInsightCount = items.filter((item) => (item.insight || '').length < MIN_INSIGHT_CHARS).length;

  return {
    date: day.date,
    items,
    cardCount: items.length,
    nonGapCardCount: nonGapItems.length,
    newFactCount: newFactItems.length,
    contextCount: infoTypeStats['旧线复核'] || 0,
    oldLineReviewCount: infoTypeStats['旧线复核'] || 0,
    weakSignalCount: infoTypeStats['弱信号'] || 0,
    gapRecordCount: gapRecords.length,
    gapCount: gapRecords.length,
    sourcePlatformCount: latestPlatforms.length,
    sourceUrlCount: new Set(items.flatMap((item) => item.sourceUrls || (item.sourceUrl ? [item.sourceUrl] : []))).size,
    sourceUrlMissingCount: sourceUrlMissingItemIds.length,
    sourceUrlMissingItemIds,
    channelTypeCount: channelTypes.length,
    channelTypes,
    infoTypeDistribution: infoTypeStats,
    channelCoverage: channelStats,
    confidenceDistribution: confidenceStats,
    conclusionConfidenceDistribution: confidenceStats,
    subtopicDistribution: subtopicStats,
    subtopicConcentration,
    privateSignalCount,
    privateSignalRatio,
    fieldCompleteness: {
      requiredFieldMissingCount: fieldWarnings.reduce((sum, entry) => sum + entry.missing, 0),
      missingFields: fieldWarnings,
    },
    fieldWarnings,
    thinInsightCount,
    abcScore: detectAbcStyle(digestText),
    oldLineDisguisedAsNew,
    weakSignalsOverclaimed,
    hasValidGapRecord: hasValidGapRecord(items),
  };
}

function latestSectionText(digest, latestDate) {
  const latestDigestMatch = digest.match(new RegExp(`^## ${latestDate}[\\s\\S]*?(?=^## \\d{4}-\\d{2}-\\d{2}\\b|$)`, 'm'));
  return latestDigestMatch ? latestDigestMatch[0] : '';
}

function fieldWarnings(latestItems) {
  return fieldWarningsForItems(latestItems, 'latest').map(({ field, missing }) => ({ field, missing }));
}

function qualityIssues(latestDay, latestDigestText, existingStatus = null) {
  const latest = analyzeDay(latestDay, latestDigestText);
  const criticalIssues = [];
  const warnings = [];

  if (latest.nonGapCardCount < MIN_LATEST_ITEMS && latest.hasValidGapRecord) {
    warnings.push(`最新日期非缺口信息卡少于 ${MIN_LATEST_ITEMS} 条：当前 ${latest.nonGapCardCount} 条；已有缺口记录，不能用缺口记录凑数量。`);
  } else if (latest.nonGapCardCount < MIN_LATEST_ITEMS) {
    criticalIssues.push(`最新日期非缺口信息卡少于 ${MIN_LATEST_ITEMS} 条：当前 ${latest.nonGapCardCount} 条；且没有有效缺口记录。`);
  }
  if (latest.nonGapCardCount > MAX_LATEST_ITEMS) {
    warnings.push(`最新日期非缺口信息卡多于 ${MAX_LATEST_ITEMS} 条：当前 ${latest.nonGapCardCount} 条；需要确认不是低价值堆叠。`);
  }
  if (latest.sourcePlatformCount < MIN_LATEST_PLATFORMS) {
    criticalIssues.push(`最新日期来源平台少于 ${MIN_LATEST_PLATFORMS} 个：当前 ${latest.sourcePlatformCount} 个；需要恢复多渠道代理采集。`);
  }
  if (latest.sourceUrlCount < MIN_LATEST_LINKS) {
    const sourcedLowVolumeDay = latest.hasValidGapRecord
      && latest.nonGapCardCount > 0
      && latest.nonGapCardCount < MIN_LATEST_ITEMS
      && latest.items.filter((item) => item.normalizedInfoType !== '缺口记录').every((item) => item.sourceUrl);
    const issues = sourcedLowVolumeDay ? warnings : criticalIssues;
    issues.push(`最新日期可追溯链接少于 ${MIN_LATEST_LINKS} 个：当前 ${latest.sourceUrlCount} 个；${sourcedLowVolumeDay ? '有效材料均有来源且已有缺口说明，不为凑数补链接。' : '信息库不能只保留观点摘要。'}`);
  }
  if (latest.sourceUrlMissingItemIds.length > 0) {
    warnings.push(`最新日期有 ${latest.sourceUrlMissingItemIds.length} 条 sourceUrl 缺失：${latest.sourceUrlMissingItemIds.join(', ')}。`);
  }
  if (latest.channelTypeCount < MIN_CHANNEL_TYPES) {
    warnings.push(`最新日期渠道类型少于 ${MIN_CHANNEL_TYPES} 类：当前 ${latest.channelTypeCount} 类；应覆盖官方、媒体、报告学术、社媒公众号、JD薪酬中的至少 4 类。`);
  }
  if (latest.newFactCount < 5 && latest.hasValidGapRecord) {
    warnings.push(`最新日期“新增事实”少于 5 条：当前 ${latest.newFactCount} 条；已有缺口记录，首页应诚实显示可信新增不足。`);
  } else if (latest.newFactCount < 5) {
    criticalIssues.push(`最新日期“新增事实”少于 5 条：当前 ${latest.newFactCount} 条；且没有有效缺口记录。`);
  }
  if (latest.thinInsightCount > 0) {
    warnings.push(`最新日期有 ${latest.thinInsightCount} 条 OD 启示过短；每条高价值信息必须说明提示关注的组织机制。`);
  }
  if (latest.abcScore >= 3) {
    warnings.push(`最新日期疑似 ABC 体表达过多：命中 ${latest.abcScore} 类英文混写；应改为中文为主，必要英文用“中文解释 + 英文原词”。`);
  }
  if (latest.fieldWarnings.length > 0) {
    warnings.push(`最新日期仍有新结构字段缺失：${latest.fieldWarnings.map((entry) => `${entry.field} ${entry.missing} 条`).join('；')}。`);
  }
  if (latest.privateSignalRatio > PRIVATE_SIGNAL_FAIL_RATIO) {
    criticalIssues.push(`最新日期私有/匿名/脱敏信号占比过高：${Math.round(latest.privateSignalRatio * 100)}%。`);
  } else if (latest.privateSignalRatio > PRIVATE_SIGNAL_WARN_RATIO) {
    warnings.push(`最新日期私有/匿名/脱敏信号占比偏高：${Math.round(latest.privateSignalRatio * 100)}%；不能替代公开可追溯事实。`);
  }
  if (latest.subtopicConcentration > SUBTOPIC_FAIL_RATIO && !latest.hasValidGapRecord) {
    criticalIssues.push(`最新日期同一子主题占比过高：${Math.round(latest.subtopicConcentration * 100)}%；日常情报流不能退化为单专题摘要。`);
  } else if (latest.subtopicConcentration > SUBTOPIC_WARN_RATIO) {
    warnings.push(`最新日期同一子主题超过 40%：${Math.round(latest.subtopicConcentration * 100)}%；需要关注广谱雷达覆盖。`);
  }
  if (latest.oldLineDisguisedAsNew.length > 0) {
    warnings.push(`最新日期疑似旧线复核被标为新增事实：${latest.oldLineDisguisedAsNew.join(', ')}。`);
  }
  if (latest.weakSignalsOverclaimed.length > 0) {
    criticalIssues.push(`最新日期弱信号被标成 L3/L4：${latest.weakSignalsOverclaimed.join(', ')}。`);
  }
  const existingBrokenCount = Number(existingStatus?.links?.brokenCount || 0);
  if (existingBrokenCount > 0 || (Array.isArray(existingStatus?.brokenLinks) && existingStatus.brokenLinks.length > 0)) {
    criticalIssues.push(`一方内部链接存在断链：${existingBrokenCount || existingStatus.brokenLinks.length} 条；需先运行或修复链接检查。`);
  }
  if (LOCAL_PATH_PATTERN.test(latestDigestText)) {
    criticalIssues.push('最新日期 digest 存在本地绝对路径或私有路径泄露。');
  }

  return {
    ...latest,
    criticalIssues,
    warnings,
  };
}

function qualityStatus(criticalIssues, warnings) {
  if (criticalIssues.length > 0) return 'fail';
  if (warnings.length > 0) return 'warn';
  return 'pass';
}

function publicScanUrlFor(date) {
  return `https://jordanfu.github.io/org-intelligence-info/daily-log/${date}.html`;
}

function latestPrivateOrgDailyLogDate() {
  try {
    if (!fs.existsSync(privateOrgDailyLogDir)) return null;
    const dates = fs.readdirSync(privateOrgDailyLogDir)
      .map((file) => {
        const match = file.match(/^(\d{4}-\d{2}-\d{2})\.md$/);
        return match ? match[1] : null;
      })
      .filter(Boolean)
      .sort();
    return dates.at(-1) || null;
  } catch {
    return null;
  }
}

function main() {
  if (!fs.existsSync(digestPath)) {
    throw new Error('digest.md does not exist');
  }

  const digest = fs.readFileSync(digestPath, 'utf8');
  const days = parseDigest(digest);
  const items = days.flatMap((day) => day.items.map((item) => ({ ...item, date: day.date })));

  if (days.length === 0 || items.length === 0) {
    throw new Error('digest.md has no parseable information-library items');
  }

  const latestDate = days[0].date;
  const existingStatus = readExistingStatus();
  const latestDigestText = latestSectionText(digest, latestDate);
  const recentDays = days.slice(0, RECENT_DAY_COUNT).map((day) => analyzeDay(day, latestSectionText(digest, day.date)));
  const latestQuality = qualityIssues(days[0], latestDigestText, existingStatus);
  const latestPrivateScanDate = latestPrivateOrgDailyLogDate() || latestDate;
  const orgIntelligenceFreshness = assessOrgIntelligenceFreshness(latestPrivateScanDate);
  const platforms = [...new Set(items.map((item) => item.platform || item.source).filter(Boolean))].sort();
  const trustStats = items.reduce((stats, item) => {
    const key = item.trust || '未标注';
    stats[key] = (stats[key] || 0) + 1;
    return stats;
  }, {});

  const missing = {
    summary: countMissing(items, 'summary'),
    source: countMissing(items, 'source'),
    sourceUrl: countMissing(items.filter((item) => cardSchema.informationType(item.infoType) !== '缺口记录'), 'sourceUrl'),
    platform: countMissing(items, 'platform'),
    trust: countMissing(items, 'trust'),
    infoType: countMissing(days[0].items, 'infoType'),
    channelType: countMissing(days[0].items, 'channelType'),
    conclusionConfidence: countMissing(days[0].items, 'conclusionConfidence'),
    verificationQuestion: countMissing(days[0].items, 'verificationQuestion'),
    insight: countMissing(items, 'insight'),
    tags: countMissing(items, 'tags'),
    time: countMissing(items, 'time'),
  };
  const recentFieldWarnings = recentDays
    .flatMap((day) => day.fieldWarnings.map((entry) => ({ ...entry, date: day.date })));
  const recentLocalPathDates = recentDays
    .filter((day) => LOCAL_PATH_PATTERN.test(latestSectionText(digest, day.date)))
    .map((day) => day.date);
  const recentWeakOverclaims = recentDays
    .filter((day) => day.weakSignalsOverclaimed.length > 0)
    .map((day) => `${day.date}: ${day.weakSignalsOverclaimed.join(', ')}`);
  const recentWarnings = [];
  const recentCriticalIssues = [];

  if (recentFieldWarnings.length > 0) {
    recentWarnings.push(`最近 ${RECENT_DAY_COUNT} 个信息日存在结构字段缺失：${recentFieldWarnings.length} 类日期/字段组合需逐步补齐。`);
  }
  if (recentLocalPathDates.length > 0) {
    recentCriticalIssues.push(`最近 ${RECENT_DAY_COUNT} 个信息日存在本地绝对路径或私有路径泄露：${recentLocalPathDates.join('、')}。`);
  }
  if (recentWeakOverclaims.length > 0) {
    recentCriticalIssues.push(`最近 ${RECENT_DAY_COUNT} 个信息日存在弱信号 L3/L4 越级：${recentWeakOverclaims.join('；')}。`);
  }

  const criticalIssues = [...latestQuality.criticalIssues, ...recentCriticalIssues];
  const warnings = [...latestQuality.warnings, ...recentWarnings];
  if (orgIntelligenceFreshness.status === 'fail') {
    criticalIssues.push(`组织情报公开镜像已滞后 ${orgIntelligenceFreshness.ageDays} 天（最新 ${latestPrivateScanDate}），超过 ${orgIntelligenceFreshness.maxAgeDays} 天保鲜门槛。`);
  } else if (orgIntelligenceFreshness.status === 'unknown') {
    warnings.push('组织情报公开镜像日期无法解析，未完成保鲜检查。');
  }
  const linkState = {
    brokenLinks: Array.isArray(existingStatus?.brokenLinks) ? existingStatus.brokenLinks : [],
    links: existingStatus?.links || {
      checkedAt: null,
      qualityStatus: 'pending',
      firstPartyChecked: 0,
      externalWarnings: 0,
      brokenCount: 0,
    },
  };

  const status = {
    generatedAt: new Date().toISOString(),
    module: 'info-feed',
    qualityStatus: qualityStatus(criticalIssues, warnings),
    latestDate,
    latestCardCount: latestQuality.cardCount,
    newFactCount: latestQuality.newFactCount,
    contextCount: latestQuality.contextCount,
    weakSignalCount: latestQuality.weakSignalCount,
    gapRecordCount: latestQuality.gapRecordCount,
    sourceCount: latestQuality.sourcePlatformCount,
    channelCoverage: latestQuality.channelTypes,
    confidenceDistribution: latestQuality.confidenceDistribution,
    subtopicConcentration: latestQuality.subtopicConcentration,
    privateSignalRatio: latestQuality.privateSignalRatio,
    fieldCompleteness: latestQuality.fieldCompleteness,
    sourceUrlMissingCount: latestQuality.sourceUrlMissingCount,
    latest: {
      date: latestDate,
      cardCount: latestQuality.cardCount,
      nonGapCardCount: latestQuality.nonGapCardCount,
      newFactCount: latestQuality.newFactCount,
      oldLineReviewCount: latestQuality.oldLineReviewCount,
      contextCount: latestQuality.contextCount,
      weakSignalCount: latestQuality.weakSignalCount,
      gapCount: latestQuality.gapCount,
      gapRecordCount: latestQuality.gapRecordCount,
      sourcePlatformCount: latestQuality.sourcePlatformCount,
      sourceUrlCount: latestQuality.sourceUrlCount,
      channelTypeCount: latestQuality.channelTypes.length,
      channelTypes: latestQuality.channelTypes,
      infoTypeDistribution: latestQuality.infoTypeDistribution,
      channelTypeDistribution: latestQuality.channelCoverage,
      channelCoverage: latestQuality.channelCoverage,
      confidenceDistribution: latestQuality.confidenceDistribution,
      conclusionConfidenceDistribution: latestQuality.confidenceDistribution,
      subtopicDistribution: latestQuality.subtopicDistribution,
      subtopicConcentration: latestQuality.subtopicConcentration,
      privateSignalRatio: latestQuality.privateSignalRatio,
      sourceUrlMissingItemIds: latestQuality.sourceUrlMissingItemIds,
      sourceUrlMissingCount: latestQuality.sourceUrlMissingCount,
      fieldCompleteness: latestQuality.fieldCompleteness,
      explicitFieldWarnings: latestQuality.fieldWarnings,
      abcScore: latestQuality.abcScore,
      thinInsightCount: latestQuality.thinInsightCount,
      oldLineDisguisedAsNew: latestQuality.oldLineDisguisedAsNew,
      weakSignalsOverclaimed: latestQuality.weakSignalsOverclaimed,
      hasValidGapRecord: latestQuality.hasValidGapRecord,
    },
    recentDays: recentDays.map((day) => ({
      date: day.date,
      cardCount: day.cardCount,
      nonGapCardCount: day.nonGapCardCount,
      newFactCount: day.newFactCount,
      contextCount: day.contextCount,
      weakSignalCount: day.weakSignalCount,
      gapRecordCount: day.gapRecordCount,
      sourcePlatformCount: day.sourcePlatformCount,
      sourceUrlCount: day.sourceUrlCount,
      sourceUrlMissingCount: day.sourceUrlMissingCount,
      channelTypeCount: day.channelTypeCount,
      channelTypes: day.channelTypes,
      channelCoverage: day.channelCoverage,
      confidenceDistribution: day.confidenceDistribution,
      subtopicDistribution: day.subtopicDistribution,
      subtopicConcentration: day.subtopicConcentration,
      privateSignalRatio: day.privateSignalRatio,
      fieldCompleteness: day.fieldCompleteness,
      qualityIssues: [
        ...(day.newFactCount < 5 && !day.hasValidGapRecord ? ['新增事实少于 5 条且缺少有效缺口记录'] : []),
        ...(day.newFactCount < 5 && day.hasValidGapRecord ? ['新增事实少于 5 条，已有缺口记录'] : []),
        ...(day.channelTypeCount < MIN_CHANNEL_TYPES ? [`渠道类型少于 ${MIN_CHANNEL_TYPES} 类`] : []),
        ...(day.sourceUrlMissingCount > 0 ? [`sourceUrl 缺失 ${day.sourceUrlMissingCount} 条`] : []),
        ...(day.fieldCompleteness.requiredFieldMissingCount > 0 ? [`结构字段缺失 ${day.fieldCompleteness.requiredFieldMissingCount} 项`] : []),
        ...(day.weakSignalsOverclaimed.length > 0 ? [`弱信号越级：${day.weakSignalsOverclaimed.join(', ')}`] : []),
      ],
    })),
    totals: {
      days: days.length,
      cards: items.length,
      platforms: platforms.length,
      dailyFiles: listMarkdownDates(dailyDir).length,
      dailyReportFiles: listMarkdownDates(dailyReportDir).length,
      weeklyFiles: fs.existsSync(weeklyDir) ? fs.readdirSync(weeklyDir).filter((file) => file.endsWith('.md')).length : 0,
    },
    homepageBridge: {
      digestLatestDate: latestDate,
      latestScanDate: latestPrivateScanDate,
      freshnessStatus: orgIntelligenceFreshness.status,
      ageDays: orgIntelligenceFreshness.ageDays,
      maxAgeDays: orgIntelligenceFreshness.maxAgeDays,
      latestScanUrl: publicScanUrlFor(latestPrivateScanDate),
      publicMirrorUrl: 'https://jordanfu.github.io/org-intelligence-info/',
      checkedBy: 'scripts/check-public-links.js',
      status: 'pending-link-check',
    },
    trustStats,
    missing,
    warnings,
    criticalIssues,
    brokenLinks: linkState.brokenLinks,
    links: linkState.links,
    governance: '信息库负责广谱前沿雷达；专题项目负责假设检验；知识库负责长期复利，三者分开治理、周期互补。',
  };

  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(operationsDir, { recursive: true });
  fs.writeFileSync(infoStatusPath, JSON.stringify(status, null, 2) + '\n');
  fs.writeFileSync(legacyStatusJsonPath, JSON.stringify(status, null, 2) + '\n');

  const missingRows = Object.entries(missing)
    .map(([field, count]) => `| ${field} | ${count} |`)
    .join('\n');
  const trustRows = Object.entries(trustStats)
    .map(([trust, count]) => `| ${trust} | ${count} |`)
    .join('\n');
  const warningList = [...criticalIssues, ...warnings];
  const recentRows = status.recentDays
    .map((day) => `| ${day.date} | ${day.cardCount} | ${day.newFactCount} | ${day.contextCount} | ${day.weakSignalCount} | ${day.gapRecordCount} | ${day.channelTypes.join('、') || '未识别'} | ${day.confidenceDistribution.L1 || 0}/${day.confidenceDistribution.L2 || 0}/${day.confidenceDistribution.L3 || 0}/${day.confidenceDistribution.L4 || 0} | ${day.qualityIssues.length ? day.qualityIssues.join('；') : '无'} |`)
    .join('\n');

  const markdown = `# 信息库滚动流状态

> 自动生成：${status.generatedAt}

## 当前状态

- 状态：${status.qualityStatus}
- 最新日期：${latestDate}
- 最新日期条目数：${status.latest.cardCount}
- 今日新增事实：${status.latest.newFactCount}
- 旧线复核 / Context：${status.latest.oldLineReviewCount}
- 弱信号：${status.latest.weakSignalCount}
- 缺口记录：${status.latest.gapCount}
- 最新日期来源平台数：${status.latest.sourcePlatformCount}
- 最新日期渠道覆盖：${status.latest.channelTypes.join('、') || '未识别'}
- 最新日期可追溯链接数：${status.latest.sourceUrlCount}
- 最新日期字段完整度缺口：${status.latest.fieldCompleteness.requiredFieldMissingCount}
- 最新日期子主题集中度：${Math.round(status.latest.subtopicConcentration * 100)}%
- 最新日期私有/匿名/脱敏信号占比：${Math.round(status.latest.privateSignalRatio * 100)}%
- 总天数：${days.length}
- 总条目：${items.length}

## 质量闸门

${warningList.length ? warningList.map((issue) => `- ⚠️ ${issue}`).join('\n') : '- ✅ 最新日期未触发密度、来源、链接、字段或表达质量警报。'}

## 最近 7 个信息日

| 日期 | 卡片 | 新增事实 | Context | 弱信号 | 缺口 | 渠道覆盖 | L1/L2/L3/L4 | 质量提示 |
|---|---:|---:|---:|---:|---:|---|---|---|
${recentRows}

## 可信度分布

| 可信度 | 条目数 |
|---|---:|
${trustRows}

## 字段缺失

> 旧字段按全库统计；信息类型、渠道类型、结论置信度、验证问题按最新日期强检查统计，最近 7 个信息日详见上表。

| 字段 | 缺失条目数 |
|---|---:|
${missingRows}

## 维护规则

- \`digest.md\` 是首页「信息库」卡片的直接数据源，最新日期必须可追溯到公开来源。
- 信息库、专题项目和知识库分开治理；周期沉淀时互相回看是否有补充。
- 最新信息卡必须逐步补齐：信息类型、渠道类型、结论置信度、验证问题。
- 没有足够可信新增信息时，宁可标注缺口，不用低质量内容填充。
`;

  fs.writeFileSync(legacyStatusMdPath, markdown);
  console.log(`Info library audit completed: ${status.qualityStatus}; latest ${latestDate} has ${status.latest.cardCount} cards, ${status.latest.sourceUrlCount} source URLs.`);

  if (status.qualityStatus === 'fail') {
    process.exitCode = 1;
  }
}

main();
