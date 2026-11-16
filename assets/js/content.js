// Content layer: reads Firestore, falls back to /data/seed.json when Firebase is
// not configured yet or cannot be reached, so the site never renders blank.
import { firebaseConfig, isConfigured } from './firebase-config.js';

const SDK = 'https://www.gstatic.com/firebasejs/10.12.2';
const TIMEOUT_MS = 6000;

let dbPromise;
export function getDb() {
  if (!isConfigured) return Promise.resolve(null);
  if (!dbPromise) {
    dbPromise = Promise.all([
      import(`${SDK}/firebase-app.js`),
      import(`${SDK}/firebase-firestore-lite.js`)
    ]).then(([app, fs]) => {
      const a = app.getApps().length ? app.getApp() : app.initializeApp(firebaseConfig);
      return { db: fs.getFirestore(a), fs };
    }).catch((e) => { console.warn('Firebase unavailable, using seed data.', e); return null; });
  }
  return dbPromise;
}

let seedPromise;
function seed() {
  if (!seedPromise) seedPromise = fetch('/data/seed.json').then((r) => r.json()).catch(() => ({ site: {}, posts: [], projects: [] }));
  return seedPromise;
}

function withTimeout(p) {
  return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('Firestore timeout')), TIMEOUT_MS))]);
}

/** site/{name}: hero, experience, resources, contact. Missing docs fall back to seed. */
export async function getSite(name) {
  const conn = await getDb();
  if (conn) {
    try {
      const snap = await withTimeout(conn.fs.getDoc(conn.fs.doc(conn.db, 'site', name)));
      if (snap.exists()) return snap.data();
    } catch (e) { console.warn(`site/${name}: using seed data.`, e.message); }
  }
  return (await seed()).site[name] || {};
}

/** Published posts or projects, newest first. */
export async function list(kind) {
  const conn = await getDb();
  if (conn) {
    try {
      const { fs, db } = conn;
      // Sorted here rather than with orderBy, so no composite index is needed.
      const q = fs.query(fs.collection(db, kind), fs.where('published', '==', true));
      const snap = await withTimeout(fs.getDocs(q));
      return snap.docs.map((d) => ({ slug: d.id, ...d.data() })).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    } catch (e) { console.warn(`${kind}: using seed data.`, e.message); }
  }
  const items = ((await seed())[kind] || []).filter((x) => x.published !== false);
  return items.sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export async function getEntry(kind, slug) {
  const conn = await getDb();
  if (conn) {
    try {
      const snap = await withTimeout(conn.fs.getDoc(conn.fs.doc(conn.db, kind, slug)));
      if (snap.exists()) return { slug, ...snap.data() };
      return null;
    } catch (e) { console.warn(`${kind}/${slug}: using seed data.`, e.message); }
  }
  return ((await seed())[kind] || []).find((x) => x.slug === slug && x.published !== false) || null;
}

/* ---------- helpers ---------- */
export function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function parts(d) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(d || ''));
  return m ? { y: m[1], m: m[2], d: m[3] } : null;
}
export function fmtDate(d) { const p = parts(d); return p ? `${MONTHS[+p.m - 1]} ${+p.d}, ${p.y}` : ''; }
export function fmtMonth(d) { const p = parts(d); return p ? `${MONTHS[+p.m - 1]} ${p.y}` : ''; }

export function postUrl(p) {
  const d = parts(p.date) || { y: '2026', m: '01' };
  return `/posts/${d.y}/${d.m}/${p.slug}/`;
}
export function projectUrl(p) { return `/projects/${p.slug}/`; }

export function slugify(s) {
  return String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

let mdPromise;
function mdLibs() {
  if (!mdPromise) {
    mdPromise = Promise.all([
      import('https://cdn.jsdelivr.net/npm/marked@12.0.2/lib/marked.esm.js'),
      import('https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.es.mjs')
    ]).then(([m, p]) => ({ marked: m.marked, purify: p.default }));
  }
  return mdPromise;
}

/** Markdown → sanitized HTML, with ids on headings for the table of contents. */
export async function renderMarkdown(md) {
  const { marked, purify } = await mdLibs();
  const html = purify.sanitize(marked.parse(String(md || ''), { gfm: true }));
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  const used = {};
  tpl.content.querySelectorAll('h1, h2, h3, h4').forEach((h) => {
    let id = slugify(h.textContent) || 'section';
    if (used[id]) id += '-' + (++used[id]); else used[id] = 1;
    h.id = id;
  });
  tpl.content.querySelectorAll('a[href^="http"]').forEach((a) => {
    if (!a.href.startsWith(location.origin)) a.rel = 'noopener';
  });
  return tpl.innerHTML;
}
