
export function Footer() {
  return (
    <footer className="border-t bg-background/80">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 py-8 text-center md:px-6 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ElectroLearn. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
}
