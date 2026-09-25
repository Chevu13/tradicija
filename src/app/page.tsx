import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Inquiry } from "@/components/Inquiry";
import { Marquee } from "@/components/Marquee";
import { MobileCta } from "@/components/MobileCta";
import { Performances } from "@/components/Performances";
import { Repertoire } from "@/components/Repertoire";

export default function Home() {
  return (
    <>
      <a
        href="#upit"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-3 focus:text-ink"
      >
        Preskoči na upit za nastup
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Performances />
        <Repertoire />
        <Events />
        <Gallery />
        <Inquiry />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
