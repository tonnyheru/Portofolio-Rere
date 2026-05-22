"use client";
import { useEffect, useRef, useState } from "react";

const jobs = [
  {
    company: "PT. Animo Resto Primera (Mujigae)",
    industry: "F&B — Korean Restaurant",
    role: "Purchasing",
    period: "Nov 2025 – Feb 2026",
    current: true,
    tag: "Terbaru",
    accentColor: "#7fb3d0",
    desc: "Mengelola siklus pengadaan lengkap mulai dari verifikasi barang sesuai Purchase Order (PO), negosiasi kontrak, harga, dan Term of Payment (TOP) supplier, serta kolaborasi dengan divisi R&D untuk pengadaan sampel bahan baku baru.",
    highlights: [
      "Penghematan IDR 12.500/unit pada kategori bahan baku utama",
      "Renegosiasi TOP 5+ supplier strategis: dari CASH menjadi 7–30 hari",
      "Diversifikasi & evaluasi vendor berkala untuk menjaga standar kualitas dan harga kompetitif",
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
    desc: "Melaksanakan stock opname berkala seluruh divisi, analisis COGS seluruh lini produk, forecasting kebutuhan bahan baku berbasis data historis penjualan, serta digitalisasi sistem monitoring inventori dari tidak rutin menjadi terjadwal dan sistematis.",
    highlights: [
      "Digitalisasi inventori berbasis Google Sheets — stock opname lebih terjadwal dan terukur",
      "Implementasi FEFO — menekan kerugian akibat bahan baku kedaluwarsa",
      "Optimasi COGS & efisiensi belanja operasional melalui forecasting akurat",
      "Renegosiasi TOP dengan supplier — meningkatkan fleksibilitas cash flow perusahaan",
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
    desc: "Mengelola administrasi & korespondensi perusahaan, entri dan pembaruan data ke sistem internal, dukungan proses rekrutmen, rekapitulasi absensi karyawan, serta pengelolaan laporan arus kas operasional harian.",
    highlights: [
      "Sistem surat-menyurat yang terorganisir dan terdistribusi dengan baik",
      "Akurasi input dan pembaruan database internal secara berkala",
      "Rekapitulasi absensi & laporan HR yang akurat",
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
    desc: "Stock opname berkala di main kitchen dan seluruh outlet multi-brand, forecasting kebutuhan bahan baku, manajemen vendor & administrasi kontra bon, serta digitalisasi sistem kontrol stok berbasis Google Sheets per outlet.",
    highlights: [
      "Digitalisasi kontrol stok real-time via Google Sheets untuk semua outlet",
      "Renegosiasi TOP dengan 10+ supplier mayoritas",
      "Inisiasi program kemitraan vendor — diskon khusus & pengadaan aset tanpa biaya tambahan",
      "Penerapan FEFO — menekan kerugian akibat bahan baku kedaluwarsa",
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
    desc: "Mengelola administrasi & operasional kantor, surat-menyurat formal, pembaruan data ke sistem internal, dukungan proses rekrutmen melalui wawancara kandidat, serta penyusunan laporan kas operasional harian.",
    highlights: [
      "Pengelolaan siklus surat-menyurat formal perusahaan",
      "Pelaksanaan wawancara & rekapitulasi data absensi karyawan",
      "Penyusunan laporan kas operasional harian yang tertib dan akurat",
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
    desc: "Memberikan informasi layanan, promosi, dan edukasi kepada pelanggan melalui pengumuman suara, menangani keluhan pelanggan secara solutif, serta memastikan kenyamanan pengalaman belanja di area retail.",
    highlights: [
      "Komunikasi publik yang informatif dan profesional",
      "Penanganan keluhan pelanggan dengan pendekatan solutif",
      "Pelayanan prima untuk menjaga kepuasan konsumen",
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
    desc: "Mengelola proses pemesanan transportasi dan akomodasi hotel, administrasi keuangan & penerbitan invoice, manajemen dokumentasi operasional, serta membangun hubungan pelanggan jangka panjang.",
    highlights: [
      "Pengelolaan reservasi sistematis untuk multi-pelanggan",
      "Penyusunan & verifikasi invoice dengan akurasi tinggi",
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
    desc: "Berbagai peran mulai dari customer service & kasir, administrasi gudang produksi, hingga purchasing dan administrasi printing. Mengelola stok bahan baku, pengendalian arus barang dari supplier, serta administrasi keuangan.",
    highlights: [
      "Manajemen stok bahan baku gudang & divisi printing",
      "Pengendalian arus barang masuk dari supplier sesuai dokumen pengiriman",
      "Administrasi keuangan, penerbitan invoice & penagihan tepat waktu",
    ],
  },
  {
    company: "CV. Triwijaya Abadi Foam",
    industry: "Manufaktur — Produsen Busa",
    role: "Administrasi Stock",
    period: "2013 – 2014",
    current: false,
    tag: "Awal Karir",
    accentColor: "#6b7280",
    desc: "Memulai karir profesional dengan mengelola arus barang produksi sesuai SOP, monitoring stok untuk mencegah out-of-stock, serta pelaksanaan stock opname berkala untuk memastikan keselarasan data sistem dengan fisik gudang.",
    highlights: [
      "Manajemen arus barang masuk & keluar sesuai SOP perusahaan",
      "Monitoring stok rutin untuk mencegah kekosongan barang (out-of-stock)",
      "Stock opname berkala — validasi akurasi data sistem vs fisik gudang",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(0);

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
    <section id="experience" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-void/30 to-ink" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-neon/3 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="section-reveal flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-neon/70 tracking-[0.3em] uppercase"></span>
          <div className="flex-1 h-px bg-gradient-to-r from-neon/30 to-transparent max-w-32" />
        </div>
        <div className="section-reveal mb-16">
          <h2 style={{ fontFamily: "'SimpleNotes', cursive" }} className="text-6xl md:text-7xl text-frost leading-tight">
            Pengalaman <span className="text-silver">Profesional</span>
          </h2>
          <p className="font-body text-silver mt-4 max-w-lg">
            10+ tahun perjalanan karir di berbagai industri, dari manufaktur hingga F&B multi-brand.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon/40 via-graphite-2/60 to-transparent hidden md:block" />

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={i} className="section-reveal relative" style={{ transitionDelay: `${i * 0.05}s` }}>
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-7 w-3.5 h-3.5 rounded-full border-2 hidden md:block z-10"
                  style={{
                    borderColor: job.current ? "#7fb3d0" : "#2d3139",
                    background: job.current ? "#7fb3d0" : "#1a1d24",
                    boxShadow: job.current ? "0 0 12px rgba(127,179,208,0.4)" : "none",
                  }} />

                {/* Card */}
                <div className="md:ml-16">
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full text-left glass rounded-2xl p-6 border border-graphite-2/60 glass-hover transition-all duration-300
                      hover:border-neon/20 group"
                    style={{
                      borderColor: expanded === i ? "rgba(127,179,208,0.2)" : undefined,
                      background: expanded === i ? "rgba(26,29,36,0.8)" : undefined,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-body font-semibold text-frost text-base group-hover:text-neon-2 transition-colors">
                            {job.role}
                          </h3>
                          {job.tag && (
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                background: job.current ? "rgba(127,179,208,0.1)" : "rgba(139,148,158,0.1)",
                                color: job.current ? "#7fb3d0" : "#8b949e",
                                border: `1px solid ${job.current ? "rgba(127,179,208,0.2)" : "rgba(139,148,158,0.2)"}`,
                              }}>
                              {job.tag}
                            </span>
                          )}
                        </div>
                        <p className="font-body text-silver text-sm">{job.company}</p>
                        <p className="font-mono text-silver/40 text-xs mt-0.5">{job.industry}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="font-mono text-xs text-silver/50">{job.period}</span>
                        <svg
                          className={`w-4 h-4 text-silver/40 transition-transform duration-300 ${expanded === i ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  <div className={`overflow-hidden transition-all duration-500 ${expanded === i ? "max-h-96 mt-1" : "max-h-0"}`}>
                    <div className="glass rounded-2xl p-6 border border-graphite-2/40 border-t-0 rounded-t-none -mt-2 pt-6">
                      <p className="font-body text-silver text-sm leading-relaxed mb-5">{job.desc}</p>
                      <div className="space-y-2">
                        {job.highlights.map((h, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <div className="w-1 h-1 rounded-full bg-neon/60 mt-2 flex-shrink-0" />
                            <p className="font-body text-silver-2 text-sm">{h}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
