import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "FastAPI",
  "PostgreSQL",
  "Backend System Design",
  "Distributed Systems",
];

const Learning = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-learn-heading]", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });

      // Cards wobble in from alternating sides
      gsap.from("[data-learn]", {
        x: (i) => (i % 2 === 0 ? -60 : 60),
        y: 30,
        opacity: 0,
        rotation: (i) => (i % 2 === 0 ? -5 : 5),
        duration: 1,
        stagger: 0.15,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div data-learn-heading>
          <h2 className="font-mono text-sm text-primary mb-2">04.</h2>
          <h3 className="text-3xl font-bold mb-2">Currently Learning</h3>
          <div className="h-[2px] w-16 bg-primary mb-10 origin-left" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
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
      </div>
    </section>
  );
};

export default Learning;
