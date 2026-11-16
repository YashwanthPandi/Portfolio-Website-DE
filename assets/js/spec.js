/* Spec-sheet site behaviour. No dependencies. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = doc.querySelector('[data-nav-toggle]');
    var nav = doc.getElementById('site-nav');
    if (!toggle || !nav) return;

    function set(open) {
      nav.setAttribute('data-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('[data-label]').textContent = open ? 'Close' : 'Menu';
    }
    toggle.addEventListener('click', function () {
      set(nav.getAttribute('data-open') !== 'true');
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') { set(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 52.01rem)').addEventListener('change', function (m) { if (m.matches) set(false); });
  }

  /* ---------- Inspect overlay: hover any documented element to see its spec ---------- */
  function initInspector() {
    var toggle = doc.querySelector('[data-inspect-toggle]');
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;

    var enabled = store('yp-inspect') !== 'off';
    var box = doc.createElement('div');
    box.className = 'inspector';
    box.setAttribute('aria-hidden', 'true');
    box.innerHTML = '<div class="inspector__label"><b></b><span></span></div>';
    doc.body.appendChild(box);
    var nameEl = box.querySelector('b');
    var sizeEl = box.querySelector('span');
    var current = null;

    function render() {
      if (!current) return;
      var r = current.getBoundingClientRect();
      box.style.transform = 'translate(' + (r.left + window.scrollX) + 'px,' + (r.top + window.scrollY) + 'px)';
      box.style.width = r.width + 'px';
      box.style.height = r.height + 'px';
      nameEl.textContent = '<' + current.getAttribute('data-spec') + '>';
      sizeEl.textContent = Math.round(r.width) + ' × ' + Math.round(r.height);
      box.setAttribute('data-flip', r.top < 96 ? 'true' : 'false');
    }
    function show(el) {
      if (!enabled || el === current) return;
      current = el;
      render();
      box.setAttribute('data-visible', 'true');
    }
    function hide() {
      current = null;
      box.setAttribute('data-visible', 'false');
    }

    doc.addEventListener('pointerover', function (e) {
      var el = e.target.closest && e.target.closest('[data-spec]');
      if (el) show(el); else if (current) hide();
    });
    doc.addEventListener('pointerleave', hide);
    window.addEventListener('scroll', function () { if (current) render(); }, { passive: true });
    window.addEventListener('resize', function () { if (current) render(); });

    if (toggle) {
      toggle.hidden = false;
      function sync() {
        toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        toggle.querySelector('[data-label]').textContent = enabled ? 'Inspect on' : 'Inspect off';
      }
      sync();
      toggle.addEventListener('click', function () {
        enabled = !enabled;
        store('yp-inspect', enabled ? 'on' : 'off');
        if (!enabled) hide();
        sync();
      });
    }
  }

  /* ---------- Filterable lists (blog, resources, projects) ---------- */
  function initFilters() {
    doc.querySelectorAll('[data-filter-scope]:not([data-bound])').forEach(function (scope) {
      scope.setAttribute('data-bound', '');
      var items = Array.prototype.slice.call(scope.querySelectorAll('[data-filter-item]'));
      var buttons = scope.querySelectorAll('[data-filter]');
      var search = scope.querySelector('[data-filter-search]');
      var count = scope.querySelector('[data-filter-count]');
      var empty = scope.querySelector('[data-filter-empty]');
      var noun = scope.getAttribute('data-filter-noun') || 'items';
      var state = { tag: 'all', q: '' };

      function apply() {
        var shown = 0;
        items.forEach(function (item) {
          var tags = (item.getAttribute('data-tags') || '').toLowerCase().split('|');
          var text = item.textContent.toLowerCase();
          var ok = (state.tag === 'all' || tags.indexOf(state.tag) !== -1) && (!state.q || text.indexOf(state.q) !== -1);
          item.hidden = !ok;
          if (ok) shown++;
        });
        if (count) count.textContent = shown + ' of ' + items.length + ' ' + noun;
        if (empty) empty.hidden = shown !== 0;
      }

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.tag = btn.getAttribute('data-filter').toLowerCase();
          buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
          apply();
        });
      });
      if (search) {
        search.addEventListener('input', function () { state.q = search.value.trim().toLowerCase(); apply(); });
      }
      var reset = scope.querySelector('[data-filter-reset]');
      if (reset) {
        reset.addEventListener('click', function () {
          state = { tag: 'all', q: '' };
          if (search) search.value = '';
          buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-filter') === 'all' ? 'true' : 'false'); });
          apply();
        });
      }
      apply();
    });
  }

  /* ---------- Dropdown (resume download) ---------- */
  function initDropdowns() {
    doc.querySelectorAll('[data-dropdown]:not([data-bound])').forEach(function (wrap) {
      wrap.setAttribute('data-bound', '');
      var btn = wrap.querySelector('button');
      var links = wrap.querySelectorAll('a');
      function set(open) {
        wrap.setAttribute('data-open', open ? 'true' : 'false');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = wrap.getAttribute('data-open') !== 'true';
        set(open);
        if (open && links[0]) links[0].focus();
      });
      wrap.addEventListener('keydown', function (e) {
        var i = Array.prototype.indexOf.call(links, doc.activeElement);
        if (e.key === 'Escape') { set(false); btn.focus(); }
        if (e.key === 'ArrowDown' && i > -1) { e.preventDefault(); links[(i + 1) % links.length].focus(); }
        if (e.key === 'ArrowUp' && i > -1) { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
      });
      links.forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
      doc.addEventListener('click', function (e) { if (!wrap.contains(e.target)) set(false); });
    });
  }

  /* ---------- Copy to clipboard ---------- */
  function initCopy() {
    doc.querySelectorAll('[data-copy]:not([data-bound])').forEach(function (btn) {
      btn.setAttribute('data-bound', '');
      var label = btn.querySelector('[data-label]') || btn;
      var original = label.textContent;
      btn.addEventListener('click', function () {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
          btn.setAttribute('data-state', 'copied');
          label.textContent = 'Copied';
          setTimeout(function () { btn.removeAttribute('data-state'); label.textContent = original; }, 2200);
        });
      });
    });
  }

  /* ---------- Table of contents for long posts ---------- */
  function initToc() {
    var toc = doc.querySelector('[data-toc]');
    var prose = doc.querySelector('.prose');
    if (!toc || !prose) return;
    toc.textContent = '';
    var tocWrap = toc.closest('[data-toc-wrap]');
    if (tocWrap) tocWrap.hidden = false;
    var heads = prose.querySelectorAll('h2[id], h3[id]');
    if (heads.length < 3) { if (tocWrap) tocWrap.hidden = true; return; }
    var links = {};
    heads.forEach(function (h) {
      var li = doc.createElement('li');
      li.className = h.tagName === 'H3' ? 'toc--h3' : '';
      var a = doc.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      toc.appendChild(li);
      links[h.id] = a;
    });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
          links[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-15% 0px -75% 0px' });
    heads.forEach(function (h) { io.observe(h); });
  }

  /* ---------- Mermaid diagrams: loaded only on pages that have them ---------- */
  function initMermaid() {
    var blocks = doc.querySelectorAll('code.language-mermaid');
    if (!blocks.length) return;
    blocks.forEach(function (code) {
      var host = code.closest('div.highlighter-rouge, pre') || code;
      var div = doc.createElement('div');
      div.className = 'mermaid-diagram';
      div.textContent = code.textContent;
      host.replaceWith(div);
    });
    import('https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs').then(function (m) {
      var mermaid = m.default;
      mermaid.initialize({
        startOnLoad: false, theme: 'base', fontFamily: 'Schibsted Grotesk, sans-serif',
        themeVariables: { primaryColor: '#eef1fe', primaryBorderColor: '#2a52f5', primaryTextColor: '#101217', lineColor: '#626a78', fontSize: '15px' }
      });
      mermaid.run({ nodes: doc.querySelectorAll('.mermaid-diagram') });
    }).catch(function () {
      doc.querySelectorAll('.mermaid-diagram').forEach(function (d) { d.classList.add('mermaid-diagram--failed'); });
    });
  }

  function ready(fn) { if (doc.readyState !== 'loading') fn(); else doc.addEventListener('DOMContentLoaded', fn); }
  // Content pages render from Firestore after load, then call Spec.refresh().
  function refresh() {
    initFilters();
    initDropdowns();
    initCopy();
    initToc();
    initMermaid();
  }
  window.Spec = { refresh: refresh };

  ready(function () {
    initNav();
    initInspector();
    refresh();
  });
})();
