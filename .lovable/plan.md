

## Problem

The "Currently Learning" and "Coming Soon" sections appear empty because GSAP `ScrollTrigger` animations set initial `opacity: 0` on all items, and the trigger likely isn't firing correctly in the preview iframe context. The data arrays are correctly populated — it's purely an animation visibility issue.

## Plan

**File: `src/components/Learning.tsx`**

1. Replace the GSAP ScrollTrigger-based entrance animations with simpler GSAP animations that don't depend on ScrollTrigger, or add a fallback that ensures elements are visible even if ScrollTrigger fails.

Specifically:
- Change the `gsap.from()` calls to use `scrollTrigger` with `toggleActions: "play none none none"` and add `onComplete` to ensure visibility
- Alternatively, simplify by using CSS-based animations (Tailwind `animate-`) instead of GSAP for this section, which is more reliable
- **Recommended approach**: Keep GSAP but set elements to `autoAlpha` instead of `opacity` and add a safety `setTimeout` that forces visibility after 2 seconds if ScrollTrigger hasn't fired. This preserves the nice elastic animations while ensuring content is never permanently hidden.

The simplest reliable fix: wrap the GSAP animations with a check and set `data-learn` / `data-future` elements to `opacity: 1` as a fallback after mount, so even if ScrollTrigger doesn't fire, the content is visible.

