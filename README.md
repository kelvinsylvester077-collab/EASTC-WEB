# EASTCSO Website

This repository contains the EASTC Students Organization (EASTCSO) static website. The site is a small informational portal built with plain HTML, CSS and a bit of JavaScript for client-side CRUD (Announcements & Events).

**Purpose**
- Present EASTC student organization information, leadership, services, events and announcements.
- Provide a simple member registration form (create operation) and in-page management for announcements and events.
- Be responsive for mobile and tablet viewports.

**Live / Deployment**
- The project is configured for static hosting (Vercel recommended).
- Root route redirects to `EASTCSO.html`; see `index.html` and `vercel.json` for routing.

**Key Pages & Sections**
- Home page & navigation: [EASTCSO.html](EASTCSO.html) — header, main hero, nav links to page sections.
- CSS Grid layout: layout follows a header / main / sidebar / footer grid (main uses a 2fr / 1fr split). Styles are in the page `<style>` block and `layout.css` (if present).
- About & Leadership: the `#about` section and `#leadership` grid show organization info and leader cards. Leader photos are in the repository (watch filename case on deployment).
- Events & Announcements: interactive CRUD lists are in the `#events` and `#announcements` sections; these are stored in-memory on the page and editable via forms.
- Member Registration: a simple registration form is present (front-end only) for create operation demonstration.
- Responsiveness: media queries adjust the grid and stacking for tablet and mobile breakpoints.

**Files of Interest**
- [EASTCSO.html](EASTCSO.html) — main site HTML and styles.
- [index.html](index.html) — redirect to `EASTCSO.html` (deployment entry point).
- [vercel.json](vercel.json) — Vercel routing config.
- [layout.css](layout.css) — optional site CSS if used.

**How to preview locally**
1. Open `index.html` or `EASTCSO.html` directly in a browser for a quick preview.
2. Or serve via a local static server (recommended):

```bash
# Python 3 (if installed)
cd "c:\Users\LVNS\OneDrive\Desktop\projrcts"
python -m http.server 8000
# then open http://localhost:8000/index.html
```

**How the CRUD works**
- Announcements and Events data are managed in-page with JavaScript. They are not persisted to a backend — edits live only for the current browser session.
- To persist, add a backend or integrate with a simple JSON storage or Git-based workflow.

**Deployment (Vercel)**
- Connect the GitHub repo to Vercel and set the framework to "Static Site". Vercel picks up `index.html` as the entry; `vercel.json` rewrites `/` to `/EASTCSO.html`.
- Redeploy after changes; if files do not appear, verify filename case (e.g., `EASTC.png` vs `EASTC.PNG`).

**Troubleshooting**
- Missing images: check the exact filename and extension in the repo. Filesystems and static hosts can be case-sensitive.
- 404 on deployment: ensure `index.html` exists and `vercel.json` is correct, or add a rewrite rule mapping `/` to your main page.

**Contributing / Next steps**
- Add a backend to persist announcements/events and the registration form data (suggest: simple Node/Express + JSON file or Firebase).
- Extract CSS into `layout.css` and refactor HTML for better maintainability.
- Add unit tests and CI for builds, or configure GitHub Actions to deploy to Vercel on commit.

**Contact**
- For help with deployment or feature requests, reply here and I will assist.
