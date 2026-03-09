import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User } from "lucide-react";

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

      gsap.from("[data-about-image]", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
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
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Image placeholder */}
          <div data-about-image className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative group">
              <div className="w-40 h-48 rounded-lg border-2 border-primary/30 bg-secondary/50 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/20">
                {/* Replace the User icon with an <img> tag when you have your photo */}
                <User className="h-16 w-16 text-muted-foreground/40" />
              </div>
              {/* Decorative offset border */}
              <div className="absolute -bottom-2 -right-2 w-40 h-48 rounded-lg border-2 border-primary/20 -z-10 transition-all duration-500 group-hover:border-primary/40" />
            </div>
            <p className="text-xs text-muted-foreground/50 text-center mt-3 font-mono">your-photo.jpg</p>
          </div>

          <div className="flex-1">
            <p data-about-text className="text-muted-foreground leading-relaxed mb-4 text-lg">
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
      </div>
    </section>
  );
};

export default About;
