const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const wikiDir = path.join(root, 'knowledge', 'wiki');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'knowledge', 'catalog.json'), 'utf8'));
const status = JSON.parse(fs.readFileSync(path.join(root, 'data', 'knowledge-status.json'), 'utf8'));

for (const fileName of fs.readdirSync(wikiDir).filter((name) => /^pdf-source-.*\.md$/.test(name))) {
  const markdown = fs.readFileSync(path.join(wikiDir, fileName), 'utf8');
  const match = markdown.match(/^sourceFile:[ \t]*([^\r\n]*)$/m);
  if (!match) continue;
  const sourceFile = match[1].trim().replace(/^(["'])(.*)\1$/, '$2').trim();
  if (!sourceFile) continue;
  assert.doesNotMatch(sourceFile, /^\.\.\/knowledge\/raw\//, `${fileName} 不得重复 knowledge/ 路径段`);
  const resolved = path.resolve(wikiDir, sourceFile);
  assert.ok(fs.existsSync(resolved), `${fileName} 的 sourceFile 必须指向存在的 raw 文件`);
}

const uniqueRetrySummaryFiles = new Set();
for (const report of catalog.reports || []) {
  if (!report.summaryFile) continue;
  const summaryPath = path.join(root, report.summaryFile.replace(/^\.\//, ''));
  if (!fs.existsSync(summaryPath)) continue;
  const markdown = fs.readFileSync(summaryPath, 'utf8');
  if (/^status:\s*已索引来源，PDF下载待重试\s*$/m.test(markdown)) {
    uniqueRetrySummaryFiles.add(report.summaryFile);
  }
}
assert.equal(status.pdfRetryCount, uniqueRetrySummaryFiles.size, 'lint 的 PDF 待重试数必须来自卡片状态而非描述关键字');

const summaryIds = new Map();
for (const report of catalog.reports || []) {
  if (!report.summaryFile) continue;
  if (!summaryIds.has(report.summaryFile)) summaryIds.set(report.summaryFile, []);
  summaryIds.get(report.summaryFile).push(report.id || report.title || 'unknown');
}
const expectedDuplicates = Array.from(summaryIds.entries())
  .filter(([, ids]) => ids.length > 1)
  .map(([summaryFile]) => summaryFile)
  .sort();
const actualDuplicates = (status.duplicateSummaryFiles || [])
  .map((entry) => entry.summaryFile)
  .sort();
assert.deepEqual(actualDuplicates, expectedDuplicates, 'lint 必须报告 reports 内重复的 summaryFile');

console.log('knowledge review integrity ok');
