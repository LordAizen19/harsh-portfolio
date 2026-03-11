

## Plan

### 1. Card shrink & wobble on mouse leave (`src/hooks/useCardTilt.ts`)

Update the `onMouseLeave` callback to first shrink the card to `scale: 0.95` with a slight random rotation, then bounce back to `scale: 1` using a GSAP timeline with elastic easing — creating a satisfying "wobble" effect.

### 2. Image side effects (`src/components/Hero.tsx`)

Add animated decorative elements around the image placeholder:
- **Orbiting dots**: 2-3 small glowing circles that slowly rotate around the image using CSS keyframe animations
- **Pulse ring**: A pulsing border ring that expands and fades out on loop
- **Floating particles**: Small purple/blue dots that float upward around the image using CSS animations
- Add a subtle **continuous glow pulse** on the gradient border frame

These will all be CSS-driven (no extra GSAP) using Tailwind's `animate-` utilities and custom keyframes added to `tailwind.config.ts`.

### Files to modify
- `src/hooks/useCardTilt.ts` — wobble + shrink on leave
- `src/components/Hero.tsx` — decorative animated elements around image
- `tailwind.config.ts` — custom keyframes for orbit, pulse-ring, float-up animations

