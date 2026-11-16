// Renders every page from Firestore (via content.js). Each page declares itself
// with <body data-page="..."> and marks slots with data-render / data-bind.
import { getSite, list, getEntry, esc, fmtDate, fmtMonth, postUrl, projectUrl, renderMarkdown } from './content.js';

const doc = document;
const page = doc.body.dataset.page;
const ARROW = '<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14m-5-5l5 5-5 5"/></svg>';
const OUT = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';

const $ = (sel, root = doc) => root.querySelector(sel);
const $$ = (sel, root = doc) => Array.from(root.querySelectorAll(sel));
const done = (el) => el && el.removeAttribute('aria-busy');

/* ---------- data-bind: fill text/href/copy from loaded data ---------- */
function lookup(ctx, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), ctx);
}
function bind(ctx) {
  $$('[data-bind]').forEach((el) => {
    const v = lookup(ctx, el.dataset.bind);
    if (v != null && v !== '') el.textContent = v;
  });
  $$('[data-bind-href]').forEach((el) => {
    const spec = el.dataset.bindHref;
    const mail = spec.startsWith('mailto:');
    const v = lookup(ctx, mail ? spec.slice(7) : spec);
    if (v) el.setAttribute('href', (mail ? 'mailto:' : '') + v);
  });
  $$('[data-bind-copy]').forEach((el) => {
    const v = lookup(ctx, el.dataset.bindCopy);
    if (v) el.setAttribute('data-copy', v);
  });
}

/* ---------- fragments (mirror the old Jekyll includes) ---------- */
const chips = (items, cls = '') => (items || []).map((s) => `<li class="chip${cls}">${esc(s)}</li>`).join('');

function historyItem(role, { notes, full }) {
  const list = full ? role.notes || [] : (role.notes || []).slice(0, notes);
  const when = `<div class="history__when"><time>${esc(role.start)}</time> – <time>${esc(role.end)}</time>
      <span>${esc(role.location)}</span>${role.current ? '<em class="history__current">current role</em>' : ''}</div>`;
  const stackInline = full && role.stack?.length
    ? `<ul class="chips" role="list" aria-label="Stack" style="margin-top: var(--s-4);">${chips(role.stack)}</ul>` : '';
  const stackCol = !full ? `<ul class="chips history__stack" role="list" aria-label="Stack">${chips(role.stack)}</ul>` : '';
  return `<li class="history__item" data-spec="Role">${when}
    <div><h3 class="history__role">${esc(role.title)}</h3><p class="history__org">${esc(role.company)}</p>
    <ul class="history__notes">${list.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>${stackInline}</div>${stackCol}</li>`;
}

function projectCard(p) {
  const url = projectUrl(p);
  const tags = [...(p.categories || []), ...(p.tags || [])].join('|');
  const summary = String(p.summary || p.description || '').slice(0, 260);
  const modules = p.modules || [];
  const rows = [
    p.project_type && `<tr><th scope="row">type</th><td>${esc(p.project_type)}</td></tr>`,
    modules.length && `<tr><th scope="row">modules</th><td>${modules.length}</td></tr>`,
    p.status && `<tr><th scope="row">status</th><td>${esc(p.status)}</td></tr>`,
    p.date && `<tr><th scope="row">updated</th><td>${esc(fmtMonth(p.modified || p.date))}</td></tr>`
  ].filter(Boolean).join('');
  return `<article class="spec-entry" data-filter-item data-tags="${esc(tags)}">
  <a class="preview" href="${url}" data-spec="ProjectPreview" aria-label="Read the case study: ${esc(p.title)}">
    <div class="preview__bar" aria-hidden="true"><i></i><i></i><i></i><span class="preview__url">${esc(String(p.external_url || url).replace('https://', ''))}</span></div>
    <div class="preview__stage">
      <p class="preview__title">${esc(p.title)}</p>
      ${p.tagline ? `<p class="preview__line">${esc(p.tagline)}</p>` : ''}
      ${modules.length ? `<div class="preview__modules" aria-hidden="true">${modules.slice(0, 4).map((m) => `<div class="preview__module"><span>module</span>${esc(m)}</div>`).join('')}</div>` : ''}
    </div>
  </a>
  <div class="spec-entry__body">
    <h3><a href="${url}" style="text-decoration:none">${esc(p.title)}</a></h3>
    <p>${esc(summary)}</p>
    ${rows ? `<div class="props"><table class="props__table"><tbody>${rows}</tbody></table></div>` : ''}
    <div class="spec-entry__actions">
      ${p.external_url ? `<a class="btn btn--primary" href="${esc(p.external_url)}" rel="noopener">Open live app ${OUT}</a>` : ''}
      ${p.github_url ? `<a class="btn" href="${esc(p.github_url)}" rel="noopener">Source</a>` : ''}
      <a class="btn btn--ghost" href="${url}">Case study</a>
    </div>
  </div>
</article>`;
}

function postItem(p, withDesc) {
  const d = String(p.description || '').trim();
  return `<li class="index__item" data-filter-item data-tags="${esc((p.tags || []).join('|'))}">
  <a class="index__link" href="${postUrl(p)}">
    <time class="index__meta" datetime="${esc(p.date)}">${esc(fmtDate(p.date))}</time>
    <span class="index__title">${esc(p.title)}</span>
    <span class="index__aside" aria-hidden="true">${ARROW}</span>
    ${withDesc && d ? `<span class="index__desc">${esc(d.length > 170 ? d.slice(0, 167) + '…' : d)}</span>` : ''}
  </a>
</li>`;
}

function skillsRows(skills, accent) {
  return (skills || []).map((g, gi) => `<tr><th scope="row">${esc(g.group)}</th><td><ul class="chips" role="list">${
    (g.items || []).map((i, ii) => `<li class="chip${accent && gi === 1 && ii < 2 ? ' chip--accent' : ''}">${esc(i)}</li>`).join('')
  }</ul></td></tr>`).join('');
}

function topicButtons(scope, tags) {
  const host = $('[data-topics]', scope);
  if (!host) return;
  host.insertAdjacentHTML('beforeend', tags.map((t) => `<button type="button" data-filter="${esc(t)}" aria-pressed="false">${esc(t)}</button>`).join(''));
}

function activateFilters(scope) {
  scope.removeAttribute('data-filter-scope-pending');
  scope.setAttribute('data-filter-scope', '');
}

/* ---------- page renderers ---------- */
function renderExperience(xp) {
  $$('[data-render="history"]').forEach((el) => {
    el.innerHTML = (xp.roles || []).map((r) => historyItem(r, { notes: +el.dataset.notes || 3, full: el.dataset.full === 'true' })).join('');
    done(el);
  });
  $$('[data-render="skills"]').forEach((el) => { el.innerHTML = skillsRows(xp.skills, el.dataset.accent === 'true'); });
  $$('[data-render="education"]').forEach((el) => {
    el.innerHTML = (xp.education || []).map((e) => `<li><div class="history__when"><time>${esc(e.start)}</time> – <time>${esc(e.end)}</time></div>
      <div><strong>${esc(e.degree)}</strong><span>${esc(e.school)} · ${esc(e.location)}</span></div></li>`).join('');
  });
  $$('[data-render="certifications"]').forEach((el) => { el.innerHTML = (xp.certifications || []).map((c) => `<li>${esc(c)}</li>`).join(''); });
}

function renderProjects(projects) {
  $$('[data-render="projects"]').forEach((el) => {
    const items = el.dataset.limit ? projects.slice(0, +el.dataset.limit) : projects;
    el.innerHTML = items.length ? items.map(projectCard).join('') : '<p class="empty"><strong>No projects yet</strong>New work is on the way.</p>';
    done(el);
  });
}

function renderPosts(posts) {
  const section = $('[data-render-section="posts"]');
  if (section) section.hidden = posts.length === 0;
  $$('ul[data-render="posts"]').forEach((el) => {
    const items = el.dataset.limit ? posts.slice(0, +el.dataset.limit) : posts;
    el.innerHTML = items.map((p) => postItem(p, !el.dataset.limit)).join('');
  });
  const blog = $('[data-render="blog"]');
  if (blog) {
    const counts = {};
    posts.forEach((p) => (p.tags || []).forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    topicButtons(blog, Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 6));
    if (!posts.length) {
      $('.toolbar', blog).hidden = true;
      $('ul', blog).insertAdjacentHTML('afterend', '<p class="empty"><strong>No posts yet</strong>New writing is on the way.</p>');
    }
    activateFilters(blog);
    done(blog);
  }
}

function renderResources(res) {
  const scope = $('[data-render="resources"]');
  const items = res.items || [];
  topicButtons(scope, [...new Set(items.map((r) => r.tag).filter(Boolean))].sort());
  $('[data-list]', scope).innerHTML = items.map((r) => `<li class="index__item" data-filter-item data-tags="${esc(r.tag)}">
    <a class="index__link" href="${esc(r.link)}" target="_blank" rel="noopener">
      <span class="index__meta">${esc(r.tag)}</span>
      <span class="index__title">${esc(String(r.name || '').trim())}</span>
      <span class="index__aside"><span class="visually-hidden">(opens in a new tab)</span>${OUT}</span>
      <span class="index__desc">${esc(r.desc)}</span>
    </a></li>`).join('');
  activateFilters(scope);
  done(scope);
}

function initContactForm(contact, hero) {
  const form = $('#contact-form');
  if (!form) return;
  const status = $('#contact-status');
  const submit = $('#contact-submit');
  const action = contact.form_action || 'https://formsubmit.co/3be01f802d67aab97ee97e6edd7d30bc';
  const endpoint = action.includes('/ajax/') ? action : action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
  const show = (kind, text) => { status.className = 'status status--' + kind; status.textContent = text; status.hidden = false; };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) return;
    if (!form.checkValidity()) {
      const bad = form.querySelector(':invalid');
      const label = bad && form.querySelector(`label[for="${bad.id}"]`);
      const name = label ? label.firstChild.textContent.trim().toLowerCase() : 'field';
      show('err', bad && bad.type === 'email' && bad.value ? 'That email address looks incomplete. Check it and try again.' : `Please fill in your ${name} so I can reply.`);
      if (bad) bad.focus();
      return;
    }
    submit.disabled = true;
    submit.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…';
    status.hidden = true;
    fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, referrerPolicy: 'strict-origin-when-cross-origin', body: new FormData(form) })
      .then((r) => r.json().catch(() => ({})).then((d) => ({ ok: r.ok, d })))
      .then((res) => {
        const ok = res.d && (res.d.success === true || res.d.success === 'true');
        if (!res.ok || !ok) throw new Error((res.d && res.d.message) || 'Request failed');
        show('ok', contact.success_message || 'Thanks, your message was sent.');
        form.reset();
      })
      .catch((err) => {
        console.error('FormSubmit error:', err);
        show('err', `Your message didn’t send. Try again in a moment, or email ${hero.email || 'pandiyashwanth@gmail.com'} directly.`);
      })
      .finally(() => { submit.disabled = false; submit.textContent = 'Send message'; });
  });
}

/* ---------- entry pages: /posts/YYYY/MM/slug/ and /projects/slug/ ---------- */
function parseEntryPath(path) {
  let m = /^\/posts\/\d{4}\/\d{2}\/([^/]+)\/?$/.exec(path);
  if (m) return { kind: 'posts', slug: decodeURIComponent(m[1]) };
  m = /^\/projects\/([^/]+)\/?$/.exec(path);
  if (m) return { kind: 'projects', slug: decodeURIComponent(m[1]) };
  return null;
}

function setMeta(title, description) {
  doc.title = `${title} - Yashwanth Pandi`;
  if (description) $('meta[name="description"]')?.setAttribute('content', description);
}

function showNotFound() {
  $('[data-entry-loading]').hidden = true;
  $('[data-entry]').hidden = true;
  $('[data-notfound]').hidden = false;
  doc.title = 'Page Not Found - Yashwanth Pandi';
  let robots = $('meta[name="robots"]');
  if (robots) robots.setAttribute('content', 'noindex');
}

async function renderEntry() {
  const route = parseEntryPath(location.pathname);
  if (!route) return showNotFound();
  const entry = await getEntry(route.kind, route.slug);
  if (!entry) return showNotFound();

  const isPost = route.kind === 'posts';
  const art = $('[data-entry]');
  art.setAttribute('itemscope', '');
  art.setAttribute('itemtype', `https://schema.org/${isPost ? 'BlogPosting' : 'CreativeWork'}`);

  const back = $('[data-entry-back]');
  back.href = isPost ? '/blog/' : '/projects/';
  $('span', back).textContent = isPost ? 'All writing' : 'All projects';

  $('[data-entry-title]').textContent = entry.title;
  const desc = entry.description || entry.summary || '';
  if (desc) { const d = $('[data-entry-desc]'); d.textContent = desc; d.hidden = false; }

  const words = String(entry.body || '').split(/\s+/).length;
  const meta = [
    entry.date && `<time class="dt-published" datetime="${esc(entry.date)}" itemprop="datePublished">${esc(fmtDate(entry.date))}</time>`,
    isPost && `<span>${Math.max(1, Math.round(words / 160))} minute read</span>`,
    entry.modified && entry.modified !== entry.date && `<span>Updated ${esc(fmtDate(entry.modified))}</span>`
  ].filter(Boolean).join('');
  $('[data-entry-meta]').innerHTML = meta;

  if (entry.external_url || entry.github_url) {
    const a = $('[data-entry-actions]');
    a.innerHTML = (entry.external_url ? `<a class="btn btn--primary" href="${esc(entry.external_url)}" rel="noopener">Open live app ${OUT}</a>` : '')
      + (entry.github_url ? `<a class="btn" href="${esc(entry.github_url)}" rel="noopener">View source</a>` : '');
    a.hidden = false;
  }

  $('[data-entry-aside]').setAttribute('aria-label', `About this ${isPost ? 'post' : 'project'}`);
  const labels = [...new Set([...(entry.tags || []), ...(entry.categories || [])])].filter((l) => l !== 'posts' && l !== 'Projects');
  if (labels.length) { const box = $('[data-entry-labels]'); $('ul', box).innerHTML = chips(labels); box.hidden = false; }

  const body = $('[data-entry-body]');
  body.setAttribute('itemprop', 'articleBody');
  body.innerHTML = await renderMarkdown(entry.body);

  if (isPost) {
    const posts = await list('posts');
    const i = posts.findIndex((p) => p.slug === entry.slug);
    const older = i > -1 ? posts[i + 1] : null;
    const newer = i > 0 ? posts[i - 1] : null;
    if (older || newer) {
      const pager = $('[data-entry-pager]');
      pager.innerHTML = (older ? `<a href="${postUrl(older)}"><small>Older</small><strong>${esc(older.title)}</strong></a>` : '')
        + (newer ? `<a class="pager__next" href="${postUrl(newer)}"><small>Newer</small><strong>${esc(newer.title)}</strong></a>` : '');
      pager.hidden = false;
    }
  }

  setMeta(entry.title, desc);
  $('[data-entry-loading]').hidden = true;
  art.hidden = false;
  done(art);
}

/* ---------- boot ---------- */
async function main() {
  const wants = {
    hero: true,
    experience: ['home', 'resume'].includes(page),
    contact: page === 'contact',
    resources: page === 'resources',
    projects: ['home', 'projects'].includes(page),
    posts: ['home', 'blog'].includes(page)
  };

  const [hero, experience, contact, resources, projects, posts] = await Promise.all([
    getSite('hero'),
    wants.experience ? getSite('experience') : {},
    wants.contact ? getSite('contact') : {},
    wants.resources ? getSite('resources') : {},
    wants.projects ? list('projects') : [],
    wants.posts ? list('posts') : []
  ]);

  const cur = (experience.roles || [])[0] || {};
  bind({
    hero, experience, contact,
    current: { companyShort: String(cur.company || '').replace(/ Inc$/, ''), titleAtCompany: cur.title ? `${cur.title}, ${cur.company}` : '' }
  });

  if (wants.experience) renderExperience(experience);
  if (wants.projects) renderProjects(projects);
  if (wants.posts) renderPosts(posts);
  if (wants.resources) renderResources(resources);
  if (page === 'contact') initContactForm(contact, hero);
  if (page === 'entry') await renderEntry();

  window.Spec?.refresh();
  window.trackGaPageView?.();
}

main().catch((e) => {
  console.error(e);
  if (page === 'entry') showNotFound();
});
