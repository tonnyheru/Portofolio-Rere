import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f1115",
        void: "#1a1d24",
        graphite: "#23262f",
        "graphite-2": "#2d3139",
        silver: "#8b949e",
        "silver-2": "#d1d5db",
        frost: "#e8edf3",
        neon: "#7fb3d0",
        "neon-2": "#a8c8e0",
        glow: "#4a9abe",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "float": "float 7s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
        "marquee-rev": "marqueeRev 28s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "particle": "particle 8s ease-in-out infinite",
        "slide-reveal": "slideReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(1deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(30px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        marqueeRev: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        slideReveal: {
          from: { clipPath: "inset(0 100% 0 0)", opacity: "0" },
          to: { clipPath: "inset(0 0% 0 0)", opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.85)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        particle: {
          "0%": { transform: "translateY(0) translateX(0) scale(1)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "0.5" },
          "100%": { transform: "translateY(-120px) translateX(40px) scale(0)", opacity: "0" },
        },
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};
export default config;
