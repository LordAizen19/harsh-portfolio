import { useEffect, useRef } from "react";

/**
 * Smooth parallax gradient background — all elements move together
 * as you scroll, creating a cohesive floating effect. Colors are
 * dev-focused: cool blues, teals, and subtle purples.
 */
const AnimatedBackground = () => {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth parallax — all layers move upward together at different speeds
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        layerRefs.current.forEach((layer, i) => {
          if (!layer) return;
          // Each layer moves at a slightly different speed for depth
          const speed = 0.08 + i * 0.03;
          const y = lastScrollY * speed;
          layer.style.transform = `translate3d(0, ${-y}px, 0)`;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(240, 20%, 4%) 0%, hsl(220, 25%, 6%) 50%, hsl(240, 15%, 5%) 100%)",
        }}
      />

      {/* Layer 1 - Slow moving large blobs */}
      <div
        ref={(el) => (layerRefs.current[0] = el)}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="absolute -top-[5%] -left-[10%] h-[600px] w-[600px] rounded-full blur-[120px] animate-blob-1"
          style={{ background: "rgba(59, 130, 246, 0.18)" }}
        />
        <div
          className="absolute top-[60%] -right-[5%] h-[550px] w-[550px] rounded-full blur-[110px] animate-blob-2"
          style={{ background: "rgba(6, 182, 212, 0.15)" }}
        />
      </div>

      {/* Layer 2 - Medium speed blobs */}
      <div
        ref={(el) => (layerRefs.current[1] = el)}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="absolute top-[20%] right-[15%] h-[500px] w-[500px] rounded-full blur-[100px] animate-blob-3"
          style={{ background: "rgba(139, 92, 246, 0.12)" }}
        />
        <div
          className="absolute top-[45%] left-[10%] h-[480px] w-[480px] rounded-full blur-[100px] animate-blob-4"
          style={{ background: "rgba(16, 185, 129, 0.14)" }}
        />
        <div
          className="absolute top-[80%] left-[30%] h-[500px] w-[500px] rounded-full blur-[110px] animate-blob-1"
          style={{ background: "rgba(59, 130, 246, 0.12)" }}
        />
      </div>

      {/* Layer 3 - Faster accent blobs */}
      <div
        ref={(el) => (layerRefs.current[2] = el)}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="absolute top-[10%] left-[40%] h-[350px] w-[350px] rounded-full blur-[80px] animate-blob-2"
          style={{ background: "rgba(34, 211, 238, 0.1)" }}
        />
        <div
          className="absolute top-[55%] right-[25%] h-[300px] w-[300px] rounded-full blur-[70px] animate-blob-4"
          style={{ background: "rgba(168, 85, 247, 0.08)" }}
        />
        <div
          className="absolute top-[85%] right-[10%] h-[400px] w-[400px] rounded-full blur-[90px] animate-blob-3"
          style={{ background: "rgba(6, 182, 212, 0.1)" }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(240, 20%, 3%) 100%)",
        }}
      />

      {/* Top edge glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-[800px] rounded-full blur-[100px] opacity-30"
        style={{ background: "rgba(59, 130, 246, 0.15)" }}
      />
    </div>
  );
};

export default AnimatedBackground;
