"use client";

import Image from "next/image";
import { useState } from "react";
import { featuredVideo, socials } from "@/lib/site";
import { PlayIcon, YoutubeIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function FeaturedVideo() {
  const [playing, setPlaying] = useState(false);
  const v = featuredVideo;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
      <Reveal className="lg:col-span-4 lg:pb-4">
        <p className="eyebrow text-gold">Studijsko izdanje</p>
        <h3 className="display mt-4 text-[clamp(2.2rem,4.4vw,3.5rem)]">{v.title}</h3>
        <p className="mt-4 max-w-sm leading-relaxed text-sand">
          Jedanaest minuta kola bez predaha — isti zvuk koji dovodimo na vaše slavlje.
        </p>
        <a
          href={socials.youtube.href}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow mt-8 inline-flex items-center gap-3 text-[0.64rem] text-ivory/80 transition-colors hover:text-gold-light"
        >
          <YoutubeIcon width={18} height={18} /> YouTube kanal
        </a>
      </Reveal>

      <Reveal delay={0.1} className="lg:col-span-8">
        <div className="relative aspect-video w-full overflow-hidden bg-ink-3">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={`${v.subtitle} — ${v.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 text-left"
              aria-label={`Pusti spot: ${v.title}`}
            >
              <Image
                src={v.poster}
                alt="Zoran Nedeljkov sa harmonikom u studiju"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/20 to-transparent" />
              <span className="absolute inset-0 ring-1 ring-inset ring-ivory/10" />
              <span className="absolute left-5 top-5 flex items-center gap-3 md:left-8 md:top-8">
                <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:scale-110 md:h-20 md:w-20">
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold/40 [animation-duration:2.4s]" />
                  <PlayIcon width={20} height={20} className="relative ml-0.5" />
                </span>
              </span>
              <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-8 md:bottom-8">
                <span>
                  <span className="eyebrow block text-[0.6rem] text-gold-light">{v.subtitle}</span>
                  <span className="display mt-2 block text-3xl md:text-5xl">{v.title}</span>
                </span>
                <span className="eyebrow shrink-0 text-[0.62rem] tabular-nums text-ivory/70">
                  {v.duration}
                </span>
              </span>
            </button>
          )}
        </div>
      </Reveal>
    </div>
  );
}
