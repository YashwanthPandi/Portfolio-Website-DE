# yashwanth.co.in

Portfolio of Yashwanth Pandi. Plain HTML/CSS/JS pages served by **GitHub Pages**; posts, projects and page data live in **Firebase** (Firestore for content, Storage for images, Auth for the editor).

## How it fits together

| Piece | Where |
| --- | --- |
| Page markup | `src/pages/*.html`, shared bits in `src/partials/`, frame in `src/layout.html` |
| Styles / behaviour | `assets/css/spec.css`, `assets/js/spec.js` |
| Firestore rendering | `assets/js/app.js` (pages) and `assets/js/content.js` (data access, markdown) |
| Editor | `/admin/` → `src/pages/admin.html` + `assets/js/admin.js` |
| Starter content / offline fallback | `data/seed.json` |
| Security rules | `firebase/firestore.rules`, `firebase/storage.rules` |
| Build | `scripts/build.mjs` → `dist/` (no npm install needed) |
| Deploy | `.github/workflows/deploy.yml` |

Pages fetch content from Firestore in the browser, so a post saved in `/admin/` is live immediately. If Firestore can't be reached, page data falls back to `data/seed.json` so the site never renders blank.

## Firestore data

- `site/hero`, `site/experience` (includes resume PDF/DOCX links), `site/resources`, `site/contact`
- `posts/{slug}`: `title, date (YYYY-MM-DD), description, tags[], body (markdown), published` → `/posts/YYYY/MM/slug/`
- `projects/{slug}`: the same fields plus `tagline, summary, project_type, status, modules[], external_url, github_url, modified` → `/projects/slug/`

## Deploy

Push to `prod`. The workflow builds `dist/` and publishes it to GitHub Pages (custom domain from `CNAME`). It also runs daily and from the Actions tab (**Run workflow**), which gives newly published entries their own pre-built page and adds them to `sitemap.xml` and `feed.xml`. Until then, new entry URLs are served through the `404.html` fallback, which renders them from Firestore.

## Local preview

```sh
npm run serve        # builds, then serves dist/ at http://localhost:4000
```

To sign in to `/admin/` locally, add `localhost` under Firebase console → Authentication → Settings → Authorized domains.

## Updating Firebase rules

```sh
npm run firebase:deploy-rules   # uses the Firebase CLI via npx; run `npx firebase-tools login` first
```

Admin access is limited to the emails in `assets/js/firebase-config.js` **and** the rules files; change both together.
