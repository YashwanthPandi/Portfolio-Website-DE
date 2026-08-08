---
<style>
  /* Hero: two-column, bold headline style inspired by product-focused portfolios */
  .hero-wrap {
    display: grid;
    grid-template-columns: 1fr 560px;
    gap: 36px;
    align-items: center;
    margin-bottom: 28px;
    padding: 36px 18px;
    background: linear-gradient(180deg, #071428 0%, #06121b 60%);
    color: #e6eef8;
    border-radius: 12px;
  }

  .hero-left h1 {
    font-size: clamp(48px, 8vw, 96px);
    line-height: 0.95;
    font-weight: 800;
    margin: 0;
    color: #ffffff;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  .hero-left p.lead {
    margin-top: 14px;
    color: rgba(255,255,255,0.85);
    font-size: 1.05rem;
    max-width: 680px;
  }

  .hero-right {
    text-align: left;
    padding: 8px 12px;
  }

  .hero-right .intro {
    color: rgba(230,238,248,0.95);
    font-size: 1rem;
    margin-bottom: 18px;
  }

  .hero-cta {
    display:flex;
    gap: 12px;
    margin-bottom: 18px;
  }

  .btn-primary {
    background: linear-gradient(90deg,#1e90ff,#4f46e5);
    color: #fff;
    padding: 10px 18px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 700;
    box-shadow: 0 8px 24px rgba(79,70,229,0.12);
    transition: transform .18s ease, box-shadow .18s ease;
  }

  .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(79,70,229,0.16); }

  .btn-ghost {
    background: transparent;
    color: rgba(230,238,248,0.95);
    padding: 10px 14px;
    border-radius: 999px;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.06);
    font-weight: 700;
  }

  .hero-metrics { display:flex; gap:20px; color: rgba(255,255,255,0.75); font-size: 0.95rem; margin-top:8px; }

  .hero-graph { margin-top: 22px; display:flex; justify-content:center; }

  /* Client logos row */
  .client-row { display:flex; gap:28px; align-items:center; justify-content:center; padding: 30px 6px; opacity:0.95 }
  .client-row img { max-height:36px; filter:grayscale(1) contrast(.9) opacity(.9); }

  /* Keep existing stack and cert styles consistent */
  .skill-container { font-family: 'Roboto', sans-serif; margin: 26px 0; }

  /* Featured projects and cert tweaks already styled below; minimal responsive fallback */
  @media (max-width: 980px) {
    .hero-wrap { grid-template-columns: 1fr; padding: 26px; }
    .hero-right { order: 2; }
    .hero-left { order: 1; }
    .hero-left h1 { font-size: clamp(36px, 9vw, 64px); }
  }
</style>
    color: #ffffff;
    border: 2px solid #4285F4;
    box-shadow: 0 0 8px rgba(66, 133, 244, 0.4);
    outline: 2px solid #4285F4;
    outline-offset: 2px;
  }

  .project-card-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .project-card {
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background: #fff;
  }

  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  .project-card-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom: 1px solid #eee;
  }

  .project-card-content {
    padding: 15px;
  }

  .project-card-title {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.25rem;
  }

  .project-card-desc {
    font-size: 0.9rem;
    color: #586069;
    margin-bottom: 15px;
  }

  .project-card-tag {
    font-size: 0.75rem;
    font-weight: bold;
    color: #0366d6;
    background: #f1f8ff;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .project-card-link {
    display: inline-block;
    margin-top: 15px;
    font-weight: bold;
    text-decoration: none;
  }

  .certification-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    align-items: stretch;
    justify-items: center;
    margin: 24px 0 36px;
  }

  .cert-badge {
    width: 100%;
    max-width: 190px;
    height: 210px;
    border: 1px solid #e0e0e0;
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .cert-badge span {
    margin-top: 8px;
    display: block;
    font-size: 0.78rem;
    color: #222;
    max-height: 42px;
    line-height: 1.2;
    padding: 0 4px;
  }

  .cert-badge:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 12px 24px rgba(0,0,0,0.12);
  }

  .cert-badge img {
    display: block;
    max-width: 160px;
    max-height: 110px;
    width: auto;
    height: auto;
    object-fit: contain;
    margin: 8px auto;
    background: #ffffff;
  }
  .cert-badge .cert-icon {
    width: 160px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cert-badge a {
    display: block;
    text-align: center;
    padding: 9px 8px 12px;
    color: #333;
    font-weight: 600;
    font-size: 0.85rem;
    text-decoration: none;
  }

  .featured-projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    margin: 24px 0 36px;
  }

  .featured-project-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    padding: 18px;
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);
  }

  .featured-project-card h4 {
    margin: 0 0 8px 0;
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
  }

  .featured-project-card p {
    color: #4b5563;
    margin: 0 0 10px 0;
    line-height: 1.6;
  }

  .featured-project-card .pill-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }

  .featured-project-card .pill {
    background: #eef2ff;
    color: #4338ca;
    border-radius: 999px;
    padding: 4px 8px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .certification-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 520px) {
    .certification-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
<!-- 
# Yashwanth Pandi | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yashwanthpandi) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yashwanthpandi) [![Resume](https://img.shields.io/badge/Resume-4285F4?style=for-the-badge&logo=googledrive&logoColor=white)](https://yashwanth.co.in/resume) [![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:me@yashwanth.co.in)
**Data Engineering Leader & Software‑Driven Problem Solver**
-->

 
<div class="hero-wrap">
  <div class="hero-left">
    <h1>Thinking becomes product.</h1>
    <p class="lead">I design and ship interfaces that prioritise clarity, responsiveness, and maintainability. My focus is on reactive state flows, component-first UIs, and engineering systems that keep the user experience predictable at scale.</p>
  </div>

  <div class="hero-right">
    <div class="intro">I'm Yashwanth — a frontend engineer building production-grade UI systems with Angular and strong state management patterns.</div>

    <div class="hero-cta">
      <a class="btn-primary" href="/projects/">See Projects</a>
      <a class="btn-ghost" href="/resume">Resume</a>
    </div>

    <div class="hero-metrics">
      <div><strong>Reactive</strong><div style="font-size:0.86rem;color:rgba(255,255,255,0.7)">NgRx & RxJS</div></div>
      <div><strong>Accessible</strong><div style="font-size:0.86rem;color:rgba(255,255,255,0.7)">A11y-first UI</div></div>
      <div><strong>Performant</strong><div style="font-size:0.86rem;color:rgba(255,255,255,0.7)">Optimized rendering</div></div>
    </div>

    <div class="hero-graph">
      <img src="https://ghchart.rshah.org/YashwanthPandi" alt="GitHub contribution graph for Yashwanth Pandi" />
    </div>
  </div>
</div>

My approach is grounded in state-driven architecture, composable UI patterns, and clean engineering habits. I enjoy turning complex product requirements into clear, scalable frontend experiences and collaborating with teams to build products that are both reliable and enjoyable to use.

<!-- Clients / logos row -->
<div class="client-row" aria-hidden="true">
  <img src="/images/clients/thoughtspot.svg" alt="ThoughtSpot" />
  <img src="/images/clients/precisely.svg" alt="Precisely" />
  <img src="/images/clients/vedantu.svg" alt="Vedantu" />
  <img src="/images/clients/airtel.svg" alt="Airtel" />
</div>

## Certifications

<div class="certification-grid">
  <div class="cert-badge">
    <a href="https://aws.amazon.com/certification/certified-data-engineer-associate/" aria-label="AWS Certified Data Engineer - Associate">
      <div class="cert-icon"><img src="https://img-c.udemycdn.com/open-badges/v2/badge-class/1309014830/97c586f8-400c-427e-951d-7352f731b0de1572374724681906937.png" alt="AWS Certified Data Engineer - Associate" /></div>
      <span>AWS Data Engineer Associate</span>
    </a>
  </div>

  <div class="cert-badge">
    <a href="https://aws.amazon.com/certification/certified-cloud-practitioner/" aria-label="AWS Certified Cloud Practitioner">
      <div class="cert-icon"><img src="https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png" alt="AWS Certified Cloud Practitioner" /></div>
      <span>AWS Cloud Practitioner</span>
    </a>
  </div>

  <div class="cert-badge">
    <a href="https://www.coursera.org/learn/google-cybersecurity" aria-label="Google Cybersecurity Certificate">
      <div class="cert-icon"><img src="https://images.credly.com/size/680x680/images/50cc91fd-d223-4ef0-a512-ab251ba7e812/image.png" alt="Google Cybersecurity Certificate" /></div>
      <span>Google Cybersecurity</span>
    </a>
  </div>

  <div class="cert-badge">
    <a href="https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/agile.html" aria-label="Cisco Agile Fundamentals Certificate">
      <div class="cert-icon"><img src="https://images.credly.com/images/0ee78720-fba8-4171-adc6-3fcb93ae38b0/Asset_5600.png" alt="Cisco Agile Fundamentals Certificate" /></div>
      <span>Cisco Agile Fundamentals</span>
    </a>
  </div>
</div>

## Technology Stack
<div class="skill-container">
  <div class="skill-group">
    <div class="skill-card">
      <h4>Core Frontend & UI Architecture</h4>
      <span class="skill-chip">Angular</span>
      <span class="skill-chip">TypeScript</span>
      <span class="skill-chip">JavaScript (ES6+)</span>
      <span class="skill-chip">HTML5 & CSS3</span>
      <span class="skill-chip">Angular Material</span>
      <span class="skill-chip">Responsive UI</span>
    </div>
    <div class="skill-card">
      <h4>State Management & Reactivity</h4>
      <span class="skill-chip">NgRx</span>
      <span class="skill-chip">RxJS</span>
      <span class="skill-chip">Reactive Patterns</span>
      <span class="skill-chip">Signal-Driven UI</span>
      <span class="skill-chip">State Architecture</span>
    </div>
    <div class="skill-card">
      <h4>Backend & APIs</h4>
      <span class="skill-chip">Node.js</span>
      <span class="skill-chip">Express.js</span>
      <span class="skill-chip">RESTful APIs</span>
      <span class="skill-chip">GraphQL</span>
      <span class="skill-chip">MongoDB</span>
    </div>
    <div class="skill-card">
      <h4>Delivery & Reliability</h4>
      <span class="skill-chip">Git & Version Control</span>
      <span class="skill-chip">CI/CD</span>
      <span class="skill-chip">Unit & Integration Testing</span>
      <span class="skill-chip">AWS</span>
      <span class="skill-chip">Docker</span>
    </div>
  </div>
</div>

## Featured Projects
<div class="featured-projects">
  <div class="featured-project-card">
    <h4>WoodDepot</h4>
    <p>An Angular application focused on operational workflows, rich dashboard views, and complex UI state transitions. The project demonstrates practical frontend architecture through structured component design, data-driven views, and interaction-heavy screens.</p>
    <div class="pill-row">
      <span class="pill">Angular</span>
      <span class="pill">NgRx</span>
      <span class="pill">Dashboard UX</span>
      <span class="pill">State Flow</span>
    </div>
  </div>
  <div class="featured-project-card">
    <h4>Frontend Systems</h4>
    <p>Experience building modular interfaces with reactive data handling, polished interaction layers, and maintainable component boundaries that support product growth without introducing unnecessary complexity.</p>
    <div class="pill-row">
      <span class="pill">TypeScript</span>
      <span class="pill">Reactive UI</span>
      <span class="pill">Accessibility</span>
      <span class="pill">Performance</span>
    </div>
  </div>
</div>

