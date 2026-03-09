import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-about-heading]", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });

      gsap.from("[data-about-text]", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.25,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      gsap.from("[data-about-line]", {
        scaleX: 0,
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div data-about-heading>
          <h2 className="font-mono text-sm text-primary mb-2">01.</h2>
          <h3 className="text-3xl font-bold mb-2">About Me</h3>
          <div
            data-about-line
            className="h-[2px] w-16 bg-primary mb-8 origin-left"
          />
        </div>
        <div className="space-y-4">
          <p data-about-text className="text-muted-foreground leading-relaxed text-lg">
            I'm a Python developer passionate about building production-ready APIs
            using FastAPI. I love creating efficient backend systems with clean
            architecture while ensuring the frontend stays minimal and elegant.
          </p>
          <p data-about-text className="text-muted-foreground leading-relaxed text-lg">
            My focus areas include API development, system design, and crafting
            smooth user experiences. I'm always exploring new tools and patterns
            to build better software.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
