
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background/80">
      <div className="container mx-auto flex flex-col items-start md:items-center justify-between gap-6 px-4 py-8 md:flex-row md:gap-2">
        <p className="text-sm text-muted-foreground text-left">
          &copy; {new Date().getFullYear()} EletronicswithVK. All rights reserved.
        </p>
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
            <a href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
