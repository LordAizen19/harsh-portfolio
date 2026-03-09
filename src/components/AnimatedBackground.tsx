import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Rich gradient mesh canvas background with flowing color blobs,
 * subtle particles, and floating geometry. Looks like a painted image.
 */
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Floating shapes
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-shape]").forEach((el, i) => {
        gsap.to(el, {
          y: `random(-50, 50)`,
          x: `random(-40, 40)`,
          rotation: `random(-25, 25)`,
          duration: 14 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.6,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Canvas with color blobs + particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext("2d")!;
    let animId: number;

    const blobs = [
      { x: 0.15, y: 0.1, r: 350, color: [120, 80, 220], vx: 0.08, vy: 0.06 },    // Purple
      { x: 0.75, y: 0.08, r: 300, color: [16, 185, 129], vx: -0.06, vy: 0.07 },   // Emerald
      { x: 0.5, y: 0.35, r: 400, color: [59, 130, 246], vx: 0.05, vy: -0.04 },    // Blue
      { x: 0.2, y: 0.55, r: 280, color: [236, 72, 153], vx: -0.07, vy: 0.05 },    // Pink
      { x: 0.8, y: 0.5, r: 320, color: [245, 158, 11], vx: 0.04, vy: -0.06 },     // Amber
      { x: 0.4, y: 0.75, r: 350, color: [6, 182, 212], vx: -0.05, vy: -0.04 },    // Cyan
      { x: 0.85, y: 0.8, r: 260, color: [168, 85, 247], vx: 0.06, vy: 0.03 },     // Violet
      { x: 0.1, y: 0.9, r: 300, color: [34, 197, 94], vx: -0.04, vy: -0.05 },     // Green
    ];

    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      // Reinit particles on resize
      particles.length = 0;
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.5 + 0.5,
          o: Math.random() * 0.25 + 0.05,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const draw = () => {
      time += 0.002;
      const w = canvas.width;
      const h = canvas.height;

      // Dark base
      c.fillStyle = "hsl(240, 15%, 3%)";
      c.fillRect(0, 0, w, h);

      // Draw color blobs with slow movement
      blobs.forEach((blob) => {
        const bx = (blob.x + Math.sin(time * blob.vx * 10) * 0.05) * w;
        const by = (blob.y + Math.cos(time * blob.vy * 10) * 0.05) * h;
        const grad = c.createRadialGradient(bx, by, 0, bx, by, blob.r);
        const [r, g, b] = blob.color;
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.12)`);
        grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.06)`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        c.fillStyle = grad;
        c.fillRect(0, 0, w, h);
      });

      // Subtle noise-like overlay via scattered dots
      if (Math.random() > 0.7) {
        for (let i = 0; i < 3; i++) {
          c.beginPath();
          c.arc(
            Math.random() * w,
            Math.random() * h,
            Math.random() * 0.8,
            0,
            Math.PI * 2
          );
          c.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.03})`;
          c.fill();
        }
      }

      // Draw particles with connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fillStyle = `rgba(255, 255, 255, ${p.o})`;
        c.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            c.beginPath();
            c.moveTo(p.x, p.y);
            c.lineTo(particles[j].x, particles[j].y);
            c.strokeStyle = `rgba(255, 255, 255, ${0.04 * (1 - dist / 120)})`;
            c.lineWidth = 0.5;
            c.stroke();
          }
        }
      }

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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating geometry */}
      <div data-shape className="absolute top-[10%] left-[8%] h-28 w-28 rounded-full border border-white/[0.04]" />
      <div data-shape className="absolute top-[5%] right-[12%] h-16 w-16 rounded-full border-2 border-purple-400/[0.06]" />
      <div data-shape className="absolute top-[35%] left-[5%] h-14 w-14 rotate-45 border border-cyan-400/[0.06]" />
      <div data-shape className="absolute top-[55%] right-[8%] h-20 w-20 rounded-full border border-pink-400/[0.05]" />
      <div data-shape className="absolute bottom-[20%] left-[15%] h-24 w-24 rounded-lg border border-amber-400/[0.05] rotate-12" />
      <div data-shape className="absolute bottom-[35%] right-[20%] h-10 w-10 rounded-full bg-emerald-400/[0.03]" />
      <div data-shape className="absolute top-[70%] left-[40%] h-16 w-16 rotate-12 border border-blue-400/[0.04]" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(240, 15%, 3%) 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
