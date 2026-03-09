import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-contact]", {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
      setSending(false);
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-xl text-center">
        <h2 data-contact className="font-mono text-sm text-primary mb-2">05.</h2>
        <h3 data-contact className="text-3xl font-bold mb-4">Get In Touch</h3>
        <p data-contact className="text-muted-foreground mb-8">
          Have a question or want to work together? Feel free to reach out.
        </p>

        <div data-contact className="flex items-center justify-center gap-4 mb-10">
          <Button variant="outline" size="icon" asChild>
            <a href="mailto:hello@example.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>

        <form data-contact onSubmit={handleSubmit} className="space-y-4 text-left">
          <Input placeholder="Name" required />
          <Input type="email" placeholder="Email" required />
          <Textarea placeholder="Message" rows={5} required />
          <Button type="submit" className="w-full" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
