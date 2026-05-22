"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

const roles = [
  "Purchasing",
  "Cost Control",
  "Inventory Control",
  "Price& TOP Negotiator",
  "Admin & Operation",
];

// Particles for background
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 8,
  duration: Math.random() * 6 + 6,
  opacity: Math.random() * 0.4 + 0.1,
}));

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [mounted, setMounted] = useState(false);

  // ID Card physics
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number | null>(null);
  const [cardStyle, setCardStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)",
    transition: "transform 0.8s cubic-bezier(0.34,1.56,0.64,1)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
  });
  const [stringStyle, setStringStyle] = useState({ transform: "rotate(0deg)" });

  useEffect(() => { setMounted(true); }, []);

  // Typing animation
  useEffect(() => {
    const cur = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < cur.length) {
        timeout = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setRoleIdx((p) => (p + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  // Card hover tilt
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rx = -dy * 12;
    const ry = dx * 12;
    setCardStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateX(0px) translateY(-8px)`,
      transition: "transform 0.2s ease",
      boxShadow: `${-ry * 2}px ${30 + rx}px 80px rgba(0,0,0,0.5), 0 0 40px rgba(127,179,208,0.08)`,
    });
    setStringStyle({ transform: `rotate(${ry * 0.5}deg)` });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) return;
    setCardStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)",
      transition: "transform 0.8s cubic-bezier(0.34,1.56,0.64,1)",
      boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
    });
    setStringStyle({ transform: "rotate(0deg)" });
  }, []);

  // Drag physics
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    setCardStyle(prev => ({ ...prev, transition: "none" }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      velocity.current = { x: dx * 0.3, y: dy * 0.3 };
      position.current.x += dx * 0.8;
      position.current.y += dy * 0.8;
      rotation.current.y += dx * 0.15;
      rotation.current.x -= dy * 0.15;
      rotation.current.x = Math.max(-25, Math.min(25, rotation.current.x));
      rotation.current.y = Math.max(-25, Math.min(25, rotation.current.y));
      lastPos.current = { x: e.clientX, y: e.clientY };
      setCardStyle({
        transform: `perspective(1000px) rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg) translateX(${position.current.x}px) translateY(${position.current.y}px)`,
        transition: "none",
        boxShadow: `${-rotation.current.y * 2}px ${40 + rotation.current.x}px 80px rgba(0,0,0,0.6)`,
      });
      setStringStyle({ transform: `rotate(${rotation.current.y * 0.6}deg)` });
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      // Spring back with inertia
      const springBack = () => {
        const spring = 0.08;
        const damping = 0.75;
        velocity.current.x = velocity.current.x * damping - position.current.x * spring;
        velocity.current.y = velocity.current.y * damping - position.current.y * spring;
        rotation.current.x = rotation.current.x * damping;
        rotation.current.y = rotation.current.y * damping;
        position.current.x += velocity.current.x;
        position.current.y += velocity.current.y;

        const finished = Math.abs(position.current.x) < 0.3 &&
          Math.abs(position.current.y) < 0.3 &&
          Math.abs(rotation.current.x) < 0.3 &&
          Math.abs(rotation.current.y) < 0.3;

        if (!finished) {
          setCardStyle({
            transform: `perspective(1000px) rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg) translateX(${position.current.x}px) translateY(${position.current.y}px)`,
            transition: "none",
            boxShadow: `0 30px 80px rgba(0,0,0,0.5)`,
          });
          setStringStyle({ transform: `rotate(${rotation.current.y * 0.4}deg)` });
          animFrame.current = requestAnimationFrame(springBack);
        } else {
          position.current = { x: 0, y: 0 };
          rotation.current = { x: 0, y: 0 };
          velocity.current = { x: 0, y: 0 };
          setCardStyle({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)",
            transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          });
          setStringStyle({ transform: "rotate(0deg)" });
        }
      };
      animFrame.current = requestAnimationFrame(springBack);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const skills = ["Purchasing", "Cost Control", "Inventory Management", "FIFO/FEFO", "Vendor Negotiation", "Forecasting", "Food Costing", "Stock Opname", "COGS Analysis", "Admin Keuangan"];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-void to-ink" />
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-neon/4 blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] rounded-full bg-glow/3 blur-[80px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-neon/2 blur-[120px] animate-float-slow" />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(127,179,208,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(127,179,208,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Particles */}
        {mounted && PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full bg-neon"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: `${p.size}px`, height: `${p.size}px`,
              opacity: p.opacity,
              animation: `particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text */}
        <div className={`${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} transition-all duration-1000`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-neon/80 tracking-widest uppercase">Available for opportunities</span>
          </div>

          {/* Name */}
          <div className="mb-4">
          <h1
            style={{
              fontFamily: "'Hugheid', cursive",
              letterSpacing: "0.02em",
              background: "linear-gradient(to right, #ffffff, #d2cbcc, #cebbbb, #f4d0d7, #ffffff)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "nameShine 4s linear infinite",
            }}
            className="text-6xl md:text-7xl xl:text-8xl leading-[1.1]"
          >
            Renaray Dwi Indah Sari 
          </h1>
            <p className="font-mono text-silver/40 text-xs tracking-[0.3em] uppercase mt-2"></p>
          </div>

          {/* Typing role */}
          <div className="flex items-center gap-3 mb-6 h-8">
            <span className="font-mono text-neon text-sm">▸</span>
            <span className="font-mono text-sm text-neon tracking-wide">
              {displayed}<span className="animate-pulse opacity-70">█</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-silver font-body text-base leading-relaxed max-w-lg mb-8 opacity-80">
            Memiliki pengalaman profesional di bidang{" "}
            <span className="text-neon-2">Purchasing</span>,{" "}
            <span className="text-neon-2">Cost Control</span>, dan{" "}
            <span className="text-neon-2">Inventory Management</span>{" "}
            di industri F&B dan manufaktur.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { val: "10+", label: "Tahun Pengalaman" },
              { val: "8+", label: "Perusahaan" },
              { val: "20+", label: "Vendor Renegosiasi" },
              { val: "50+", label: "Renegosiasi Harga Material" },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-4 text-center border border-graphite-2/80">
                <p className="font-display font-bold text-2xl text-frost">{s.val}</p>
                <p className="font-body text-xs text-silver mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 px-7 py-3.5 bg-neon/10 border border-neon/40 text-neon
                text-sm font-medium rounded-xl hover:bg-neon/20 transition-all duration-300 hover:-translate-y-0.5
                hover:shadow-lg hover:shadow-neon/10"
            >
              Lihat Pengalaman
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 border border-graphite-2 text-silver text-sm font-medium rounded-xl
                hover:border-silver/40 hover:text-frost transition-all duration-300 hover:-translate-y-0.5"
            >
              Hubungi Saya
            </button>
          </div>

          {/* Skills marquee */}
          <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
            <div className="flex gap-2 w-max animate-marquee">
              {[...skills, ...skills].map((s, i) => (
                <span key={i}
                  className="flex-shrink-0 px-3.5 py-1.5 glass border border-graphite-2/80 text-silver text-xs font-mono rounded-full whitespace-nowrap">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: ID Card */}
        <div
          ref={cardContainerRef}
          className={`flex justify-center lg:justify-end ${mounted ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 delay-300`}
        >
          <div className="flex flex-col items-center select-none">
            {/* Lanyard / string attachment */}
            <div className="flex flex-col items-center mb-0" style={{ ...stringStyle, transition: "transform 0.3s ease" }}>
              {/* Clip */}
              <div className="w-6 h-3 bg-graphite-2 rounded-sm border border-silver/20 shadow-md" />
              {/* String */}
              <div className="w-0.5 h-16 bg-gradient-to-b from-silver/60 to-silver/20 shadow-sm" />
              {/* Small clip before card */}
              <div className="w-10 h-2 bg-neon/30 border border-neon/40 rounded-sm shadow-sm" />
            </div>

            {/* ID Card */}
            <div
              ref={cardRef}
              style={cardStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              className="relative w-72 cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden gradient-border"
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-graphite via-void to-ink" />
              <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent" />

              {/* Card shimmer lines */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent" />

              {/* Card content */}
              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="font-mono text-[10px] text-neon/70 tracking-widest uppercase">Employee ID</p>
                    <p className="font-mono text-[10px] text-silver/50">RNR-2024-001</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
                    <span className="font-display font-bold text-neon text-xs">R</span>
                  </div>
                </div>

                {/* Photo */}
                <div className="relative mb-5">
                  <div className="w-full h-52 rounded-2xl overflow-hidden relative">
                    <Image
                      src="/renaray.jpg"
                      alt="Renaray Dwi Indah Sari"
                      fill
                      className="object-cover object-top"
                      priority
                      draggable={false}
                    />
                    {/* Photo overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
                  </div>
                  {/* Glow ring */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-neon/20 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Name */}
                <div className="mb-4 text-center">
                  <h3 style={{ fontFamily: "'Hugheid', cursive" }} className="text-frost text-2xl leading-tight">Renaray Dwi Indah Sari</h3>
                  <p className="font-mono text-neon text-xs mt-1">Supply Chain · Purchaser · Stock Controller · Cost Controller</p>
                </div>

                {/* Divider */}
                <div className="section-divider mb-4" />

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="text-center">
                    <p className="font-mono text-silver/40 uppercase tracking-wider text-[9px] mb-1">Location</p>
                    <p className="font-body text-silver-2 text-[11px]">Bandung</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-silver/40 uppercase tracking-wider text-[9px] mb-1">Experience</p>
                    <p className="font-body text-silver-2 text-[11px]">10+ Years</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-silver/40 uppercase tracking-wider text-[9px] mb-1">Industry</p>
                    <p className="font-body text-silver-2 text-[11px]">F&B · Manufaktur</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-silver/40 uppercase tracking-wider text-[9px] mb-1">Status</p>
                    <div className="flex items-center gap-1.5 justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="font-body text-emerald-400 text-[11px]">Available</p>
                    </div>
                  </div>
                </div>

                {/* Barcode strip */}
                <div className="mt-5 pt-4 border-t border-graphite-2/60">
                  <div className="flex gap-px justify-center opacity-30">
                    {Array.from({ length: 40 }, (_, i) => (
                      <div key={i} className="bg-silver-2" style={{ width: i % 3 === 0 ? "2px" : "1px", height: "20px" }} />
                    ))}
                  </div>
                  <p className="font-mono text-silver/30 text-[8px] text-center mt-1 tracking-widest">085159522095</p>
                </div>
              </div>
            </div>

            {/* Drag hint */}
            <p className="font-mono text-silver/30 text-[10px] mt-4 tracking-wider animate-pulse">drag me · hover me</p>
          </div>
        </div>
      </div>
    </section>
  );
}
