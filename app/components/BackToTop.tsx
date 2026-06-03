"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPct(pct);
      setVisible(scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle progress
  const SIZE = 44;
  const STROKE = 2.5;
  const R = (SIZE - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * R;
  const offset = CIRCUMFERENCE - (scrollPct / 100) * CIRCUMFERENCE;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={`fixed bottom-8 right-6 z-50 group transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* Circular progress ring + button */}
      <div className="relative w-11 h-11 flex items-center justify-center">
        {/* SVG ring */}
        <svg
          width={SIZE}
          height={SIZE}
          className="absolute inset-0 -rotate-90"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
          {/* Track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="rgba(45,212,191,0.15)"
            strokeWidth={STROKE}
          />
          {/* Progress */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="#2dd4bf"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-all duration-150"
          />
        </svg>

        {/* Inner button */}
        <div
          className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center
            bg-graphite border border-neon/30
            group-hover:bg-neon group-hover:border-neon
            transition-all duration-300 group-hover:scale-110"
        >
          {/* Arrow up icon */}
          <svg
            className="w-3.5 h-3.5 text-neon group-hover:text-ink transition-colors duration-300
              group-hover:-translate-y-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}