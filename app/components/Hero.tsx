"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "../components/ThemeContext";

const roles = [
  "Purchasing",
  "Cost Control",
  "Inventory Control",
  "Price & TOP Negotiator",
  "Admin & Operation",
];

const PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 10,
  duration: Math.random() * 8 + 6,
  opacity: Math.random() * 0.5 + 0.1,
  drift: Math.random() * 30 - 15,
}));

const ORBS = [
  { x: 75, y: 20, size: 600, color: "rgba(20,184,166,0.07)", delay: 0, duration: 12 },
  { x: 20, y: 60, size: 500, color: "rgba(99,102,241,0.06)", delay: 2, duration: 15 },
  { x: 55, y: 80, size: 400, color: "rgba(236,72,153,0.05)", delay: 4, duration: 10 },
  { x: 85, y: 65, size: 350, color: "rgba(14,165,233,0.06)", delay: 1, duration: 13 },
];

export default function Hero() {
  const { theme } = useTheme();
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

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
    boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.15)",
  });
  const [stringStyle, setStringStyle] = useState({ transform: "rotate(0deg)" });
  const [holoStyle, setHoloStyle] = useState({ backgroundPosition: "50% 50%", opacity: 0 });

  useEffect(() => {
    setMounted(true);
    // Track cursor for global glow
    const onMove = (e: MouseEvent) => {
      setGlowPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rx = -dy * 14;
    const ry = dx * 14;
    // Holographic shimmer position
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setHoloStyle({ backgroundPosition: `${px}% ${py}%`, opacity: 0.35 });
    setCardStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateX(0px) translateY(-10px) scale(1.02)`,
      transition: "transform 0.15s ease",
      boxShadow: `${-ry * 3}px ${32 + rx}px 90px rgba(0,0,0,0.55), 0 0 60px rgba(20,184,166,0.12), 0 0 0 1px rgba(20,184,166,0.25)`,
    });
    setStringStyle({ transform: `rotate(${ry * 0.5}deg)` });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) return;
    setHoloStyle({ backgroundPosition: "50% 50%", opacity: 0 });
    setCardStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) scale(1)",
      transition: "transform 0.8s cubic-bezier(0.34,1.56,0.64,1)",
      boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.15)",
    });
    setStringStyle({ transform: "rotate(0deg)" });
  }, []);

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
      rotation.current.x = Math.max(-28, Math.min(28, rotation.current.x));
      rotation.current.y = Math.max(-28, Math.min(28, rotation.current.y));
      lastPos.current = { x: e.clientX, y: e.clientY };
      setCardStyle({
        transform: `perspective(1000px) rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg) translateX(${position.current.x}px) translateY(${position.current.y}px)`,
        transition: "none",
        boxShadow: `${-rotation.current.y * 2.5}px ${42 + rotation.current.x}px 90px rgba(0,0,0,0.65), 0 0 0 1px rgba(20,184,166,0.2)`,
      });
      setStringStyle({ transform: `rotate(${rotation.current.y * 0.6}deg)` });
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
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
            boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.15)",
          });
          setStringStyle({ transform: `rotate(${rotation.current.y * 0.4}deg)` });
          animFrame.current = requestAnimationFrame(springBack);
        } else {
          position.current = { x: 0, y: 0 };
          rotation.current = { x: 0, y: 0 };
          velocity.current = { x: 0, y: 0 };
          setCardStyle({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) scale(1)",
            transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.15)",
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

  const skills = [
    "Purchasing", "Cost Control", "Inventory Management", "FIFO/FEFO",
    "Vendor Negotiation", "Forecasting", "Food Costing", "Stock Opname",
    "COGS Analysis", "Admin Keuangan"
  ];

  const stats = [
    { val: "10+", label: "Tahun Pengalaman", icon: "⏱" },
    { val: "8+", label: "Perusahaan", icon: "🏢" },
    { val: "20+", label: "Vendor Renegosiasi", icon: "🤝" },
    { val: "50+", label: "Renegosiasi Harga", icon: "💰" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{ marginBottom: 0, paddingBottom: 0 }}
    >
      {/* ─── Background image ─── */}
      <div
        className="absolute inset-0 hero-bg"
        style={{
          backgroundImage: "url('/89781.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          filter: theme === "light"
            ? "brightness(1.5) contrast(0.85) saturate(0.9)"
            : "brightness(1.2) contrast(0.92)",
        }}
      />

      {/* ─── Dark scrim ─── */}
      <div className="absolute inset-0" style={{
        background: theme === "light"
          ? "rgba(5,15,35,0.62)"
          : "rgba(0,0,0,0.45)",
      }} />

      {/* ─── Side gradient ─── */}
      <div className="absolute inset-0" style={{
        background: theme === "light"
          ? "linear-gradient(105deg, rgba(10,20,60,0.7) 0%, rgba(0,80,100,0.25) 50%, transparent 100%)"
          : "linear-gradient(105deg, rgba(0,0,0,0.45) 0%, transparent 60%)",
      }} />

      {/* ─── Animated aurora blobs ─── */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: "blur(80px)",
            transform: "translate(-50%, -50%)",
            animation: `floatOrb ${orb.duration}s ease-in-out ${orb.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* ─── Cursor-following glow ─── */}
      <div
        className="absolute pointer-events-none transition-all duration-700 ease-out"
        style={{
          left: `${glowPos.x}%`,
          top: `${glowPos.y}%`,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(10px)",
        }}
      />

      {/* ─── Fine star particles ─── */}
      {mounted && PARTICLES.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "#fff",
            opacity: p.opacity,
            animation: `floatOrbParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* ─── Grid overlay ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(20,184,166,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2 lg:gap-20 items-center">

          {/* ─── Left: Text ─── */}
          <div className={`${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} transition-all duration-1000 order-2 lg:order-1`}>

            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-neon/20 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              style={{
                transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
                background: "rgba(20,184,166,0.07)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-mono text-xs text-neon/90 tracking-widest uppercase">Available for opportunities</span>
            </div>

            {/* Name */}
            <div
              className={`mb-4 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transition: "all 0.9s ease 0.2s" }}
            >
              <h1
                style={{
                  fontFamily: "'Hugheid', cursive",
                  letterSpacing: "0.02em",
                  animation: "nameColorShift 6s ease infinite",
                  textShadow: "0 0 80px rgba(20,184,166,0.3), 0 2px 30px rgba(0,0,0,0.5)",
                }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-[1.1] name-color-anim"
              >
                Renaray Dwi Indah Sari
              </h1>
            </div>

            {/* Typing role */}
            <div
              className={`flex items-center gap-3 mb-6 h-8 ${mounted ? "opacity-100" : "opacity-0"}`}
              style={{ transition: "opacity 0.8s ease 0.4s" }}
            >
              <span className="font-mono text-neon text-sm">▸</span>
              <span
                className="font-mono text-sm text-neon tracking-wide"
                style={{ textShadow: "0 0 20px rgba(20,184,166,0.6)" }}
              >
                {displayed}<span className="animate-pulse opacity-70">█</span>
              </span>
            </div>

            {/* Description */}
            <p
              className={`text-silver font-body text-base leading-relaxed max-w-lg mb-8 opacity-80 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transition: "all 0.9s ease 0.5s" }}
            >
              Memiliki pengalaman profesional di bidang{" "}
              <span className="text-neon-2 font-semibold">Purchasing</span>,{" "}
              <span className="text-neon-2 font-semibold">Cost Control</span>, dan{" "}
              <span className="text-neon-2 font-semibold">Inventory Management</span>{" "}
              di industri F&B dan manufaktur.
            </p>

            {/* Stats row */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transition: "all 0.9s ease 0.6s" }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl p-3 sm:p-4 text-center border border-graphite-2/80 overflow-hidden cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.4)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.06)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.3), 0 0 20px rgba(20,184,166,0.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  {/* Glow bg on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon/0 to-neon/0 group-hover:from-neon/5 group-hover:to-transparent transition-all duration-300" />
                  <p className="font-display font-bold text-xl sm:text-2xl text-frost relative z-10"
                     style={{ textShadow: "0 0 30px rgba(20,184,166,0.3)" }}>
                    {s.val}
                  </p>
                  <p className="font-body text-xs text-silver mt-1 leading-tight relative z-10">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-3 mb-8 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transition: "all 0.9s ease 0.7s" }}
            >
              <button
                onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl overflow-hidden"
                style={{
                  background: "rgba(20,184,166,0.12)",
                  border: "1px solid rgba(20,184,166,0.4)",
                  color: "rgb(94,234,212)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.22)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.7)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(20,184,166,0.2), 0 8px 20px rgba(0,0,0,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.4)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
                />
                Lihat Pengalaman
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative px-6 py-3 text-sm font-medium rounded-xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(203,213,225,0.85)",
                  transition: "all 0.3s ease",
                  background: "rgba(255,255,255,0.03)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                  (e.currentTarget as HTMLElement).style.color = "#f8fafc";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(203,213,225,0.85)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }} />
                Hubungi Saya
              </button>
            </div>

            {/* Skills marquee */}
            <div
              className={`overflow-hidden ${mounted ? "opacity-100" : "opacity-0"}`}
              style={{
                transition: "opacity 0.9s ease 0.9s",
                maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              }}
            >
              <div className="flex gap-2 w-max animate-marquee">
                {[...skills, ...skills].map((s, i) => (
                  <span key={i}
                    className="flex-shrink-0 px-3.5 py-1.5 border border-graphite-2/80 text-silver text-xs font-mono rounded-full whitespace-nowrap"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right: ID Card ─── */}
          <div
            ref={cardContainerRef}
            className={`flex justify-center lg:justify-end order-1 lg:order-2 mt-10 lg:mt-0 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transition: "all 1s cubic-bezier(0.34,1.56,0.64,1) 0.3s" }}
          >
            <div className="flex flex-col items-center select-none">

              {/* Lanyard string */}
              <div
                className="flex flex-col items-center mb-0"
                style={{ ...stringStyle, transition: "transform 0.3s ease" }}
              >
                {/* Top clip */}
                <div className="w-7 h-3.5 rounded-sm border border-silver/20 shadow-md"
                  style={{ background: "linear-gradient(135deg, #3f3f46, #27272a)" }} />
                {/* Thread */}
                <div className="w-px h-20 bg-gradient-to-b from-silver/70 via-silver/40 to-silver/20" />
                {/* Clip holder */}
                <div
                  className="w-12 h-2.5 rounded-sm border border-neon/50"
                  style={{ background: "linear-gradient(90deg, rgba(20,184,166,0.5), rgba(20,184,166,0.2))" }}
                />
              </div>

              {/* ─── ID Card ─── */}
              <div
                ref={cardRef}
                style={cardStyle}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden"
              >
                {/* Base gradient */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(145deg, #18181b, #0f0f12, #09090b)" }} />

                {/* Subtle gradient tint */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(99,102,241,0.05) 50%, transparent 100%)" }} />

                {/* ── Holographic shimmer layer ── */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-200"
                  style={{
                    opacity: holoStyle.opacity,
                    background: `radial-gradient(circle at ${holoStyle.backgroundPosition}, 
                      rgba(20,184,166,0.25) 0%, 
                      rgba(99,102,241,0.15) 25%, 
                      rgba(236,72,153,0.1) 50%, 
                      transparent 70%
                    )`,
                    mixBlendMode: "screen",
                  }}
                />

                {/* Rainbow iridescent foil */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-200"
                  style={{
                    opacity: holoStyle.opacity * 0.4,
                    background: `linear-gradient(
                      105deg,
                      rgba(255,0,128,0.1) 0%,
                      rgba(255,165,0,0.08) 20%,
                      rgba(0,255,128,0.08) 40%,
                      rgba(0,128,255,0.1) 60%,
                      rgba(128,0,255,0.08) 80%,
                      rgba(255,0,128,0.1) 100%
                    )`,
                    backgroundSize: "200% 200%",
                    backgroundPosition: holoStyle.backgroundPosition,
                  }}
                />

                {/* Top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.6), rgba(99,102,241,0.4), transparent)" }} />

                {/* Bottom edge */}
                <div className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

                {/* Left edge */}
                <div className="absolute top-0 bottom-0 left-0 w-px"
                  style={{ background: "linear-gradient(180deg, transparent, rgba(20,184,166,0.3), transparent)" }} />

                <div className="relative p-5 sm:p-6">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase"
                        style={{ color: "rgba(94,234,212,0.6)" }}>Employee ID</p>
                      <p className="font-mono text-[10px]" style={{ color: "rgba(148,163,184,0.4)" }}>RNR-2024-001</p>
                    </div>
                    {/* Logo badge */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(20,184,166,0.12)",
                        border: "1px solid rgba(20,184,166,0.35)",
                        boxShadow: "0 0 20px rgba(20,184,166,0.15) inset",
                      }}
                    >
                      <span className="font-display font-bold text-base"
                        style={{ color: "rgb(94,234,212)", textShadow: "0 0 12px rgba(20,184,166,0.8)" }}>R</span>
                    </div>
                  </div>

                  {/* Photo */}
                  <div className="relative mb-5">
                    <div
                      className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden relative"
                      style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.1)" }}
                    >
                      <Image
                        src="/renaray.jpg"
                        alt="Renaray Dwi Indah Sari"
                        fill
                        sizes="(max-width: 640px) 256px, 288px"
                        className="object-cover object-top"
                        priority
                        draggable={false}
                      />
                      {/* Photo gradient */}
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(9,9,11,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)" }} />
                      {/* Scanline effect */}
                      <div className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
                          mixBlendMode: "overlay",
                        }}
                      />
                    </div>
                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-neon/40 rounded-tl-md pointer-events-none" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-neon/40 rounded-tr-md pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-neon/40 rounded-bl-md pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-neon/40 rounded-br-md pointer-events-none" />
                  </div>

                  {/* Name */}
                  <div className="mb-4 text-center">
                    <h3
                      style={{
                        fontFamily: "'Hugheid', cursive",
                        color: "#f1f5f9",
                        textShadow: "0 0 40px rgba(20,184,166,0.2)",
                      }}
                      className="text-xl sm:text-2xl leading-tight"
                    >
                      Renaray Dwi Indah Sari
                    </h3>
                    <p
                      className="font-mono text-[10px] mt-1 tracking-wide"
                      style={{ color: "rgba(94,234,212,0.8)" }}
                    >
                      Supply Chain · Purchaser · Cost Controller
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="mb-4 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.3), rgba(99,102,241,0.2), transparent)" }} />

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    {[
                      { label: "Location", value: "Bandung" },
                      { label: "Experience", value: "10+ Years" },
                      { label: "Industry", value: "F&B · Manufaktur" },
                      { label: "Status", value: null, isStatus: true },
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <p className="font-mono uppercase tracking-wider mb-1"
                          style={{ fontSize: 9, color: "rgba(148,163,184,0.4)" }}>
                          {item.label}
                        </p>
                        {item.isStatus ? (
                          <div className="flex items-center gap-1.5 justify-center">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                            </span>
                            <p className="font-body text-[11px] text-emerald-400">Available</p>
                          </div>
                        ) : (
                          <p className="font-body text-[11px]"
                            style={{ color: "rgba(203,213,225,0.8)" }}>{item.value}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Barcode */}
                  <div className="pt-4 border-t" style={{ borderColor: "rgba(39,39,42,0.8)" }}>
                    <div className="flex gap-px justify-center" style={{ opacity: 0.25 }}>
                      {Array.from({ length: 44 }, (_, i) => (
                        <div key={i} className="bg-slate-300"
                          style={{ width: i % 3 === 0 ? 2 : 1, height: 22 }} />
                      ))}
                    </div>
                    <p className="font-mono text-center mt-1 tracking-widest"
                      style={{ fontSize: 8, color: "rgba(148,163,184,0.25)" }}>
                      085159522095
                    </p>
                  </div>
                </div>
              </div>

              {/* Hint text */}
              <p
                className={`font-mono text-[10px] mt-4 tracking-wider animate-pulse hidden sm:block ${mounted ? "opacity-100" : "opacity-0"}`}
                style={{ transition: "opacity 1s ease 1.2s", color: "rgba(148,163,184,0.3)" }}
              >
                drag me · hover me
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}