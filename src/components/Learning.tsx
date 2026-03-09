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
      gsap.from("[data-learn]", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-mono text-sm text-primary mb-2">04.</h2>
        <h3 className="text-3xl font-bold mb-10">Currently Learning</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item}
              data-learn
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
            >
              <BookOpen className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">{item}</span>
              <span className="ml-auto inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Learning;
