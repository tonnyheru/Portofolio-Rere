"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { useTheme } from "../components/ThemeContext";
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
  const { theme } = useTheme();
  const isLight = theme === "light";
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

  // ── Color tokens berdasarkan tema ──
  const cardBg = (isOpen: boolean, isHovered: boolean) => {
    if (isLight) {
      if (isOpen)     return "rgba(255,253,248,0.97)";
      if (isHovered)  return "rgba(255,252,244,0.95)";
      return "rgba(255,252,244,0.88)";
    }
    if (isOpen)     return "rgba(22,25,32,0.95)";
    if (isHovered)  return "rgba(22,25,32,0.8)";
    return "rgba(16,18,24,0.6)";
  };

  const cardBorder = (isOpen: boolean, isHovered: boolean) => {
    if (isLight) {
      if (isOpen)    return "rgba(13,148,136,0.3)";
      if (isHovered) return "rgba(13,148,136,0.18)";
      return "rgba(180,130,40,0.15)";
    }
    if (isOpen)    return "rgba(45,212,191,0.25)";
    if (isHovered) return "rgba(45,212,191,0.12)";
    return "rgba(45,49,57,0.5)";
  };

  const cardShadow = (isOpen: boolean) => {
    if (isLight) {
      return isOpen
        ? "0 4px 32px rgba(13,148,136,0.1), 0 1px 0 rgba(255,255,255,0.9) inset"
        : "0 2px 12px rgba(180,130,40,0.06), 0 1px 0 rgba(255,255,255,0.85) inset";
    }
    return isOpen
      ? "0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
      : "0 2px 20px rgba(0,0,0,0.2)";
  };

  const expandedPanelBg = isLight
    ? "linear-gradient(180deg, rgba(255,252,244,0.99) 0%, rgba(255,250,240,0.99) 100%)"
    : "linear-gradient(180deg, rgba(22,25,32,0.97) 0%, rgba(16,18,24,0.97) 100%)";

  const expandedPanelBorder = isLight
    ? "rgba(13,148,136,0.18)"
    : "rgba(45,212,191,0.15)";

  const industryChipBg = isLight
    ? "rgba(254,243,216,0.8)"
    : "rgba(45,49,57,0.4)";

  const industryChipColor = isLight ? "#7c4a03" : undefined;

  const periodChipBg = isLight
    ? "rgba(255,249,236,0.9)"
    : "rgba(45,49,57,0.35)";

  const periodChipColor = isLight ? "#3c3830" : undefined;

  const chevronBg = (isOpen: boolean) => isLight
    ? (isOpen ? "rgba(13,148,136,0.12)" : "rgba(180,130,40,0.08)")
    : (isOpen ? "rgba(45,212,191,0.15)" : "rgba(45,49,57,0.4)");

  const chevronBorder = (isOpen: boolean) => isLight
    ? (isOpen ? "rgba(13,148,136,0.3)" : "rgba(180,130,40,0.2)")
    : (isOpen ? "rgba(45,212,191,0.3)" : "rgba(45,49,57,0.6)");

  const chevronColor = (isOpen: boolean) => isLight
    ? (isOpen ? "#0d9488" : "#78716c")
    : (isOpen ? "#2dd4bf" : "#8b949e");

  const dotBg = (job: Job, isOpen: boolean) => {
    if (isLight) {
      return job.current ? "#0d9488" : isOpen ? "rgba(13,148,136,0.15)" : "#e8e4dc";
    }
    return job.current ? "#2dd4bf" : isOpen ? "rgba(45,212,191,0.15)" : "#1a1d24";
  };

  const dotBorder = (job: Job, isOpen: boolean) => {
    if (isLight) {
      return job.current ? "#0d9488" : isOpen ? "rgba(13,148,136,0.5)" : "rgba(180,130,40,0.3)";
    }
    return job.current ? "#2dd4bf" : isOpen ? "rgba(45,212,191,0.5)" : "#2d3139";
  };

  const dotShadow = (job: Job, isOpen: boolean) => {
    if (isLight) {
      return job.current
        ? "0 0 12px rgba(13,148,136,0.5), 0 0 30px rgba(13,148,136,0.15)"
        : isOpen ? "0 0 6px rgba(13,148,136,0.2)" : "none";
    }
    return job.current
      ? "0 0 16px rgba(45,212,191,0.6), 0 0 40px rgba(45,212,191,0.2)"
      : isOpen ? "0 0 8px rgba(45,212,191,0.3)" : "none";
  };

  const highlightDotBg = isLight ? "rgba(13,148,136,0.08)" : "rgba(45,212,191,0.08)";
  const highlightDotBorder = isLight ? "1px solid rgba(13,148,136,0.2)" : "1px solid rgba(45,212,191,0.2)";

  const subRoleDivider = isLight ? "rgba(180,130,40,0.15)" : "rgba(45,49,57,0.5)";
  const subRoleLeftBorder = isLight ? "rgba(13,148,136,0.15)" : "rgba(45,212,191,0.12)";
  const subRolePeriodBg = isLight ? "rgba(254,243,216,0.6)" : "rgba(45,49,57,0.35)";
  const subRolePeriodColor = isLight ? "#7c4a03" : undefined;

  // Bottom fade — cocok dengan background section
  const bottomFadeBg = isLight
    ? "linear-gradient(to top, rgba(240,253,249,0.9), transparent)"
    : "linear-gradient(to top, rgba(10,11,15,0.8), transparent)";

  // Section background overlay
  const sectionTopBg = isLight
    ? "linear-gradient(to bottom, transparent, transparent)"
    : "linear-gradient(to bottom, rgba(10,11,15,0), rgba(16,18,24,0.1), rgba(10,11,15,0))";

  return (
    <section id="experience" ref={ref} className="py-32 relative overflow-hidden">
      {/* ── Atmospheric background layers ── */}
      <div className="absolute inset-0" style={{ background: sectionTopBg }} />
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
                WebkitTextStroke: isLight
                  ? "1px rgba(13,148,136,0.55)"
                  : "1px rgba(45,212,191,0.5)",
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
                      borderColor: dotBorder(job, isOpen),
                      background: dotBg(job, isOpen),
                      boxShadow: dotShadow(job, isOpen),
                    }}
                  />
                  {/* Pulse ring for current job */}
                  {job.current && (
                    <div
                      className="absolute left-[14px] top-[23px] w-[22px] h-[22px] rounded-full hidden md:block"
                      style={{
                        animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                        background: isLight
                          ? "rgba(13,148,136,0.15)"
                          : "rgba(45,212,191,0.15)",
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
                        background: cardBg(isOpen, isHovered),
                        borderColor: cardBorder(isOpen, isHovered),
                        backdropFilter: "blur(12px)",
                        boxShadow: cardShadow(isOpen),
                      }}
                    >
                      {/* Shimmer on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: isLight
                            ? "linear-gradient(105deg, transparent 40%, rgba(13,148,136,0.04) 50%, transparent 60%)"
                            : "linear-gradient(105deg, transparent 40%, rgba(45,212,191,0.03) 50%, transparent 60%)",
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
                                    ? isLight ? "rgba(13,148,136,0.1)" : "rgba(45,212,191,0.12)"
                                    : isLight ? "rgba(180,130,40,0.08)" : "rgba(139,148,158,0.08)",
                                  color: job.current
                                    ? isLight ? "#0f766e" : "#2dd4bf"
                                    : isLight ? "#7c4a03" : "#8b949e",
                                  border: `1px solid ${job.current
                                    ? isLight ? "rgba(13,148,136,0.25)" : "rgba(45,212,191,0.25)"
                                    : isLight ? "rgba(180,130,40,0.2)" : "rgba(139,148,158,0.15)"
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
                              className="font-mono text-[10px] px-2 py-0.5 rounded-md"
                              style={{
                                background: industryChipBg,
                                color: industryChipColor,
                              }}
                            >
                              {job.industry}
                            </span>
                          </div>
                        </div>

                        {/* Right side: period + chevron */}
                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                          <span
                            className="font-mono text-[11px] px-3 py-1 rounded-full"
                            style={{
                              background: periodChipBg,
                              color: periodChipColor,
                            }}
                          >
                            {job.period}
                          </span>
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                              background: chevronBg(isOpen),
                              border: `1px solid ${chevronBorder(isOpen)}`,
                            }}
                          >
                            <svg
                              className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                              style={{ color: chevronColor(isOpen) }}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
                          background: expandedPanelBg,
                          borderColor: expandedPanelBorder,
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        {/* Top accent line */}
                        <div
                          className="w-16 h-px mb-5"
                          style={{
                            background: isLight
                              ? "linear-gradient(90deg, rgba(13,148,136,0.5), transparent)"
                              : "linear-gradient(90deg, rgba(45,212,191,0.5), transparent)",
                          }}
                        />

                        {/* Regular job content */}
                        {!job.subRoles && (
                          <>
                            {job.desc && (
                              <p className="font-body text-silver/65 text-sm leading-relaxed mb-6"
                                style={{ color: isLight ? "#6b6660" : undefined }}>
                                {job.desc}
                              </p>
                            )}
                            <div className="space-y-3">
                              {job.highlights.map((h, j) => (
                                <div key={j} className="flex items-start gap-3 group/item">
                                  <div
                                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                                    style={{
                                      background: highlightDotBg,
                                      border: highlightDotBorder,
                                    }}
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full"
                                      style={{ background: isLight ? "#0d9488" : "rgba(45,212,191,0.7)" }} />
                                  </div>
                                  <p className="font-body text-sm leading-relaxed transition-colors"
                                    style={{ color: isLight ? "#57534e" : "rgba(148,163,184,0.7)" }}>
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
                                  style={{ borderBottom: `1px solid ${subRoleDivider}` }}
                                >
                                  <h4 className="font-body font-semibold text-sm"
                                    style={{ color: isLight ? "#1c1814" : "rgba(226,232,240,0.85)" }}>
                                    {sub.role}
                                  </h4>
                                  <span
                                    className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                                    style={{
                                      background: subRolePeriodBg,
                                      color: subRolePeriodColor ?? "rgba(148,163,184,0.4)",
                                    }}
                                  >
                                    {sub.period}
                                  </span>
                                </div>
                                <div className="space-y-3 pl-3"
                                  style={{ borderLeft: `1px solid ${subRoleLeftBorder}` }}
                                >
                                  {sub.highlights.map((h, j) => (
                                    <div key={j} className="flex items-start gap-3 group/item">
                                      <div className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0"
                                        style={{ background: isLight ? "rgba(13,148,136,0.5)" : "rgba(45,212,191,0.4)" }} />
                                      <p className="font-body text-sm leading-relaxed transition-colors"
                                        style={{ color: isLight ? "#6b6660" : "rgba(148,163,184,0.65)" }}>
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

          {/* Bottom fade — menyesuaikan warna background section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: bottomFadeBg }}
          />
        </div>
      </div>

      {/* Ping animation keyframe */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}