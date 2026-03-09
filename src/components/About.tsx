import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-about]", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 data-about className="font-mono text-sm text-primary mb-2">01.</h2>
        <h3 data-about className="text-3xl font-bold mb-6">About Me</h3>
        <p data-about className="text-muted-foreground leading-relaxed mb-4">
          I'm a software developer with a strong interest in backend engineering,
          API development, and building scalable software systems. I enjoy
          working with Python, TypeScript, and modern frameworks to create
          efficient solutions.
        </p>
        <p data-about className="text-muted-foreground leading-relaxed">
          My current focus areas include system design, distributed systems, and
          building production-ready APIs. I'm always looking to learn new
          technologies and improve my craft as an engineer.
        </p>
      </div>
    </section>
  );
};

export default About;
