import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Photos } from "@/components/Photos";
import { Video } from "@/components/Video";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Video />
        <About />
        <Photos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
