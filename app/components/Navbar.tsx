"use client";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map(l => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/80 backdrop-blur-xl border-b border-graphite-2/60" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center
              group-hover:bg-neon/20 transition-all duration-300">
              <span className="font-display font-bold text-neon text-sm">P</span>
            </div>
            <span className="font-mono text-silver text-sm tracking-wider hidden sm:block">Portofolio</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 font-body text-sm transition-all duration-300 rounded-lg ${
                  active === link.href.replace("#", "")
                    ? "text-frost"
                    : "text-silver hover:text-silver-2"
                }`}
              >
                {active === link.href.replace("#", "") && (
                  <span className="absolute inset-0 bg-graphite-2/70 rounded-lg" />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/CV-ATS-RENARAYDWIINDAHSARI2026-1.pdf"
              download
              className="flex items-center gap-2 px-5 py-2.5 bg-neon/10 border border-neon/30 text-neon
                text-sm font-medium rounded-xl hover:bg-neon/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-graphite-2/50 transition-all"
          >
            <span className={`w-5 h-px bg-silver-2 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`w-5 h-px bg-silver-2 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-px bg-silver-2 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-80 border-t border-graphite-2/60" : "max-h-0"}`}>
          <div className="px-6 py-4 space-y-1 bg-ink/95 backdrop-blur-xl">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)}
                className="block w-full text-left px-4 py-3 font-body text-sm text-silver hover:text-frost rounded-lg hover:bg-graphite-2/50 transition-all">
                {link.label}
              </button>
            ))}
            <a href="/CV-ATS-RENARAYDWIINDAHSARI2026-1.pdf" download
              className="block w-full text-center mt-3 px-4 py-3 bg-neon/10 border border-neon/30 text-neon text-sm rounded-xl">
              Download CV
            </a>
          </div>
        </div>
      </nav>

      {/* Custom cursor (desktop only) */}
      <div id="cursor" style={{ display: 'none' }} />
      <div id="cursor-ring" style={{ display: 'none' }} />
    </>
  );
}
