# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Digital Dichotomy** is a static GitHub Pages site (no build step) authored by Fin Nyx featuring:
- Research articles on surveillance, privacy, and cognitive sovereignty
- Interactive patent database (React-based)
- Author's book catalog (6 Amazon books)
- Pure vanilla HTML/CSS/JS with Tailwind CSS (CDN v3.4.0)

**Important:** This is a static site. There is no build step, no package.json, no npm/bun commands. All changes are direct HTML/CSS/JS modifications.

## Critical Architecture Concepts

### Blog System (Dynamic, Driven by posts.json)
- **Single source of truth:** `posts.json` (42 entries as of Mar 2026)
- **Blog page:** `pages/blog.html` — JavaScript fetches `../posts.json?v=<timestamp>` and renders cards dynamically
- **Individual posts:** Each post has its own HTML file in `pages/post-<slug>.html`
- **How to add a post:**
  1. Create new HTML file: `pages/post-<slug>.html` (copy `POST_TEMPLATE.html` and fill placeholders)
  2. Add JSON entry to `posts.json` with: `slug`, `title`, `excerpt`, `category`, `date`, `date_iso`, `file`, `book_asin`, `book_title`, `book_url`
  3. The book CTA is auto-loaded from posts.json via JavaScript in the template

### Patent Database (sentinel.html)
- **Type:** React app (React 18 via unpkg CDN, Babel for JSX)
- **Data structure:** JavaScript arrays (`PATENTS_DATA` and `COUNTERMEASURES`)
- **How to add entries:** Append objects to the arrays in sentinel.html (lines ~120+)
- **Data model:** Each patent entry needs: `rank`, `id`, `assignee`, `title`, `alarmingReason`, `technicalDetail`, `category`, `tier`, `threatLevel`
- **Tier values:** Use existing tiers like "Tier I: Direct Biometric", "Tier XI: Neural Profiling", etc.
- **Threat levels:** Use `SeverityLevel.CRITICAL`, `.HIGH`, `.MEDIUM`, `.LOW`, `.DEFENSE`

### Academic Reference Document (pages/pat.html)
- **Type:** Long-form paper (Merriweather serif, academic layout)
- **Structure:** HTML tables organized by tier (I–XII), then research sections
- **How to add content:** Insert new `<h2>/<table>` blocks in appropriate section
- **Purpose:** Research reference, distinct from sentinel.html (which is interactive browsing)

## Navigation & Key Files

| File | Purpose |
|------|---------|
| `index.html` | Homepage (26k+ tokens, large file) |
| `pages/blog.html` | Blog listing page (fetches posts.json) |
| `posts.json` | Blog data (JSON array of post objects) |
| `POST_TEMPLATE.html` | Template for new blog posts (copy & fill placeholders) |
| `pages/post-*.html` | Individual blog post pages |
| `sentinel.html` | Interactive React patent database |
| `pages/pat.html` | Academic patent reference document |
| `styles.css` | Global CSS |
| `pages/the-analog-self.html` / `books.html` | Books catalog |
| `sitemap.xml` | SEO sitemap (manually maintained — update when adding pages) |

## Common Tasks

### Adding a New Blog Post
1. **Read** `POST_TEMPLATE.html` to understand structure
2. **Create** `pages/post-<slug>.html` (fill all POST_* placeholders)
3. **Update** `posts.json`: prepend entry with slug, title, excerpt, category, date (ISO: YYYY-MM-DD), file name, and book reference
4. **Update** `sitemap.xml` if adding a new page URL

### Updating the Patent Database (sentinel.html)
1. Locate `const PATENTS_DATA = [` in `sentinel.html`
2. Append new patent objects with all required fields
3. Use existing tier and threat level values
4. Test by checking the React component renders correctly

### Fixing or Updating Content in Existing Pages
- Edit HTML directly (no build step)
- For blog posts: edit `pages/post-*.html`
- For book references: update all matching entries in `posts.json`
- For site-wide elements (nav, footer): edit base template or affected pages

### Managing Book References
- **Amazon tag:** `digitaldichot-20` (include in all affiliate URLs)
- **Book ASINs (6 books):**
  - `B0G1TVB2GB` — The Algorithmic Shadow
  - `B0G1LT18CQ` — The Right to an Un-Modeled Self
  - `B0G1LB1T6N` — Biological Sovereignty
  - Author store: `https://www.amazon.com/stores/Fin-Nyx/author/B0G1VDFFDH?tag=digitaldichot-20`

## Known Issues & Cleanup Needed

### Data Quality Issues
1. **Duplicate slugs in posts.json:** `post-biometric-grid` and `post-bio-sovereignty-protocol` appear twice
2. **Malformed date_iso:** All entries use `"2025-12 8, 2025"` format instead of ISO 8601 (`"2025-12-08"`)
3. **Duplicate `<meta name="robots">` tags** in index.html (lines 36 & 54)

### Technical Debt
1. **Nested .git repo in `pages/`** — Can cause parent repo tracking issues; consider removing
2. **Empty `js/` directory** — Serves no purpose; safe to delete
3. **Root-level clutter:**
   - AI analysis artifacts: `COMPREHENSIVE_REPOSITORY_ANALYSIS.md`, `OPTIMIZATION_REPORT.md`, `REPOSITORY_ANALYSIS.md`, `QWEN.md`
   - Content drafts: `Appendices.md`, `Architecture_of_Covert_Self-Invasion.md`
   - Oddly-named file: `" -l -A -a class=nav-link... -k' -"` (looks like command injection artifact — investigate and delete)
   - Content/social directories not part of site: `content-upgrades/`, `faceless-reels/`
   - AI tool artifacts: `.agent_backups/`, `.factory/`

### File Organization
- All post HTML files live in `pages/` directory
- Images and PDFs in `assets/` and `media/`
- Do **not** create nested directories in `pages/countermeasures/` unless necessary

## Development Notes

### No Build/Lint/Test
This is a static site. There are no npm scripts, linters, or test runners. All development is direct file editing.

### Tailwind & Styling
- **CDN-based:** Tailwind loaded via `https://cdn.tailwindcss.com/3.4.0`
- **Dark mode:** `class="dark"` on `<html>` tag enables dark theme
- **Custom colors:** Primary red (`#dc2626`), secondary amber (`#f59e0b`) defined in tailwind config
- **Typography:** Mix of system fonts and serif (Merriweather in pat.html for academic style)

### JavaScript Notes
- **Vanilla JS:** No frameworks except React (CDN-based) in sentinel.html
- **React in sentinel.html:** React 18 + ReactDOM + Babel standalone for JSX
- **Browser APIs:** Used directly (fetch, localStorage, etc.)
- **No external dependencies** except Tailwind CDN, Feather Icons CDN, and React CDN

### SEO & Meta Tags
- **Important:** Keep meta tags consistent across pages (og:, twitter:, canonical URLs)
- **Structured data:** JSON-LD used for schema.org (Article, Organization, Book types)
- **CSP header:** Content Security Policy set in meta tag — allow CDN origins if adding new resources

## User Preferences

- **Communication style:** Direct, concise — avoid elaborate explanations
- **Content tone:** Forensic/investigative, not self-help or empowerment framing
- **Regulatory focus:** Prefer structural/legal analysis over individual countermeasures
- **No over-elaboration** on "defense protocols" — keep analysis clinical

## Git & Deployment

- **Hosted on:** GitHub Pages (branch: main)
- **No build step:** Push HTML directly to main, GitHub Pages serves automatically
- **sitemap.xml:** Manually maintained — update when adding new pages
- When adding new pages/posts, remember to update `sitemap.xml`

---

Last updated: March 2026
