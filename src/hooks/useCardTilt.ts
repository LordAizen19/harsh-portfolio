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
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  return { ref, handlers: { onMouseMove, onMouseLeave } };
}
