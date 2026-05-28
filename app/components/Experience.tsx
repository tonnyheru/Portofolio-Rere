"use client";
import { useEffect, useRef, useState } from "react";

const jobs = [
  {
    company: "PT. Panca Abadi Nan Jaya",
    industry: "F&B — Multi-brand",
    role: "Inventory Stock Admin",
    period: "Apr 2026 – Present",
    current: true,
    tag: "Terbaru",
    accentColor: "#7fb3d0",
    desc: "Mengelola administrasi dan pencatatan kedatangan barang untuk operasional multi-brand F&B, serta menjaga akurasi inventory melalui proses data entry, monitoring stok, dan pengecekan dokumen operasional.",
    highlights: [
      "Mengelola administrasi dan pencatatan kedatangan barang untuk operasional multi-brand F&B",
      "Verifikasi transfer goods antar outlet dan gudang guna memastikan kesesuaian data dan stok fisik",
      "Menjaga akurasi inventory melalui data entry, monitoring stok, dan pengecekan dokumen operasional",
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
    desc: "Mengelola hubungan vendor dan evaluasi supplier untuk menjaga kualitas serta harga kompetitif, serta mendukung pengadaan bahan baku R&D dan sponsorship vendor untuk efisiensi operasional.",
    highlights: [
      "Efisiensi biaya pembelian melalui negosiasi harga bahan baku utama",
      "Meningkatkan fleksibilitas cash flow melalui renegosiasi TOP supplier strategis",
      "Mengelola hubungan vendor dan evaluasi supplier untuk menjaga kualitas serta harga kompetitif",
      "Mendukung pengadaan bahan baku R&D dan sponsorship vendor untuk efisiensi operasional",
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
    desc: "Membangun sistem monitoring stok berbasis Google Sheets, meningkatkan kedisiplinan stock opname dan akurasi data persediaan, serta menekan waste dan mengoptimalkan COGS melalui pengawasan penggunaan bahan baku.",
    highlights: [
      "Membangun sistem monitoring stok berbasis Google Sheets untuk meningkatkan kontrol inventory",
      "Meningkatkan kedisiplinan stock opname dan akurasi data persediaan",
      "Menekan waste dan mengoptimalkan COGS melalui pengawasan penggunaan bahan baku",
      "Implementasi sistem FEFO guna meminimalisir kerugian bahan baku expired",
      "Mendukung efisiensi cash flow melalui negosiasi TOP dengan supplier",
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
    desc: "Menjalankan administrasi perusahaan dan pengelolaan database internal secara sistematis, menyusun laporan kas operasional project secara rapi dan akurat, serta mengelola dokumentasi perusahaan untuk mendukung kelancaran operasional kantor.",
    highlights: [
      "Menjalankan administrasi perusahaan dan pengelolaan database internal secara sistematis",
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
      "Mengelola purchasing multi-outlet dan multi-brand dengan pengendalian stok yang terstruktur",
      "Membantu kestabilan operasional outlet melalui forecasting kebutuhan bahan baku",
      "Digitalisasi sistem monitoring stok berbasis Google Sheets",
      "Negosiasi supplier untuk meningkatkan fleksibilitas cash flow perusahaan",
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
    desc: "Mengelola administrasi operasional dan pembaruan data perusahaan secara akurat, mendukung proses rekrutmen awal, serta menyusun laporan kas operasional harian dengan pencatatan yang tertib dan transparan.",
    highlights: [
      "Mengelola administrasi operasional dan pembaruan data perusahaan secara akurat",
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
    desc: "Memberikan pelayanan informasi pelanggan secara komunikatif dan profesional di area retail, serta menangani keluhan pelanggan dengan pendekatan solutif guna menjaga customer satisfaction.",
    highlights: [
      "Pelayanan informasi pelanggan secara komunikatif dan profesional di area retail",
      "Menangani keluhan pelanggan dengan pendekatan solutif",
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
    desc: "Mengelola administrasi reservasi dan invoice pelanggan, menyusun sistem pengarsipan dokumen yang mempermudah pelacakan data, serta menjalin komunikasi pelanggan secara responsif untuk menjaga kualitas layanan perusahaan.",
    highlights: [
      "Mengelola administrasi reservasi dan invoice pelanggan",
      "Menyusun sistem pengarsipan dokumen yang mempermudah pelacakan data",
      "Menjalin komunikasi pelanggan secara responsif untuk menjaga kualitas layanan",
      "Mendukung kelancaran proses administrasi perjalanan dan akomodasi pelanggan",
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
    desc: "Mengontrol pengadaan bahan baku printing, mengelola administrasi invoice dan penagihan pelanggan, serta menjaga stabilitas stok bahan baku dan barang jadi untuk mendukung operasional produksi.",
    highlights: [
      "Mengontrol pengadaan bahan baku printing guna menjaga keseimbangan stok dan kelancaran produksi",
      "Memastikan akurasi penerimaan barang dan pencatatan inventory pada sistem internal",
      "Menangani administrasi invoice dan penagihan pelanggan secara tertib dan tepat waktu",
      "Mendukung operasional produksi melalui pengelolaan kebutuhan perusahaan",
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
    desc: "Menjaga akurasi data stok antara sistem dan fisik gudang melalui stock opname rutin, serta mengontrol arus barang masuk dan keluar agar distribusi produksi berjalan lancar tanpa keterlambatan.",
    highlights: [
      "Menjaga akurasi data stok antara sistem dan fisik gudang melalui stock opname rutin",
      "Mengontrol arus barang masuk dan keluar agar distribusi produksi berjalan lancar",
      "Monitoring stok secara berkala untuk mencegah kekosongan barang",
      "Menjalankan administrasi inventory dengan ketelitian untuk meminimalisir selisih stok",
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
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-void/30 to-ink" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-neon/3 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
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

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon/40 via-graphite-2/60 to-transparent hidden md:block" />

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={i} className="section-reveal relative" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="absolute left-[18px] top-7 w-3.5 h-3.5 rounded-full border-2 hidden md:block z-10"
                  style={{
                    borderColor: job.current ? "#7fb3d0" : "#2d3139",
                    background: job.current ? "#7fb3d0" : "#1a1d24",
                    boxShadow: job.current ? "0 0 12px rgba(127,179,208,0.4)" : "none",
                  }} />

                <div className="md:ml-16">
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full text-left glass rounded-2xl p-6 border border-graphite-2/60 glass-hover transition-all duration-300 hover:border-neon/20 group"
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