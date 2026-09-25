import { Contact } from "@/components/Contact";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { LiveVideos } from "@/components/LiveVideos";
import { MobileCta } from "@/components/MobileCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <LiveVideos />
        <Events />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
