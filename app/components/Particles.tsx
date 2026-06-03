"use client";
import { useEffect, useState } from "react";

const PARTICLE_COUNT = 40;

export default function Particles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1.5,
    duration: Math.random() * 20 + 15,
    delay: -(Math.random() * 20), // negative delay = already started
    drift: (Math.random() - 0.5) * 150,
    type: i % 3, // 0=teal, 1=silver, 2=purple
  }));

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
        overflow: "hidden",
      }}
    >
      {particles.map((p) => {
        const color =
          p.type === 0
            ? `rgba(45,212,191,0.5)`
            : p.type === 1
            ? `rgba(148,163,184,0.4)`
            : `rgba(139,92,246,0.4)`;

        const glow =
          p.type === 0
            ? `0 0 ${p.size * 4}px rgba(45,212,191,0.6)`
            : p.type === 2
            ? `0 0 ${p.size * 3}px rgba(139,92,246,0.5)`
            : "none";

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              bottom: "-10px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              background: color,
              boxShadow: glow,
              animation: `floatUp ${p.duration}s ${p.delay}s linear infinite`,
            }}
          />
        );
      })}

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0)      translateX(0px)           scale(0.5); opacity: 0; }
          5%   { opacity: 1; }
          50%  { transform: translateY(-50vh)  translateX(${Math.random() > 0.5 ? "60px" : "-60px"}); opacity: 0.8; }
          95%  { opacity: 0.3; }
          100% { transform: translateY(-105vh) translateX(0px)           scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}