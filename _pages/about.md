---
permalink: "/"
page: "resume.html"
author_profile: false
redirect_from:
- "/about/"
- "/about.html"
---
<script src="https://cdn.tailwindcss.com"></script>
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

  /* 3. Fit exactly between header and footer, using measured heights (with a
        sane fallback for the first paint before JS runs) */
  .edge-to-edge-hero {
    width: 100vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    min-height: calc(100svh - 130px); /* fallback, JS overrides this immediately */
  }
</style>
{% raw %}
<div class="edge-to-edge-hero bg-[#1e222b] text-zinc-100 flex flex-col justify-between px-8 sm:px-16 lg:px-24 pt-8 pb-6">

  <!-- Center Hero Content (Grid Layout) -->
  <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-4">

    <!-- Left Column: Giant Name & Accent -->
    <div class="lg:col-span-7 space-y-6">
      <h1 class="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white">
        Yashwanth <br /><span class="text-zinc-400">Pandi.</span>
      </h1>
      <div class="w-20 h-1.5 bg-[#f4c430] rounded-full"></div>

      <!-- Social Links -->
      <div class="flex items-center space-x-4 pt-2 text-zinc-400 text-sm font-medium">
        <a href="https://github.com" target="_blank" class="hover:text-white transition-colors">GitHub</a>
        <span>•</span>
        <a href="mailto:email@example.com" class="hover:text-white transition-colors">Email</a>
        <span>•</span>
        <a href="https://linkedin.com" target="_blank" class="hover:text-white transition-colors">LinkedIn</a>
      </div>
    </div>

    <!-- Right Column: Introduction / Bio -->
    <div class="lg:col-span-5 space-y-5 lg:border-l lg:border-zinc-800 lg:pl-10">
      <span class="text-xs font-mono uppercase tracking-widest text-[#f4c430]">— Introduction</span>

      <p class="text-xl sm:text-2xl font-medium text-zinc-200 leading-snug">
        Software and Data Engineer, based in California.
      </p>

      <p class="text-sm sm:text-base text-zinc-400 leading-relaxed">
        Specializing in building robust front-end web applications, scalable cloud software architectures, and automated high-performance data pipelines.
      </p>
      <div class="pt-2">
        <a href="/projects" class="inline-flex items-center space-x-2 text-sm font-bold text-white hover:text-[#f4c430] transition-colors">
          <span>My story & works</span>
          <span>→</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Footer Status Bar -->
  <div class="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 pt-4 border-t border-zinc-800/65">
    <div class="flex items-center space-x-2">
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span>Available for new challenges</span>
    </div>
    <div class="mt-2 sm:mt-0 font-mono">
      San Francisco, CA
    </div>
  </div>
</div>

<script>
  (function () {
    function fitHero() {
      var hero = document.querySelector('.edge-to-edge-hero');
      if (!hero) return;

      // Try the common Minimal Mistakes selectors first, fall back to
      // generic header/footer tags so this keeps working even if the
      // theme's masthead class ever changes.
      var header = document.querySelector('.masthead, header[role="banner"], header');
      var footer = document.querySelector('.page__footer, footer[role="contentinfo"], footer');

      var headerH = header ? header.getBoundingClientRect().height : 0;
      var footerH = footer ? footer.getBoundingClientRect().height : 0;

      var available = window.innerHeight - headerH - footerH;
      hero.style.minHeight = Math.max(available, 0) + 'px';
    }

    // Run once DOM is ready, and again after full load (fonts/images can
    // change header height), then keep it in sync on resize/rotation.
    document.addEventListener('DOMContentLoaded', fitHero);
    window.addEventListener('load', fitHero);
    window.addEventListener('resize', fitHero);
    window.addEventListener('orientationchange', fitHero);
  })();
</script>
{% endraw %}