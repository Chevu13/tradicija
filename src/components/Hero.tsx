"use client";

import { getImageProps } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "./Icons";

/** Video se učitava tek u pregledaču, prema orijentaciji ekrana; preskače se uz reduced-motion i Save-Data. */
function useHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) return;
    const landscape = window.matchMedia("(min-aspect-ratio: 1/1)").matches;
    v.src = landscape ? "/media/video/hero-desktop.mp4" : "/media/video/hero-mobile.mp4";
    v.play().catch(() => {});
  }, []);

  return videoRef;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useHeroVideo();
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const common = { alt: "", fill: true, sizes: "100vw", quality: 75 } as const;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: "/media/img/hero-desktop.jpg" });
  const {
    props: { srcSet: mobileSet, ...rest },
  } = getImageProps({ ...common, src: "/media/img/hero-mobile.jpg", fetchPriority: "high", loading: "eager" });

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Uvod"
      className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      <motion.div style={{ y: mediaY }} className="absolute inset-0 -z-10 scale-[1.04]">
        <picture>
          <source media="(min-aspect-ratio: 1/1)" srcSet={desktopSet} />
          <source srcSet={mobileSet} />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img {...rest} className="h-full w-full object-cover" />
        </picture>
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
        />
      </motion.div>

      {/* Tonalni slojevi: čitljivost teksta + filmski ton */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_70%_20%,transparent_0%,rgba(11,10,8,0.35)_55%,rgba(11,10,8,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,10,8,0.75)_0%,rgba(11,10,8,0.2)_60%,transparent_100%)]" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto w-full max-w-[88rem] px-5 pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+6rem))] pt-32 md:px-10 md:pb-24"
      >
        <p
          className="anim-fade-up eyebrow flex items-center gap-4 text-gold-light"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="h-px w-10 bg-gold/70" aria-hidden />
          Zoran Nedeljkov &amp; Orkestar Tradicija
        </p>

        <h1 className="mt-6">
          <span className="sr-only">Orkestar Tradicija — </span>
          <span className="display block text-[clamp(3.6rem,8.2vw,8.4rem)] leading-[0.98] text-ivory">
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="anim-rise block" style={{ animationDelay: "0.2s" }}>
                Veselje koje se
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <span
                className="anim-rise gold-text block pr-[0.1em] italic"
                style={{ animationDelay: "0.34s" }}
              >
                pamti.
              </span>
            </span>
          </span>
          <span
            className="anim-fade-up mt-6 block max-w-xl text-[1.02rem] font-normal leading-relaxed text-ivory/80 md:text-lg"
            style={{ animationDelay: "0.45s" }}
          >
            Orkestar za svadbe, rođendane i sva vaša veselja — harmonika, saksofon i klavijature
            uživo, od prvog kola do poslednje pesme.
          </span>
        </h1>

        <div
          className="anim-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: "0.6s" }}
        >
          <a href="#upit" className="btn btn-gold">
            Pošaljite upit
          </a>
          <a href="#nastupi" className="btn btn-ghost group">
            <span className="grid h-6 w-6 place-items-center rounded-full border border-current transition-transform duration-500 group-hover:scale-110">
              <PlayIcon width={10} height={10} />
            </span>
            Pogledajte nastupe
          </a>
        </div>
      </motion.div>

      <div
        className="anim-fade-up pointer-events-none absolute bottom-8 right-10 hidden items-center gap-4 md:flex"
        style={{ animationDelay: "1.2s" }}
        aria-hidden
      >
        <span className="eyebrow text-[0.6rem] text-ivory/50">Skrolujte</span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.4s_ease-in-out_infinite] bg-gold" />
        </span>
      </div>
    </section>
  );
}
