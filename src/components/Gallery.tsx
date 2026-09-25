import Image from "next/image";
import { socials } from "@/lib/site";
import { ArrowRight, InstagramIcon } from "./Icons";

type Shot = { src: string; alt: string; cls: string; sizes: string };

// Velika scena + dva detalja, pa široki kadar — kao niz trenutaka sa jednog veselja.
const shots: Shot[] = [
  {
    src: "/media/img/hero-desktop.jpg",
    alt: "Saksofon i harmonika među gostima pod šatorom",
    cls: "col-span-2 md:row-span-2",
    sizes: "(min-width: 768px) 66vw, 100vw",
  },
  { src: "/media/img/sator-bina.jpg", alt: "Pevačica i orkestar pod šatorom", cls: "", sizes: "(min-width: 768px) 33vw, 50vw" },
  { src: "/media/img/pevacica.jpg", alt: "Pevačica nastupa uz orkestar", cls: "", sizes: "(min-width: 768px) 33vw, 50vw" },
  {
    src: "/media/img/sala-plava.jpg",
    alt: "Puna svadbena sala u plavom svetlu",
    cls: "col-span-2",
    sizes: "(min-width: 768px) 66vw, 100vw",
  },
  {
    src: "/media/img/svatovi-mlada.jpg",
    alt: "Mlada među svatovima uz orkestar",
    cls: "col-span-2 md:col-span-1",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
];

export function Gallery() {
  return (
    <section id="galerija" aria-label="Galerija" className="bg-ink pt-1">
      <div className="grid auto-rows-[48vw] grid-cols-2 gap-1 md:auto-rows-[min(24vw,26rem)] md:grid-cols-3">
        {shots.map((s) => (
          <figure key={s.src} className={`relative overflow-hidden bg-ink-2 ${s.cls}`}>
            <Image src={s.src} alt={s.alt} fill sizes={s.sizes} className="object-cover" />
          </figure>
        ))}
      </div>
      <div className="mx-auto flex max-w-[90rem] justify-center px-4 py-10 md:py-14">
        <a
          href={socials.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="headline group inline-flex items-center gap-3 text-2xl text-paper transition-colors hover:text-gold md:text-4xl"
        >
          <InstagramIcon width={28} height={28} />
          Pratite nas na Instagramu
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
