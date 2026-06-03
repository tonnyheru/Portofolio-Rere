"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const techSkills = [
  { name: "Google Sheets", icon: "📊", category: "Tools",    color: "rgba(20,184,166," },
  { name: "MOKA POS",      icon: "🖥️", category: "Systems",  color: "rgba(99,102,241," },
  { name: "Food Costing",  icon: "🍴", category: "Analysis", color: "rgba(236,72,153," },
  { name: "ESB System",    icon: "⚙️", category: "Systems",  color: "rgba(99,102,241," },
  { name: "Mille / Olsera",icon: "📱", category: "Systems",  color: "rgba(14,165,233," },
  { name: "FIFO / FEFO",  icon: "🔄", category: "Methods",  color: "rgba(20,184,166," },
];

const marqueeSkills1 = ["ESB", "MOKA POS", "Mille", "Olsera", "Google Sheets", "FIFO", "FEFO", "Purchasing", "Cost Control", "COGS", "Stock Opname", "Forecasting"];
const marqueeSkills2 = ["Vendor Negotiation", "Food Costing", "Inventory Management", "Admin Keuangan", "Demand Planning", "Cash Flow", "TOP Negotiation", "Waste Control"];

export default function Skills() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredCore, setHoveredCore] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  const coreSkills = t.skills.coreSkills[lang];

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
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden">

      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-graphite/10 to-ink" />

      {/* Center radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(20,184,166,0.025) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Label ── */}
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
              lineHeight: 1.1,
              textShadow: "0 0 60px rgba(20,184,166,0.12)",
            }}
            className="text-6xl md:text-7xl text-frost"
          >
            {t.skills.sectionTitle[lang]}{" "}
            <span style={{ color: "rgba(148,163,184,0.5)" }}>
              {t.skills.sectionSub[lang]}
            </span>
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-0.5 w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, rgba(20,184,166,0.8), rgba(99,102,241,0.4))" }} />
            <div className="h-0.5 w-6 rounded-full" style={{ background: "rgba(20,184,166,0.3)" }} />
            <div className="h-0.5 w-2 rounded-full" style={{ background: "rgba(20,184,166,0.15)" }} />
          </div>
        </div>

        {/* ── Core Skills Grid ── */}
        <div className="section-reveal delay-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {coreSkills.map((skill, i) => {
            const isHov = hoveredCore === i;
            return (
              <div
                key={i}
                className="relative rounded-2xl p-5 overflow-hidden transition-all duration-300 cursor-default"
                style={{
                  background: isHov ? "rgba(33,38,45,0.9)" : "rgba(22,27,34,0.6)",
                  border: isHov ? "1px solid rgba(20,184,166,0.3)" : "1px solid rgba(148,163,184,0.08)",
                  backdropFilter: "blur(16px)",
                  transform: isHov ? "translateY(-5px)" : "none",
                  boxShadow: isHov ? "0 20px 50px rgba(0,0,0,0.35), 0 0 0 1px rgba(20,184,166,0.08), 0 0 30px rgba(20,184,166,0.08)" : "",
                  animationDelay: `${i * 0.06}s`,
                }}
                onMouseEnter={() => setHoveredCore(i)}
                onMouseLeave={() => setHoveredCore(null)}
              >
                {/* Top edge accent */}
                <div
                  className="absolute top-0 left-4 right-4 h-px transition-opacity duration-300 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.6), transparent)",
                    opacity: isHov ? 1 : 0,
                  }}
                />

                {/* BG glow */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(20,184,166,0.06), transparent 70%)",
                    opacity: isHov ? 1 : 0,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300"
                  style={{
                    background: isHov ? "rgba(20,184,166,0.1)" : "rgba(255,255,255,0.03)",
                    border: isHov ? "1px solid rgba(20,184,166,0.3)" : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: isHov ? "0 0 20px rgba(20,184,166,0.15)" : "",
                  }}
                >
                  {skill.icon}
                </div>

                <h3
                  className="font-body font-semibold text-sm mb-1.5 transition-colors duration-200"
                  style={{ color: isHov ? "rgb(240,253,250)" : "rgb(226,232,240)" }}
                >
                  {skill.name}
                </h3>
                <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(148,163,184,0.6)" }}>
                  {skill.desc}
                </p>

                {/* Corner dot */}
                <div
                  className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: isHov ? "rgba(94,234,212,0.8)" : "rgba(148,163,184,0.15)",
                    boxShadow: isHov ? "0 0 8px rgba(20,184,166,0.6)" : "",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Tech Skills ── */}
        <div className="section-reveal delay-2 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h3
              style={{ fontFamily: "'SimplyOlive', cursive", fontSize: "1.4rem" }}
              className="text-frost"
            >
              {t.skills.techTitle[lang]}
            </h3>
            <div className="flex-1 h-px"
              style={{ background: "linear-gradient(90deg, rgba(20,184,166,0.2), transparent)" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {techSkills.map((skill, i) => {
              const isHov = hoveredTech === i;
              const c = skill.color;
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl p-4 overflow-hidden transition-all duration-300 cursor-default"
                  style={{
                    background: isHov ? `${c}0.06)` : "rgba(22,27,34,0.6)",
                    border: isHov ? `1px solid ${c}0.3)` : "1px solid rgba(148,163,184,0.08)",
                    backdropFilter: "blur(16px)",
                    transform: isHov ? "translateY(-3px) translateX(2px)" : "none",
                    boxShadow: isHov ? `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${c}0.1)` : "",
                  }}
                  onMouseEnter={() => setHoveredTech(i)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {/* Left bar */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(180deg, ${c}0.9), ${c}0.2))`,
                      opacity: isHov ? 1 : 0,
                    }}
                  />

                  <div className="flex items-center gap-4 relative z-10">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isHov ? `${c}0.12)` : "rgba(255,255,255,0.03)",
                        border: isHov ? `1px solid ${c}0.35)` : "1px solid rgba(255,255,255,0.06)",
                        boxShadow: isHov ? `0 0 16px ${c}0.2)` : "",
                      }}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-sm transition-colors duration-200"
                        style={{ color: isHov ? "rgb(240,253,250)" : "rgb(226,232,240)" }}>
                        {skill.name}
                      </p>
                      <p className="font-mono text-[10px] tracking-wider mt-0.5 transition-colors duration-200"
                        style={{ color: isHov ? `${c}0.8)` : "rgba(148,163,184,0.35)" }}>
                        {skill.category}
                      </p>
                    </div>

                    {/* Tag badge */}
                    <div className="ml-auto">
                      <span
                        className="font-mono text-[9px] px-2 py-0.5 rounded-full transition-all duration-300"
                        style={{
                          background: isHov ? `${c}0.12)` : "rgba(255,255,255,0.03)",
                          border: isHov ? `1px solid ${c}0.25)` : "1px solid rgba(255,255,255,0.05)",
                          color: isHov ? `${c}0.85)` : "rgba(148,163,184,0.3)",
                        }}
                      >
                        {skill.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Marquee ── */}
        <div className="section-reveal delay-3">
          {/* Row 1 */}
          <div className="overflow-hidden mb-3"
            style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
            <div className="flex gap-3 w-max animate-marquee">
              {[...marqueeSkills1, ...marqueeSkills1].map((s, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 cursor-default"
                  style={{
                    background: "rgba(20,184,166,0.05)",
                    border: "1px solid rgba(20,184,166,0.15)",
                    color: "rgba(94,234,212,0.65)",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.12)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "rgb(94,234,212)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(20,184,166,0.15)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.15)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(94,234,212,0.65)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2 — reverse */}
          <div className="overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
            <div className="flex gap-3 w-max animate-marquee-rev">
              {[...marqueeSkills2, ...marqueeSkills2].map((s, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 px-4 py-2 rounded-full font-mono text-xs cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(148,163,184,0.1)",
                    color: "rgba(148,163,184,0.45)",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(148,163,184,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.8)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(148,163,184,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.45)";
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom counter strip */}
          <div className="mt-6 flex items-center justify-center gap-6">
            {[
              { num: marqueeSkills1.length + marqueeSkills2.length, label: "Total Skills" },
              { num: techSkills.length, label: "Tools & Systems" },
              { num: coreSkills.length, label: "Core Competencies" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-mono font-bold text-lg" style={{ color: "rgba(94,234,212,0.7)" }}>
                  {stat.num}+
                </p>
                <p className="font-mono text-[10px] tracking-wider" style={{ color: "rgba(148,163,184,0.35)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}