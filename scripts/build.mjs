#!/usr/bin/env node
// Static build for GitHub Pages. No dependencies (Node 18+).
//
// 1. Stitches src/pages/* into src/layout.html with the shared partials.
// 2. Reads published posts and projects from Firestore (REST API) and writes a
//    page shell for each, so every entry URL returns 200. Entries published
//    after a deploy still work through the 404.html fallback until the next build.
// 3. Writes feed.xml, sitemap.xml, redirects, CNAME and .nojekyll into dist/.
import { readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist');
const SITE = 'https://yashwanth.co.in';
const { firebaseConfig, isConfigured } = await import(join(ROOT, 'assets/js/firebase-config.js'));

let VERSION;
try { VERSION = execSync('git rev-parse --short HEAD', { cwd: ROOT }).toString().trim(); } catch { VERSION = Date.now().toString(36); }

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const read = (p) => readFile(join(ROOT, p), 'utf8');

/* ---------- routes ---------- */
const DEFAULT_DESC = 'Frontend engineer in the Angular ecosystem. Portfolio, projects, writing, and resume of Yashwanth Pandi.';
const ROUTES = [
  { out: 'index.html', src: 'index', page: 'home', nav: 'home', path: '/', title: 'Yashwanth Pandi, Frontend Engineer', bare: true },
  { out: 'projects/index.html', src: 'projects', page: 'projects', nav: 'projects', path: '/projects/', title: 'Projects', description: "Applications I've designed and built from start to finish, each with a live build and a write-up of how it works." },
  { out: 'blog/index.html', src: 'blog', page: 'blog', nav: 'blog', path: '/blog/', title: 'Writing', description: 'Notes on building Angular applications: signals and RxJS, component design, accessibility, performance, and testing.' },
  { out: 'resources/index.html', src: 'resources', page: 'resources', nav: 'resources', path: '/resources/', title: 'Resources', description: 'The documentation and references I use most for Angular and frontend work.' },
  { out: 'resume/index.html', src: 'resume', page: 'resume', nav: 'resume', path: '/resume/', title: 'Resume', description: 'Resume of Yashwanth Pandi, UI / Software Engineer. Download as PDF or Word.' },
  { out: 'contact/index.html', src: 'contact', page: 'contact', nav: 'contact', path: '/contact/', title: 'Contact', description: 'Get in touch with Yashwanth Pandi about frontend and Angular engineering roles.' },
  { out: 'schedule/index.html', src: 'schedule', page: 'schedule', path: '/schedule/', title: 'Book a call', description: 'Book a call with Yashwanth Pandi.' },
  { out: 'privacy-policy/index.html', src: 'privacy-policy', page: 'legal', path: '/privacy-policy/', title: 'Privacy Policy' },
  { out: 'terms/index.html', src: 'terms', page: 'legal', path: '/terms/', title: 'Terms and Privacy Policy' },
  { out: 'admin/index.html', src: 'admin', page: 'admin', path: '/admin/', title: 'Content admin', robots: 'noindex, nofollow', noSitemap: true },
  { out: '404.html', src: 'entry', page: 'entry', path: '/404.html', title: 'Page Not Found', robots: 'noindex', noSitemap: true }
];
// Old Jekyll URLs that should keep working.
const REDIRECTS = { 'about/index.html': '/', 'about.html': '/', 'schedule.html': '/schedule/', 'cms/index.html': '/admin/', 'blog/page2/index.html': '/blog/' };

/* ---------- Firestore (REST, public reads only) ---------- */
function decode(v) {
  if ('stringValue' in v) return v.stringValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('timestampValue' in v) return v.timestampValue.slice(0, 10);
  if ('nullValue' in v) return null;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(decode);
  if ('mapValue' in v) return Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, decode(x)]));
  return null;
}

async function published(collectionId, seed) {
  if (!isConfigured) return { items: seed, source: 'seed (Firebase not configured)' };
  const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents:runQuery?key=${firebaseConfig.apiKey}`;
  const body = { structuredQuery: { from: [{ collectionId }], where: { fieldFilter: { field: { fieldPath: 'published' }, op: 'EQUAL', value: { booleanValue: true } } } } };
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
    const rows = await res.json();
    const items = rows.filter((r) => r.document).map((r) => ({
      slug: decodeURIComponent(r.document.name.split('/').pop()),
      ...Object.fromEntries(Object.entries(r.document.fields || {}).map(([k, v]) => [k, decode(v)]))
    }));
    return { items, source: 'Firestore' };
  } catch (e) {
    return { items: seed, source: `seed (Firestore read failed: ${e.message})` };
  }
}

/* ---------- templating ---------- */
const partials = {};
for (const name of ['head', 'analytics', 'masthead', 'footer', 'closing-call', 'scripts']) partials[name] = await read(`src/partials/${name}.html`);
const layout = await read('src/layout.html');

function includes(html) {
  for (let i = 0; i < 3; i++) html = html.replace(/<!-- @include ([\w-]+) -->/g, (_, n) => partials[n] ?? '');
  return html;
}

function render(route, content, extra = {}) {
  const title = route.bare ? route.title : `${route.title} - Yashwanth Pandi`;
  const vars = {
    title: esc(title), ogTitle: esc(route.title), description: esc(route.description || DEFAULT_DESC),
    canonical: SITE + route.path, robots: route.robots || 'index, follow, max-image-preview:large',
    ogType: route.ogType || 'website', page: route.page, version: VERSION, year: String(new Date().getFullYear()),
    entryTitle: '', ...extra
  };
  let html = includes(layout.replace('{{content}}', content));
  html = html.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
  if (route.nav) html = html.replace(`data-nav="${route.nav}"`, `data-nav="${route.nav}" aria-current="page"`);
  return html;
}

const redirectPage = (to) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting…</title>
<link rel="canonical" href="${SITE}${to}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script></head>
<body><p><a href="${to}">Continue to ${to}</a></p></body></html>`;

async function write(rel, data) {
  const p = join(OUT, rel);
  await mkdir(dirname(p), { recursive: true });
  await writeFile(p, data);
}

function entryPath(kind, e) {
  if (kind === 'projects') return `/projects/${e.slug}/`;
  const m = /^(\d{4})-(\d{2})/.exec(String(e.date || '')) || [null, '2026', '01'];
  return `/posts/${m[1]}/${m[2]}/${e.slug}/`;
}

/* ---------- build ---------- */
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const dir of ['assets', 'images', 'data']) await cp(join(ROOT, dir), join(OUT, dir), { recursive: true });
for (const f of ['CNAME', 'robots.txt']) await cp(join(ROOT, f), join(OUT, f));
await write('.nojekyll', '');

const seed = JSON.parse(await read('data/seed.json'));
const [posts, projects] = await Promise.all([published('posts', seed.posts), published('projects', seed.projects)]);
console.log(`posts: ${posts.items.length} from ${posts.source}`);
console.log(`projects: ${projects.items.length} from ${projects.source}`);

const pages = {};
for (const r of ROUTES) {
  pages[r.src] ??= await read(`src/pages/${r.src}.html`);
  await write(r.out, render(r, pages[r.src]));
}
for (const [from, to] of Object.entries(REDIRECTS)) await write(from, redirectPage(to));

const entryTpl = await read('src/pages/entry.html');
const urls = ROUTES.filter((r) => !r.noSitemap).map((r) => ({ loc: SITE + r.path }));
for (const [kind, set] of [['posts', posts.items], ['projects', projects.items]]) {
  for (const e of set) {
    if (!e.slug || !/^[a-z0-9-]+$/.test(e.slug)) { console.warn(`skipping ${kind} with unsafe slug: ${e.slug}`); continue; }
    const path = entryPath(kind, e);
    const route = { path, page: 'entry', nav: kind === 'posts' ? 'blog' : 'projects', title: e.title, description: e.description || e.summary, ogType: 'article' };
    await write(path.slice(1) + 'index.html', render(route, entryTpl, { entryTitle: esc(e.title) }));
    urls.push({ loc: SITE + path, lastmod: e.modified || e.date });
  }
}

await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${esc(u.lastmod)}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`);

const feedItems = [...posts.items].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 20);
await write('feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Yashwanth Pandi</title>
  <link>${SITE}/blog/</link>
  <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>Notes on building Angular applications.</description>
  <language>en-us</language>
${feedItems.map((p) => `  <item>
    <title>${esc(p.title)}</title>
    <link>${SITE}${entryPath('posts', p)}</link>
    <guid>${SITE}${entryPath('posts', p)}</guid>
    ${p.date ? `<pubDate>${new Date(p.date + 'T12:00:00Z').toUTCString()}</pubDate>` : ''}
    <description>${esc(p.description || '')}</description>
  </item>`).join('\n')}
</channel>
</rss>
`);

console.log(`built ${urls.length} indexable URLs into dist/ (version ${VERSION})`);
