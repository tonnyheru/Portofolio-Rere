import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renaray Dwi Indah Sari — Purchasing & Cost Control Specialist",
  description: "Portfolio profesional Renaray Dwi Indah Sari. Memiliki pengalaman di bidang Purchasing, Cost Control, dan Inventory Management di industri F&B dan manufaktur.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-ink text-silver-2 antialiased">{children}</body>
    </html>
  );
}
