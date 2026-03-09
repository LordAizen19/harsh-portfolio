import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillCategories } from "@/data/skills";
import { useCardTilt } from "@/hooks/useCardTilt";

gsap.registerPlugin(ScrollTrigger);

const SkillCard = ({ cat }: { cat: (typeof skillCategories)[number] }) => {
  const { ref, handlers } = useCardTilt(10);
  return (
    <div ref={ref} {...handlers} data-skill-card className="will-change-transform">
      <Card className="h-full bg-card border-border transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{cat.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {cat.skills.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="font-mono text-xs transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {s}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow-mo cards rising with rotation
      gsap.from("[data-skill-card]", {
        y: 80,
        opacity: 0,
        rotateX: 15,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        transformPerspective: 800,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });

      // Heading
      gsap.from("[data-skill-heading]", {
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
    <section id="skills" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div data-skill-heading>
          <h2 className="font-mono text-sm text-primary mb-2">02.</h2>
          <h3 className="text-3xl font-bold mb-2">Skills</h3>
          <div className="h-[2px] w-16 bg-primary mb-10 origin-left" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "800px" }}>
          {skillCategories.map((cat) => (
            <SkillCard key={cat.name} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
