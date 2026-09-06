---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

<!-- ---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
--- -->

{% include base_path %}

<style>
  .sitemap-hero {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 1.25rem;
    padding: 2rem;
    margin-bottom: 3rem;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  }

  html[data-theme="light"] .sitemap-hero,
  html:not(.dark):not([data-theme="dark"]) .sitemap-hero {
    background: rgba(241, 245, 249, 0.85);
    border-color: rgba(148, 163, 184, 0.3);
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
  }

  .sitemap-hero-title {
    font-size: 1.875rem;
    font-weight: 800;
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--hero-text, #f8fbff);
  }

  html[data-theme="light"] .sitemap-hero-title,
  html:not(.dark):not([data-theme="dark"]) .sitemap-hero-title {
    color: #0f172a;
  }

  .sitemap-hero-desc {
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 1.25rem;
    color: var(--hero-text-soft, #cbd5e1);
  }

  html[data-theme="light"] .sitemap-hero-desc,
  html:not(.dark):not([data-theme="dark"]) .sitemap-hero-desc {
    color: #475569;
  }

  .sitemap-badge-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.15rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none !important;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38bdf8 !important;
    transition: all 0.2s ease;
  }

  .sitemap-badge-btn:hover {
    background: rgba(56, 189, 248, 0.22);
    transform: translateY(-1px);
    color: #7dd3fc !important;
  }

  .sitemap-section {
    margin-bottom: 3.5rem;
  }

  .sitemap-section-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .sitemap-icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.875rem;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  .sitemap-icon-box.indigo {
    background: rgba(99, 102, 241, 0.18);
    border: 1px solid rgba(99, 102, 241, 0.35);
    color: #818cf8;
  }

  .sitemap-icon-box.emerald {
    background: rgba(16, 185, 129, 0.18);
    border: 1px solid rgba(16, 185, 129, 0.35);
    color: #34d399;
  }

  .sitemap-icon-box.purple {
    background: rgba(168, 85, 247, 0.18);
    border: 1px solid rgba(168, 85, 247, 0.35);
    color: #c084fc;
  }

  .sitemap-section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    flex-grow: 1;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    color: var(--hero-text, #f8fbff);
    text-transform: capitalize;
  }

  html[data-theme="light"] .sitemap-section-title,
  html:not(.dark):not([data-theme="dark"]) .sitemap-section-title {
    color: #0f172a;
    border-bottom-color: rgba(148, 163, 184, 0.3);
  }

  .sitemap-card-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.25rem;
  }

  @media (min-width: 768px) {
    .sitemap-card-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1024px) {
    .sitemap-card-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .sitemap-item-card {
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 1rem;
    padding: 1.25rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  html[data-theme="light"] .sitemap-item-card,
  html:not(.dark):not([data-theme="dark"]) .sitemap-item-card {
    background: rgba(248, 250, 252, 0.85);
    border-color: rgba(148, 163, 184, 0.3);
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  }

  .sitemap-item-card:hover {
    transform: translateY(-2px);
    border-color: rgba(56, 189, 248, 0.5);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
  }
</style>

<!-- Intro Card -->
<div class="sitemap-hero">
  <h1 class="sitemap-hero-title">Site Directory</h1>
  <p class="sitemap-hero-desc">
    A complete list of all the posts, pages, and collections found on the site.
  </p>
  <a href="{{ base_path }}/sitemap.xml" class="sitemap-badge-btn">
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10.293 10.586V7z" clip-rule="evenodd"></path>
    </svg>
    <span>For robots: XML version available</span>
  </a>
</div>

<!-- Pages Section -->
<div class="sitemap-section">
  <div class="sitemap-section-header">
    <div class="sitemap-icon-box indigo">
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    </div>
    <h2 class="sitemap-section-title">Pages</h2>
  </div>
  
  <div class="sitemap-card-grid">
    {% for post in site.pages %}
      <div class="sitemap-item-card">
        {% include archive-single.html %}
      </div>
    {% endfor %}
  </div>
</div>

<!-- Posts Section -->
<div class="sitemap-section">
  <div class="sitemap-section-header">
    <div class="sitemap-icon-box emerald">
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"></path>
      </svg>
    </div>
    <h2 class="sitemap-section-title">Posts</h2>
  </div>
  
  <div class="sitemap-card-grid">
    {% for post in site.posts %}
      <div class="sitemap-item-card">
        {% include archive-single.html %}
      </div>
    {% endfor %}
  </div>
</div>

<!-- Dynamic Collections Section -->
{% for collection in site.collections %}
  {% unless collection.output == false or collection.label == "posts" %}
    <div class="sitemap-section">
      <div class="sitemap-section-header">
        <div class="sitemap-icon-box purple">
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <h2 class="sitemap-section-title">
          {{ collection.label | replace: '_', ' ' }}
        </h2>
      </div>
      
      <div class="sitemap-card-grid">
        {% for post in collection.docs %}
          <div class="sitemap-item-card">
            {% include archive-single.html %}
          </div>
        {% endfor %}
      </div>
    </div>
  {% endunless %}
{% endfor %}