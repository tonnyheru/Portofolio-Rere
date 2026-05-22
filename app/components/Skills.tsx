"use client";
import { useEffect, useRef, useState } from "react";

const techSkills = [
  { name: "Google Sheets", icon: "📊", category: "Tools" },
  { name: "MOKA POS", icon: "🖥️", category: "Systems" },
  { name: "Food Costing", icon: "🍴", category: "Analysis" },
  { name: "ESB System", icon: "⚙️", category: "Systems" },
  { name: "Mille / Olsera", icon: "📱", category: "Systems" },
  { name: "FIFO / FEFO", icon: "🔄", category: "Methods" },
];

const coreSkills = [
  { name: "Purchasing", desc: "Manajemen siklus pengadaan lengkap", icon: "📦"},
  { name: "Cost Control", desc: "Analisis biaya dan efisiensi", icon: "💰"},
  { name: "Inventory Mgmt", desc: "Monitoring & digitalisasi stok", icon: "🗄️"},
  { name: "Vendor Negotiation", desc: "Negosiasi harga & Term of Payment", icon: "🤝"},
  { name: "Demand Forecasting", desc: "Prediksi kebutuhan bahan baku", icon: "📈", level: 85 },
  { name: "Stock Opname", desc: "Audit fisik & akurasi data", icon: "✅", level: 95 },
  { name: "COGS Analysis", desc: "Harga pokok penjualan", icon: "📉", level: 88 },
  { name: "Admin Keuangan", desc: "Invoice, kontra bon, laporan kas", icon: "📋"},
];

const marqueeSkills1 = ["ESB", "MOKA POS", "Mille", "Olsera", "Google Sheets", "FIFO", "FEFO", "Purchasing", "Cost Control", "COGS", "Stock Opname", "Forecasting"];
const marqueeSkills2 = ["Vendor Negotiation", "Food Costing", "Inventory Management", "Admin Keuangan", "Demand Planning", "Cash Flow", "TOP Negotiation", "Waste Control"];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          if ((e.target as HTMLElement).dataset.main) setVisible(true);
        }
      }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".section-reveal").forEach(el => observer.observe(el));
    const main = ref.current?.querySelector("[data-main]");
    if (main) observer.observe(main);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-graphite/10 to-ink" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-neon/3 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="section-reveal flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-neon/70 tracking-[0.3em] uppercase"></span>
          <div className="flex-1 h-px bg-gradient-to-r from-neon/30 to-transparent max-w-32" />
        </div>
        <div className="section-reveal mb-16">
          <h2 style={{ fontFamily: "'SimpleNotes', cursive" }} className="text-6xl md:text-7xl text-frost leading-tight">
            Keahlian & <span className="text-silver">Kompetensi</span>
          </h2>
        </div>

        {/* Core skills grid */}
        <div className="section-reveal delay-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {coreSkills.map((skill, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 border border-graphite-2/60 glass-hover hover-lift cursor-default transition-all duration-300 group"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="text-2xl mb-3">{skill.icon}</div>
              <h3 className="font-body font-semibold text-frost text-sm mb-1 group-hover:text-neon-2 transition-colors">
                {skill.name}
              </h3>
              <p className="font-body text-silver text-xs leading-relaxed mb-4">{skill.desc}</p>

              {/* Mini progress bar */}
              <div className="h-0.5 bg-graphite-2/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon/60 to-neon rounded-full transition-all duration-1000"
                  style={{
                    width: visible ? `${skill.level}%` : "0%",
                    transitionDelay: `${i * 0.08}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tech skills */}
        <div className="section-reveal delay-2 mb-16">
          <h3 className="font-display font-semibold text-xl text-frost mb-6">Sistem & Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techSkills.map((skill, i) => (
              <div key={i}
                className="glass rounded-2xl p-5 border border-graphite-2/60 glass-hover transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neon/5 border border-neon/15 flex items-center justify-center text-xl
                    group-hover:border-neon/30 transition-all">
                    {skill.icon}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-frost text-sm">{skill.name}</p>
                    <p className="font-mono text-neon/50 text-[10px] tracking-wider">{skill.category}</p>
                  </div>
                </div>
                <div className="h-1 bg-graphite-2/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon/40 to-neon rounded-full transition-all duration-1200"
                    style={{
                      width: visible ? `${skill.level}%` : "0%",
                      transitionDelay: `${i * 0.1 + 0.3}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack marquee */}
        <div className="section-reveal delay-3">
          <div className="overflow-hidden mb-3"
            style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
            <div className="flex gap-3 w-max animate-marquee">
              {[...marqueeSkills1, ...marqueeSkills1].map((s, i) => (
                <span key={i} className="flex-shrink-0 px-4 py-2 glass border border-neon/15 text-neon/70 text-xs font-mono rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
            <div className="flex gap-3 w-max animate-marquee-rev">
              {[...marqueeSkills2, ...marqueeSkills2].map((s, i) => (
                <span key={i} className="flex-shrink-0 px-4 py-2 glass border border-silver/10 text-silver/50 text-xs font-mono rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
