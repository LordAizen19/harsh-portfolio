

## Problem

1. The "Currently Learning" section items may still be invisible due to GSAP `autoAlpha` not triggering properly.
2. Scroll animations only play once (`toggleActions: "play none none none"`) — scrolling back up and down again does nothing until page refresh.

## Plan

**File: `src/components/Learning.tsx`**

- Change all `toggleActions` from `"play none none none"` to `"restart none none reverse"` — this replays the entrance animation every time you scroll into the section and reverses when scrolling away, making it repeatable without refresh.
- Keep the 2-second safety fallback but also ensure initial element styles don't conflict (set `visibility: visible` as base via inline style or class so the fallback works cleanly).
- Verify the data arrays are intact (they are — FastAPI, PostgreSQL, Redis, Celery, ReactJS, TypeScript for current; AWS, DevOps for future).

**Single file change, ~3 lines modified** — just updating the `toggleActions` string in each of the three `scrollTrigger` configs.

