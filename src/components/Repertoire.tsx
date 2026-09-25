"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";

const parts = [
  {
    title: "Uvod i doček",
    text: "Svečan početak — instrumentalni uvod na harmonici i saksofonu dok se gosti okupljaju.",
    image: "/media/img/uvod.jpg",
    alt: "Dve harmonike i violina na početku proslave",
  },
  {
    title: "Kola",
    text: "Splet kola koji otvara veselje — od laganih do onih posle kojih niko ne ostaje za stolom.",
    image: "/media/img/svatovi-tuzla.jpg",
    alt: "Svatovi igraju kolo ispred kuće",
  },
  {
    title: "Narodna muzika",
    text: "Pesme uz vokal koje cela sala peva — domaće, narodne, one koje svi znaju napamet.",
    image: "/media/img/nadam-ti-se.jpg",
    alt: "Pevačica nastupa sa orkestrom pod šatorom",
  },
  {
    title: "Veselje do kraja",
    text: "Tempo prati salu. Kada gosti traže još jednu — ima još jedna.",
    image: "/media/img/kolo-sala.jpg",
    alt: "Puna sala u kolu",
  },
];

export function Repertoire() {
  const [active, setActive] = useState(0);

  return (
    <section id="repertoar" className="relative bg-ink-2 py-24 md:py-36">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-gold">
                <span className="h-px w-10 bg-gold/60" aria-hidden />
                Repertoar
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-6 text-[clamp(2.4rem,5.4vw,4.75rem)]">
                Zvuk za <em className="gold-text">celo veče.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-[0.98rem] leading-relaxed text-sand">
              Domaća muzika, kola i narodne pesme — raspoređeno tako da atmosfera raste od prvog do
              poslednjeg takta.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12">
          <ol className="lg:col-span-7">
            {parts.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group grid w-full grid-cols-[3rem_1fr_auto] items-start gap-4 border-t border-ivory/10 py-7 text-left md:grid-cols-[5rem_1fr_auto] md:py-9"
                >
                  <span
                    className={`display text-2xl transition-colors duration-500 md:text-3xl ${
                      active === i ? "text-gold" : "text-ivory/30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span
                      className={`display block text-[2rem] leading-none transition-colors duration-500 md:text-5xl ${
                        active === i ? "text-ivory" : "text-ivory/60 group-hover:text-ivory"
                      }`}
                    >
                      {p.title}
                    </span>
                    <span
                      className={`mt-3 block max-w-md text-[0.96rem] leading-relaxed text-sand transition-[opacity] duration-500 lg:mt-4 ${
                        active === i ? "lg:opacity-100" : "lg:opacity-50"
                      }`}
                    >
                      {p.text}
                    </span>
                  </span>
                  <span className="relative mt-1 block h-20 w-16 overflow-hidden lg:hidden">
                    <Image src={p.image} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <ArrowRight
                    className={`mt-3 hidden transition-all duration-500 lg:block ${
                      active === i ? "translate-x-0 text-gold opacity-100" : "-translate-x-3 opacity-0"
                    }`}
                  />
                </button>
              </Reveal>
            ))}
            <li className="border-t border-ivory/10" aria-hidden />
          </ol>

          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-ink-3">
              <AnimatePresence initial={false}>
                <motion.div
                  key={parts[active].image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={parts[active].image}
                    alt={parts[active].alt}
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <p className="eyebrow absolute bottom-5 left-5 text-[0.6rem] text-gold-light">
                {String(active + 1).padStart(2, "0")} — {parts[active].title}
              </p>
            </div>
          </div>
        </div>

        <Reveal className="mt-14 flex flex-col gap-5 border border-gold/20 bg-ink/40 p-6 md:mt-20 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="display text-2xl md:text-3xl">
            Imate želju za posebnu pesmu ili kolo?
          </p>
          <a href="#upit" className="btn btn-ghost shrink-0">
            Napišite je u upitu
          </a>
        </Reveal>
      </div>
    </section>
  );
}
