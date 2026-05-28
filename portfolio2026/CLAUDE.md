# CLAUDE.md — Portfolio Website Build Guide

## What This Project Is

A personal portfolio website for a designer. It has:
- 1 homepage (`index.html`) — shows an intro and links to all case studies
- 5 case study pages (`case-study-1.html` through `case-study-5.html`) — detailed project pages
- 1 optional about page (`about.html`)

All content already exists in HTML files. The job is to **polish the layout and styling** — not rewrite the content.

---

## File Structure

```
portfolio/
├── CLAUDE.md               ← this file
├── design.md               ← design system to follow (read this first)
├── index.html              ← homepage
├── case-study-1.html
├── case-study-2.html
├── case-study-3.html
├── case-study-4.html
├── case-study-5.html
├── about.html              ← optional
└── images/                 ← all image assets
```

---

## Design Direction

**Style:** Clean and minimal. Lots of white space. Let the work speak.

**Reference site:** https://stepcv.framer.website/
Study this site carefully. Key things to borrow:
- Single-column, generous white space layout
- Clear typographic hierarchy — large name/title, clean body text
- Subtle dividers between sections, not heavy borders
- Project cards that are simple: image + title
- Calm, professional energy — nothing flashy or decorative
- Footer that is minimal and uncluttered

**Always read `design.md` before writing any CSS.** Apply the colors, fonts, and spacing defined there consistently across all pages.

---

## Navigation Rules

These must work correctly on every page:

### Homepage (`index.html`)
- Each case study card links to its detail page
- Navigation is minimal — just the designer's name as a logo/home link

### Case Study Pages
- **Back button** at the top: "← Back to home" — links to `index.html`
- **Previous / Next navigation** at the bottom: links to the previous and next case study
- Case study 1 has no "previous", case study 5 has no "next"

### About Page (if built)
- Back button at top: "← Back to home"

---

## Technical Rules

- **Mobile-first.** Build for 360px screen width first, then add desktop styles using `min-width: 768px` media queries
- **No frameworks.** Plain HTML and CSS only. No Bootstrap, no Tailwind, no JavaScript libraries unless absolutely needed
- **One CSS file.** Create a single `style.css` and link it in every HTML page — do not use `<style>` tags inside HTML files
- **Relative links only.** All links between pages use relative paths (e.g., `./case-study-1.html`), never absolute URLs
- **Images** are in the `images/` folder — reference them as `./images/filename.jpg`
- **No external fonts via JavaScript** — use Google Fonts `<link>` tag in the `<head>` only

---

## Layout Specs

### Homepage layout (top to bottom):
1. Header — name + short title/tagline
2. Brief intro paragraph
3. Case studies grid — on mobile: 1 column, on desktop: 2 columns
4. Footer — minimal, just copyright or a contact line

### Case Study layout (top to bottom):
1. Back button — top left, small and subtle
2. Project title + short description
3. Hero image — full width
4. Content sections — read from the existing HTML and preserve them
5. Previous / Next navigation — bottom of page

---

## Tone Reminders

- White space is not emptiness — it's part of the design
- Typography does the heavy lifting — size contrast between headings and body text
- Hover states on links and cards should be subtle (slight opacity change or underline), not dramatic
- No drop shadows that are too heavy, no gradients, no decorative illustrations

---

## How to Work

Process all pages in this order:
1. Create `style.css` first
2. Polish `index.html`
3. Polish each case study page (1 through 5) — they should all use the same layout template
4. Polish `about.html` last (if requested)

After each page, confirm it looks correct on mobile (360px) before moving to desktop styling.
