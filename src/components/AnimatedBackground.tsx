import { useEffect, useRef } from "react";

/**
 * Performant colorful gradient background using CSS animations
 * instead of heavy canvas rendering. Smooth on scroll, no jank.
 */
const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll — lightweight transform only
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (containerRef.current) {
          const y = window.scrollY * 0.15;
          containerRef.current.style.transform = `translateY(${y}px)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 will-change-transform">
        {/* Large vivid gradient blobs — CSS animated for GPU performance */}
        <div
          className="absolute -top-[10%] -left-[10%] h-[700px] w-[700px] rounded-full blur-[100px] animate-blob-1"
          style={{ background: "rgba(139, 92, 246, 0.35)" }}
        />
        <div
          className="absolute top-[5%] right-[-5%] h-[600px] w-[600px] rounded-full blur-[100px] animate-blob-2"
          style={{ background: "rgba(6, 182, 212, 0.3)" }}
        />
        <div
          className="absolute top-[25%] left-[30%] h-[650px] w-[650px] rounded-full blur-[120px] animate-blob-3"
          style={{ background: "rgba(59, 130, 246, 0.3)" }}
        />
        <div
          className="absolute top-[15%] right-[25%] h-[500px] w-[500px] rounded-full blur-[90px] animate-blob-4"
          style={{ background: "rgba(236, 72, 153, 0.28)" }}
        />
        <div
          className="absolute top-[50%] left-[5%] h-[600px] w-[600px] rounded-full blur-[110px] animate-blob-2"
          style={{ background: "rgba(245, 158, 11, 0.25)" }}
        />
        <div
          className="absolute top-[45%] right-[10%] h-[550px] w-[550px] rounded-full blur-[100px] animate-blob-1"
          style={{ background: "rgba(16, 185, 129, 0.3)" }}
        />
        <div
          className="absolute top-[70%] left-[25%] h-[600px] w-[600px] rounded-full blur-[110px] animate-blob-3"
          style={{ background: "rgba(168, 85, 247, 0.3)" }}
        />
        <div
          className="absolute top-[80%] right-[5%] h-[500px] w-[500px] rounded-full blur-[90px] animate-blob-4"
          style={{ background: "rgba(34, 211, 238, 0.25)" }}
        />
        <div
          className="absolute top-[65%] left-[50%] h-[550px] w-[550px] rounded-full blur-[100px] animate-blob-1"
          style={{ background: "rgba(244, 63, 94, 0.22)" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Light vignette — not too strong so colors stay visible */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, hsl(240, 15%, 3%) 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
