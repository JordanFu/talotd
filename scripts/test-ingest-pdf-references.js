const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  dedupeCitations,
  extractPdfUrls,
  firstCatalogUploadDate,
  firstIngestedDate,
  isPdfFile,
  profileFor,
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

fs.rmSync(tempDir, { recursive: true, force: true });

console.log('PDF URL boundary test passed');
