import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const currentItems = [
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Celery",
  "ReactJS",
  "TypeScript",
];

const futureItems = [
  "AWS",
  "DevOps",
];

const Learning = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Safety fallback: ensure items are visible even if ScrollTrigger fails
    const fallback = setTimeout(() => {
      ref.current?.querySelectorAll("[data-learn], [data-future], [data-learn-heading]").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
    }, 2000);

    const ctx = gsap.context(() => {
      gsap.from("[data-learn-heading]", {
        x: -60,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" },
      });

      gsap.from("[data-learn]", {
        x: (i) => (i % 2 === 0 ? -60 : 60),
        y: 30,
        autoAlpha: 0,
        rotation: (i) => (i % 2 === 0 ? -5 : 5),
        duration: 1,
        stagger: 0.15,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
      });

      gsap.from("[data-future]", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-future-heading]", start: "top 85%", toggleActions: "play none none none" },
      });
    }, ref);
    return () => { clearTimeout(fallback); ctx.revert(); };
  }, []);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div data-learn-heading>
          <h2 className="font-mono text-sm text-primary mb-2">04.</h2>
          <h3 className="text-3xl font-bold mb-2">Currently Learning</h3>
          <div className="h-[2px] w-16 bg-primary mb-10 origin-left" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((item) => (
            <div
              key={item}
              data-learn
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-default"
            >
              <BookOpen className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">{item}</span>
              <span className="ml-auto inline-block h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            </div>
          ))}
        </div>

        {/* Future / Soon */}
        <div className="mt-14" data-future-heading>
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Rocket className="h-5 w-5 text-accent" />
            Coming Soon
          </h3>
          <p className="text-muted-foreground text-sm mb-6">Technologies I plan to learn next</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {futureItems.map((item) => (
              <div
                key={item}
                data-future
                className="flex items-center gap-3 rounded-lg border border-dashed border-accent/40 bg-accent/5 p-5 transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 cursor-default"
              >
                <Rocket className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm font-medium">{item}</span>
                <span className="ml-auto font-mono text-xs text-accent/60">soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Learning;
