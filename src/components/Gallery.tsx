import Image from "next/image";
import { socials } from "@/lib/site";
import { InstagramIcon, TiktokIcon, YoutubeIcon } from "./Icons";
import { Reveal } from "./Reveal";

type Photo = { src: string; alt: string; ratio: string; span?: string };

// Tri kolone iste visine: svaka ima po jedan kvadrat, jedan 16:10 i jedan 4:5 kadar.
const columns: Photo[][] = [
  [
    { src: "/media/img/sator-svetla.jpg", alt: "Svadba pod šatorom sa svetlećim girlandama", ratio: "md:aspect-square" },
    { src: "/media/img/klavijature.jpg", alt: "Klavijaturista orkestra", ratio: "md:aspect-[16/10]" },
    { src: "/media/img/svatovi-mlada.jpg", alt: "Mlada među svatovima uz orkestar", ratio: "md:aspect-[4/5]" },
  ],
  [
    { src: "/media/img/sator-gosti.jpg", alt: "Gosti igraju pod šatorom", ratio: "md:aspect-[4/5]" },
    { src: "/media/img/sator-bina.jpg", alt: "Pevačica, saksofon i orkestar pod šatorom", ratio: "md:aspect-square" },
    { src: "/media/img/hero-desktop.jpg", alt: "Saksofon i harmonika među gostima", ratio: "md:aspect-[16/10]" },
  ],
  [
    { src: "/media/img/orkestar-restoran.jpg", alt: "Orkestar Tradicija svira u restoranu", ratio: "md:aspect-[16/10]" },
    { src: "/media/img/pevacica.jpg", alt: "Pevačica nastupa uz orkestar", ratio: "md:aspect-[4/5]" },
    {
      src: "/media/img/sala-plava.jpg",
      alt: "Puna svadbena sala u plavom svetlu",
      ratio: "!aspect-[16/10] md:!aspect-square",
      span: "col-span-2 md:col-span-1",
    },
  ],
];

export function Gallery() {
  return (
    <section id="galerija" className="grain relative bg-ink py-24 md:py-36">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-gold">
                <span className="h-px w-10 bg-gold/60" aria-hidden />
                Galerija
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-6 text-[clamp(2.4rem,5.4vw,4.75rem)]">
                Trenuci sa <em className="gold-text">naših slavlja.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <a
              href={socials.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                <InstagramIcon />
              </span>
              <span>
                <span className="eyebrow block text-[0.6rem] text-sand">Pratite nas</span>
                <span className="display block text-2xl transition-colors group-hover:text-gold-light">
                  {socials.instagram.handle}
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-3 md:gap-5">
          {columns.map((col, c) => (
            <div key={c} className="contents md:flex md:flex-col md:gap-5">
              {col.map((p, i) => (
                <Reveal key={p.src} delay={c * 0.08 + i * 0.04} className={p.span}>
                  <figure className={`group relative aspect-[4/5] overflow-hidden bg-ink-3 ${p.ratio}`}>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 50vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-ivory/5" />
                  </figure>
                </Reveal>
              ))}
            </div>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-14">
          {[socials.instagram, socials.tiktok, socials.youtube].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost min-h-12 px-5"
            >
              {s.label === "Instagram" && <InstagramIcon width={16} height={16} />}
              {s.label === "TikTok" && <TiktokIcon width={16} height={16} />}
              {s.label === "YouTube" && <YoutubeIcon width={16} height={16} />}
              {s.label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
