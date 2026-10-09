const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const input = process.argv[2] ? path.resolve(root, process.argv[2]) : null;
const titleArg = process.argv[3] || '';

if (!input || !fs.existsSync(input)) {
  console.error('Usage: node scripts/render-markdown-page.js <markdown-file> [title]');
  process.exit(1);
}

function esc(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
  })[char]);
}

function inline(value) {
  let text = esc(value);
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return text;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = '';
  let inUl = false;
  let inOl = false;
  let inQuote = false;
  let inTable = false;

  const closeLists = () => {
    if (inUl) {
      html += '</ul>';
      inUl = false;
    }
    if (inOl) {
      html += '</ol>';
      inOl = false;
    }
  };
  const closeQuote = () => {
    if (inQuote) {
      html += '</blockquote>';
      inQuote = false;
    }
  };
  const closeTable = () => {
    if (inTable) {
      html += '</tbody></table>';
      inTable = false;
    }
  };

  for (const line of lines) {
    if (/^\s*$/.test(line)) {
      closeLists();
      closeQuote();
      closeTable();
      continue;
    }
    if (line.trim() === '---') {
      closeLists();
      closeQuote();
      closeTable();
      html += '<hr>';
      continue;
    }
    if (/^\|/.test(line.trim())) {
      closeLists();
      closeQuote();
      const cells = line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
      if (cells.every((cell) => /^:?-{3,}:?$/.test(cell))) continue;
      if (!inTable) {
        html += '<table><tbody>';
        inTable = true;
      }
      html += `<tr>${cells.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`;
      continue;
    }

    closeTable();
    let match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      closeLists();
      closeQuote();
      const level = match[1].length;
      html += `<h${level}>${inline(match[2])}</h${level}>`;
      continue;
    }
    match = line.match(/^>\s?(.*)$/);
    if (match) {
      closeLists();
      if (!inQuote) {
        html += '<blockquote>';
        inQuote = true;
      }
      html += `<p>${inline(match[1])}</p>`;
      continue;
    }
    closeQuote();
    match = line.match(/^[-*]\s+(.+)$/);
    if (match) {
      if (!inUl) {
        closeLists();
        html += '<ul>';
        inUl = true;
      }
      html += `<li>${inline(match[1])}</li>`;
      continue;
    }
    match = line.match(/^\d+[.)]\s+(.+)$/);
    if (match) {
      if (!inOl) {
        closeLists();
        html += '<ol>';
        inOl = true;
      }
      html += `<li>${inline(match[1])}</li>`;
      continue;
    }
    closeLists();
    html += `<p>${inline(line)}</p>`;
  }

  closeLists();
  closeQuote();
  closeTable();
  return html;
}

function titleFrom(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return titleArg || (match ? match[1] : path.basename(input, '.md'));
}

function shareAssetsTags(outputPath) {
  const outputDir = path.dirname(outputPath);
  const assetPrefix = path.relative(outputDir, path.join(root, 'assets')).replace(/\\/g, '/') || '.';
  return [
    `  <link rel="stylesheet" href="${assetPrefix}/report-share.css">`,
    `  <script defer src="${assetPrefix}/report-share.js"></script>`,
  ].join('\n');
}

const markdown = fs.readFileSync(input, 'utf8');
const title = titleFrom(markdown);
const markdownName = path.basename(input);
const sectionLabel = path.basename(path.dirname(input)) === 'monthly' ? '返回月报目录' : '返回周报分区';
const output = input.replace(/\.md$/i, '.html');
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
${shareAssetsTags(output)}
  <style>
    :root{--bg:#0f1117;--surface:#171a24;--surface2:#202434;--border:#31374b;--text:#eef2fb;--text2:#b2bad0;--accent:#7c92ff;--green:#34d399;--orange:#fbbf24}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Noto Sans SC",sans-serif;background:linear-gradient(180deg,rgba(124,146,255,.06),transparent 300px),var(--bg);color:var(--text);line-height:1.78}
    main{max-width:980px;margin:0 auto;padding:28px 24px 70px}
    .toolbar{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}
    .btn{display:inline-flex;align-items:center;padding:8px 14px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);text-decoration:none;font-size:13px;font-weight:700}
    .btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}
    .doc{background:rgba(23,26,36,.92);border:1px solid var(--border);border-radius:16px;padding:28px;box-shadow:0 18px 60px rgba(0,0,0,.18);overflow:hidden}
    .doc:before{content:"";display:block;height:3px;margin:-28px -28px 24px;background:linear-gradient(90deg,var(--accent),var(--green),var(--orange))}
    h1{font-size:clamp(27px,4vw,42px);line-height:1.18;margin-bottom:16px}
    h2{font-size:22px;margin:34px 0 14px;padding-top:18px;border-top:1px solid var(--border)}
    h3{font-size:17px;margin:24px 0 10px;color:var(--green)}
    h4{font-size:15px;margin:18px 0 8px;color:var(--orange)}
    p{margin:10px 0;color:var(--text2);font-size:14px}
    ul,ol{display:grid;gap:8px;margin:12px 0 16px;padding-left:22px}
    li{color:var(--text2);font-size:14px}
    strong{color:var(--text)}
    a{color:var(--green);text-decoration:none;font-weight:700}
    blockquote{margin:16px 0;padding:14px 18px;border-left:4px solid var(--green);background:rgba(52,211,153,.08);border-radius:10px}
    blockquote p{color:var(--text);margin:4px 0}
    hr{border:0;border-top:1px solid var(--border);margin:22px 0}
    table{width:100%;border-collapse:collapse;margin:14px 0 20px;border:1px solid var(--border);border-radius:10px;overflow:hidden}
    td{border:1px solid var(--border);padding:10px 12px;color:var(--text2);font-size:13px;vertical-align:top}
    tr:first-child td{background:var(--surface2);color:var(--text);font-weight:800}
    code{background:var(--surface2);border:1px solid var(--border);border-radius:5px;padding:1px 5px;color:var(--text);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.92em}
    @media(max-width:720px){main{padding:18px 12px 44px}.doc{padding:18px}.doc:before{margin:-18px -18px 20px}table{display:block;overflow-x:auto;white-space:nowrap}}
  </style>
</head>
<body>
  <main>
    <div class="toolbar">
      <a class="btn" href="./index.html">${sectionLabel}</a>
      <a class="btn" href="../../../index.html">返回 OD 情报中心</a>
      <a class="btn primary" href="./${esc(markdownName)}">查看 Markdown</a>
    </div>
    <article class="doc">${markdownToHtml(markdown)}</article>
  </main>
</body>
</html>`;

fs.writeFileSync(output, html);
console.log(`Rendered ${path.relative(root, output)}`);
