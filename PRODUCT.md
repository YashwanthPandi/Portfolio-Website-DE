# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Recruiters and hiring managers evaluating Yashwanth Pandi for frontend / Angular engineering roles. They arrive from a resume, LinkedIn, or a job application, spend a few minutes, and need to judge fit fast: role, seniority, stack, real shipped work, then a way to make contact or take the resume with them.

## Product Purpose
A personal portfolio at yashwanth.co.in. Success is a hiring conversation: the visitor understands who Yashwanth is within the first screen, finds proof (experience, a shipped project, writing), and contacts him or downloads the resume.

## Positioning
Frontend developer in the Angular ecosystem with 7+ years of enterprise web work (Genentech, California Lutheran University, Cisco), a Master's in IT, and hands-on full-stack and data exposure (Express, MongoDB, Redis, Kafka, D3, AWS). The blog covers frontend and Angular engineering topics.

## Operating Context
- Visitors scan quickly, often on a laptop between other candidates, sometimes on a phone from a LinkedIn link.
- The resume is also available as PDF/DOCX exports from a Google Doc.
- Contact goes through a FormSubmit form, email, and LinkedIn.

## Capabilities and Constraints
- Static HTML pages (`src/`, built by `scripts/build.mjs`) deployed to GitHub Pages from the `prod` branch (custom domain via CNAME). No CSS build step: `assets/css/spec.css` is served as-is.
- Content (posts, projects, hero, experience, resources, contact) lives in Firebase Firestore and renders in the browser; it is edited at `/admin/` (Google sign-in). `data/seed.json` holds starter content and the offline fallback.
- Pages: Home, Projects, Blog (and posts), Resources, Resume, Contact, 404, privacy, terms.
- The user granted full design freedom: the existing look (dark-only, globe/starfield hero, brand-colored tech pills) is not binding.

## Brand Commitments
- Name: Yashwanth Pandi. Domain: yashwanth.co.in. Location: San Francisco, CA.
- Status line in use: "Open to new frontend & Angular engineering roles".

## Evidence on Hand
- Resume content: `_pages/resume.md` (experience, skills, education, certifications).
- One shipped project: Timber Dynamics & Material Tracking Tool (`_projects/`), live at tdmt.yashwanth.co.in with GitHub source.
- Blog posts on Angular and frontend engineering topics (`_posts/`). Written as technical how-to articles; they contain no invented personal anecdotes.
- Curated learning resources (`_data/resources.yml`).
- Profile photo: `images/profile.png`.
- No testimonials, client logos, metrics dashboards, or press exist. Do not fabricate any.

## Product Principles
1. Fit in one glance: role, seniority, stack, and availability are visible without scrolling.
2. Proof over adjectives: show shipped work, employers, and writing instead of self-description.
3. Every page has a way to reach out or take the resume.
4. Content stays editable by CMS; design never requires hand-editing HTML to add a post or project.

## Accessibility & Inclusion
WCAG 2.1 AA. Accessibility is part of the claimed expertise on the resume, so the site itself must model it: keyboard navigation, visible focus, sufficient contrast, reduced-motion support.
