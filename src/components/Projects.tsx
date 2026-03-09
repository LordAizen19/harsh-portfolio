import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-project]", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-mono text-sm text-primary mb-2">03.</h2>
        <h3 className="text-3xl font-bold mb-10">Projects</h3>
        <div className="grid gap-6">
          {projects.map((p) => (
            <Card
              key={p.name}
              data-project
              className="group border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{p.name}</CardTitle>
                    <CardDescription className="mt-2">{p.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    {p.demoUrl && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Demo">
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
                    <Badge key={t} variant="secondary" className="font-mono text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
