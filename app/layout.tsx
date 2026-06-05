import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./components/ThemeContext";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Renaray Dwi Indah Sari — Purchasing & Cost Control Specialist",
    template: "%s | Renaray Dwi Indah Sari",
  },
  description:
    "Portfolio profesional Renaray Dwi Indah Sari. 10+ tahun pengalaman di bidang Purchasing, Cost Control, dan Inventory Management di industri F&B dan manufaktur.",
  keywords: [
    "Renaray Dwi Indah Sari",
    "Purchasing Specialist",
    "Cost Control",
    "Inventory Management",
    "Supply Chain",
    "F&B",
    "Food and Beverage",
    "Stock Opname",
    "Vendor Negotiation",
    "Bandung",
    "Portfolio",
  ],
  authors: [{ name: "Renaray Dwi Indah Sari", url: BASE_URL }],
  creator: "Renaray Dwi Indah Sari",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Renaray Dwi Indah Sari — Portfolio",
    title: "Renaray Dwi Indah Sari — Purchasing & Cost Control Specialist",
    description:
      "10+ tahun pengalaman di bidang Purchasing, Cost Control, dan Inventory Management di industri F&B dan manufaktur.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Renaray Dwi Indah Sari — Purchasing & Cost Control Specialist",
      },
    ],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renaray Dwi Indah Sari — Purchasing & Cost Control Specialist",
    description:
      "10+ tahun pengalaman di bidang Purchasing, Cost Control, dan Inventory Management di industri F&B dan manufaktur.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth light-mode">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Renaray Dwi Indah Sari",
              url: BASE_URL,
              image: `${BASE_URL}/renaray.jpg`,
              jobTitle: "Purchasing & Cost Control Specialist",
              description:
                "10+ tahun pengalaman di bidang Purchasing, Cost Control, dan Inventory Management di industri F&B dan manufaktur.",
              email: "renaraayan@gmail.com",
              telephone: "+6285159522095",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bandung",
                addressCountry: "ID",
              },
              knowsAbout: [
                "Purchasing",
                "Cost Control",
                "Inventory Management",
                "Vendor Negotiation",
                "Food Costing",
                "FIFO",
                "FEFO",
                "Stock Opname",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-ink text-silver-2 antialiased">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}