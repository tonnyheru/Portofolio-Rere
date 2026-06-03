export type Lang = "id" | "en";

export const t = {
  // ── Navbar ──────────────────────────────────────────────────────────────
  nav: {
    home:       { id: "Home",       en: "Home" },
    about:      { id: "About",      en: "About" },
    skills:     { id: "Skills",     en: "Skills" },
    experience: { id: "Experience", en: "Experience" },
    contact:    { id: "Contact",    en: "Contact" },
    downloadCV: { id: "Download CV", en: "Download CV" },
  },

  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    available: {
      id: "Available for opportunities",
      en: "Available for opportunities",
    },
    roles: {
      id: ["Purchasing", "Cost Control", "Inventory Control", "Price & TOP Negotiator", "Admin & Operation"],
      en: ["Purchasing", "Cost Control", "Inventory Control", "Price & TOP Negotiator", "Admin & Operation"],
    },
    desc: {
      id: "Memiliki pengalaman profesional di bidang Purchasing, Cost Control, dan Inventory Management di industri F&B dan manufaktur.",
      en: "Professional experience in Purchasing, Cost Control, and Inventory Management across F&B and manufacturing industries.",
    },
    stats: {
      id: [
        { val: "10+", label: "Tahun Pengalaman" },
        { val: "8+",  label: "Perusahaan" },
        { val: "20+", label: "Vendor Renegosiasi" },
        { val: "50+", label: "Renegosiasi Harga Material" },
      ],
      en: [
        { val: "10+", label: "Years Experience" },
        { val: "8+",  label: "Companies" },
        { val: "20+", label: "Vendor Renegotiations" },
        { val: "50+", label: "Material Price Renegotiations" },
      ],
    },
    btnDownload:    { id: "Download CV",       en: "Download CV" },
    btnExperience:  { id: "Lihat Pengalaman",  en: "View Experience" },
    btnContact:     { id: "Hubungi Saya",      en: "Contact Me" },
    dragHint:       { id: "drag me · hover me", en: "drag me · hover me" },
    cardRole:       { id: "Supply Chain · Purchaser · Cost Controller", en: "Supply Chain · Purchaser · Cost Controller" },
    cardLocation:   { id: "Bandung",            en: "Bandung" },
    cardExperience: { id: "10+ Years",          en: "10+ Years" },
    cardIndustry:   { id: "F&B · Manufaktur",   en: "F&B · Manufacturing" },
    cardStatus:     { id: "Available",           en: "Available" },
    cardLocation_label:   { id: "Location",    en: "Location" },
    cardExperience_label: { id: "Experience",  en: "Experience" },
    cardIndustry_label:   { id: "Industry",    en: "Industry" },
    cardStatus_label:     { id: "Status",      en: "Status" },
  },

  // ── About ────────────────────────────────────────────────────────────────
  about: {
    sectionTitle: { id: "Tentang",  en: "About" },
    sectionSub:   { id: "Saya",     en: "Me" },
    bio1: {
      id: "Memiliki pengalaman dan rekam jejak profesional di bidang Purchasing, Cost Control, dan Inventory Management di industri Food & Beverages dan manufaktur.",
      en: "Experienced professional with a proven track record in Purchasing, Cost Control, and Inventory Management across the Food & Beverages and manufacturing industries.",
    },
    bio2: {
      id: "Keahlian saya mencakup pengadaan strategis, negosiasi vendor, analisis food costing, COGS, penerapan metode FIFO dan FEFO guna efisiensi stok.",
      en: "My expertise includes strategic procurement, vendor negotiation, food costing analysis, COGS, and applying FIFO/FEFO methods for stock efficiency.",
    },
    bio3: {
      id: "Berpengalaman menggunakan sistem ESB, MOKA, Mille, Jurnal, Olsera, serta Google Sheet dalam operasional sehari-hari.",
      en: "Experienced using systems such as ESB, MOKA, Mille, Jurnal, Olsera, and Google Sheets in daily operations.",
    },
    educationTitle: { id: "Pendidikan",    en: "Education" },
    skillsTitle:    { id: "Keahlian Utama", en: "Core Skills" },
    openToWork:     { id: "Open to Work",  en: "Open to Work" },
    openDesc: {
      id: "Terbuka untuk peluang sebagai Purchasing Specialist, Cost Controller, atau posisi terkait.",
      en: "Open to opportunities as a Purchasing Specialist, Cost Controller, or related position.",
    },
    education: {
      id: [
        { school: "STEBI Global Mulia Cikarang", major: "S1 Ekonomi Syariah", year: "2022 – 2025", gpa: "IPK 3.31", icon: "🎓" },
        { school: "SMAN 23 Bandung", major: "IPA / Science", year: "2010 – 2013", gpa: "", icon: "🏫" },
      ],
      en: [
        { school: "STEBI Global Mulia Cikarang", major: "Islamic Economics (S1)", year: "2022 – 2025", gpa: "GPA 3.31", icon: "🎓" },
        { school: "SMAN 23 Bandung", major: "Science", year: "2010 – 2013", gpa: "", icon: "🏫" },
      ],
    },
    highlights: {
      id: [
        { icon: "📦", label: "Purchasing",        desc: "Manajemen pengadaan strategis dari PO hingga delivery" },
        { icon: "💰", label: "Cost Control",      desc: "Analisis COGS, budgeting, dan efisiensi biaya operasional" },
        { icon: "📊", label: "Inventory",         desc: "FIFO/FEFO, stock opname, dan digitalisasi monitoring" },
        { icon: "🤝", label: "Vendor Management", desc: "Negosiasi TOP, diversifikasi, dan evaluasi supplier" },
      ],
      en: [
        { icon: "📦", label: "Purchasing",        desc: "Strategic procurement management from PO to delivery" },
        { icon: "💰", label: "Cost Control",      desc: "COGS analysis, budgeting, and operational cost efficiency" },
        { icon: "📊", label: "Inventory",         desc: "FIFO/FEFO, stock opname, and digitized monitoring" },
        { icon: "🤝", label: "Vendor Management", desc: "TOP negotiation, diversification, and supplier evaluation" },
      ],
    },
  },

  // ── Skills ───────────────────────────────────────────────────────────────
  skills: {
    sectionTitle: { id: "Keahlian &",    en: "Skills &" },
    sectionSub:   { id: "Kompetensi",    en: "Competencies" },
    techTitle:    { id: "Sistem & Tools", en: "Systems & Tools" },
    coreSkills: {
      id: [
        { name: "Purchasing",           desc: "Manajemen siklus pengadaan lengkap",   icon: "📦" },
        { name: "Cost Control",         desc: "Analisis biaya dan efisiensi",          icon: "💰" },
        { name: "Inventory Management", desc: "Monitoring & digitalisasi stok",        icon: "🗄️" },
        { name: "Vendor Negotiation",   desc: "Negosiasi harga & Term of Payment",    icon: "🤝" },
        { name: "Demand Forecasting",   desc: "Prediksi kebutuhan bahan baku",        icon: "📈" },
        { name: "Stock Opname",         desc: "Audit fisik & akurasi data",           icon: "✅" },
        { name: "COGS Analysis",        desc: "Harga pokok penjualan",                icon: "📉" },
        { name: "Admin Keuangan",       desc: "Invoice, kontra bon, laporan kas",     icon: "📋" },
      ],
      en: [
        { name: "Purchasing",           desc: "End-to-end procurement cycle management", icon: "📦" },
        { name: "Cost Control",         desc: "Cost analysis and efficiency",             icon: "💰" },
        { name: "Inventory Management", desc: "Stock monitoring & digitalization",        icon: "🗄️" },
        { name: "Vendor Negotiation",   desc: "Price & Term of Payment negotiation",     icon: "🤝" },
        { name: "Demand Forecasting",   desc: "Raw material needs prediction",           icon: "📈" },
        { name: "Stock Opname",         desc: "Physical audit & data accuracy",          icon: "✅" },
        { name: "COGS Analysis",        desc: "Cost of goods sold analysis",             icon: "📉" },
        { name: "Financial Admin",      desc: "Invoice, contra bon, cash reports",       icon: "📋" },
      ],
    },
  },

  // ── Experience ───────────────────────────────────────────────────────────
  experience: {
    sectionTitle:  { id: "Pengalaman",    en: "Professional" },
    sectionSub:    { id: "Profesional",   en: "Experience" },
    sectionDesc: {
      id: "10+ tahun perjalanan karir di berbagai industri, dari manufaktur hingga F&B multi-brand.",
      en: "10+ years of career journey across industries, from manufacturing to multi-brand F&B.",
    },
    tagLatest:     { id: "Terbaru",    en: "Latest" },
    tagEarlyCareer:{ id: "Awal Karir", en: "Early Career" },
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contact: {
    sectionTitle: { id: "Mari",          en: "Get In" },
    sectionSub:   { id: "Terhubung",     en: "Touch" },
    sectionDesc: {
      id: "Terbuka untuk peluang kerja, kolaborasi, atau sekadar berbincang. Hubungi saya melalui salah satu kanal berikut.",
      en: "Open to job opportunities, collaborations, or just a conversation. Reach me through any of the channels below.",
    },
    formName:       { id: "Nama Lengkap",      en: "Full Name" },
    formEmail:      { id: "Email",              en: "Email" },
    formCompany:    { id: "Perusahaan (opsional)", en: "Company (optional)" },
    formMessage:    { id: "Pesan",              en: "Message" },
    formPlaceholder:{ id: "Tulis pesan Anda...", en: "Write your message..." },
    formSend:       { id: "Kirim Pesan",        en: "Send Message" },
    formSending:    { id: "Mengirim...",         en: "Sending..." },
    formSent:       { id: "Pesan terkirim! Terima kasih.", en: "Message sent! Thank you." },
    formError:      { id: "Gagal mengirim. Coba lagi.",   en: "Failed to send. Please try again." },
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    copyright: {
      id: "Copyright © 2026, M Tonny Heru Susanto. All rights reserved",
      en: "Copyright © 2026, M Tonny Heru Susanto. All rights reserved",
    },
  },
} as const;

export function tx(key: { id: string; en: string }, lang: Lang): string {
  return key[lang];
}