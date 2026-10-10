# 2026-10-10｜AI时代组织与人才机制专题研究审计

> 研究窗口：2026-10-09 18:00—2026-10-10 18:00（Asia/Shanghai）。本审计记录仓库状态、多代理分工、检索、时间核验、事件根去重、内部知识源使用与发布验证；原始来源缺失时不以格式和篇幅制造结论。

## 1. 启动与仓库状态

- 任务开始先执行 `git pull --rebase origin main`，仓库由 `74006860` 快进到 `00c5af9f`；远端为 `https://github.com/JordanFu/talotd.git`。
- `git worktree list`确认当前目录为主仓库工作树，不是旧工作树；启动时工作区干净。
- 拉取后当日文件为自动化兜底状态稿，本轮以正式研究替换；兜底文本不作为业务证据。
- 已完整读取 `operations/information-editorial-standard.md`。本轮不修改 `digest.md`、`daily/`、`daily-report/`；广谱增量只提交到本目录 `information-candidates.md`。

## 2. 多代理工作流

| 代理角色 | 交付 | 独立责任 |
|---|---|---|
| 专题一代理 `/root/topic_flat_1010` | `01-flat-organization.md` | 扁平化、阶段组织、权责、跨度、沟通与员工后效 |
| 专题二代理 `/root/topic_talent_1010` | `02-talent-density.md` | 识别、评价、面试、项目、激励、学习、盘点与留任 |
| 专题三代理 `/root/topic_career_1010` | `03-job-family-career-architecture.md` | 岗位／职族／序列、技能标签、价格工具与退出门槛 |
| 专题四代理 `/root/topic_promotion_1010` | `04-promotion-system.md` | 四只时钟、项目／岗位价值、认证、AI贡献、评审与薪酬 |
| 官方／一手＋公司制度＋JD／薪酬代理 | `/tmp/channel-primary-2026-10-10.md` | 元数据时间、ATS字段、薪资与制度完整性 |
| 权威媒体＋国内媒体＋社媒／职场代理 | `/tmp/channel-media-2026-10-10.md` | 美图、人社部、旧闻纠错、事件根和公众号覆盖 |
| 内部知识源代理 | `/tmp/internal-sources-2026-10-10.md` | 近14日信息库、知识库、昨日专题与滚动基线去重 |
| 主代理 | `00-overview.md`、候选、本审计、HTML与发布 | 交叉验证、冲突修正、跨专题聚合与验收 |

主代理交叉修正包括：把美图当窗演讲升级为四专题共同案例但不误称减层／晋升制度；把Inc观点稿纠正为2025年旧文；把OpenAI核心动作与当窗CBS综述拆开；保留Kong职位页与API薪酬字段差异；禁止把美图“300万或500万”自行扩写为美元。

## 3. 外部检索与查询记录

外部检索优先使用 `python3 /Users/tal/.codex/skills/anysearch/scripts/anysearch_cli.py`，并回到公司、机构、ATS和媒体原始页面核验。核心查询包括：

- `October 10 2026 AI workforce organization management promotion official company`
- `October 9 2026 AI job family career architecture salary job posting`
- `site:anthropic.com October 9 2026 unintended model actions`
- `site:jobs.ashbyhq.com AI management published October 9 2026 salary`
- `site:boards.greenhouse.io agentic platform product management October 9 2026`
- `2026年10月10日 AI 组织进化 岗位 人才 晋升 公司 官方`
- `2026年10月10日 人工智能 技能 薪酬 人社部 发布会`
- `美图 组织进化2.0 AI创新工作室 ARR 团队 激励`
- `OpenAI fired safety researchers October 9 2026 response`
- `AI middle managers Inc October 2026 organization structure`

四份专题第8节保留各自更细的查询词与下一步搜索路径。社媒只追可核身份、原帖和制度附件；匿名讨论不升级为事实。

## 4. 严格窗口与来源裁决

| 来源根 | 可核发布时间（上海） | 窗口裁决 | 证据等级与用途 |
|---|---:|---|---|
| 美图组织进化2.0／DoNews | 2026-10-10 14:23 | 入窗 | L2公司高管自报；支持阶段化团队、资源门和问题反思，不支持减层或独立后效 |
| Anthropic非预期模型行为 | 2026-10-10 00:09；06:04修改 | 入窗 | L2官方自报；支持边界、停止、恢复和检测责任，不支持员工组织结构 |
| Kong Ashby职位 | 2026-10-10 07:11 | 入窗 | L1官方招聘意图；支持单岗责任与公开薪带，不支持到岗或职族 |
| ZoomInfo Greenhouse职位 | 2026-10-10 01:48 | 入窗 | L1官方招聘意图；支持单岗与组队意图，不支持已运行职业架构 |
| 人社部发布会／21世纪报道 | 2026-10-10 12:22／14:16 | 入窗 | L2政策方向；不支持企业实施结果 |
| FedScoop OPM FWD Chat | 2026-10-10 03:58 | 入窗报道、旧上线 | L2具名采访增量；工具10月7日上线，不刷新为今日动作 |
| CBS OpenAI争议 | 2026-10-10 00:21 | 入窗报道、旧事件根 | L2双方说法综述；解雇、员工帖与公司回应均在窗口前 |
| Staffmark／CompTIA／Inc | 7月／10月2日／2025-10-02 | 窗口外 | Context或排除今日新增 |

完整企业机制计数：减层 **0**；人才识别—机会—激励—留任闭环 **0**；岗位／职族／序列制度 **0**；晋升制度 **0**；新增L3／L4运行后效 **0**。

## 5. 内部知识源与同源去重

实际读取：`digest.md`；最近7—14日 `daily/`、`daily-report/`；`knowledge/catalog.json`、`knowledge/index.md` 及相关 `knowledge/wiki/`、`knowledge/summaries/`、`knowledge/concepts/`；10月9日五份正式专题；四份滚动基线；根目录职级追踪档案。

去重规则：同一底层来源出现在信息卡、日报、知识页与历史专题时只计一个证据根；内部编辑加工不增加证据等级。DoNews与界面属于同一美图演讲事件根；员工公开信、OpenAI回应、TechCrunch／CNBC／CBS属于同一争议根；Staffmark页面与PDF属于同一调查；OPM官方工具与FedScoop分别承担产品字段与当窗采访增量，不能把上线日期刷新为报道日期。

内部源只用于发现重复、校准历史判断、补充反例与人本边界；不把信息库摘要复制成专题日报。`daily-report/digest.json`与主题旧基线存在时效限制，正式判断优先采用近期报告、滚动基线和外部原始页。

## 6. 主要冲突与修正

1. **美图证据边界：**10／7／3／2、ARR、代码占比和算力投入均为公司自报；没有独立审计、层级／跨度、候选分母或员工结果。
2. **预算币种：**演讲原文只写“300万或500万”，未说明币种；正式稿不得自行写成美元。
3. **阶段组织不等于减层：**成熟产品允许精细专业分工、潜力产品≤50人、PMF最小团队，只能支持阶段化组织，不支持中层减少。
4. **OpenAI时间窗：**CBS发布在窗内，底层解雇、员工帖和公司回应均在窗前；只计综述增量，不计今日新处分或新制度。
5. **招聘字段：**Kong简化API薪酬为null，职位页嵌入数据有薪带；保留差异，不将单岗区间外推为AI溢价。ZoomInfo“组建团队”是未来意图。
6. **旧闻纠错：**Staffmark调查、CompTIA发布和Inc观点稿均早于窗口；搜索索引或当窗报道不刷新事件根。
7. **公众号覆盖：**指定微信公众号最新原文未取得，只能报告覆盖缺口，不能声称无更新。

## 7. 质量与发布验证清单

- [x] 五份Markdown存在；四专题各9个H2，总览7个H2。
- [x] 四专题固定结构、事实／判断／Context／行动与来源完整。
- [x] `information-candidates.md`只提交候选，不改信息库正文。
- [x] 六个HTML生成；日目录总览与四专题全部链接 `.html`，报告页保留“查看 Markdown”。
- [x] 根首页最新专题入口指向 `2026-10-10/index.html`。
- [x] `digest.md`、`daily/`、`daily-report/`相对 `origin/main` 无本任务改动。
- [x] 覆盖审计、严格质量门、项目测试、链接检查、浏览器验证和 `git diff --check` 通过；站内链接 broken 0，无头浏览器确认首页、移动端日目录、五份报告与Markdown辅助入口正常，控制台无错误。
- [x] `./sync.sh`创建提交；远端并发更新引发单个派生状态文件冲突，重建状态并完成rebase后，提交 `ad2995a3` 已推送，远端 `main` 与本地HEAD一致。冲突与恢复记录见根目录 `memory.md`。
- [x] GitHub Pages首页、日目录和五份报告均返回200；线上manifest为 `latestFormalDate=2026-10-10`、`todayStatus=formal`，首页入口与日目录五个HTML链接验证通过。

> 只在对应检查真实完成后将方框改为 `[x]`；不以计划替代完成证据。
