"use client";
import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { href: "#home",       label: t.nav.home[lang],       icon: "⌂" },
    { href: "#about",      label: t.nav.about[lang],      icon: "◈" },
    { href: "#skills",     label: t.nav.skills[lang],     icon: "◎" },
    { href: "#experience", label: t.nav.experience[lang], icon: "◇" },
    { href: "#contact",    label: t.nav.contact[lang],    icon: "◉" },
  ];

  useEffect(() => {
    // Pastikan light-mode selalu aktif
    document.documentElement.classList.add("light-mode");
    document.documentElement.classList.remove("dark-mode");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 40);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const sections = navLinks.map(l => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && scrollTop >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lang]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/80 shadow-sm" : "bg-transparent"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(20,184,166,0.15)"
            : "1px solid transparent",
        }}
      >
        {/* ── Scroll progress bar ── */}
        <div
          className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, rgba(20,184,166,0.8), rgba(99,102,241,0.6), rgba(236,72,153,0.4))",
            boxShadow: "0 0 8px rgba(20,184,166,0.5)",
          }}
        />

        {/* ── Top shimmer line ── */}
        {!scrolled && (
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.3) 50%, transparent 100%)" }}
          />
        )}

        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 group"
            style={{ transition: "all 0.3s ease" }}
          >
            <div
              className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: "rgba(20,184,166,0.08)",
                border: "1px solid rgba(20,184,166,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.18)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.6)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(20,184,166,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                style={{ background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.2), transparent)" }}
              />
              <span
                className="font-display font-bold text-base relative z-10"
                style={{ color: "#0d9488", textShadow: "0 0 12px rgba(20,184,166,0.4)" }}
              >
                R
              </span>
            </div>

            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="font-mono text-xs tracking-[0.18em] uppercase"
                style={{ color: "#0f172a", letterSpacing: "0.2em" }}
              >
                Portofolio
              </span>
              <span
                className="font-mono tracking-widest"
                style={{ fontSize: 9, color: "rgba(13,148,136,0.5)", letterSpacing: "0.25em" }}
              >
                · · ·
              </span>
            </div>
          </button>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-0.5 relative">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: scrolled ? "rgba(241,245,249,0.6)" : "transparent",
                border: scrolled ? "1px solid rgba(20,184,166,0.1)" : "1px solid transparent",
                backdropFilter: "blur(8px)",
              }}
            />

            {navLinks.map((link) => {
              const isActive = active === link.href.replace("#", "");
              const isHovered = hoveredLink === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-4 py-2 font-body text-sm rounded-xl transition-all duration-200 z-10"
                  style={{
                    color: isActive ? "#0f172a" : "#475569",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {(isActive || isHovered) && (
                    <span
                      className="absolute inset-0 rounded-xl transition-all duration-200"
                      style={{
                        background: isActive ? "rgba(20,184,166,0.1)" : "rgba(20,184,166,0.05)",
                        border: isActive ? "1px solid rgba(20,184,166,0.25)" : "1px solid rgba(20,184,166,0.08)",
                      }}
                    />
                  )}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "rgba(20,184,166,0.9)", boxShadow: "0 0 6px rgba(20,184,166,0.8)" }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Actions ── */}
          <div className="hidden md:flex items-center gap-2">

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              title={lang === "id" ? "Switch to English" : "Ganti ke Indonesia"}
              className="relative flex items-center gap-1 px-3 py-2 rounded-xl overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(15,23,42,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.07)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.3)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(15,23,42,0.15)";
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                style={{ background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.1), transparent)" }}
              />
              <span className="font-mono text-xs font-semibold relative z-10 transition-all duration-200"
                style={{ color: lang === "id" ? "#0d9488" : "#94a3b8" }}>
                ID
              </span>
              <span className="font-mono text-xs relative z-10" style={{ color: "#cbd5e1", margin: "0 1px" }}>/</span>
              <span className="font-mono text-xs font-semibold relative z-10 transition-all duration-200"
                style={{ color: lang === "en" ? "#0d9488" : "#94a3b8" }}>
                EN
              </span>
              <span
                className="absolute bottom-1 h-0.5 rounded-full transition-all duration-300"
                style={{
                  width: 14,
                  left: lang === "id" ? 10 : 33,
                  background: "rgba(20,184,166,0.9)",
                  boxShadow: "0 0 6px rgba(20,184,166,0.6)",
                }}
              />
            </button>

            {/* Download CV */}
            <a
              href="/Cv.pdf"
              download
              className="group relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl overflow-hidden"
              style={{
                background: "rgba(20,184,166,0.1)",
                border: "1px solid rgba(20,184,166,0.3)",
                color: "#0d9488",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.18)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.5)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(20,184,166,0.15), 0 4px 15px rgba(0,0,0,0.05)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.1)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
              />
              <svg className="w-3.5 h-3.5 relative z-10 group-hover:translate-y-0.5 transition-transform duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="relative z-10">{t.nav.downloadCV[lang]}</span>
            </a>
          </div>

          {/* ── Mobile menu button ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl overflow-hidden"
            style={{
              background: menuOpen ? "rgba(20,184,166,0.1)" : "rgba(255,255,255,0.6)",
              border: menuOpen ? "1px solid rgba(20,184,166,0.3)" : "1px solid rgba(15,23,42,0.12)",
              transition: "all 0.3s ease",
            }}
          >
            <span className="w-5 h-px transition-all duration-300"
              style={{ background: "#1e293b", transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
            <span className="w-5 h-px transition-all duration-300"
              style={{ background: "#1e293b", opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "none" }} />
            <span className="w-5 h-px transition-all duration-300"
              style={{ background: "#1e293b", transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className="md:hidden overflow-hidden transition-all duration-400"
          style={{
            maxHeight: menuOpen ? "28rem" : 0,
            borderTop: menuOpen ? "1px solid rgba(20,184,166,0.12)" : "1px solid transparent",
          }}
        >
          <div
            className="px-5 py-4 space-y-1"
            style={{ background: "rgba(255,252,244,0.97)", backdropFilter: "blur(20px)" }}
          >
            {navLinks.map((link, i) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-200"
                  style={{
                    background: isActive ? "rgba(20,184,166,0.08)" : "transparent",
                    border: isActive ? "1px solid rgba(20,184,166,0.2)" : "1px solid transparent",
                    color: isActive ? "#0d9488" : "#475569",
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  <span style={{ fontSize: 12, opacity: 0.5 }}>{link.icon}</span>
                  <span className="font-body text-sm">{link.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: "rgba(20,184,166,0.9)", boxShadow: "0 0 6px rgba(20,184,166,0.7)" }} />
                  )}
                </button>
              );
            })}

            <div className="my-3 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.2), transparent)" }} />

            <div className="flex gap-2">
              {/* Lang mobile */}
              <button
                onClick={toggleLang}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(15,23,42,0.12)",
                }}
              >
                <span className="font-mono text-xs font-semibold"
                  style={{ color: lang === "id" ? "#0d9488" : "#94a3b8" }}>🇮🇩 ID</span>
                <span style={{ color: "rgba(148,163,184,0.5)", fontSize: 11 }}>/</span>
                <span className="font-mono text-xs font-semibold"
                  style={{ color: lang === "en" ? "#0d9488" : "#94a3b8" }}>🇬🇧 EN</span>
              </button>
            </div>

            <a
              href="/Cv.pdf"
              download
              className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-3 rounded-xl text-sm font-medium"
              style={{
                background: "rgba(20,184,166,0.1)",
                border: "1px solid rgba(20,184,166,0.3)",
                color: "#0d9488",
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t.nav.downloadCV[lang]}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}