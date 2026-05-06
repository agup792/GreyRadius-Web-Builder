export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="GreyRadius Consulting"
            className="h-10 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Services
          </a>
          <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Contact
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold px-5 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  );
}
