"use client";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const contactItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: "renaraayan@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=renaraayan@gmail.com",
    note: "Balas dalam 24 jam",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "WhatsApp / Phone",
    value: "085159522095",
    href: "https://wa.me/6285159522095",
    note: "Chat langsung",
  },
];

/* ── Floating decorative particle ── */
function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full bg-neon/30 pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animation: `floatDot ${3 + delay}s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}

const PARTICLES = [
  { x: 8, y: 20, delay: 0 },
  { x: 92, y: 15, delay: 0.8 },
  { x: 15, y: 75, delay: 1.5 },
  { x: 85, y: 70, delay: 0.4 },
  { x: 50, y: 5, delay: 1.2 },
  { x: 35, y: 90, delay: 0.6 },
];

export default function Contact() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await emailjs.send(
        "service_5n328cd",
        "template_y7lnx7j",
        {
          from_name: form.name,
          from_email: form.email,
          company: form.company || "-",
          message: form.message,
        },
        "zvHkX3gHHWcLcJRTV"
      );
      setSent(true);
      setForm({ name: "", email: "", company: "", message: "" });
      setCharCount(0);
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      console.error("Send failed:", err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      key: "name",
      label: t.contact.formName[lang],
      type: "text",
      placeholder: lang === "id" ? "Nama Anda" : "Your name",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      key: "email",
      label: t.contact.formEmail[lang],
      type: "email",
      placeholder: "email@company.com",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      key: "company",
      label: t.contact.formCompany[lang],
      type: "text",
      placeholder: lang === "id" ? "Nama perusahaan (opsional)" : "Company name (optional)",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-32 relative overflow-hidden">
      {/* ── Multi-layer background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-void to-ink" />

      {/* Dot-grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(45,212,191,0.9) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Diagonal gradient sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(45,212,191,0.03) 0%, transparent 50%, rgba(45,212,191,0.02) 100%)",
        }}
      />

      {/* Center glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(45,212,191,0.05) 0%, transparent 70%)" }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Section label ── */}
        <div className="section-reveal flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] text-neon/60 tracking-[0.4em] uppercase"></span>
          <div className="flex-1 h-px bg-gradient-to-r from-neon/30 to-transparent max-w-40" />
        </div>

        {/* ── Heading ── */}
        <div className="section-reveal mb-4">
          <h2
            style={{ fontFamily: "'SimplyOlive', cursive" }}
            className="text-7xl md:text-8xl text-frost leading-[0.95] tracking-tight"
          >
            {t.contact.sectionTitle[lang]}{" "}
            <span
              className="italic"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(45,212,191,0.5)",
              }}
            >
              {t.contact.sectionSub[lang]}
            </span>
          </h2>
        </div>

        <div className="section-reveal mb-14 flex flex-wrap items-end justify-between gap-6">
          <p className="font-body text-silver/60 text-sm max-w-md leading-relaxed">
            {t.contact.sectionDesc[lang]}
          </p>
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] text-emerald-400/80 tracking-wide">
              {lang === "id" ? "Bersedia untuk kesempatan baru" : "Open to new opportunities"}
            </span>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT: Info column (2/5) ── */}
          <div className="lg:col-span-2 section-reveal space-y-4">

            {/* Contact cards */}
            {contactItems.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl border group relative overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(16,18,24,0.7)",
                  borderColor: "rgba(45,49,57,0.6)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,212,191,0.25)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(22,25,32,0.9)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,49,57,0.6)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(16,18,24,0.7)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(45,212,191,0.04) 50%, transparent 60%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(45,212,191,0.07)",
                    border: "1px solid rgba(45,212,191,0.15)",
                    color: "rgba(45,212,191,0.7)",
                  }}
                >
                  {c.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-mono text-silver/35 text-[9px] uppercase tracking-[0.2em] mb-0.5">{c.label}</p>
                  <p className="font-body text-frost text-sm font-medium truncate">{c.value}</p>
                  <p className="font-mono text-silver/30 text-[10px] mt-0.5">{c.note}</p>
                </div>

                <svg
                  className="w-4 h-4 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: "rgba(45,212,191,0.3)" }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ))}

            {/* Decorative quote card */}
            <div
              className="rounded-2xl p-6 mt-6 relative overflow-hidden"
              style={{
                background: "rgba(45,212,191,0.04)",
                border: "1px solid rgba(45,212,191,0.1)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.3), transparent)" }}
              />
              <div className="font-mono text-3xl text-neon/20 leading-none mb-3 select-none">"</div>
              <p className="font-body text-silver/50 text-sm leading-relaxed italic">
                {lang === "id"
                  ? "Saya percaya setiap peluang dimulai dari percakapan yang baik."
                  : "I believe every opportunity starts with a great conversation."}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-5 h-px bg-neon/30" />
                <span className="font-mono text-[10px] text-neon/40 tracking-widest uppercase">Rena</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form column (3/5) ── */}
          <div className="lg:col-span-3 section-reveal delay-2">
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: "rgba(16,18,24,0.85)",
                border: "1px solid rgba(45,49,57,0.6)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.4), transparent)",
                }}
              />

              {/* Form header */}
              <div className="flex items-center justify-between mb-8">
                <h3
                  style={{ fontFamily: "'SimplyOlive', cursive" }}
                  className="text-3xl text-frost"
                >
                  {lang === "id" ? (
                    <>Kirim <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(45,212,191,0.45)" }}>Pesan</span></>
                  ) : (
                    <>Send <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(45,212,191,0.45)" }}>Message</span></>
                  )}
                </h3>
                <div
                  className="font-mono text-[10px] text-silver/30 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(45,49,57,0.4)", border: "1px solid rgba(45,49,57,0.6)" }}
                >
                  {charCount}/500
                </div>
              </div>

              {/* Success banner */}
              {sent && (
                <div
                  className="rounded-xl p-4 mb-6 flex items-center gap-3 text-sm font-body"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    color: "rgba(52,211,153,0.9)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(16,185,129,0.15)" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t.contact.formSent[lang]}
                </div>
              )}

              {/* Error banner */}
              {error && (
                <div
                  className="rounded-xl p-4 mb-6 flex items-center gap-3 text-sm font-body"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "rgba(252,165,165,0.9)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(239,68,68,0.15)" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  {t.contact.formError[lang]}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 3 text fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {fields.slice(0, 2).map((f) => (
                    <div key={f.key} className="relative group">
                      <label className="block font-mono text-[10px] text-silver/35 uppercase tracking-[0.2em] mb-2">
                        {f.label}
                        {f.key !== "company" && <span className="text-neon/50 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <div
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                          style={{ color: focusedField === f.key ? "rgba(45,212,191,0.6)" : "rgba(139,148,158,0.3)" }}
                        >
                          {f.icon}
                        </div>
                        <input
                          type={f.type}
                          value={form[f.key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          onFocus={() => setFocusedField(f.key)}
                          onBlur={() => setFocusedField(null)}
                          placeholder={f.placeholder}
                          required={f.key !== "company"}
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-frost text-sm placeholder-silver/25 outline-none font-body transition-all duration-200"
                          style={{
                            background: focusedField === f.key ? "rgba(26,29,36,0.9)" : "rgba(16,18,24,0.8)",
                            border: `1px solid ${focusedField === f.key ? "rgba(45,212,191,0.35)" : "rgba(45,49,57,0.7)"}`,
                            boxShadow: focusedField === f.key ? "0 0 0 3px rgba(45,212,191,0.06)" : "none",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Company field full width */}
                <div className="relative">
                  <label className="block font-mono text-[10px] text-silver/35 uppercase tracking-[0.2em] mb-2">
                    {fields[2].label}
                  </label>
                  <div className="relative">
                    <div
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                      style={{ color: focusedField === "company" ? "rgba(45,212,191,0.6)" : "rgba(139,148,158,0.3)" }}
                    >
                      {fields[2].icon}
                    </div>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                      placeholder={fields[2].placeholder}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-frost text-sm placeholder-silver/25 outline-none font-body transition-all duration-200"
                      style={{
                        background: focusedField === "company" ? "rgba(26,29,36,0.9)" : "rgba(16,18,24,0.8)",
                        border: `1px solid ${focusedField === "company" ? "rgba(45,212,191,0.35)" : "rgba(45,49,57,0.7)"}`,
                        boxShadow: focusedField === "company" ? "0 0 0 3px rgba(45,212,191,0.06)" : "none",
                      }}
                    />
                  </div>
                </div>

                {/* Message textarea */}
                <div className="relative">
                  <label className="block font-mono text-[10px] text-silver/35 uppercase tracking-[0.2em] mb-2">
                    {t.contact.formMessage[lang]}
                    <span className="text-neon/50 ml-1">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      setCharCount(e.target.value.length);
                    }}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder={t.contact.formPlaceholder[lang]}
                    rows={5}
                    required
                    maxLength={500}
                    className="w-full px-4 py-3.5 rounded-xl text-frost text-sm placeholder-silver/25 outline-none font-body transition-all duration-200 resize-none"
                    style={{
                      background: focusedField === "message" ? "rgba(26,29,36,0.9)" : "rgba(16,18,24,0.8)",
                      border: `1px solid ${focusedField === "message" ? "rgba(45,212,191,0.35)" : "rgba(45,49,57,0.7)"}`,
                      boxShadow: focusedField === "message" ? "0 0 0 3px rgba(45,212,191,0.06)" : "none",
                    }}
                  />
                  {/* Progress bar */}
                  <div
                    className="absolute bottom-3 right-3 w-20 h-0.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(45,49,57,0.5)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(charCount / 500) * 100}%`,
                        background: charCount > 450
                          ? "rgba(239,68,68,0.7)"
                          : "rgba(45,212,191,0.5)",
                      }}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative overflow-hidden flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
                  style={{
                    background: loading
                      ? "rgba(45,212,191,0.08)"
                      : "linear-gradient(135deg, rgba(45,212,191,0.15) 0%, rgba(45,212,191,0.08) 100%)",
                    border: "1px solid rgba(45,212,191,0.35)",
                    color: "#2dd4bf",
                    boxShadow: "0 0 20px rgba(45,212,191,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLElement).style.background =
                        "linear-gradient(135deg, rgba(45,212,191,0.22) 0%, rgba(45,212,191,0.12) 100%)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 32px rgba(45,212,191,0.15), 0 -2px 0 rgba(45,212,191,0.25) inset";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "linear-gradient(135deg, rgba(45,212,191,0.15) 0%, rgba(45,212,191,0.08) 100%)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(45,212,191,0.05)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Shimmer sweep */}
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.08), transparent)",
                    }}
                  />
                  {loading ? (
                    <span className="flex items-center gap-2.5 relative">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      {t.contact.formSending[lang]}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2.5 relative">
                      {t.contact.formSend[lang]}
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes floatDot {
          from { transform: translateY(0px) scale(1); opacity: 0.3; }
          to   { transform: translateY(-12px) scale(1.4); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}