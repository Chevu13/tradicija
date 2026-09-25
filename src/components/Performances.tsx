"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { performances, type Performance } from "@/lib/site";
import { ArrowLeft, ArrowRight, PlayIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { VideoLightbox } from "./VideoLightbox";
import { FeaturedVideo } from "./FeaturedVideo";

function PerformanceCard({
  item,
  index,
  onOpen,
}: {
  item: Performance;
  index: number;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [previewing, setPreviewing] = useState(false);

  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const start = () => {
    const v = videoRef.current;
    if (!v || !canHover()) return;
    if (!v.src) v.src = item.video;
    v.currentTime = 0;
    v.play().then(() => setPreviewing(true)).catch(() => {});
  };
  const stop = () => {
    videoRef.current?.pause();
    setPreviewing(false);
  };

  return (
    <li className="w-[74vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-[21rem]">
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={start}
        onMouseLeave={stop}
        onFocus={start}
        onBlur={stop}
        className="group relative block aspect-[4/5] w-full overflow-hidden bg-ink-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label={`Pusti snimak: ${item.title} — ${item.label}`}
      >
        <Image
          src={item.poster}
          alt=""
          fill
          sizes="(min-width: 1024px) 21rem, (min-width: 768px) 30vw, (min-width: 640px) 42vw, 74vw"
          className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
            previewing ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/30" />
        <div className="absolute inset-0 ring-1 ring-inset ring-ivory/10 transition-colors duration-500 group-hover:ring-gold/50" />

        <span className="eyebrow absolute left-5 top-5 text-[0.6rem] text-ivory/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-ivory/40 bg-ink/20 text-ivory backdrop-blur-sm transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
          <PlayIcon width={13} height={13} />
        </span>

        <span className="absolute inset-x-5 bottom-5">
          <span className="eyebrow block text-[0.6rem] text-gold-light">{item.label}</span>
          <span className="display mt-2 block text-[1.9rem] leading-none text-ivory">{item.title}</span>
        </span>
      </button>
    </li>
  );
}

export function Performances() {
  const railRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  }, []);

  return (
    <section id="nastupi" className="grain relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-gold">
                <span className="h-px w-10 bg-gold/60" aria-hidden />
                Nastupi
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-6 text-[clamp(2.4rem,5.4vw,4.75rem)]">
                Doživite <em className="gold-text">atmosferu.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="flex items-end justify-between gap-10 md:flex-col md:items-end">
            <p className="max-w-xs text-[0.98rem] leading-relaxed text-sand md:text-right">
              Pravi snimci sa naših svadbi i proslava — bez montaže i studija. Kliknite i uključite
              zvuk.
            </p>
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Prethodni snimci"
                className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowLeft width={18} height={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Sledeći snimci"
                className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowRight width={18} height={18} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="relative mt-12 md:mt-16">
        <ul
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:scroll-px-10 md:px-10 xl:scroll-px-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))] xl:px-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))]"
          aria-label="Snimci sa nastupa"
        >
          {performances.map((item, i) => (
            <PerformanceCard key={item.slug} item={item} index={i} onOpen={() => setActive(i)} />
          ))}
          <li className="w-1 shrink-0" aria-hidden />
        </ul>
      </Reveal>

      <div className="relative mx-auto mt-6 flex max-w-[88rem] items-center gap-4 px-5 md:hidden">
        <span className="eyebrow text-[0.58rem] text-sand">Prevucite</span>
        <span className="hairline flex-1" />
        <span className="eyebrow text-[0.58rem] text-sand">{performances.length} snimaka</span>
      </div>

      <div className="relative mx-auto mt-20 max-w-[88rem] px-5 md:mt-28 md:px-10">
        <FeaturedVideo />
      </div>

      <VideoLightbox items={performances} index={active} onChange={setActive} />
    </section>
  );
}
