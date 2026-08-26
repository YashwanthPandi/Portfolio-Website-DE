---
permalink: "/"
page: "resume.html"
author_profile: false
redirect_from:
- "/about/"
- "/about.html"
---
<style>
  /* 1. Prevent horizontal scroll */
  html, body {
    overflow-x: hidden !important;
    height: auto;
    width: 100%;
  }

  /* 2. Strip top/bottom spacing added by Minimal Mistakes layout containers */
  #main, .page, .page__inner-wrap, .page__content, .initial-content {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    position: relative;
    z-index: auto;
  }

  footer {
    position: relative;
    z-index: 10;
    clear: both;
  }

  .edge-to-edge-hero {
    --hero-bg:
      radial-gradient(60% 70% at 70% 30%, rgba(37, 99, 235, 0.35) 0%, rgba(37, 99, 235, 0) 70%),
      linear-gradient(135deg, #081324 0%, #0b1d38 50%, #0a1a31 100%);
    --hero-bg-overlay:
      radial-gradient(80% 60% at 78% 48%, rgba(56, 189, 248, 0.14) 0%, rgba(56, 189, 248, 0) 74%),
      linear-gradient(to top, rgba(8, 14, 28, 0.76) 0%, rgba(8, 14, 28, 0.1) 35%, rgba(8, 14, 28, 0) 70%);
    --hero-text: #f8fbff;
    --hero-text-soft: #d9e8fb;
    --hero-muted: #9fb3cc;
    --hero-accent: #7dd3fc;
    --hero-line: rgba(186, 230, 253, 0.28);
    --hero-globe-shell-shadow:
      0 0 48px rgba(56, 189, 248, 0.35),
      0 0 18px rgba(96, 165, 250, 0.32);
    --hero-globe-filter: saturate(1.08) brightness(1.05);
    background: var(--hero-bg);
    color: var(--hero-text);
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: background 0.3s ease, color 0.2s ease;
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  .edge-to-edge-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--hero-bg-overlay);
    z-index: 0;
    pointer-events: none;
    opacity: 0.95;
  }

  .hero-globe-shell {
    position: absolute;
    width: clamp(17rem, 37vw, 32rem);
    aspect-ratio: 1;
    right: clamp(-8rem, -6vw, -1rem);
    top: 50%;
    transform: translateY(-50%);
    border-radius: 9999px;
    z-index: 0;
    pointer-events: none;
    box-shadow: var(--hero-globe-shell-shadow);
    opacity: 0.95;
  }

  .hero-globe-canvas {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 9999px;
    filter: var(--hero-globe-filter);
  }

  html[data-theme="light"] .edge-to-edge-hero,
  html:not(.dark):not([data-theme="dark"]) .edge-to-edge-hero {
    --hero-bg:
      radial-gradient(60% 70% at 70% 30%, rgba(148, 163, 184, 0.18) 0%, rgba(148, 163, 184, 0) 70%),
      linear-gradient(135deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%);
    --hero-bg-overlay:
      radial-gradient(70% 50% at 82% 44%, rgba(15, 23, 42, 0.08) 0%, rgba(15, 23, 42, 0) 76%),
      linear-gradient(to top, rgba(15, 23, 42, 0.08) 0%, rgba(15, 23, 42, 0.02) 30%, rgba(15, 23, 42, 0) 75%);
    --hero-text: #0f172a;
    --hero-text-soft: #334155;
    --hero-muted: #64748b;
    --hero-accent: #111827;
    --hero-line: rgba(15, 23, 42, 0.16);
    --hero-globe-shell-shadow:
      0 0 22px rgba(15, 23, 42, 0.18),
      0 0 8px rgba(15, 23, 42, 0.14);
    --hero-globe-filter: grayscale(1) invert(1) contrast(1.55) brightness(0.9);
  }

  html[data-theme="dark"] .edge-to-edge-hero,
  html.dark .edge-to-edge-hero {
    --hero-bg:
      radial-gradient(60% 70% at 70% 30%, rgba(29, 78, 216, 0.36) 0%, rgba(29, 78, 216, 0) 72%),
      linear-gradient(138deg, #010409 0%, #060f1e 44%, #040a14 100%);
    --hero-bg-overlay:
      radial-gradient(84% 62% at 82% 46%, rgba(56, 189, 248, 0.16) 0%, rgba(56, 189, 248, 0) 78%),
      linear-gradient(to top, rgba(2, 6, 23, 0.9) 0%, rgba(2, 6, 23, 0.25) 40%, rgba(2, 6, 23, 0) 72%);
    --hero-text: #f8fbff;
    --hero-text-soft: #e2edff;
    --hero-muted: #b6c8e6;
    --hero-accent: #60a5fa;
    --hero-line: rgba(147, 197, 253, 0.24);
  }

  .edge-to-edge-hero .hero-inner {
    max-width: 100%;
    width: 100%;
    margin: 0;
    padding: clamp(2rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem);
    height: auto;
    min-height: auto;
    max-height: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: clamp(2rem, 5vw, 4rem);
    position: relative;
    z-index: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-globe-shell {
      transform: translateY(-50%);
    }
  }

  .hero-left,
  .hero-right {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    align-items: flex-start;
    min-width: 0;
    width: 100%;
    height: auto;
  }

  .hero-left {
    padding-left: clamp(0.25rem, 1.2vw, 1.5rem);
    padding-bottom: 0;
  }

  .hero-right {
    border-left: 1px solid var(--hero-line);
    padding-left: clamp(2rem, 3vw, 3rem);
    width: 100%;
    align-self: flex-start;
  }

  .hero-heading {
    margin: 0;
    font-size: clamp(2.5rem, 5vw, 5rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 900;
    color: var(--hero-text);
  }

  .intro-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .hero-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.65rem 1.25rem;
    border-radius: 9999px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: transform 0.2s ease, opacity 0.2s ease, border-color 0.2s ease;
    white-space: nowrap;
  }

  .hero-button:hover {
    transform: translateY(-1px);
  }

  .hero-button.primary {
    background: #1DB954;
    color: #fff;
    box-shadow: 0 8px 24px rgba(29, 185, 84, 0.25);
  }

  .hero-button.secondary {
    border: 1px solid rgba(148, 163, 184, 0.5);
    color: var(--hero-text);
    background: transparent;
  }

  .hero-heading .muted {
    color: var(--hero-muted);
  }

  .hero-rule {
    width: 5.5rem;
    height: 0.42rem;
    background: var(--hero-accent);
    border-radius: 9999px;
    margin-top: 1.5rem;
  }

  .hero-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.8rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--hero-text-soft);
  }

  .hero-links a {
    color: var(--hero-text);
    text-decoration: none;
  }

  .hero-links a:hover {
    color: var(--hero-accent);
  }

  .hero-eyebrow {
    display: inline-block;
    margin-bottom: 1.2rem;
    color: var(--hero-accent);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .hero-copy {
    margin: 0;
    font-size: clamp(1.2rem, 3vw, 2.5rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--hero-text);
    text-align: left;
    max-width: 36rem;
  }

  .hero-description {
    margin: 1.2rem 0 0;
    max-width: 32rem;
    font-size: 1.05rem;
    line-height: 1.45;
    color: var(--hero-text-soft);
    text-align: left;
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    margin-top: 1.5rem;
    color: var(--hero-text);
    text-decoration: none;
    font-size: clamp(2rem, 2.5vw, 3.2rem);
    letter-spacing: -0.06em;
    font-weight: 800;
  }

  .hero-cta:hover {
    color: var(--hero-accent);
  }

  .hero-status {
    margin-top: 1rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--hero-line);
    color: var(--hero-text-soft);
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .hero-status .status-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .hero-status .dot {
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 9999px;
    background: #22c55e;
    box-shadow: 0 0 0 0.25rem rgba(34, 197, 94, 0.18);
  }

  @media (max-width: 1200px) {
    .hero-globe-shell {
      width: clamp(12rem, 42vw, 18rem);
      right: clamp(-5rem, -7vw, -2rem);
      top: 8%;
      transform: translateY(0);
      opacity: 0.45;
    }

    .edge-to-edge-hero .hero-inner {
      grid-template-columns: 1fr;
      min-height: auto;
      padding: 2rem 1.5rem;
      gap: 1.25rem;
    }

    .hero-right {
      border-left: none;
      border-top: 1px solid var(--hero-line);
      padding-left: 0;
      padding-top: 1.5rem;
      margin-top: 0;
    }

    .hero-left {
      padding-bottom: 0;
    }
  }

  @media (max-width: 640px) {
    .hero-globe-shell {
      width: clamp(9rem, 55vw, 13rem);
      top: 6%;
      right: -3.5rem;
      transform: translateY(0);
      opacity: 0.38;
    }

    .edge-to-edge-hero .hero-inner {
      padding: 1.5rem 1rem;
      gap: 1rem;
    }

    .hero-heading {
      font-size: clamp(1.75rem, 6vw, 2.25rem);
      line-height: 1.2;
      margin-bottom: 0.75rem;
    }

    .hero-links {
      gap: 0.4rem 0.6rem;
      font-size: 0.85rem;
      margin-bottom: 0;
    }

    .hero-copy {
      font-size: 1.1rem;
      line-height: 1.4;
      margin-bottom: 0.75rem;
    }

    .hero-description {
      font-size: 0.9rem;
      margin-top: 0.5rem;
      line-height: 1.5;
    }

    .hero-actions {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .hero-button {
      width: 100%;
      padding: 0.65rem 1rem;
      font-size: 0.9rem;
      min-height: 2.5rem;
    }

    .intro-block {
      width: 100%;
    }

    .hero-right {
      padding-top: 1rem;
      margin-top: 0;
    }

    .hero-status {
      width: 100%;
      margin-top: 0.75rem;
      font-size: 0.85rem;
    }

    .status-row {
      font-size: 0.8rem;
    }
  }
</style>
{% raw %}
<div class="edge-to-edge-hero">
  <div class="hero-inner">
    <div class="hero-globe-shell" aria-hidden="true">
      <canvas id="hero-globe-canvas" class="hero-globe-canvas"></canvas>
    </div>

    <div class="hero-left">
      <h1 class="hero-heading">Yashwanth <br /><span class="muted">Pandi.</span></h1>
      <div class="hero-rule"></div>
      <div class="hero-links">
        <a href="https://github.com/YashwanthPandi" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span>•</span>
        <a href="mailto:pandiyashwanth@gmail.com">Email</a>
        <span>•</span>
        <a href="https://www.linkedin.com/in/yashwanthpandi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>

    <div class="hero-right">
      <div class="intro-block">
        <span class="hero-eyebrow">— Introduction</span>
        <p class="hero-copy">Software and Data Engineer, based in California.</p>
        <p class="hero-description">
          Specializing in building robust front-end web applications, scalable cloud software architectures, and automated high-performance data pipelines.
        </p>
        <div class="hero-actions">
          <a id="hero-schedule-btn" class="hero-button primary" href="#" role="button">Schedule a Call</a>
          <a href="/projects" class="hero-button secondary">View Projects</a>
        </div>
        <div class="hero-status">
          <div class="status-row"><span class="dot"></span><span>Available for new challenges</span></div>
          <div>San Francisco, CA</div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  (function () {
    var disposeHeroGlobe = null;

    function fitHero() {
      var hero = document.querySelector('.edge-to-edge-hero');
      if (!hero) return;

      var header = document.querySelector('.masthead, header[role="banner"], header, .site-header');
      var footer = document.querySelector('.page__footer, footer[role="contentinfo"], footer');

      var headerH = header ? header.getBoundingClientRect().height : 0;
      var footerH = footer ? footer.getBoundingClientRect().height : 0;

      var available = window.innerHeight - headerH - footerH;
      hero.style.minHeight = Math.max(available, 0) + 'px';
    }

    function setupHeroGlobe() {
      var canvas = document.getElementById('hero-globe-canvas');
      if (!canvas) return;

      import('https://cdn.skypack.dev/cobe').then(function (mod) {
        var createGlobe = mod.default;
        var globe = null;
        var frameId = 0;
        var phi = 0;
        var observer = null;
        var themeClickHandler = null;

        function isDarkTheme() {
          var root = document.documentElement;
          return root.classList.contains('dark') || root.getAttribute('data-theme') === 'dark';
        }

        function getThemeConfig() {
          if (isDarkTheme()) {
            return {
              dark: 1,
              mapBrightness: 6,
              baseColor: [0.07, 0.18, 0.35],
              glowColor: [0.2, 0.52, 0.95]
            };
          }

          return {
            dark: 1,
            mapBrightness: 6,
            baseColor: [0.07, 0.18, 0.35],
            glowColor: [0.2, 0.52, 0.95]
          };
        }

        function buildGlobe() {
          var width = canvas.offsetWidth;
          if (!width) return;

          var theme = getThemeConfig();
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          if (globe) globe.destroy();
          globe = createGlobe(canvas, {
            devicePixelRatio: dpr,
            width: width * dpr,
            height: width * dpr,
            phi: phi,
            theta: 0.26,
            dark: theme.dark,
            scale: 1.08,
            diffuse: 1.2,
            mapSamples: 40000,
            mapBrightness: theme.mapBrightness,
            baseColor: theme.baseColor,
            markerColor: [1, 0, 0],
            glowColor: theme.glowColor,
            opacity: 1,
            offset: [0, 0],
            markers: []
          });
        }

        function animate() {
          phi += 0.003;
          if (globe) globe.update({ phi: phi });
          frameId = window.requestAnimationFrame(animate);
        }

        function refreshGlobe() {
          buildGlobe();
        }

        buildGlobe();
        animate();

        window.addEventListener('resize', refreshGlobe);

        observer = new MutationObserver(function (changes) {
          for (var i = 0; i < changes.length; i += 1) {
            if (changes[i].attributeName === 'class' || changes[i].attributeName === 'data-theme') {
              refreshGlobe();
              break;
            }
          }
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });

        var themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
          themeClickHandler = function () {
            window.setTimeout(refreshGlobe, 50);
          };
          themeToggle.addEventListener('click', themeClickHandler);
        }

        disposeHeroGlobe = function () {
          window.cancelAnimationFrame(frameId);
          window.removeEventListener('resize', refreshGlobe);
          if (observer) observer.disconnect();
          if (themeToggle && themeClickHandler) themeToggle.removeEventListener('click', themeClickHandler);
          if (globe) globe.destroy();
        };
      }).catch(function (error) {
        console.error('Unable to initialize globe animation:', error);
      });
    }

    // Wire up Schedule a Call buttons to Neeto popup
    function setupScheduleButtons() {
      var heroBtn = document.getElementById('hero-schedule-btn');
      var navBtn = document.getElementById('open-popup-button');
      
      if (heroBtn && window.neetoCal) {
        heroBtn.addEventListener('click', function (e) {
          e.preventDefault();
          navBtn.click();
        });
      }
    }

    document.addEventListener('DOMContentLoaded', function () {
      fitHero();
      setupScheduleButtons();
      setupHeroGlobe();
    });
    window.addEventListener('load', fitHero);
    window.addEventListener('resize', fitHero);
    window.addEventListener('orientationchange', fitHero);
    window.addEventListener('beforeunload', function () {
      if (disposeHeroGlobe) disposeHeroGlobe();
    });
  })();
</script>
{% endraw %}