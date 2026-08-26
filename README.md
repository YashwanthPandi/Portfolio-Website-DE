<a href="https://jekyll-themes.com//[GITHUB REPOSITORY NAME]">
  <img
    src="https://img.shields.io/badge/featured%20on-JT-red.svg"
    height="20"
    alt="Jekyll Themes Shield"
  />
</a>

# My Personal Portfolio
**Based on the Academic Pages framework for Jekyll.**

This repository hosts my professional portfolio and academic website. It is powered by [Jekyll](https://jekyllrb.com/) and hosted via **GitHub Pages**.

---

## 🚀 Quick Start for Updates

* **Content:** Add or edit Markdown files in `_publications/`, `_talks/`, or `_posts/`.
* **Configuration:** Global settings (site title, social links, etc.) are in `_config.yml`.
* **Files:** Drop PDFs, CVs, or images into the `files/` directory. They will be accessible at `https://[your-username].github.io/files/your-file.pdf`.
* **Automation:** Use the scripts in `markdown_generator/` to bulk-import publications from a TSV file.

---

## 🛠 Local Development
To preview changes before pushing them live, I run the site locally.

### Prerequisites
I need **Ruby**, **Bundler**, and **NodeJS** installed.

* **macOS:** `brew install ruby node && gem install bundler`
* **Linux:** `sudo apt install ruby-dev ruby-bundler nodejs build-essential`

### Running the Server
1.  **Install dependencies:**
    ```bash
    bundle config set --local path 'vendor/bundle'
    bundle install
    ```
2.  **Launch the preview:**
    ```bash
    bundle exec jekyll serve -l -H localhost
    ```
3.  **View the site at:** `http://localhost:4000`

---

## 🐳 Docker Alternative
If I don't want to mess with local Ruby environments:

```bash
chmod -R 777 .
docker compose up
```

---

## 🧩 CMS Content Management (Blogs + All Main Sections)

You can manage content from the browser at `/cms/`:

- **Blogs** (`_posts`)
- **Projects** (`_projects`)
- **Talks** (`_talks`)
- **Publications** (`_publications`)
- **Resources section data** (`_data/resources.yml`)
- **Navigation menu** (`_data/navigation.yml`)
- **Contact form settings** (`_data/contact.yml`)

### Contact Form Service

The contact page is available at `/contact/` and submits to the configured service endpoint in [contact.yml](/Users/yashwanthpandi/Projects/Portfolio-Website-DE.worktrees/blogs-section-management-tools/_data/contact.yml).

Default provider is **FormSubmit**.  
If you prefer Formspree, replace `form.action` with your Formspree endpoint.