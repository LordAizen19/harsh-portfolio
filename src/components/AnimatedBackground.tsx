import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Animated background with floating geometric shapes, drifting particles,
 * and subtle grid lines — minimal anime-inspired aesthetic, no characters.
 */
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Floating geometric shapes animated with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each shape infinitely with random drift
      gsap.utils.toArray<HTMLElement>("[data-shape]").forEach((el, i) => {
        const dur = 12 + i * 4;
        gsap.to(el, {
          y: `random(-40, 40)`,
          x: `random(-30, 30)`,
          rotation: `random(-20, 20)`,
          duration: dur,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.8,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Canvas particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext("2d");
    if (!c) return;

    let animId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      o: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.3 + 0.05,
      });
    }

    const draw = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            c.beginPath();
            c.moveTo(particles[i].x, particles[i].y);
            c.lineTo(particles[j].x, particles[j].y);
            c.strokeStyle = `rgba(16, 185, 129, ${0.06 * (1 - dist / 150)})`;
            c.lineWidth = 0.5;
            c.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fillStyle = `rgba(16, 185, 129, ${p.o})`;
        c.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating geometric shapes — anime-style clean geometry */}
      {/* Top-left circle */}
      <div
        data-shape
        className="absolute top-[10%] left-[8%] h-32 w-32 rounded-full border border-primary/10"
      />
      {/* Top-right ring */}
      <div
        data-shape
        className="absolute top-[5%] right-[12%] h-20 w-20 rounded-full border-2 border-primary/8"
      />
      {/* Mid-left diamond */}
      <div
        data-shape
        className="absolute top-[35%] left-[5%] h-16 w-16 rotate-45 border border-primary/10"
      />
      {/* Mid-right triangle (CSS) */}
      <div
        data-shape
        className="absolute top-[55%] right-[8%]"
        style={{
          width: 0,
          height: 0,
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderBottom: "35px solid hsla(160, 84%, 39%, 0.06)",
        }}
      />
      {/* Bottom-left hexagon-ish */}
      <div
        data-shape
        className="absolute bottom-[20%] left-[15%] h-24 w-24 rounded-lg border border-primary/8 rotate-12"
      />
      {/* Bottom-right small circle */}
      <div
        data-shape
        className="absolute bottom-[30%] right-[20%] h-10 w-10 rounded-full bg-primary/[0.03]"
      />
      {/* Large faint circle center */}
      <div
        data-shape
        className="absolute top-[45%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full border border-primary/[0.04]"
      />

      {/* Radial gradient vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
        }}
      />

      {/* Top glow accent */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: "hsl(var(--primary) / 0.15)" }}
      />

      {/* Bottom glow accent */}
      <div
        className="absolute -bottom-32 right-[20%] h-48 w-[400px] rounded-full opacity-15 blur-3xl"
        style={{ background: "hsl(var(--primary) / 0.1)" }}
      />
    </div>
  );
};

export default AnimatedBackground;
