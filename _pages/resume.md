---
layout: archive
title: "Resume"
permalink: /resume/
author_profile: true
---
{% include base_path %}

<style>
  /* ---------- Theme tokens (light is the default) ---------- */
  :root {
    --resume-bg: #ffffff;
    --resume-text: #24292f;
    --resume-heading: #111827;
    --resume-muted: #57606a;
    --resume-border: #e1e4e8;
    --resume-divider: #d0d7de;
    --resume-link: #0066cc;
    --resume-link-hover: #004b99;
    --resume-shadow: rgba(0, 0, 0, 0.04);
    --resume-btn-bg: #0066cc;
    --resume-btn-hover: #004b99;
    --resume-btn-text: #ffffff;
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]):not(.light) {
      --resume-bg: #161b22;
      --resume-text: #c9d1d9;
      --resume-heading: #f0f6fc;
      --resume-muted: #8b949e;
      --resume-border: #30363d;
      --resume-divider: #30363d;
      --resume-link: #58a6ff;
      --resume-link-hover: #79c0ff;
      --resume-shadow: rgba(0, 0, 0, 0.4);
      --resume-btn-bg: #1f6feb;
      --resume-btn-hover: #388bfd;
      --resume-btn-text: #ffffff;
    }
  }

  :root[data-theme="dark"],
  :root.dark {
    --resume-bg: #161b22;
    --resume-text: #c9d1d9;
    --resume-heading: #f0f6fc;
    --resume-muted: #8b949e;
    --resume-border: #30363d;
    --resume-divider: #30363d;
    --resume-link: #58a6ff;
    --resume-link-hover: #79c0ff;
    --resume-shadow: rgba(0, 0, 0, 0.4);
    --resume-btn-bg: #1f6feb;
    --resume-btn-hover: #388bfd;
    --resume-btn-text: #ffffff;
  }

  /* ---------- Buttons & container ---------- */
  .resume-actions { margin: 15px 0 25px 0; }
  .download-btn {
    display: inline-block;
    padding: 10px 18px;
    background-color: var(--resume-btn-bg);
    color: var(--resume-btn-text) !important;
    text-decoration: none !important;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background-color 0.2s ease-in-out;
  }
  .download-btn:hover { background-color: var(--resume-btn-hover); }

  .resume-container {
    margin-top: 20px;
    padding: 32px 36px;
    border: 1px solid var(--resume-border);
    border-radius: 8px;
    background-color: var(--resume-bg);
    color: var(--resume-text);
    box-shadow: 0 2px 6px var(--resume-shadow);
    line-height: 1.55;
  }
  .resume-container h1,
  .resume-container h2,
  .resume-container h3,
  .resume-container strong { color: var(--resume-heading); }
  .resume-container p,
  .resume-container li,
  .resume-container span,
  .resume-container div { color: var(--resume-text); }
  .resume-container a { color: var(--resume-link); }
  .resume-container a:hover { color: var(--resume-link-hover); }

  /* ---------- Header ---------- */
  .resume-container h1 {
    margin: 0 0 6px 0;
    font-size: 2rem;
    text-align: center;
  }
  .contact-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px 22px;
    margin: 8px 0 8px 0;
    font-size: 0.93rem;
  }
  .contact-item { display: inline-flex; align-items: center; }

  /* ---------- Section headings ---------- */
  .resume-container h2 {
    margin: 2em 0 0.8em 0;
    padding-bottom: 6px;
    border-bottom: 1.5px solid var(--resume-divider);
    font-size: 1.05rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* ---------- Job / education headers ---------- */
  .job {
    margin-top: 1.6em;
  }
  .job:first-of-type { margin-top: 0.6em; }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 4px 16px;
    flex-wrap: wrap;
    margin-bottom: 0.5em;
  }
  .job-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--resume-heading);
  }
  .job-company {
    font-weight: 600;
    color: var(--resume-text);
  }
  .job-meta {
    text-align: right;
    font-size: 0.9rem;
    color: var(--resume-muted) !important;
    line-height: 1.4;
  }
  .job-meta span { color: var(--resume-muted) !important; display: block; }

  /* ---------- Bullets (force them back on over theme resets) ---------- */
  .resume-container ul {
    list-style: disc outside !important;
    margin: 0 0 0.5em 0 !important;
    padding-left: 1.4em !important;
  }
  .resume-container li {
    display: list-item !important;
    list-style: disc outside !important;
    margin: 0 0 0.4em 0 !important;
    padding-left: 0.2em;
    font-size: 0.95rem;
  }
  .resume-container li::marker { color: var(--resume-muted); }

  /* Plain (no-bullet) list for Skills */
  .resume-container ul.plain-list {
    list-style: none !important;
    padding-left: 0 !important;
  }
  .resume-container ul.plain-list li {
    list-style: none !important;
    padding-left: 0;
    margin-bottom: 0.5em !important;
  }

  @media (max-width: 600px) {
    .resume-container { padding: 22px 18px; }
    .job-meta { text-align: left; }
  }

  /* ---------- Download dropdown ---------- */
  .download-dropdown { position: relative; display: inline-block; }
  .download-dropdown .download-btn {
    border: 0;
    cursor: pointer;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .download-btn .caret {
    display: inline-block;
    width: 0; height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid currentColor;
    transition: transform 0.2s ease;
  }
  .download-btn[aria-expanded="true"] .caret { transform: rotate(180deg); }
  .download-menu {
    display: none;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    min-width: 200px;
    margin: 0;
    padding: 6px;
    list-style: none;
    background-color: var(--resume-bg);
    border: 1px solid var(--resume-border);
    border-radius: 8px;
    box-shadow: 0 8px 24px var(--resume-shadow), 0 2px 6px var(--resume-shadow);
    z-index: 50;
  }
  .download-menu.open { display: block; }
  .download-menu li { margin: 0; padding: 0; list-style: none; }
  .download-menu a {
    display: block;
    padding: 9px 12px;
    border-radius: 6px;
    color: var(--resume-text) !important;
    text-decoration: none !important;
    font-size: 0.93rem;
    font-weight: 500;
  }
  .download-menu a:hover,
  .download-menu a:focus-visible {
    background-color: var(--resume-border);
    color: var(--resume-heading) !important;
    outline: none;
  }

  @media print {
    .resume-actions { display: none; }
  }
</style>

<div class="resume-actions">
  <div class="download-dropdown" id="resume-download">
    <button type="button" class="download-btn" id="resume-download-btn" aria-haspopup="true" aria-expanded="false" aria-controls="resume-download-menu">
      Download Resume <span class="caret" aria-hidden="true"></span>
    </button>
    <ul class="download-menu" id="resume-download-menu" role="menu">
      <li role="none"><a role="menuitem" href="https://docs.google.com/document/d/1sSmgIuFysQsX43NZrhy8fRxy6_P7pqySGvY8-53p054/export?format=pdf" download="Yashwanth_Pandi_Resume.pdf">Download as PDF (.pdf)</a></li>
      <li role="none"><a role="menuitem" href="https://docs.google.com/document/d/1sSmgIuFysQsX43NZrhy8fRxy6_P7pqySGvY8-53p054/export?format=docx" download="Yashwanth_Pandi_Resume.docx">Download as Word (.docx)</a></li>
    </ul>
  </div>
</div>

<div class="resume-container" markdown="1">

# Yashwanth Pandi

<div class="contact-bar">
  <span class="contact-item"><strong>Role:&nbsp;</strong> UI / Software Engineer</span>
  <span class="contact-item"><strong>Location:&nbsp;</strong> San Francisco, CA</span>
  <span class="contact-item"><strong>Email:&nbsp;</strong> <a href="mailto:pandiyashwanth@gmail.com">pandiyashwanth@gmail.com</a></span>
  <span class="contact-item"><strong>Phone:&nbsp;</strong> <a href="tel:8055015991">(805) 501-5991</a></span>
  <span class="contact-item"><strong>LinkedIn:&nbsp;</strong> <a href="https://linkedin.com/in/yashwanthpandi" target="_blank" rel="noopener">yashwanthpandi</a></span>
</div>

## Professional Summary

Software Engineer equipped with a Master's in IT and over 6+ years of expertise in delivering enterprise-grade web applications. Proficient in architecting modular Angular (v16+) structures and reactive data management via RxJS to streamline complex legacy migrations.

## Experience

<div class="job">
  <div class="job-header">
    <div>
      <div class="job-title">Application Developer</div>
      <div class="job-company">Genentech Inc</div>
    </div>
    <div class="job-meta"><span>Jan 2026 – Present</span><span>South San Francisco, CA</span></div>
  </div>
</div>

* Engineered Angular 16 front-end features and integrated RESTful Web APIs for client-server data transfer.
* Led interns in UI migration to Angular, leveraging TypeScript, components, services, Observables, and build pipelines.
* Implemented two-way data binding and dependency injection, connecting with Web API controllers for CRUD operations.
* Architected modular Angular components and UI services adhering to component-based architecture.
* Configured Angular router for SPA navigation using modern TypeScript.
* Managed async reactive streams with RxJS Observables and developed reusable custom directives with isolated scope.
* Partnered with stakeholders to design intuitive interfaces for core business fulfillment workflows.
* Led peer code reviews to enforce quality standards and actively participated in Agile/Scrum ceremonies.
* Optimized TypeScript build configs via `tsconfig` and utilized Angular pipes for real-time data transformation.
* Managed version control and feature branching using Git workflows.
* Built dynamic D3.js data visualizations and model-driven Angular modules for the CARES screening platform.
* Managed tasks and user data in MongoDB, implementing Redis for active user sessions and initial state caching.
* Implemented injectable Angular services to manage shared state across components.

<div class="job">
  <div class="job-header">
    <div>
      <div class="job-title">UI Developer II</div>
      <div class="job-company">California Lutheran University</div>
    </div>
    <div class="job-meta"><span>Jun 2023 – Sept 2025</span><span>Thousand Oaks, CA</span></div>
  </div>
</div>

* Developed and maintained high-traffic university web properties using Angular, integrating secure APIs and relational databases to ensure 99.9% uptime.
* Architected reusable, semantic Angular components strictly adhering to WCAG 2.1 accessibility standards for campus-wide inclusivity.
* Optimized front-end performance by profiling enterprise applications and troubleshooting complex TypeScript issues.
* Translated design mock-ups and wireframes into production-ready, standards-compliant Angular components and scalable frontend structures.
* Developed RESTful web services using Express.js and Node.js to connect Angular frontends with backend endpoints seamlessly.
* Integrated MongoDB with Express.js APIs for efficient JSON document persistence, asynchronous data querying, and schema management.
* Implemented interactive data visualizations using D3.js and Angular, binding complex datasets in JSON/CSV format directly to DOM elements.
* Built reusable D3.js chart modules to analyze multi-year sales metrics, enabling fluid DOM manipulation and dynamic data interaction.
* Used Kafka to stream high-throughput events while caching active live data points in Redis for instant retrieval.
* Designed custom loading animations and asynchronous UI state transitions using RxJS observables and Angular services during backend HTTP requests.
* Constructed interactive dashboard visualizations, including heat maps, line graphs, bar charts, and pie charts, leveraging D3.js, Highcharts, HTML5 Canvas, and SVG.

<div class="job">
  <div class="job-header">
    <div>
      <div class="job-title">Software Engineer</div>
      <div class="job-company">Cisco Systems</div>
    </div>
    <div class="job-meta"><span>Apr 2020 – Feb 2023</span><span>Bangalore, IN</span></div>
  </div>
</div>

* Formulated core development best practices across a 4-developer coding standards team, decreasing code complexity and enhancing library maintainability.
* Collaborated with cross-functional teams and stakeholders to deliver mission-critical single-page applications from MVP through Product-Market Fit.
* Designed and implemented a high-availability (99.99% uptime) REST API for a high-volume internal web application, improving system cohesion.
* Documented solution architecture for external web applications, reducing time-to-market by 58% while ensuring long-term code maintainability.
* Integrated third-party services and external APIs into high-profile internal web applications to streamline overall system architecture.
* Executed unit and load testing to identify critical performance bottlenecks during development, significantly improving system stability and scalability.
* Collaborated with cross-functional teams to deploy website updates, landing pages, and digital content assets aligned with enterprise branding.

<div class="job">
  <div class="job-header">
    <div>
      <div class="job-title">Software Engineer</div>
      <div class="job-company">Cisco Systems</div>
    </div>
    <div class="job-meta"><span>Nov 2019 – Mar 2020</span><span>Hyderabad, IN</span></div>
  </div>
</div>

* Designed and developed a responsive, supply-chain single-page application (SPA) using Angular, TypeScript, and SCSS, translating design systems into reusable components.
* Leveraged Angular directives and semantic HTML5 to implement robust on-page SEO techniques, optimizing metadata and accessibility standards.

## Skills

* **Languages & Core Tech:** TypeScript, JavaScript (ES6+), Python, C#, C, HTML5, SCSS, SQL (PostgreSQL, MSSQL)
* **Frontend Frameworks:** Angular (v16+), RxJS, NgRx, Signals, Material UI, Tailwind CSS, AG-Grid
* **Backend & Architecture:** Node.js, Express.js, RESTful APIs, Distributed Systems
* **Data & DevOps:** AWS, Docker, Jenkins, CI/CD Pipelines, Kafka, MongoDB, Redis, Git
* **Software Excellence:** Full-stack Development, SDLC, Scalability, WCAG Accessibility, Unit/E2E Testing (Jasmine, Jest), SEO
{: .plain-list}

## Education

<div class="job">
  <div class="job-header">
    <div>
      <div class="job-title">Master of Science in Information Technology</div>
      <div class="job-company">California Lutheran University</div>
    </div>
    <div class="job-meta"><span>Mar 2023 – Nov 2024</span><span>Thousand Oaks, CA</span></div>
  </div>
</div>

<div class="job">
  <div class="job-header">
    <div>
      <div class="job-title">Bachelor of Engineering in Electronics &amp; Communication</div>
      <div class="job-company">Andhra University</div>
    </div>
    <div class="job-meta"><span>Jun 2016 – Mar 2020</span><span>Visakhapatnam, IN</span></div>
  </div>
</div>

## Certifications

* Meta Front-End Developer Professional Certificate
* AWS Certified Cloud Practitioner
* Google UX Design Professional Certificate

</div>

<script>
  (function () {
    var wrap = document.getElementById('resume-download');
    var btn = document.getElementById('resume-download-btn');
    var menu = document.getElementById('resume-download-menu');
    if (!wrap || !btn || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!menu.classList.contains('open'));
    });

    // Close after picking an option (the browser keeps you on this page and downloads the file)
    menu.addEventListener('click', function () { setOpen(false); });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); btn.focus(); }
    });
  })();
</script>