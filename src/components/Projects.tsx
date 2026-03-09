import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { useCardTilt } from "@/hooks/useCardTilt";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ p }: { p: (typeof projects)[number] }) => {
  const { ref, handlers } = useCardTilt(8);

  return (
    <div ref={ref} {...handlers} data-project className="will-change-transform">
      <Card className="h-full border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{p.name}</CardTitle>
              <CardDescription className="mt-2">{p.description}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              {p.demoUrl && (
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Demo"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="mb-4 list-disc pl-5 text-sm text-muted-foreground space-y-1">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {p.techStack.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="font-mono text-xs transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow-motion reveal with 3D rotation
      gsap.from("[data-project]", {
        y: 100,
        opacity: 0,
        rotateX: 12,
        scale: 0.92,
        duration: 1.4,
        stagger: 0.25,
        ease: "power3.out",
        transformPerspective: 1000,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });

      gsap.from("[data-project-heading]", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div data-project-heading>
          <h2 className="font-mono text-sm text-primary mb-2">03.</h2>
          <h3 className="text-3xl font-bold mb-2">Projects</h3>
          <div className="h-[2px] w-16 bg-primary mb-10 origin-left" />
        </div>
        <div className="grid gap-6" style={{ perspective: "1000px" }}>
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
