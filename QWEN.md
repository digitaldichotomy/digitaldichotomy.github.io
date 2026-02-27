# QWEN.md - Project Context & AI Assistant Guidelines

**Purpose:** This file provides context for AI assistants working on the Digital Dichotomy Research website. It documents site architecture, conventions, common tasks, and known issues.

**Audience:** AI assistants, collaborators, and future maintainers

**Location:** Root directory (tracked in git)

---

## Project Overview

**Digital Dichotomy Research** is an academic research platform documenting surveillance technology patents, privacy engineering countermeasures, and biological sovereignty frameworks. The site presents evidence-based analysis of biometric surveillance infrastructure through verifiable patents, technical standards, and government documentation.

**Author:** Fin Nyx (pseudonym)  
**Site Type:** Static GitHub Pages site  
**Primary Domain:** https://digitaldichotomy.github.io

---

## Site Architecture

### Core Files

| File | Purpose |
|------|---------|
| `index.html` | Homepage - Research overview, featured publications, action center |
| `sentinel.html` | Interactive surveillance technology catalog (React SPA, 70 patents) |
| `the-analog-self.html` | Flagship publication landing page |
| `pages/pat.html` | Comprehensive patent research document (2,771 lines, ~125 patents) |
| `pages/blog.html` | Blog/Field Notes index (38 posts) |
| `pages/resource-hub.html` | Action resources and tools |

### Key Directories

```
/pages/           - 60+ content pages (blog posts, countermeasures, state resources)
/pages/countermeasures/ - Specific defense protocol implementations
/assets/          - Media and static resources
/content-upgrades/ - Downloadable materials
```

---

## Technical Stack

- **Framework:** Static HTML/CSS/JavaScript
- **Styling:** Tailwind CSS (CDN)
- **Icons:** Feather Icons
- **Interactive Components:** React 18 (via CDN with Babel standalone)
- **Analytics:** Google Analytics (G-1XGTK43HYL)
- **Hosting:** GitHub Pages

---

## Content Guidelines

### Tone & Presentation

1. **Academic, not alarmist** - Present research objectively
2. **Evidence-based** - All claims reference verifiable patents/documentation
3. **Professional terminology** - Avoid sensationalist language
4. **Clear distinction** - Separate surveillance technologies from countermeasures

### Terminology Standards

| Use | Avoid |
|-----|-------|
| "Surveillance Technology Catalog" | "SENTINEL_DB", "LEAK" |
| "Severity Level" | "Threat Level" |
| "Countermeasure" | "Defense Protocol" (when referring to COUNTERMEASURE category) |
| "Research Publications" | "Books" (for Amazon links, use "Publications") |
| "Biometric Sovereignty" | Conspiracy-adjacent terminology |

---

## Amazon Affiliate Integration

**Author Store:** https://www.amazon.com/stores/Fin-Nyx/author/B0G1VDFFDH

### Affiliate Tag Usage

All Amazon links MUST include `?tag=digitaldichot-20`:

```html
<!-- Correct -->
<a href="https://www.amazon.com/dp/B0DHYDFJWV?tag=digitaldichot-20">

<!-- Incorrect -->
<a href="https://www.amazon.com/dp/B0DHYDFJWV">
```

### Publication ASINs

| Title | ASIN | Category |
|-------|------|----------|
| The Right to an Un-Modeled Self | B0DHYDFJWV | Primary Publication |
| The Transparent Self | B0DHYX4L7Q | Research Publication |
| Architecture of Covert Self-Invasion | B0DHYWY1KH | Research Publication |

---

## Code Style & Conventions

### HTML Structure

- Semantic HTML5 elements
- ARIA labels for accessibility
- Mobile-first responsive design
- Dark mode support via Tailwind `dark:` classes

### JavaScript Patterns

- IIFE for utility scripts
- Event delegation for dynamic content
- Graceful degradation with error handlers
- No build step - vanilla JS + React via CDN

### CSS Approach

- Tailwind utility classes (CDN)
- Custom CSS in `styles.css` for complex components
- Mobile menu: custom implementation (not Tailwind classes)

---

## Common Tasks

### Adding a New Blog Post

1. Create `pages/post-{slug}.html`
2. Copy structure from existing post
3. Add to `pages/blog.html` grid
4. Update search index if needed

### Updating Patent Data

**Interactive Catalog:** Edit `sentinel.html` PATENTS_DATA array  
**Research Document:** Edit `pages/pat.html` HTML tables

### Adding Countermeasures

Update `COUNTERMEASURES` array in `sentinel.html`:

```javascript
{
  name: "Protocol Name",
  targetThreat: "Specific threat addressed",
  description: "Mechanism and effectiveness",
  effectiveness: "★★★", // 1-3 stars
  type: "Physical|Digital|Behavioral|Legal"
}
```

---

## Known Issues & Technical Debt

1. **Duplicate script includes** in some pages (being cleaned up)
2. **Tailwind CDN limitations** - Some responsive classes need CSS fallbacks
3. **Mobile navigation** - Custom implementation, verify on small screens
4. **Search functionality** - Uses `search-index.json` (may need regeneration)

---

## Deployment

Site deploys automatically via GitHub Pages when changes are pushed to the main branch.

```bash
# Standard workflow
git add .
git commit -m "Description of changes"
git push
# Wait ~2 minutes for GitHub Pages deployment
```

---

## Content Verification

Before publishing:

- [ ] All Amazon links have affiliate tag
- [ ] Mobile navigation works
- [ ] Dark mode displays correctly
- [ ] No console errors
- [ ] Academic tone maintained
- [ ] Patent IDs are valid format
- [ ] Countermeasures clearly labeled as informational

---

## Contact & Attribution

**Research Attribution:** Digital Dichotomy Research / Fin Nyx
**ISBN:** 978-82-7346-414-8 (The Right to an Un-Modeled Self)
**License:** Informational/Academic use

---

## Recent Optimizations (2025-12-03)

### Completed Work

1. **Script Cleanup** - Removed 304 duplicate script includes → 60 (80% reduction)
2. **Image Optimization** - Compressed images, saved ~500 KB total
3. **Tailwind CDN** - Pinned to v3.4.0 across all 67 HTML files
4. **Mobile Navigation** - Verified CSS responsive breakpoints
5. **Documentation** - Created OPTIMIZATION_REPORT.md

### Current Site Grade: **B+** (up from B-)

See `OPTIMIZATION_REPORT.md` for full details.

---

## AI Assistant Guidelines

### When Working on This Project

1. **Maintain credibility** - Professional, academic presentation
2. **Verify patent data** - Cross-reference with USPTO/Google Patents
3. **Test mobile** - 50%+ traffic is mobile
4. **Preserve affiliate tags** - Critical for revenue
5. **No conspiracy language** - Evidence-based framing only
6. **Check for duplicates** - Before adding scripts, verify they don't already exist
7. **Update this file** - Document any patterns or fixes discovered

### Common Tasks & Solutions

#### Adding a New Blog Post

1. Create `pages/post-{slug}.html`
2. Copy structure from existing post (e.g., `pages/post-wifi-sensing.html`)
3. Add to `pages/blog.html` grid
4. **Important:** Only include `media-error-handler.js` ONCE in `<head>`

#### Updating Amazon Links

All Amazon links MUST include `?tag=digitaldichot-20`:

```html
<!-- Correct -->
<a href="https://www.amazon.com/dp/B0DHYDFJWV?tag=digitaldichot-20">

<!-- Incorrect -->
<a href="https://www.amazon.com/dp/B0DHYDFJWV">
```

#### Adding Scripts to Pages

```html
<!-- CORRECT: Single include in <head> -->
<script src="../media-error-handler.js" onerror="console.warn('Media error handler failed to load');"></script>

<!-- WRONG: Don't add multiple times -->
<script src="../media-error-handler.js"></script>
<script src="../media-error-handler.js"></script>
```

**Before adding any script:** Search file to ensure it's not already included.

---

## AI Assistant Notes

### When Editing This Project

1. **Maintain credibility** - Professional, academic presentation
2. **Verify patent data** - Cross-reference with USPTO/Google Patents
3. **Test mobile** - 50%+ traffic is mobile
4. **Preserve affiliate tags** - Critical for revenue
5. **No conspiracy language** - Evidence-based framing only

### Common User Requests

- "Add my book to the site" → Add to `sentinel.html` PATENTS_DATA + update Amazon links
- "Fix mobile menu" → Check `styles.css` hamburger button media queries
- "Update patent count" → Edit both `sentinel.html` and `pages/pat.html`
- "Add dark mode" → Use Tailwind `dark:` classes + toggle function

---

**Last Updated:** 2025-12-03  
**QWEN.md Version:** 1.1 (tracked in git)
