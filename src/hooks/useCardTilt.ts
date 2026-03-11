import { useRef, useCallback } from "react";
import gsap from "gsap";

/**
 * Hook that adds a 3D tilt / wobble effect to a card on mouse move.
 * Attach `ref` to the element and spread `handlers` onto it.
 */
export function useCardTilt(intensity = 15) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      gsap.to(el, {
        rotateX,
        rotateY,
        scale: 1.03,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      });
    },
    [intensity]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const randomRot = (Math.random() - 0.5) * 6;
    const tl = gsap.timeline();
    tl.to(el, {
      scale: 0.95,
      rotateX: randomRot,
      rotateY: -randomRot,
      duration: 0.15,
      ease: "power2.in",
      transformPerspective: 800,
    }).to(el, {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  return { ref, handlers: { onMouseMove, onMouseLeave } };
}
