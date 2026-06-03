"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

type SubRole = {
  role: string;
  period: string;
  highlights: string[];
};

type Job = {
  company: string;
  industry: string;
  role: string;
  period: string;
  current: boolean;
  tag: string;
  accentColor: string;
  desc: string;
  highlights: string[];
  subRoles?: SubRole[];
};

const jobs: Job[] = [
  {
    company: "PT. Panca Abadi Nan Jaya",
    industry: "F&B — Multi-brand",
    role: "Inventory Stock Admin",
    period: "Apr 2026 – Present",
    current: true,
    tag: "latest",
    accentColor: "#7fb3d0",
    desc: "Mengelola administrasi dan pencatatan kedatangan barang untuk operasional multi-brand F&B, serta menjaga akurasi inventory melalui proses data entry, monitoring stok, dan pengecekan dokumen operasional.",
    highlights: [
      "Verifikasi transfer goods antar outlet dan gudang guna memastikan kesesuaian data dan stok fisik",
      "Meminimalisir potensi selisih stok dan double input melalui proses validasi data secara detail",
    ],
  },
  {
    company: "PT. Animo Resto Primera (Mujigae)",
    industry: "F&B — Korean Restaurant",
    role: "Purchasing",
    period: "Nov 2025 – Feb 2026",
    current: false,
    tag: "",
    accentColor: "#a8c8e0",
    desc: "Mengelola siklus pengadaan lengkap, negosiasi harga dan Term of Payment supplier, serta mendukung pengadaan bahan baku R&D dan sponsorship vendor untuk efisiensi operasional.",
    highlights: [
      "Efisiensi biaya pembelian melalui negosiasi harga bahan baku utama",
      "Renegosiasi TOP supplier strategis untuk meningkatkan fleksibilitas cash flow perusahaan",
      "Evaluasi vendor berkala untuk menjaga standar kualitas dan harga kompetitif",
      "Mendukung pengadaan bahan baku R&D dan program sponsorship vendor",
    ],
  },
  {
    company: "PT. Nusantara Payu Lestari (Skytree Coffee & Eatery)",
    industry: "F&B — Coffee & Western Food",
    role: "Cost Control",
    period: "Jul – Nov 2025",
    current: false,
    tag: "",
    accentColor: "#a8c8e0",
    desc: "Membangun sistem monitoring stok berbasis Google Sheets, meningkatkan kedisiplinan stock opname, serta menekan waste dan mengoptimalkan COGS melalui pengawasan penggunaan bahan baku.",
    highlights: [
      "Membangun sistem monitoring stok berbasis Google Sheets untuk meningkatkan kontrol inventory",
      "Implementasi sistem FEFO guna meminimalisir kerugian bahan baku kedaluwarsa",
      "Menekan waste dan mengoptimalkan COGS melalui pengawasan penggunaan bahan baku",
      "Negosiasi TOP dengan supplier untuk mendukung efisiensi cash flow perusahaan",
    ],
  },
  {
    company: "PT. Nadi Mitra Sejahtera",
    industry: "Pengadaan Barang dan Jasa",
    role: "Administrasi",
    period: "Jan – Jun 2025",
    current: false,
    tag: "",
    accentColor: "#8b949e",
    desc: "Menjalankan administrasi perusahaan dan pengelolaan database internal secara sistematis, serta mengelola dokumentasi untuk mendukung kelancaran operasional kantor.",
    highlights: [
      "Pengelolaan database internal dan pembaruan data secara berkala",
      "Menyusun laporan kas operasional project secara rapi dan akurat",
      "Mengelola dokumentasi perusahaan untuk mendukung kelancaran operasional kantor",
    ],
  },
  {
    company: "Kandang Ayam Café Group Bandung",
    industry: "F&B — Multi-brand Restaurant",
    role: "Administrasi Audit & Purchasing",
    period: "Nov 2021 – Jun 2023",
    current: false,
    tag: "",
    accentColor: "#8b949e",
    desc: "Mengelola purchasing multi-outlet dan multi-brand dengan pengendalian stok yang terstruktur, serta meningkatkan efisiensi monitoring stok melalui digitalisasi sistem berbasis Google Sheets.",
    highlights: [
      "Forecasting kebutuhan bahan baku untuk menjaga kestabilan operasional seluruh outlet",
      "Digitalisasi sistem monitoring stok real-time berbasis Google Sheets per outlet",
      "Renegosiasi TOP dengan 10+ supplier mayoritas untuk meningkatkan fleksibilitas cash flow",
      "Kontrol food costing dan pengadaan strategis untuk efisiensi biaya operasional",
    ],
  },
  {
    company: "PT. Tridaya Insan Pratama",
    industry: "Edukasi",
    role: "Staff Administrasi",
    period: "Agu – Okt 2021",
    current: false,
    tag: "",
    accentColor: "#6b7280",
    desc: "Mengelola administrasi operasional dan pembaruan data perusahaan secara akurat, mendukung proses rekrutmen awal, serta menyusun laporan kas operasional harian.",
    highlights: [
      "Mendukung proses rekrutmen awal melalui administrasi interview kandidat",
      "Menyusun laporan kas operasional harian dengan pencatatan yang tertib dan transparan",
      "Mengelola data absensi karyawan untuk mendukung pelaporan HR",
    ],
  },
  {
    company: "Prama Borma Cijerah Group",
    industry: "Retail",
    role: "Pramuniaga (Customer Service Official)",
    period: "Apr – Jun 2021",
    current: false,
    tag: "",
    accentColor: "#6b7280",
    desc: "Memberikan pelayanan informasi pelanggan secara komunikatif dan profesional di area retail, serta menangani keluhan pelanggan dengan pendekatan solutif.",
    highlights: [
      "Menangani keluhan pelanggan dengan pendekatan solutif untuk menjaga customer satisfaction",
      "Mendukung kenyamanan pengalaman belanja melalui pelayanan yang responsif dan informatif",
    ],
  },
  {
    company: "PT. Tujuh Surya Gemilang",
    industry: "Jasa Transportasi & Hotel",
    role: "Administrasi",
    period: "2017 – 2020",
    current: false,
    tag: "",
    accentColor: "#6b7280",
    desc: "Mengelola administrasi reservasi transportasi dan akomodasi hotel, penerbitan invoice pelanggan, serta membangun hubungan pelanggan jangka panjang.",
    highlights: [
      "Menyusun sistem pengarsipan dokumen yang mempermudah pelacakan data operasional",
      "Penyusunan dan verifikasi invoice pelanggan dengan akurasi tinggi",
      "Membangun loyalitas pelanggan melalui komunikasi yang efektif dan responsif",
    ],
  },
  {
    company: "Perdana Photo Group",
    industry: "Retail Fotografi",
    role: "CS · Admin Gudang & Produksi · Purchasing",
    period: "2014 – 2017",
    current: false,
    tag: "",
    accentColor: "#6b7280",
    desc: "",
    highlights: [],
    subRoles: [
      {
        role: "Customer Service Official & Cashier",
        period: "2014 – 2015",
        highlights: [
          "Memberikan pelayanan pelanggan yang responsif untuk mendukung kepuasan konsumen",
          "Mengelola input transaksi dan pesanan pelanggan secara sistematis",
          "Membuat laporan kas harian dengan administrasi yang rapi dan akurat",
          "Menjaga ketersediaan stok toko melalui koordinasi kebutuhan barang dengan warehouse",
        ],
      },
      {
        role: "Administrasi Gudang & Produksi",
        period: "2015",
        highlights: [
          "Menjaga stabilitas stok bahan baku dan barang jadi untuk mendukung operasional produksi",
          "Memastikan akurasi penerimaan barang dan pencatatan inventory pada sistem internal perusahaan",
          "Mendukung efisiensi produksi melalui perencanaan kebutuhan stok",
          "Mengurangi potensi selisih inventory melalui pelaksanaan stock opname berkala",
        ],
      },
      {
        role: "Administrasi Printing & Purchasing",
        period: "2015 – 2017",
        highlights: [
          "Mengontrol pengadaan bahan baku printing guna menjaga keseimbangan stok dan kelancaran produksi",
          "Membantu efisiensi penggunaan bahan baku melalui pencatatan dan monitoring penggunaan barang",
          "Menangani administrasi invoice dan penagihan pelanggan secara tertib dan tepat waktu",
          "Mendukung operasional produksi melalui pengelolaan kebutuhan perusahaan",
        ],
      },
    ],
  },
  {
    company: "CV. Triwijaya Abadi Foam",
    industry: "Manufaktur — Produsen Busa",
    role: "Administrasi Stock",
    period: "2013 – 2014",
    current: false,
    tag: "early",
    accentColor: "#6b7280",
    desc: "Memulai karir profesional dengan mengelola arus barang produksi sesuai SOP, monitoring stok, serta pelaksanaan stock opname berkala untuk memastikan keselarasan data sistem dengan fisik gudang.",
    highlights: [
      "Mengontrol arus barang masuk dan keluar agar distribusi produksi berjalan lancar",
      "Monitoring stok secara berkala untuk mencegah kekosongan barang (out-of-stock)",
      "Menjalankan administrasi inventory dengan ketelitian untuk meminimalisir selisih stok",
    ],
  },
];

export default function Experience() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.06 }
    );
    ref.current?.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const resolveTag = (tag: string) => {
    if (tag === "latest") return t.experience.tagLatest[lang];
    if (tag === "early") return t.experience.tagEarlyCareer[lang];
    return tag;
  };

  const totalYears = new Date().getFullYear() - 2013;

  return (
    <section id="experience" ref={ref} className="py-32 relative overflow-hidden">
      {/* ── Atmospheric background layers ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-void/20 to-ink" />
      {/* Large ambient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-neon/[0.03] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-neon/[0.04] blur-[140px] pointer-events-none" />
      {/* Subtle noise grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="section-reveal flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] text-neon/60 tracking-[0.4em] uppercase"></span>
          <div className="flex-1 h-px bg-gradient-to-r from-neon/30 to-transparent max-w-40" />
        </div>

        <div className="section-reveal mb-6">
          <h2
            style={{ fontFamily: "'SimplyOlive', cursive" }}
            className="text-7xl md:text-8xl text-frost leading-[0.95] tracking-tight"
          >
            {t.experience.sectionTitle[lang]}{" "}
            <span
              className="italic"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(45,212,191,0.5)",
              }}
            >
              {t.experience.sectionSub[lang]}
            </span>
          </h2>
        </div>

        {/* ── Stats bar ── */}
        <div className="section-reveal flex flex-wrap items-center gap-6 mb-16">
          <p className="font-body text-silver/70 text-sm max-w-sm leading-relaxed">
            {t.experience.sectionDesc[lang]}
          </p>
          <div className="flex items-center gap-8 ml-auto">
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-neon/80 leading-none">{totalYears}+</div>
              <div className="font-mono text-[10px] text-silver/40 tracking-widest uppercase mt-1">Years</div>
            </div>
            <div className="w-px h-10 bg-graphite-2/60" />
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-frost/70 leading-none">{jobs.length}</div>
              <div className="font-mono text-[10px] text-silver/40 tracking-widest uppercase mt-1">Roles</div>
            </div>
            <div className="w-px h-10 bg-graphite-2/60" />
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-silver/60 leading-none">4+</div>
              <div className="font-mono text-[10px] text-silver/40 tracking-widest uppercase mt-1">Industries</div>
            </div>
          </div>
        </div>

        {/* ── Timeline layout ── */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 hidden md:block" style={{ width: "1px" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-neon/50 via-graphite-2/40 to-transparent" />
          </div>

          <div className="space-y-3">
            {jobs.map((job, i) => {
              const isOpen = expanded === i;
              const isHovered = hoveredIndex === i;

              return (
                <div
                  key={i}
                  className="section-reveal relative"
                  style={{ transitionDelay: `${i * 0.04}s` }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[18px] top-7 w-3.5 h-3.5 rounded-full border-2 hidden md:block z-10 transition-all duration-300"
                    style={{
                      borderColor: job.current
                        ? "#2dd4bf"
                        : isOpen
                        ? "rgba(45,212,191,0.5)"
                        : "#2d3139",
                      background: job.current
                        ? "#2dd4bf"
                        : isOpen
                        ? "rgba(45,212,191,0.15)"
                        : "#1a1d24",
                      boxShadow: job.current
                        ? "0 0 16px rgba(45,212,191,0.6), 0 0 40px rgba(45,212,191,0.2)"
                        : isOpen
                        ? "0 0 8px rgba(45,212,191,0.3)"
                        : "none",
                    }}
                  />
                  {/* Pulse ring for current job */}
                  {job.current && (
                    <div
                      className="absolute left-[14px] top-[23px] w-[22px] h-[22px] rounded-full hidden md:block"
                      style={{
                        animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                        background: "rgba(45,212,191,0.15)",
                      }}
                    />
                  )}

                  <div className="md:ml-16">
                    {/* Card header — clickable */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="w-full text-left rounded-2xl p-5 md:p-6 border transition-all duration-300 group relative overflow-hidden"
                      style={{
                        background: isOpen
                          ? "rgba(22,25,32,0.95)"
                          : isHovered
                          ? "rgba(22,25,32,0.8)"
                          : "rgba(16,18,24,0.6)",
                        borderColor: isOpen
                          ? "rgba(45,212,191,0.25)"
                          : isHovered
                          ? "rgba(45,212,191,0.12)"
                          : "rgba(45,49,57,0.5)",
                        backdropFilter: "blur(12px)",
                        boxShadow: isOpen
                          ? "0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
                          : "0 2px 20px rgba(0,0,0,0.2)",
                      }}
                    >
                      {/* Shimmer on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(105deg, transparent 40%, rgba(45,212,191,0.03) 50%, transparent 60%)",
                        }}
                      />

                      <div className="flex items-start justify-between gap-4 relative">
                        <div className="flex-1 min-w-0">
                          {/* Role + tag */}
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h3 className="font-body font-semibold text-frost text-[15px] transition-colors duration-200 group-hover:text-neon-2">
                              {job.role}
                            </h3>
                            {job.tag && (
                              <span
                                className="font-mono text-[9px] px-2 py-0.5 rounded-full tracking-widest uppercase"
                                style={{
                                  background: job.current
                                    ? "rgba(45,212,191,0.12)"
                                    : "rgba(139,148,158,0.08)",
                                  color: job.current ? "#2dd4bf" : "#8b949e",
                                  border: `1px solid ${
                                    job.current
                                      ? "rgba(45,212,191,0.25)"
                                      : "rgba(139,148,158,0.15)"
                                  }`,
                                }}
                              >
                                {resolveTag(job.tag)}
                              </span>
                            )}
                          </div>

                          {/* Company */}
                          <p className="font-body text-silver/80 text-sm font-medium truncate">
                            {job.company}
                          </p>

                          {/* Industry chip */}
                          <div className="flex items-center gap-2 mt-2">
                            <span
                              className="font-mono text-[10px] text-silver/35 px-2 py-0.5 rounded-md"
                              style={{ background: "rgba(45,49,57,0.4)" }}
                            >
                              {job.industry}
                            </span>
                          </div>
                        </div>

                        {/* Right side: period + chevron */}
                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                          <span
                            className="font-mono text-[11px] text-silver/45 px-3 py-1 rounded-full"
                            style={{ background: "rgba(45,49,57,0.35)" }}
                          >
                            {job.period}
                          </span>
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                              background: isOpen
                                ? "rgba(45,212,191,0.15)"
                                : "rgba(45,49,57,0.4)",
                              border: `1px solid ${
                                isOpen
                                  ? "rgba(45,212,191,0.3)"
                                  : "rgba(45,49,57,0.6)"
                              }`,
                            }}
                          >
                            <svg
                              className={`w-3 h-3 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                              style={{ color: isOpen ? "#2dd4bf" : "#8b949e" }}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* ── Expanded panel ── */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{ maxHeight: isOpen ? "1200px" : "0px" }}
                    >
                      <div
                        className="rounded-b-2xl px-6 pb-6 pt-5 -mt-2 border border-t-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(22,25,32,0.97) 0%, rgba(16,18,24,0.97) 100%)",
                          borderColor: "rgba(45,212,191,0.15)",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        {/* Top accent line */}
                        <div
                          className="w-16 h-px mb-5"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(45,212,191,0.5), transparent)",
                          }}
                        />

                        {/* Regular job content */}
                        {!job.subRoles && (
                          <>
                            {job.desc && (
                              <p className="font-body text-silver/65 text-sm leading-relaxed mb-6">
                                {job.desc}
                              </p>
                            )}
                            <div className="space-y-3">
                              {job.highlights.map((h, j) => (
                                <div key={j} className="flex items-start gap-3 group/item">
                                  <div
                                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                                    style={{
                                      background: "rgba(45,212,191,0.08)",
                                      border: "1px solid rgba(45,212,191,0.2)",
                                    }}
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-neon/70" />
                                  </div>
                                  <p className="font-body text-silver/70 text-sm leading-relaxed group-hover/item:text-silver/90 transition-colors">
                                    {h}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {/* Multi-role job content */}
                        {job.subRoles && (
                          <div className="space-y-6">
                            {job.subRoles.map((sub, k) => (
                              <div key={k}>
                                <div
                                  className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3"
                                  style={{
                                    borderBottom: "1px solid rgba(45,49,57,0.5)",
                                  }}
                                >
                                  <h4 className="font-body font-semibold text-frost/85 text-sm">
                                    {sub.role}
                                  </h4>
                                  <span
                                    className="font-mono text-[10px] text-silver/40 px-2 py-0.5 rounded-full"
                                    style={{ background: "rgba(45,49,57,0.35)" }}
                                  >
                                    {sub.period}
                                  </span>
                                </div>
                                <div className="space-y-3 pl-3"
                                  style={{ borderLeft: "1px solid rgba(45,212,191,0.12)" }}
                                >
                                  {sub.highlights.map((h, j) => (
                                    <div key={j} className="flex items-start gap-3 group/item">
                                      <div className="w-1 h-1 rounded-full bg-neon/40 mt-2.5 flex-shrink-0" />
                                      <p className="font-body text-silver/65 text-sm leading-relaxed group-hover/item:text-silver/85 transition-colors">
                                        {h}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom fade-out */}
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(10,11,15,0.8), transparent)" }}
          />
        </div>
      </div>

      {/* Ping animation keyframe (inline style fallback) */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}