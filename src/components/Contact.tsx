import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Send } from "lucide-react";
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
      gsap.from("[data-contact-heading]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });

      gsap.from("[data-contact-icons]", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(3)",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      gsap.from("[data-contact-form]", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setSending(false);
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-xl text-center">
        <div data-contact-heading>
          <h2 className="font-mono text-sm text-primary mb-2">05.</h2>
          <h3 className="text-3xl font-bold mb-4">Get In Touch</h3>
          <p className="text-muted-foreground mb-8">
            Have a question or want to work together? Feel free to reach out.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div data-contact-icons>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-12 w-12 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
            >
              <a href="mailto:hello@example.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
          <div data-contact-icons>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-12 w-12 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </div>
          <div data-contact-icons>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-12 w-12 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        <form
          data-contact-form
          onSubmit={handleSubmit}
          className="space-y-4 text-left"
        >
          <Input placeholder="Name" required className="h-12" />
          <Input type="email" placeholder="Email" required className="h-12" />
          <Textarea placeholder="Message" rows={5} required />
          <Button type="submit" className="w-full h-12" disabled={sending}>
            {sending ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
