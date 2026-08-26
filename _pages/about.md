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
    height: 100%;
  }

  /* 2. Strip top/bottom spacing added by Minimal Mistakes layout containers */
  #main, .page, .page__inner-wrap, .page__content, .initial-content {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .edge-to-edge-hero {
    --hero-bg: transparent;
    --hero-text: #1d2431;
    --hero-text-soft: #4b5563;
    --hero-muted: #9ca4af;
    --hero-accent: #f2c94c;
    --hero-line: rgba(17, 24, 39, 0.12);
    background: transparent;
    color: var(--hero-text);
    width: 100vw;
    box-sizing: border-box;
    transition: background-color 0.2s ease, color 0.2s ease;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  html[data-theme="light"] .edge-to-edge-hero,
  html:not(.dark):not([data-theme="dark"]) .edge-to-edge-hero {
    --hero-text: #1d2431;
    --hero-text-soft: #4b5563;
    --hero-muted: #9ca4af;
    --hero-accent: #f2c94c;
    --hero-line: rgba(17, 24, 39, 0.12);
  }

  html[data-theme="dark"] .edge-to-edge-hero,
  html.dark .edge-to-edge-hero {
    --hero-text: #ffffff;
    --hero-text-soft: #f5f7fb;
    --hero-muted: #e0e7ff;
    --hero-accent: #fde047;
    --hero-line: rgba(255, 255, 255, 0.12);
  }

  .edge-to-edge-hero .hero-inner {
    max-width: 1500px;
    width: min(100%, 1500px);
    margin: 0 auto;
    min-height: 78vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: clamp(2rem, 5vw, 4rem);
    padding: clamp(2rem, 5vw, 6rem) clamp(1.5rem, 4vw, 4rem) clamp(2rem, 4vw, 4rem);
  }

  .hero-left,
  .hero-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    align-items: flex-start;
    min-width: 0;
    width: 100%;
  }

  .hero-left {
    padding-left: clamp(0.25rem, 1.2vw, 1.5rem);
    padding-bottom: 1rem;
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
    gap: 1rem;
    margin-top: 1.75rem;
  }

  .hero-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.25rem;
    padding: 0.8rem 1.5rem;
    border-radius: 9999px;
    text-decoration: none;
    font-weight: 700;
    transition: transform 0.2s ease, opacity 0.2s ease, border-color 0.2s ease;
  }

  .hero-button:hover {
    transform: translateY(-1px);
  }

  .hero-button.primary {
    background: #7c6ee6;
    color: #fff;
    box-shadow: 0 8px 24px rgba(124, 110, 230, 0.25);
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
    margin-top: 1.5rem;
    padding-top: 0.85rem;
    border-top: 1px solid var(--hero-line);
    color: var(--hero-text-soft);
    font-size: 1rem;
  }

  .hero-status .status-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
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
    });
    window.addEventListener('load', fitHero);
    window.addEventListener('resize', fitHero);
    window.addEventListener('orientationchange', fitHero);
  })();
</script>
{% endraw %}