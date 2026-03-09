import { Github } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10 px-6">
    <div className="mx-auto max-w-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <p className="font-mono text-sm text-muted-foreground">
        Built with React, TypeScript &amp; Tailwind CSS
      </p>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <Github className="h-5 w-5" />
      </a>
    </div>
  </footer>
);

export default Footer;
