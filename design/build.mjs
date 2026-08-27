// Build chapter pages (scrollable HTML; paged PDF with --pdf) from chapter markdown, plus an index, into docs/ (served by GitHub Pages).
// usage: node design/build.mjs [--pdf] [--settings design/settings.json] [chapters/chapter-NN-*.md ...]
// with no chapter args, builds every chapter-*.md in chapters/.
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', 'chapters');
const outDir = resolve(here, '..', 'docs');
mkdirSync(outDir, { recursive: true });
const args = process.argv.slice(2);
const wantPdf = args.includes('--pdf');
const si = args.indexOf('--settings');
const settingsPath = si >= 0 ? resolve(args[si + 1]) : resolve(here, 'settings.json');
const requested = args.filter(a => a.endsWith('.md')).map(f => resolve(f));

const template = readFileSync(resolve(here, 'template.html'), 'utf8');
const settings = existsSync(settingsPath) ? readFileSync(settingsPath, 'utf8').trim() : '{}';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function readMeta(md) {
  const lines = readFileSync(md, 'utf8').split('\n');
  const h1 = lines.find(l => /^# /.test(l)) || '';
  const m = h1.match(/^#\s*Chapter\s+(\d+)\s*[—–-]\s*(.+)$/);
  const num = m ? m[1].padStart(2, '0') : '00';
  const title = m ? m[2].trim() : h1.replace(/^#\s*/, '').trim();
  const h2i = lines.findIndex(l => /^## /.test(l));
  const sub = h2i >= 0 ? lines[h2i].replace(/^##\s*/, '').trim() : '';
  let lede = '';
  for (let k = h2i + 1; k < lines.length; k++) {
    const l = lines[k].trim();
    if (l && !l.startsWith('#') && !l.startsWith('*') && !l.startsWith('---')) { lede = l; break; }
  }
  // the direct test: first paragraph under "## The direct test", stripped of markdown emphasis
  let direct = '';
  const di = lines.findIndex(l => /^## the direct test$/i.test(l.trim()));
  if (di >= 0) {
    for (let k = di + 1; k < lines.length; k++) {
      const l = lines[k].trim();
      if (l.startsWith('#')) break;
      if (l) { direct = l.replace(/[*_`]/g, ''); break; }
    }
  }
  return { num, title, sub, lede, direct, src: md };
}

const all = readdirSync(root).filter(f => /^chapter-.*\.md$/.test(f))
  .map(f => readMeta(resolve(root, f)))
  .sort((a, b) => a.num.localeCompare(b.num));
all.forEach(c => { c.out = `chapter-${c.num}-${slug(c.title)}`; });
const selected = requested.length ? all.filter(c => requested.includes(c.src)) : all;

for (const c of selected) {
  const idx = all.indexOf(c);
  const link = x => x ? { href: x.out + '.html', num: x.num, title: x.title } : null;
  const nav = { index: 'index.html', prev: link(all[idx - 1]), next: link(all[idx + 1]) };
  const raw = execFileSync('pandoc', [c.src, '-f', 'markdown+hard_line_breaks', '-t', 'html', '--wrap=none', '--syntax-highlighting=none'], { encoding: 'utf8' });
  // inline the chapter's diagrams: the k-th [DIAGRAM: …] marker takes design/diagrams/NN.svg (NN-k.svg for k > 1);
  // a marker with no file keeps the placeholder box.
  let k = 0;
  const body = raw.replace(/<p>\[DIAGRAM:([\s\S]*?)\]<\/p>/g, (m, cap) => {
    k++;
    const f = resolve(here, 'diagrams', `${c.num}${k > 1 ? '-' + k : ''}.svg`);
    if (!existsSync(f)) return m;
    const label = cap.replace(/<[^>]+>/g, '').replace(/["\n]+/g, ' ').trim();
    const svg = readFileSync(f, 'utf8').trim().replace(/^<svg /, `<svg aria-label="${label}" `);
    return `<figure class="diagram-fig">${svg}</figure>`;
  });
  const html = template
    .replace('<!--TITLE-->', () => `${c.num} · ${c.title}`)
    .replace('<!--SETTINGS-->', () => settings)
    .replace('<!--NAV-->', () => JSON.stringify(nav))
    .replace('<!--CONTENT-->', () => body);
  const outHtml = resolve(outDir, c.out + '.html');
  writeFileSync(outHtml, html);
  let line = `${c.out}.html`;
  if (wantPdf) {
    const outPdf = resolve(outDir, c.out + '.pdf');
    const r = spawnSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=20000',
      `--print-to-pdf=${outPdf}`, 'file://' + outHtml + '?build=1'], { encoding: 'utf8' });
    if (r.error || r.status !== 0) { console.error(`chrome failed for ${c.out}: status=${r.status} ${r.error || ''}\n${r.stderr}`); process.exitCode = 1; }
    else line += `  ->  ${c.out}.pdf`;
  }
  console.log(line);
}

// ---------- index ----------
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// the authorization lab manual, linked from chapter 6's footer
{ const manual = resolve(here, '..', 'reference', 'authorization-lab-manual.pdf'); if (existsSync(manual)) writeFileSync(resolve(outDir, 'authorization-lab-manual.pdf'), readFileSync(manual)); }
let bodyFont = 'Petrona';
try { bodyFont = JSON.parse(settings).fontBody || bodyFont; } catch {}
const cards = all.map(c => {
  const pdf = existsSync(resolve(outDir, c.out + '.pdf')) ? `<a class="pdf" href="${c.out}.pdf">PDF</a>` : '';
  const direct = c.direct ? `<span class="d"><span class="dk">Direct test</span>${esc(c.direct)}</span>` : '';
  return `<div class="card"><a class="main" href="${c.out}.html"><span class="num">${c.num}</span><span class="t">${esc(c.title)}</span><span class="s">${esc(c.sub)}</span><span class="l">${esc(c.lede)}</span>${direct}</a><div class="links"><a href="${c.out}.html">Read</a>${pdf}</div></div>`;
}).join('\n');
const index = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Building with AI</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&family=${encodeURIComponent(bodyFont).replace(/%20/g, '+')}:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
<style>
:root{--paper:#FBFAF7;--ink:#1E2226;--accent:#2E6F73;--accent2:#A0522D;--muted:#6B7075;--rule:#D9D6CF;--tint:color-mix(in srgb,var(--accent) 7%,var(--paper))}
:root[data-theme=dark]{--paper:#14181C;--ink:#E8E6E1;--accent:#6FC3C9;--accent2:#E0A070;--muted:#9AA0A6;--rule:#2C3238}
.themetoggle{position:fixed;top:1rem;right:1.2rem;z-index:5;font-family:Poppins,system-ui,sans-serif;font-size:.72rem;letter-spacing:.06em;color:var(--accent);background:var(--paper);border:1px solid var(--rule);border-radius:999px;padding:.4em .9em;cursor:pointer;line-height:1.4}
.themetoggle:hover{border-color:var(--accent)}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font:20px/1.5 "${bodyFont}","Charis SIL",Georgia,serif;-webkit-font-smoothing:antialiased}
main{max-width:1180px;margin:0 auto;padding:4rem 2.5rem 6rem}
.series{font-family:Poppins,system-ui,sans-serif;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);font-weight:500}
h1{font-family:Poppins,system-ui,sans-serif;font-weight:500;font-size:3rem;letter-spacing:-.01em;margin:.4rem 0 .6rem;line-height:1.1}
.intro{max-width:44rem;color:var(--muted);margin:0 0 3rem;font-size:1.05rem}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.4rem}
.card{display:flex;flex-direction:column;background:var(--tint);border-radius:8px;padding:1.4rem 1.5rem 1.1rem;transition:transform .12s}
.card:hover{transform:translateY(-2px)}
.card .main{display:block;text-decoration:none;color:inherit;flex:1}
.card .num{display:block;font-family:Poppins,system-ui,sans-serif;font-weight:300;font-size:2.4rem;color:var(--accent);line-height:1;margin-bottom:.5rem}
.card .t{display:block;font-family:Poppins,system-ui,sans-serif;font-weight:500;font-size:1.3rem;line-height:1.2;margin-bottom:.35rem}
.card .s{display:block;font-style:italic;color:var(--muted);margin-bottom:.8rem;line-height:1.35}
.card .l{display:block;font-size:.9rem;line-height:1.45;color:var(--ink);display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.card .d{display:block;margin-top:.9rem;padding-top:.7rem;border-top:1px dashed var(--rule);font-size:.86rem;line-height:1.45;color:var(--ink)}
.card .dk{display:block;font-family:Poppins,system-ui,sans-serif;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);font-weight:500;margin-bottom:.25rem}
.order{max-width:44rem;color:var(--muted);margin:-2rem 0 3rem;font-size:.95rem}
.order b{color:var(--ink);font-weight:500}
.links{margin-top:1rem;padding-top:.7rem;border-top:1px solid var(--rule);font-family:Poppins,system-ui,sans-serif;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;display:flex;gap:1.2rem}
.links a{color:var(--muted);text-decoration:none}.links a:hover{color:var(--accent)}
</style>
<script>
(function(){let t='light';try{t=localStorage.getItem('pf-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(e){}
document.documentElement.dataset.theme=t;
window.__toggleTheme=function(){t=t==='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('pf-theme',t);}catch(e){}
  const b=document.getElementById('themetoggle');if(b)b.textContent=t==='dark'?'Light mode':'Dark mode';};
addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('themetoggle');if(b)b.textContent=t==='dark'?'Light mode':'Dark mode';});})();
</script>
</head><body>
<button id="themetoggle" class="themetoggle" type="button" onclick="__toggleTheme()">Dark mode</button>
<main>
<div class="series">Building with AI</div>
<h1>Building with AI</h1>
<p class="intro">This is a self-guided course on the mental models behind software you build with an AI assistant — Claude Code, Cursor, and the like; "your assistant" from here on. Twelve chapters each teach one of them, describe what usually goes wrong when the assistant writes that part, and give you prompts for investigating a project of your own — there's nothing to build, and you can read it all before you have one. Each card below carries the chapter's direct test, the one check that settles most of that area at once, so this page works as the map.</p>
<p class="order"><b>Reading order.</b> Chapter 0 is ten minutes on how the course is used and the prompts the others assume; read it, then chapter 1. If you're already shipping and something has worried you, read chapter 6 next. Leave chapter 12 until you've run one of the prompts — it decides how much checking a change deserves, and that lands better with a result in hand.</p>
<div class="grid">
${cards}
</div>
</main></body></html>
`;
writeFileSync(resolve(outDir, 'index.html'), index);
console.log('index.html');
