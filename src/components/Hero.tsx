"use client";

import { getImageProps } from "next/image";
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
  const videoRef = useHeroVideo();
  const [playing, setPlaying] = useState(false);

  const common = { alt: "", fill: true, sizes: "100vw", quality: 75 } as const;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: "/media/img/hero-desktop.jpg" });
  const {
    props: { srcSet: mobileSet, ...rest },
  } = getImageProps({ ...common, src: "/media/img/hero-mobile.jpg", fetchPriority: "high", loading: "eager" });

  return (
    <section
      id="top"
      aria-label="Uvod"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 -z-10">
        <picture>
          <source media="(min-aspect-ratio: 1/1)" srcSet={desktopSet} />
          <source srcSet={mobileSet} />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img {...rest} className="h-full w-full object-cover" />
        </picture>
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
        />
      </div>
      {/* Samo onoliko tame koliko treba za čitljivost */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink/60 via-transparent to-transparent md:block" />

      <div className="mx-auto w-full max-w-[90rem] px-4 pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] md:px-8 md:pb-16">
        <p className="hero-in label text-gold-light" style={{ animationDelay: "0.05s" }}>
          Zoran Nedeljkov &amp; Orkestar Tradicija
        </p>
        <h1 className="hero-in mt-3" style={{ animationDelay: "0.15s" }}>
          <span className="sr-only">Orkestar Tradicija — </span>
          <span className="headline block text-[clamp(4.1rem,11vw,10.5rem)] text-paper">
            Veselje
            <br />
            koje se
            <br />
            <span className="text-gold">pamti.</span>
          </span>
        </h1>
        <p
          className="hero-in mt-5 max-w-md text-[1.05rem] leading-snug text-paper/90 md:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Muzika uživo za svadbe, rođendane i proslave širom Srbije i regiona.
        </p>
        <div className="hero-in mt-7 grid gap-3 sm:flex" style={{ animationDelay: "0.4s" }}>
          <a href="#kontakt" className="btn btn-gold">
            Proveri datum
          </a>
          <a href="#nastupi" className="btn btn-line">
            <PlayIcon width={14} height={14} />
            Pogledaj nastupe
          </a>
        </div>
      </div>
    </section>
  );
}
