const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  dedupeCitations,
  extractPdfUrls,
  firstCatalogUploadDate,
  firstIngestedDate,
  isGeneratedTemplateCard,
  isPdfFile,
  mergeCatalogRecord,
  profileFor,
  wikiMarkdown,
} = require('./ingest-pdf-references');

const mixedMarkdown = [
  '报道：https://apnews.com/article/meta-lawsuit)；[诉状](https://storage.courtlistener.com/recap/case/complaint.pdf)',
  '报告页：https://www.pwc.com/report.html)，[完整报告](https://www.pwc.com/report/full-report.pdf)',
  '正式规则：[Fannie Mae LL-2026-04](https://singlefamily.fanniemae.com/media/45196/display)',
].join('\n');

assert.deepStrictEqual(extractPdfUrls(mixedMarkdown), [
  'https://storage.courtlistener.com/recap/case/complaint.pdf',
  'https://www.pwc.com/report/full-report.pdf',
  'https://singlefamily.fanniemae.com/media/45196/display',
]);

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'odic-pdf-test-'));
const pdfFile = path.join(tempDir, 'valid.pdf');
const htmlFile = path.join(tempDir, 'challenge.pdf');
fs.writeFileSync(pdfFile, `${'x'.repeat(32)}%PDF-1.7\n${'0'.repeat(2048)}`);
fs.writeFileSync(htmlFile, `<!DOCTYPE html>\n${'x'.repeat(2048)}`);

assert.strictEqual(isPdfFile(pdfFile), true, 'accepts a PDF signature within the first 1 KB');
assert.strictEqual(isPdfFile(htmlFile), false, 'rejects an HTML response saved with a .pdf extension');

assert.strictEqual(
  firstIngestedDate('---\ningested: 2026-08-27\n---\n', '2026-08-31'),
  '2026-08-27',
  'preserves the original ingestion date when a card is rescanned',
);
assert.strictEqual(
  firstIngestedDate('', '2026-08-31'),
  '2026-08-31',
  'uses the current date for a newly discovered card',
);
assert.strictEqual(
  firstCatalogUploadDate({ uploadDate: '2026-08-27' }, '2026-08-31'),
  '2026-08-27',
  'preserves the catalog upload date when a PDF record is refreshed',
);

assert.deepStrictEqual(dedupeCitations([
  { file: '外部公开 PDF 扫描', line: 69, context: '公开安全引用：官方技术报告 PDF' },
  { file: '外部公开 PDF 扫描', line: 69, context: '公开安全引用：官方技术报告 PDF' },
  { file: 'daily/2026-08-27.md', line: 26, context: '技术报告 PDF' },
]), [
  { file: '外部公开 PDF 扫描', line: 69, context: '公开安全引用：官方技术报告 PDF' },
  { file: 'daily/2026-08-27.md', line: 26, context: '技术报告 PDF' },
], 'deduplicates identical public-safe citation rows without removing distinct repo citations');

const partiallyReadProfile = profileFor({
  title: 'Employment at Anthropic',
  url: 'https://www-cdn.anthropic.com/72628f1863c53432195db83279252dfd2cb53158/Employment%20at%20Anthropic.pdf',
});
assert.strictEqual(
  partiallyReadProfile.cardStatus,
  '已下载原始PDF，已核读关键页与方法边界',
  'preserves partial-reading evidence instead of reverting the card to an unread template',
);
assert.match(
  partiallyReadProfile.evidenceLevel,
  /^L2：/,
  'records the evidence level for a partially read high-value PDF',
);

const curatedCard = `---
title: 人编可检索标题
source: 一手机构
date: 2026-10-20
ingested: 2026-10-21
sourceFile: ../raw/example.pdf
sourceUrl: https://example.com/example.pdf
tags: [组织设计]
status: 已完成全文核读并形成人编结论
---

# 人编可检索标题

## 一句话判断

这是一条不会被扫描器覆盖的人编判断。

## 被引用位置

- \`daily/old.md:1\`：旧引用

## 后续验证问题

- 保留这一节。
`;
const curatedItem = {
  title: 'example',
  publisher: 'example.com',
  sourceType: 'media',
  url: 'https://example.com/example.pdf',
  citations: [{ file: 'daily/2026-10-26.md', line: 12, context: '新引用' }],
};
assert.strictEqual(isGeneratedTemplateCard(curatedCard), false, 'recognizes a curated card');
const refreshedCuratedCard = wikiMarkdown(
  curatedItem,
  'example',
  'knowledge/raw/example.pdf',
  'downloaded',
  curatedCard,
);
assert.match(refreshedCuratedCard, /title: 人编可检索标题/, 'preserves the curated title');
assert.match(refreshedCuratedCard, /这是一条不会被扫描器覆盖的人编判断。/, 'preserves the curated judgment');
assert.match(refreshedCuratedCard, /daily\/2026-10-26\.md:12/, 'refreshes citations');
assert.doesNotMatch(refreshedCuratedCard, /daily\/old\.md:1/, 'removes stale citation rows');
assert.match(refreshedCuratedCard, /保留这一节。/, 'preserves sections after citations');

const templateCard = curatedCard.replace(
  'status: 已完成全文核读并形成人编结论',
  'status: 已下载原始PDF，已生成结构化初筛卡片',
);
assert.strictEqual(isGeneratedTemplateCard(templateCard), true, 'recognizes an auto-generated template card');

const existingCatalogRecord = {
  id: 'p999',
  title: '人编标题',
  publisher: '一手机构',
  sourceType: 'company-primary',
  date: '2026-10-20',
  description: '人编中文判断',
  uploadDate: '2026-10-21',
  rawFile: '',
};
const generatedCatalogRecord = {
  title: 'example',
  publisher: 'example.com',
  sourceType: 'media',
  date: '',
  description: '模板描述',
  uploadDate: '2026-10-26',
  summaryFile: './knowledge/wiki/pdf-source-example.md',
  rawFile: './knowledge/raw/example.pdf',
  fileName: 'example.pdf',
  fileSize: '2048 bytes',
  originalUrl: 'https://example.com/example.pdf',
};
const mergedCatalogRecord = mergeCatalogRecord(existingCatalogRecord, generatedCatalogRecord, true);
assert.strictEqual(mergedCatalogRecord.title, '人编标题', 'preserves the curated catalog title');
assert.strictEqual(mergedCatalogRecord.sourceType, 'company-primary', 'preserves the curated source type');
assert.strictEqual(mergedCatalogRecord.description, '人编中文判断', 'preserves the curated description');
assert.strictEqual(mergedCatalogRecord.rawFile, './knowledge/raw/example.pdf', 'refreshes operational raw-file state');
assert.strictEqual(mergedCatalogRecord.uploadDate, '2026-10-21', 'preserves first catalog upload date');

fs.rmSync(tempDir, { recursive: true, force: true });

console.log('PDF URL boundary test passed');
