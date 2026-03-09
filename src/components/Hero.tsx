import { useEffect, useRef } from "react";
import { Github, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="flex min-h-screen items-center justify-center px-6 pt-20"
    >
      <div className="max-w-2xl text-center">
        <p data-hero className="font-mono text-sm text-primary mb-4">
          Hi, my name is
        </p>
        <h1 data-hero className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          John Doe
        </h1>
        <p data-hero className="mt-4 text-xl text-muted-foreground sm:text-2xl">
          Backend Engineer &amp; Software Developer
        </p>
        <p data-hero className="mt-6 max-w-lg mx-auto text-muted-foreground">
          I build reliable backend systems, APIs, and scalable software.
          Passionate about system design and clean architecture.
        </p>
        <div data-hero className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild>
            <a href="#contact">
              <FileText className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
