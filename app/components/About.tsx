"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

export default function About() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const highlights = t.about.highlights[lang];
  const education = t.about.education[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".section-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">

      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-void/20 to-ink/80" />

      {/* Decorative blobs */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Diagonal grid accent */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(20,184,166,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Section label ── */}
        <div className="section-reveal flex items-center gap-4 mb-5">
          <span className="font-mono text-xs tracking-[0.35em] uppercase"
            style={{ color: "rgba(94,234,212,0.6)" }}>
          </span>
          <div className="flex-1 h-px max-w-24"
            style={{ background: "linear-gradient(90deg, rgba(20,184,166,0.4), transparent)" }} />
        </div>

        {/* ── Heading ── */}
        <div className="section-reveal mb-16">
          <h2
            style={{
              fontFamily: "'SimplyOlive', cursive",
              textShadow: "0 0 60px rgba(20,184,166,0.15)",
              lineHeight: 1.1,
            }}
            className="text-6xl md:text-7xl text-frost"
          >
            {t.about.sectionTitle[lang]}{" "}
            <span style={{ color: "rgba(148,163,184,0.55)" }}>
              {t.about.sectionSub[lang]}
            </span>
          </h2>

          {/* Decorative underline */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-0.5 w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, rgba(20,184,166,0.8), rgba(99,102,241,0.4))" }} />
            <div className="h-0.5 w-6 rounded-full"
              style={{ background: "rgba(20,184,166,0.3)" }} />
            <div className="h-0.5 w-2 rounded-full"
              style={{ background: "rgba(20,184,166,0.15)" }} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Bio + Education ── */}
          <div>
            {/* Bio paragraphs */}
            <div className="section-reveal space-y-5 mb-10">
              {[t.about.bio1[lang], t.about.bio2[lang], t.about.bio3[lang]].map((bio, i) => (
                <p key={i} className="font-body text-silver leading-relaxed"
                  style={{ opacity: 1 - i * 0.08 }}>
                  {i === 0
                    ? bio
                        .split(/(Purchasing|Cost Control|Inventory Management)/)
                        .map((part, j) =>
                          ["Purchasing", "Cost Control", "Inventory Management"].includes(part)
                            ? <span key={j} className="font-bold"
                                style={{ color: "rgb(13,148,136)" }}>
                                {part}
                              </span>
                            : <span key={j}>{part}</span>
                        )
                    : bio
                  }
                </p>
              ))}
            </div>

            {/* ── Education ── */}
            <div className="section-reveal delay-1">
              <div className="flex items-center gap-3 mb-5">
                <h3
                  style={{ fontFamily: "'SimplyOlive', cursive", fontSize: "1.4rem" }}
                  className="text-frost"
                >
                  {t.about.educationTitle[lang]}
                </h3>
                <div className="flex-1 h-px"
                  style={{ background: "linear-gradient(90deg, rgba(20,184,166,0.2), transparent)" }} />
              </div>

              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover-lift"
                    style={{
                      background: "rgba(22,27,34,0.6)",
                      border: "1px solid rgba(148,163,184,0.08)",
                      backdropFilter: "blur(16px)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.25)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(33,38,45,0.8)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(13,148,136,0.1), 0 0 0 1px rgba(20,184,166,0.08)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(148,163,184,0.08)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(22,27,34,0.6)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "";
                    }}
                  >
                    {/* Left accent bar */}
                    <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(180deg, rgba(20,184,166,0.8), rgba(99,102,241,0.4))" }} />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300"
                          style={{
                            background: "rgba(20,184,166,0.08)",
                            border: "1px solid rgba(20,184,166,0.2)",
                          }}
                        >
                          {edu.icon}
                        </div>
                        <div>
                          <p className="font-body font-semibold text-frost text-sm">{edu.school}</p>
                          <p className="font-body text-xs mt-0.5" style={{ color: "rgba(148,163,184,0.7)" }}>
                            {edu.major}
                            {edu.gpa && (
                              <span style={{ color: "rgba(94,234,212,0.65)" }}> · {edu.gpa}</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs whitespace-nowrap px-2.5 py-1 rounded-lg"
                        style={{
                          color: "rgba(148,163,184,0.5)",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                          fontSize: 10,
                        }}>
                        {edu.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Highlights ── */}
          <div className="section-reveal delay-2">
            <div className="flex items-center gap-3 mb-5">
              <h3
                style={{ fontFamily: "'SimplyOlive', cursive", fontSize: "1.4rem" }}
                className="text-frost"
              >
                {t.about.skillsTitle[lang]}
              </h3>
              <div className="flex-1 h-px"
                style={{ background: "linear-gradient(90deg, rgba(20,184,166,0.2), transparent)" }} />
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {highlights.map((h, i) => {
                const isActive = activeHighlight === i;
                return (
                  <div
                    key={i}
                    className="group relative rounded-2xl p-4 overflow-hidden cursor-default transition-all duration-300"
                    style={{
                      background: isActive ? "rgba(20,184,166,0.07)" : "rgba(22,27,34,0.6)",
                      border: isActive
                        ? "1px solid rgba(20,184,166,0.3)"
                        : "1px solid rgba(148,163,184,0.08)",
                      backdropFilter: "blur(16px)",
                      transform: isActive ? "translateX(4px)" : "none",
                      boxShadow: isActive ? "0 8px 32px rgba(13,148,136,0.1), -3px 0 0 rgba(20,184,166,0.5)" : "",
                      animationDelay: `${i * 0.07}s`,
                    }}
                    onMouseEnter={() => setActiveHighlight(i)}
                    onMouseLeave={() => setActiveHighlight(null)}
                  >
                    {/* Shimmer on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 30%, rgba(20,184,166,0.04) 50%, transparent 70%)",
                      }}
                    />

                    <div className="flex items-center gap-4 relative z-10">
                      {/* Icon */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? "rgba(20,184,166,0.12)" : "rgba(255,255,255,0.03)",
                          border: isActive ? "1px solid rgba(20,184,166,0.3)" : "1px solid rgba(255,255,255,0.06)",
                          boxShadow: isActive ? "0 0 20px rgba(20,184,166,0.15)" : "",
                        }}
                      >
                        {h.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-semibold text-sm transition-colors duration-200"
                          style={{ color: isActive ? "rgb(240,253,250)" : "rgb(226,232,240)" }}>
                          {h.label}
                        </p>
                        <p className="font-body text-xs mt-0.5 leading-relaxed"
                          style={{ color: "rgba(148,163,184,0.65)" }}>
                          {h.desc}
                        </p>
                      </div>

                      {/* Arrow */}
                      <svg
                        className="w-4 h-4 flex-shrink-0 transition-all duration-300"
                        style={{
                          color: isActive ? "rgba(94,234,212,0.6)" : "rgba(148,163,184,0.15)",
                          transform: isActive ? "translateX(2px)" : "none",
                        }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Open to work card ── */}
            <div className="section-reveal delay-3 mt-5 relative rounded-2xl p-5 overflow-hidden"
              style={{
                background: "rgba(20,184,166,0.04)",
                border: "1px solid rgba(20,184,166,0.2)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Animated corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at top right, rgba(20,184,166,0.12), transparent 70%)",
                }}
              />

              <div className="flex items-center gap-2.5 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-xs tracking-wider" style={{ color: "rgba(94,234,212,0.85)" }}>
                  {t.about.openToWork[lang]}
                </span>
              </div>

              <p className="font-body text-sm leading-relaxed mb-3"
                style={{ color: "rgba(148,163,184,0.8)" }}>
                {t.about.openDesc[lang]}
              </p>

              <div className="h-px mb-3"
                style={{ background: "linear-gradient(90deg, rgba(20,184,166,0.2), transparent)" }} />

              <div className="flex flex-wrap gap-3 font-mono text-xs">
                <a
                  href="https://mail.google.com/mail/?view=cm&to=renaraayan@gmail.com"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-all duration-200 animated-underline"
                  style={{ color: "rgba(94,234,212,0.7)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgb(94,234,212)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(94,234,212,0.7)"}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  renaraayan@gmail.com
                </a>
                <span style={{ color: "rgba(148,163,184,0.2)" }}>·</span>
                <a
                  href="https://wa.me/6285159522095"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-all duration-200 animated-underline"
                  style={{ color: "rgba(94,234,212,0.7)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgb(94,234,212)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(94,234,212,0.7)"}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  085159522095
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}