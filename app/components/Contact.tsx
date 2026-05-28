"use client";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

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
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".section-reveal").forEach(el => observer.observe(el));
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
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("Gagal mengirim:", err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-void to-ink" />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(rgba(127,179,208,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon/4 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="section-reveal flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-neon/70 tracking-[0.3em] uppercase"></span>
          <div className="flex-1 h-px bg-gradient-to-r from-neon/30 to-transparent max-w-32" />
        </div>
        <div className="section-reveal mb-16">
          <h2 style={{ fontFamily: "'SimpleNotes', cursive" }} className="text-6xl md:text-7xl text-frost leading-tight">
            Mari <span className="text-silver">Terhubung</span>
          </h2>
          <p className="font-body text-silver mt-4 max-w-lg">
            Terbuka untuk peluang kerja baru di bidang Purchasing, Cost Control, atau posisi terkait.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <div className="section-reveal">
            {/* Availability */}
            <div className="inline-flex items-center gap-3 px-5 py-3 glass border border-emerald-500/20 rounded-full mb-10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-sm text-emerald-400/80">Tersedia untuk kesempatan baru</span>
            </div>

            {/* Contact cards */}
            <div className="space-y-3 mb-10">
              {contactItems.map((c, i) => (
                <a key={i} href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-5 glass border border-graphite-2/60 rounded-2xl
                    glass-hover hover-lift transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-neon/5 border border-neon/15 flex items-center justify-center text-neon/70
                    group-hover:bg-neon/10 group-hover:border-neon/30 group-hover:text-neon transition-all duration-300 flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-mono text-silver/40 text-[10px] uppercase tracking-wider mb-0.5">{c.label}</p>
                    <p className="font-body text-frost text-sm">{c.value}</p>
                  </div>
                  <svg className="w-4 h-4 text-silver/20 group-hover:text-neon/40 ml-auto transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="section-reveal delay-2">
            <div className="glass rounded-3xl p-8 border border-graphite-2/60">
              <h3 className="font-display font-semibold text-2xl text-frost mb-6">
                Kirim <span className="font-light italic text-silver">Pesan</span>
              </h3>

              {/* Success */}
              {sent && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-4 mb-6 text-sm font-body flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Pesan terkirim! Saya akan segera menghubungi Anda.
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6 text-sm font-body flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Pesan gagal terkirim. Silakan coba lagi.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "name", label: "Nama Lengkap", type: "text", placeholder: "Nama Anda" },
                  { key: "email", label: "Email", type: "email", placeholder: "email@perusahaan.com" },
                  { key: "company", label: "Perusahaan (opsional)", type: "text", placeholder: "Nama perusahaan" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block font-mono text-silver/40 text-[10px] uppercase tracking-widest mb-2">{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      required={f.key !== "company"}
                      className="w-full bg-graphite/30 border border-graphite-2/80 rounded-xl px-4 py-3 text-frost text-sm
                        placeholder-silver/30 outline-none focus:border-neon/40 focus:ring-1 focus:ring-neon/15
                        transition-all duration-300 font-body"
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-mono text-silver/40 text-[10px] uppercase tracking-widest mb-2">Pesan</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tuliskan pesan atau kebutuhan Anda..."
                    rows={4}
                    required
                    className="w-full bg-graphite/30 border border-graphite-2/80 rounded-xl px-4 py-3 text-frost text-sm
                      placeholder-silver/30 outline-none focus:border-neon/40 focus:ring-1 focus:ring-neon/15
                      transition-all duration-300 resize-none font-body"
                  />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-neon/10 border border-neon/40 text-neon
                    font-semibold py-4 rounded-xl hover:bg-neon/20 transition-all duration-300 hover:-translate-y-0.5
                    hover:shadow-xl hover:shadow-neon/10 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Mengirim...
                    </span>
                  ) : (
                    <>
                      Kirim Pesan
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}