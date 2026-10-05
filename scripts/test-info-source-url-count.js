const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, 'audit-info-library.js'), 'utf8');
const context = vm.createContext({ require, __dirname, process, console });
vm.runInContext(source.replace(/\nmain\(\);\s*$/, ''), context);
const markdown = [
  '## 2026-09-07',
  '### [A] Two sources',
  '- **来源**：[first](https://example.org/one)；[second](https://example.org/two)',
  '### [B] Repeated source',
  '- **来源**：[same](https://example.org/one)',
  '### [C] Missing source',
  '- **信息类型**：新增事实',
  '### [D] Gap record without external URL',
  '- **来源**：本轮信息库采编记录',
  '- **信息类型**：缺口记录',
].join('\n');
context.markdown = markdown;
const result = vm.runInContext('analyzeDay(parseDigest(markdown)[0], markdown)', context);
assert.equal(result.cardCount, 4);
assert.equal(result.sourceUrlCount, 2);
assert.equal(result.sourceUrlMissingCount, 1);
assert.deepEqual(Array.from(result.sourceUrlMissingItemIds), ['C']);
console.log('Source URL count: multiple links, deduplication, gap-record exclusion and missing-source tests passed.');
