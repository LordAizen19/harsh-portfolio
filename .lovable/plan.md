

# Developer Portfolio Website

## Overview
A clean, minimal, dark-mode-first single-page portfolio with smooth animations, sticky navigation, and full responsiveness.

## Pages & Sections

### Sticky Navigation Bar
- Links: Home, About, Skills, Projects, Contact
- Smooth scroll to each section
- Dark/light mode toggle button
- Responsive hamburger menu on mobile

### Hero Section
- Developer name and tagline
- GitHub and LinkedIn icon links
- "Download Resume" button
- GSAP entrance animation (fade-in + slide-up for text elements, staggered)

### About Section
- Short paragraph about backend engineering interests, API development, system design
- Scroll-reveal animation via GSAP

### Skills Section
- Skills grouped into cards by category: Languages, Frontend, Backend, Databases, Tools, Learning Next
- Each skill displayed as a badge/chip
- Data sourced from `src/data/skills.ts`

### Projects Section
- Project cards with name, description, tech stack badges, GitHub link, optional demo link
- TaskScore project included with all specified details
- Hover animations on cards (subtle scale + shadow)
- Data sourced from `src/data/projects.ts`

### Currently Learning Section
- Grid/list of technologies being studied (FastAPI, PostgreSQL, backend architecture, distributed systems)
- Visual indicator showing "in progress" learning status

### Contact Section
- Email, GitHub, LinkedIn links with icons
- Simple contact form (name, email, message) — frontend only with toast confirmation

## Design
- Dark mode by default with light mode toggle (using `next-themes`)
- Color scheme: dark backgrounds with accent color highlights
- Clean typography, generous spacing
- Subtle GSAP scroll-reveal animations throughout
- Fully responsive: desktop, tablet, mobile

## Data Files
- `src/data/projects.ts` — project entries
- `src/data/skills.ts` — skills grouped by category

## Technical Notes
- GSAP will be added as a dependency for hero entrance and scroll-triggered animations
- Single-page layout with section-based routing via anchor links
- Build output to `dist` (default Vite behavior, Vercel-compatible)

