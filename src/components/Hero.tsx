import { useEffect, useRef } from "react";
import { Github, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorGlow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Dramatic staggered entrance
      tl.from("[data-hero-line]", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        skewY: 4,
      })
        .from(
          "[data-hero-btn]",
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          "-=0.4"
        )
        .from(
          "[data-hero-glow]",
          {
            scale: 0.5,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
          },
          0
        );

      // Floating wobble on the name
      gsap.to("[data-hero-name]", {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Cursor-following glow
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!cursorGlow.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      gsap.to(cursorGlow.current, {
        x: e.clientX - rect.left - 200,
        y: e.clientY - rect.top - 200,
        duration: 1,
        ease: "power2.out",
      });
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouse);
    return () => el?.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        ref={cursorGlow}
        data-hero-glow
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
        }}
      />


      <div className="relative z-10 max-w-2xl text-center">
        <p data-hero-line className="font-mono text-sm text-primary mb-4">
          Hi, my name is
        </p>
        <h1
          data-hero-line
          data-hero-name
          className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          John Doe
        </h1>
        <p data-hero-line className="mt-4 text-xl text-muted-foreground sm:text-2xl">
          Backend Engineer &amp; Software Developer
        </p>
        <p data-hero-line className="mt-6 max-w-lg mx-auto text-muted-foreground">
          I build reliable backend systems, APIs, and scalable software.
          Passionate about system design and clean architecture.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <div data-hero-btn>
            <Button asChild size="lg">
              <a href="#contact">
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
          <div data-hero-btn>
            <Button variant="outline" size="icon" asChild className="h-11 w-11">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </div>
          <div data-hero-btn>
            <Button variant="outline" size="icon" asChild className="h-11 w-11">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
          <div className="h-2 w-1 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
