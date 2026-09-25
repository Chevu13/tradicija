import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { SITE_URL, contact, socials } from "@/lib/site";
import "./globals.css";

// Jedan varijabilni font (širina + debljina) za naslove i tekst; latin-ext za č/ć/š/ž/đ.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

const title = "Orkestar Tradicija — Zoran Nedeljkov | Orkestar za svadbe i proslave";
const description =
  "Zoran Nedeljkov i Orkestar Tradicija — muzika uživo za svadbe, rođendane i sva vaša veselja. Harmonika, kola i narodna muzika. Pošaljite upit za vaš datum.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "Orkestar Tradicija",
  keywords: [
    "orkestar za svadbe",
    "bend za svadbe",
    "muzika za svadbu",
    "orkestar za proslave",
    "bend za proslave",
    "harmonika svadba",
    "Zoran Nedeljkov",
    "Orkestar Tradicija",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "/",
    siteName: "Orkestar Tradicija",
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Orkestar Tradicija uživo na svadbi" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Orkestar Tradicija",
  alternateName: "Zoran Nedeljkov i Orkestar Tradicija",
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/media/img/logo-tradicija.jpg`,
  description,
  genre: ["Narodna muzika", "Kola"],
  telephone: contact.phoneIntl,
  member: [
    {
      "@type": "OrganizationRole",
      roleName: "Harmonika",
      member: { "@type": "Person", name: contact.leader },
    },
  ],
  sameAs: Object.values(socials).map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn" className={archivo.variable}>
      <body className="min-h-dvh overflow-x-clip">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
