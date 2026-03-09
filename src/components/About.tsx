import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading slides in from left
      gsap.from("[data-about-heading]", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });

      // Paragraphs reveal with a slow-mo stagger
      gsap.from("[data-about-text]", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.25,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      // Decorative line grows
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
      <div className="mx-auto max-w-3xl">
        <div data-about-heading>
          <h2 className="font-mono text-sm text-primary mb-2">01.</h2>
          <h3 className="text-3xl font-bold mb-2">About Me</h3>
          <div
            data-about-line
            className="h-[2px] w-16 bg-primary mb-8 origin-left"
          />
        </div>
        <p data-about-text className="text-muted-foreground leading-relaxed mb-4 text-lg">
          I'm a software developer with a strong interest in backend engineering,
          API development, and building scalable software systems. I enjoy
          working with Python, TypeScript, and modern frameworks to create
          efficient solutions.
        </p>
        <p data-about-text className="text-muted-foreground leading-relaxed text-lg">
          My current focus areas include system design, distributed systems, and
          building production-ready APIs. I'm always looking to learn new
          technologies and improve my craft as an engineer.
        </p>
      </div>
    </section>
  );
};

export default About;
