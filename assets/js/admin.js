// /admin/ editor: Google sign-in, then CRUD on Firestore posts, projects and site docs.
import { firebaseConfig, ADMIN_EMAILS } from './firebase-config.js';
import { esc, fmtDate, postUrl, projectUrl, slugify, renderMarkdown } from './content.js';

const SDK = 'https://www.gstatic.com/firebasejs/10.12.2';
const [{ initializeApp, getApps, getApp }, auth, fs, st] = await Promise.all([
  import(`${SDK}/firebase-app.js`),
  import(`${SDK}/firebase-auth.js`),
  import(`${SDK}/firebase-firestore-lite.js`),
  import(`${SDK}/firebase-storage.js`)
]);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const a = auth.getAuth(app);
const db = fs.getFirestore(app);
const storage = st.getStorage(app);

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const statusEl = $('#admin-status');
function say(kind, text) { statusEl.className = 'status status--' + kind; statusEl.textContent = text; statusEl.hidden = false; }
function hush() { statusEl.hidden = true; }

let kind = 'posts';       // 'posts' | 'projects'
let entries = [];
let current = null;       // entry being edited (original slug kept in current.__slug)
let dirty = false;

/* ---------- auth ---------- */
$('#sign-in').addEventListener('click', () => {
  auth.signInWithPopup(a, new auth.GoogleAuthProvider()).catch((e) => say('err', `Sign-in failed: ${e.message}`));
});
$('#sign-out').addEventListener('click', () => auth.signOut(a));

auth.onAuthStateChanged(a, async (user) => {
  const ok = user && user.emailVerified && ADMIN_EMAILS.includes(user.email);
  if (user && !ok) {
    await auth.signOut(a);
    say('err', `${user.email} isn't allowed to edit this site.`);
  }
  $('[data-view="signed-out"]').hidden = !!ok;
  $('[data-view="signed-in"]').hidden = !ok;
  if (ok) {
    hush();
    $('#who').textContent = user.email;
    showTab('posts');
  }
});

/* ---------- tabs ---------- */
$$('[data-tab]').forEach((b) => b.addEventListener('click', () => {
  if (dirty && !confirm('You have unsaved changes. Leave without saving?')) return;
  showTab(b.dataset.tab);
}));

function showTab(tab) {
  dirty = false;
  $$('[data-tab]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.tab === tab ? 'true' : 'false'));
  $('[data-panel="entries"]').hidden = !(tab === 'posts' || tab === 'projects');
  $('[data-panel="site"]').hidden = tab !== 'site';
  $('[data-panel="setup"]').hidden = tab !== 'setup';
  hush();
  if (tab === 'posts' || tab === 'projects') {
    kind = tab;
    $('#new-entry').textContent = tab === 'posts' ? 'New post' : 'New project';
    $('#entry-form').hidden = true;
    loadEntries();
  }
  if (tab === 'site') loadSite();
}

/* ---------- entries ---------- */
async function loadEntries() {
  const list = $('#entry-list');
  list.innerHTML = '<li class="muted">Loading…</li>';
  try {
    const snap = await fs.getDocs(fs.query(fs.collection(db, kind), fs.orderBy('date', 'desc')));
    entries = snap.docs.map((d) => ({ slug: d.id, ...d.data() }));
  } catch (e) {
    list.innerHTML = '';
    return say('err', `Couldn't load ${kind}: ${e.message}`);
  }
  list.innerHTML = entries.length ? entries.map((e) => `<li class="index__item"><button type="button" class="index__link admin__item" data-slug="${esc(e.slug)}">
      <span class="index__meta">${esc(fmtDate(e.date))}${e.published ? '' : ' · draft'}</span>
      <span class="index__title">${esc(e.title || e.slug)}</span></button></li>`).join('')
    : `<li class="muted">No ${kind} yet.</li>`;
  $$('.admin__item').forEach((b) => b.addEventListener('click', () => {
    if (dirty && !confirm('You have unsaved changes. Discard them?')) return;
    edit(entries.find((x) => x.slug === b.dataset.slug));
  }));
}

const form = $('#entry-form');
const F = (n) => form.elements[n];
const csv = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
const today = () => new Date().toISOString().slice(0, 10);

$('#new-entry').addEventListener('click', () => {
  if (dirty && !confirm('You have unsaved changes. Discard them?')) return;
  edit({ title: '', slug: '', date: today(), published: false, body: '', tags: [] }, true);
});

function edit(entry, isNew = false) {
  current = { ...entry, __slug: isNew ? null : entry.slug };
  slugTouched = false;
  form.hidden = false;
  $('[data-project-only]').hidden = kind !== 'projects';
  for (const n of ['title', 'slug', 'date', 'description', 'body', 'tagline', 'summary', 'project_type', 'status', 'modified', 'external_url', 'github_url']) {
    if (F(n)) F(n).value = entry[n] || '';
  }
  F('tags').value = (entry.tags || []).join(', ');
  F('modules').value = (entry.modules || []).join(', ');
  F('published').checked = !!entry.published;
  $('#delete-entry').hidden = isNew;
  updateView();
  setPreview(false);
  dirty = false;
  F('title').focus();
}

let slugTouched = false;
F('slug').addEventListener('input', () => { slugTouched = true; });
F('title').addEventListener('input', () => {
  if (!current.__slug && !slugTouched) F('slug').value = slugify(F('title').value);
});
form.addEventListener('input', () => { dirty = true; });

function updateView() {
  const v = $('#view-entry');
  if (current.__slug && current.published) {
    v.href = kind === 'posts' ? postUrl(current) : projectUrl(current);
    v.hidden = false;
  } else v.hidden = true;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    const bad = form.querySelector(':invalid');
    bad?.focus();
    return say('err', bad?.name === 'slug' ? 'Slug can only use lowercase letters, numbers, and hyphens.' : 'Fill in the title, slug, and date.');
  }
  const slug = F('slug').value.trim();
  const data = {
    title: F('title').value.trim(),
    date: F('date').value,
    description: F('description').value.trim(),
    tags: csv(F('tags').value),
    body: F('body').value,
    published: F('published').checked,
    updated_at: new Date().toISOString()
  };
  if (kind === 'projects') {
    Object.assign(data, {
      tagline: F('tagline').value.trim(), summary: F('summary').value.trim(), project_type: F('project_type').value.trim(),
      status: F('status').value.trim(), modified: F('modified').value, modules: csv(F('modules').value),
      external_url: F('external_url').value.trim(), github_url: F('github_url').value.trim(), categories: current.categories || []
    });
  }
  const btn = $('#save-entry');
  btn.disabled = true;
  try {
    const exists = (await fs.getDoc(fs.doc(db, kind, slug))).exists();
    if (exists && slug !== current.__slug) throw new Error(`Another ${kind === 'posts' ? 'post' : 'project'} already uses the slug "${slug}".`);
    await fs.setDoc(fs.doc(db, kind, slug), data);
    if (current.__slug && current.__slug !== slug) await fs.deleteDoc(fs.doc(db, kind, current.__slug));
    current = { ...data, slug, __slug: slug };
    dirty = false;
    slugTouched = false;
    updateView();
    $('#delete-entry').hidden = false;
    say('ok', data.published ? 'Saved and live. New URLs work right away; the next deploy also adds them to the sitemap and RSS feed.' : 'Saved as a draft.');
    loadEntries();
  } catch (err) {
    say('err', `Save failed: ${err.message}`);
  } finally { btn.disabled = false; }
});

$('#delete-entry').addEventListener('click', async () => {
  if (!current?.__slug || !confirm(`Delete "${current.title}"? This can't be undone.`)) return;
  try {
    await fs.deleteDoc(fs.doc(db, kind, current.__slug));
    form.hidden = true;
    dirty = false;
    say('ok', 'Deleted.');
    loadEntries();
  } catch (err) { say('err', `Delete failed: ${err.message}`); }
});

/* ---------- markdown preview + image upload ---------- */
function setPreview(on) {
  $('#toggle-preview').setAttribute('aria-pressed', on ? 'true' : 'false');
  $('#toggle-preview').textContent = on ? 'Edit' : 'Preview';
  $('#preview').hidden = !on;
  F('body').hidden = on;
}
$('#toggle-preview').addEventListener('click', async () => {
  const on = $('#preview').hidden;
  if (on) $('#preview').innerHTML = await renderMarkdown(F('body').value);
  setPreview(on);
});

$('#f-image').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) return say('err', 'Images must be under 10 MB.');
  say('ok', `Uploading ${file.name}…`);
  try {
    const name = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ''))}.${(file.name.split('.').pop() || 'png').toLowerCase()}`;
    const ref = st.ref(storage, `uploads/${today().slice(0, 7)}/${name}`);
    await st.uploadBytes(ref, file, { contentType: file.type });
    const url = await st.getDownloadURL(ref);
    const ta = F('body');
    const md = `![${file.name.replace(/\.[^.]+$/, '')}](${url})`;
    ta.setRangeText(md, ta.selectionStart, ta.selectionEnd, 'end');
    dirty = true;
    say('ok', 'Image uploaded and inserted.');
  } catch (err) { say('err', `Upload failed: ${err.message}`); }
});

/* ---------- page data (site/*) ---------- */
const SITE_DOCS = [
  ['hero', 'Profile and links', 'Email, LinkedIn, GitHub, location, and the open-to-work line.'],
  ['experience', 'Experience and resume', 'Roles, skills, education, certifications, phone, and the resume PDF/Word links.'],
  ['resources', 'Resources', 'The list on /resources/. Each item has name, desc, link, and tag.'],
  ['contact', 'Contact form', 'Intro text, FormSubmit endpoint, and success message.']
];

async function loadSite() {
  const host = $('#site-forms');
  host.innerHTML = '<p class="muted">Loading…</p>';
  const seed = await fetch('/data/seed.json').then((r) => r.json());
  const docs = await Promise.all(SITE_DOCS.map(([id]) => fs.getDoc(fs.doc(db, 'site', id)).catch(() => null)));
  host.innerHTML = SITE_DOCS.map(([id, label, hint], i) => {
    const snap = docs[i];
    const live = snap && snap.exists();
    const value = live ? snap.data() : seed.site[id] || {};
    return `<form class="form admin__site" data-site="${id}">
      <div class="field"><label for="site-${id}">${esc(label)} <span class="field__hint">· ${esc(hint)}${live ? '' : ' Not in Firestore yet, showing starter values.'}</span></label>
      <textarea class="field-input admin__json" id="site-${id}" rows="${id === 'experience' ? 24 : 10}" spellcheck="false">${esc(JSON.stringify(value, null, 2))}</textarea></div>
      <div class="form__actions"><button class="btn btn--primary btn--sm" type="submit">Save ${esc(label.toLowerCase())}</button></div>
    </form>`;
  }).join('');
  $$('[data-site]').forEach((f) => f.addEventListener('submit', async (e) => {
    e.preventDefault();
    let data;
    try { data = JSON.parse(f.querySelector('textarea').value); } catch (err) { return say('err', `That JSON doesn't parse: ${err.message}`); }
    try { await fs.setDoc(fs.doc(db, 'site', f.dataset.site), data); say('ok', 'Saved. The site shows it on the next page load.'); }
    catch (err) { say('err', `Save failed: ${err.message}`); }
  }));
}

/* ---------- setup: import data/seed.json ---------- */
$('#import-seed').addEventListener('click', async () => {
  const overwrite = $('#overwrite').checked;
  const btn = $('#import-seed');
  btn.disabled = true;
  try {
    const seed = await fetch('/data/seed.json').then((r) => r.json());
    const jobs = [
      ...Object.entries(seed.site).map(([id, data]) => ['site', id, data]),
      ...seed.projects.map(({ slug, ...data }) => ['projects', slug, data]),
      ...seed.posts.map(({ slug, ...data }) => ['posts', slug, data])
    ];
    let wrote = 0, skipped = 0;
    for (const [col, id, data] of jobs) {
      const ref = fs.doc(db, col, id);
      if (!overwrite && (await fs.getDoc(ref)).exists()) { skipped++; continue; }
      await fs.setDoc(ref, data);
      wrote++;
    }
    say('ok', `Imported ${wrote} document${wrote === 1 ? '' : 's'}${skipped ? `, skipped ${skipped} that already existed` : ''}.`);
  } catch (err) { say('err', `Import failed: ${err.message}`); }
  finally { btn.disabled = false; }
});

window.addEventListener('beforeunload', (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
