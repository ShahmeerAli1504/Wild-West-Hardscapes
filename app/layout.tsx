import type { Metadata, Viewport } from "next";
import { Barlow, Oswald, Rye } from "next/font/google";
import "./globals.css";

const rye = Rye({ weight: "400", subsets: ["latin"], variable: "--font-rye", display: "swap" });
const oswald = Oswald({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-oswald", display: "swap" });
const barlow = Barlow({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-barlow", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Wild West Hardscapes LLC | Pavers, Retaining Walls & Backyard Remodels in Reno, NV",
  description:
    "Wild West Hardscapes LLC builds paver patios, driveways, retaining walls, fire pits, water features, artificial turf, putting greens and lighting in pavers across Reno & Northern Nevada. NV Lic. #0096054. Free estimates — call or text 775-229-2991.",
  icons: { icon: "/assets/img/favicon.png", apple: "/assets/img/favicon.png" },
  openGraph: {
    type: "website",
    title: "Wild West Hardscapes LLC — Your Vision. Our Craft.",
    description: "Paver patios, retaining walls, fire pits, turf & complete backyard transformations in Reno & Northern Nevada. Free estimates.",
    images: ["/assets/img/patio-firepit-hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0c0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Wild West Hardscapes LLC",
  image: "/assets/img/logo.jpg",
  telephone: "+1-775-229-2991",
  areaServed: ["Reno, NV", "Sparks, NV", "Northern Nevada"],
  address: { "@type": "PostalAddress", addressLocality: "Reno", addressRegion: "NV", addressCountry: "US" },
  slogan: "Your Vision. Our Craft.",
  founder: "Alfonso Almaraz",
  sameAs: [
    "https://www.instagram.com/wildwesthardscapes/",
    "https://www.facebook.com/profile.php?id=61595977372303",
    "https://www.tiktok.com/@wildwesthardscape",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`no-js ${rye.variable} ${oswald.variable} ${barlow.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
