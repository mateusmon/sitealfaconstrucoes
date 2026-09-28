import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MareMotion } from "@/components/mare-motion";
import { site } from "@/data/site";
import "./design.css";
import "./mare-design.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Gama Galvão Engenharia | Infraestrutura e construção",
    template: "%s | Gama Galvão Engenharia",
  },
  description:
    "Soluções em terraplanagem, pavimentação, drenagem, infraestrutura condominial, construção predial, projetos, avaliações e perícias.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: "Gama Galvão Engenharia",
    description: "Engenharia aplicada à infraestrutura, edificações e desenvolvimento urbano.",
    images: [{ url: "/images/logo-reference.png", width: 1254, height: 1254, alt: "Gama Galvão Engenharia" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/images/logo-reference.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua 09 Norte — Rua das Pitangueiras, lotes 5/6, lojas 11/12, Edifício Easy, Parte 134",
      addressLocality: "Águas Claras",
      addressRegion: "DF",
      addressCountry: "BR",
    },
    sameAs: [site.instagram],
  };

  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${spaceGrotesk.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <MareMotion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
