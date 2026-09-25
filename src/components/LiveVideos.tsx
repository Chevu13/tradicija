"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { featuredVideo, performances, socials, type Performance } from "@/lib/site";
import { ArrowRight, InstagramIcon, PlayIcon, YoutubeIcon } from "./Icons";
import { VideoLightbox } from "./VideoLightbox";

function VideoTile({
  item,
  onOpen,
  className,
  sizes,
}: {
  item: Performance;
  onOpen: () => void;
  className: string;
  sizes: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [previewing, setPreviewing] = useState(false);

  // Na računaru: nemi pregled na prelaz mišem. Na telefonu: samo klik.
  const start = () => {
    const v = videoRef.current;
    if (!v || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (!v.src) v.src = item.video;
    v.play().then(() => setPreviewing(true)).catch(() => {});
  };
  const stop = () => {
    videoRef.current?.pause();
    setPreviewing(false);
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={start}
      onMouseLeave={stop}
      className={`group relative block w-full overflow-hidden bg-ink-2 text-left outline-none focus-visible:ring-4 focus-visible:ring-gold ${className}`}
      aria-label={`Pusti snimak: ${item.title}`}
    >
      <Image
        src={item.poster}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          previewing ? "opacity-100" : "opacity-0"
        }`}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
      <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-ink shadow-2xl transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24">
        <PlayIcon width={28} height={28} className="ml-1" />
      </span>
      <span className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6">
        <span className="headline block text-3xl text-paper md:text-4xl">{item.title}</span>
        <span className="mt-1 block text-sm text-paper/75">{item.label}</span>
      </span>
    </button>
  );
}

export function LiveVideos() {
  const [active, setActive] = useState<number | null>(null);
  const [main, second, third] = performances;

  return (
    <section id="nastupi" className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 md:px-8">
        <h2 className="headline max-w-4xl text-[clamp(2.9rem,7vw,6.5rem)]">
          Pogledajte kako zvuči <span className="text-gold">Tradicija.</span>
        </h2>

        <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-12 md:grid-rows-2 md:gap-4">
          <VideoTile
            item={main}
            onOpen={() => setActive(0)}
            className="aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-auto md:h-[min(52rem,90vh)]"
            sizes="(min-width: 768px) 58vw, 100vw"
          />
          <VideoTile
            item={second}
            onOpen={() => setActive(1)}
            className="aspect-[4/5] md:col-span-5 md:aspect-auto md:h-full"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
          <VideoTile
            item={third}
            onOpen={() => setActive(2)}
            className="aspect-[4/5] md:col-span-5 md:aspect-auto md:h-full"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={socials.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="headline group inline-flex items-center gap-3 text-2xl text-paper transition-colors hover:text-gold md:text-3xl"
          >
            <InstagramIcon width={26} height={26} />
            Još snimaka na Instagramu
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-gold-light"
          >
            <YoutubeIcon width={20} height={20} />
            Spot „{featuredVideo.title}“ na YouTube-u
          </a>
        </div>
      </div>

      <VideoLightbox items={performances} index={active} onChange={setActive} />
    </section>
  );
}
