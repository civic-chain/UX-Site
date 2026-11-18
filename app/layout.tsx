import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Text } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif-text",
  subsets: ["latin"],
  weight: ["400"],
});

// Material Symbols Rounded (outline icon font). The variable weight axis powers
// the size-driven stroke. Not preloaded — it is large and not above-the-fold
// critical; display "block" hides ligature text until the glyphs load.
const materialSymbols = localFont({
  src: "../public/fonts/material-symbols-rounded.woff2",
  variable: "--font-material-symbols",
  display: "block",
  weight: "100 700",
  preload: false,
});

const siteUrl = "https://civic-chain.com";
const siteTitle = "Civic-Chain | Transparent Municipal Procurement Platform";
const siteDescription =
  "Civic-Chain is a municipal procurement platform designed for faster payments, transparent records, and clearer public spending.";
const socialPreviewImage = {
  url: "/brand/civic-chain-social-preview.webp",
  width: 3840,
  height: 2160,
  alt: "Civic-Chain logo beside a town hall illustration.",
  type: "image/webp",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Civic-Chain",
  icons: {
    icon: [
      {
        url: "/brand/favico.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Civic-Chain",
    images: [socialPreviewImage],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialPreviewImage],
  },
};

// Entity-disambiguation structured data. "Civic-Chain" collides in AI/search
// results with the Civic (CVC) identity token and the unrelated "Civic
// Marketplace" company, so an explicit Organization graph — anchored by the
// founders' real profiles — gives AI systems something authoritative to bind
// the entity to. Founder data mirrors app/(site)/about/page.tsx.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Civic-Chain",
  url: siteUrl,
  logo: `${siteUrl}/brand/civic-chain-logo.svg`,
  description: siteDescription,
  founder: [
    {
      "@type": "Person",
      name: "Justin Harvey",
      jobTitle: "Chief Product Officer",
      sameAs: "https://www.linkedin.com/in/justin-harvey-cspo/",
    },
    {
      "@type": "Person",
      name: "Michael Stansfield",
      jobTitle: "Chief Executive Officer",
      sameAs: "https://www.linkedin.com/in/michael-s-9144b096/",
    },
    {
      "@type": "Person",
      name: "Daniel Durante",
      jobTitle: "Chief Technology Officer",
      sameAs: "https://www.linkedin.com/in/daniel-durante/",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Civic-Chain",
  url: siteUrl,
  description: siteDescription,
  publisher: { "@id": `${siteUrl}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = [
    dmSans.variable,
    dmSerifText.variable,
    materialSymbols.variable,
  ].join(" ");

  return (
    <html
      lang="en"
      className={fontVariables}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XWG2R2RLM5"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XWG2R2RLM5');
        `}</Script>
        <Script id="ms-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yp4mywizrt");
        `}</Script>
      </body>
    </html>
  );
}
