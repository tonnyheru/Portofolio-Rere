"use client";
import { useEffect, useRef } from "react";

const highlights = [
  { icon: "📦", label: "Purchasing", desc: "Manajemen pengadaan strategis dari PO hingga delivery" },
  { icon: "💰", label: "Cost Control", desc: "Analisis COGS, budgeting, dan efisiensi biaya operasional" },
  { icon: "📊", label: "Inventory", desc: "FIFO/FEFO, stock opname, dan digitalisasi monitoring" },
  { icon: "🤝", label: "Vendor Mgmt", desc: "Negosiasi TOP, diversifikasi, dan evaluasi supplier" },
];

const education = [
  { school: "STEBI Global Mulia Cikarang", major: "S1 Ekonomi Syariah", year: "2022 – 2025", gpa: "IPK 3.31", icon: "🎓" },
  { school: "SMAN 23 Bandung", major: "IPA / Science", year: "2010 – 2013", gpa: "", icon: "🏫" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".section-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-void/40 to-ink" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-neon/3 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div className="section-reveal flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-neon/70 tracking-[0.3em] uppercase"></span>
          <div className="flex-1 h-px bg-gradient-to-r from-neon/30 to-transparent max-w-32" />
        </div>

        <div className="section-reveal mb-16">
          <h2 style={{ fontFamily: "'SimpleNotes', cursive" }} className="text-6xl md:text-7xl text-frost leading-tight">
            Tentang <span className="text-silver">Saya</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div>
            <div className="section-reveal space-y-5 mb-10">
              <p className="font-body text-silver leading-relaxed">
                Memiliki Pengalaman dan {" "}
                <span className="text-neon-2 font-medium">rekam jejak profesional</span>{" "}
                di bidang Purchasing, Cost Control, dan Inventory Management di industri{" "}
                <span className="text-neon-2 font-medium">Food & Beverages</span> dan manufaktur.
              </p>
              <p className="font-body text-silver leading-relaxed">
                Keahlian saya mencakup pengadaan strategis, negosiasi vendor, analisis food costing,{" "}
                <span className="text-frost font-medium">COGS</span>, penerapan metode{" "}
                <span className="text-frost font-medium">FIFO dan FEFO</span> guna efisiensi stok.
              </p>
              <p className="font-body text-silver leading-relaxed">
                Berpengalaman menggunakan sistem <span className="font-mono text-neon/80 text-sm">ESB</span>,{" "}
                <span className="font-mono text-neon/80 text-sm">MOKA</span>,{" "}
                <span className="font-mono text-neon/80 text-sm">Mille</span>,{" "}
                <span className="font-mono text-neon/80 text-sm">Jurnal</span>,{" "}
                <span className="font-mono text-neon/80 text-sm">Olsera</span>, serta{" "}
                <span className="font-mono text-neon/80 text-sm">Google Sheet</span> dalam operasional sehari-hari.
              </p>
            </div>

            {/* Education */}
            <div className="section-reveal delay-1">
              <h3 className="font-display font-semibold text-xl text-frost mb-5">Pendidikan</h3>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} className="glass rounded-2xl p-5 border border-graphite-2/60 hover-lift glass-hover transition-all duration-300">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center text-lg flex-shrink-0">
                          {edu.icon}
                        </div>
                        <div>
                          <p className="font-body font-semibold text-frost text-sm">{edu.school}</p>
                          <p className="font-body text-silver text-xs mt-0.5">
                            {edu.major}{edu.gpa && <span className="text-neon/70"> · {edu.gpa}</span>}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-silver/50 whitespace-nowrap">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Highlights */}
          <div className="section-reveal delay-2">
            <h3 className="font-display font-semibold text-xl text-frost mb-5">Keahlian Utama</h3>
            <div className="grid grid-cols-1 gap-3">
              {highlights.map((h, i) => (
                <div key={i}
                  className="glass rounded-2xl p-5 border border-graphite-2/60 glass-hover hover-lift transition-all duration-300 group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-graphite/80 border border-graphite-2/80 flex items-center justify-center text-2xl flex-shrink-0
                      group-hover:border-neon/30 group-hover:bg-neon/5 transition-all duration-300">
                      {h.icon}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-frost text-sm">{h.label}</p>
                      <p className="font-body text-silver text-xs mt-0.5 leading-relaxed">{h.desc}</p>
                    </div>
                    <svg className="w-4 h-4 text-silver/20 group-hover:text-neon/40 ml-auto flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact quick */}
            <div className="section-reveal delay-3 mt-6 glass rounded-2xl p-5 border border-neon/20 bg-neon/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-neon/80 tracking-wider">Open to Work</span>
              </div>
              <p className="font-body text-silver text-sm leading-relaxed">
                Terbuka untuk peluang sebagai{" "}
                <span className="text-frost">Purchasing Specialist</span>,{" "}
                <span className="text-frost">Cost Controller</span>, atau posisi terkait.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
                <a href="mailto:renaraayan@gmail.com" className="text-neon/70 hover:text-neon transition-colors animated-underline">
                  renaraayan@gmail.com
                </a>
                <span className="text-silver/30">·</span>
                <a href="https://wa.me/6285159522095" target="_blank" rel="noopener noreferrer" className="text-neon/70 hover:text-neon transition-colors animated-underline">
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
