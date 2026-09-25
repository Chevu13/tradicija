"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Performance } from "@/lib/site";
import {
  ArrowLeft,
  ArrowRight,
  CloseIcon,
  InstagramIcon,
  PauseIcon,
  PlayIcon,
  VolumeOff,
  VolumeOn,
} from "./Icons";

type Props = {
  items: Performance[];
  index: number | null;
  onChange: (i: number | null) => void;
};

export function VideoLightbox({ items, index, onChange }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const open = index !== null;
  const item = open ? items[index] : null;

  const go = (dir: 1 | -1) => {
    if (index === null) return;
    onChange((index + dir + items.length) % items.length);
  };

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      prevFocus?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Novi snimak: pokušaj sa zvukom, a ako pregledač odbije — bez zvuka.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !item) return;
    setProgress(0);
    v.muted = muted;
    v.play()
      .then(() => setPaused(false))
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => setPaused(true));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.slug]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPaused(false)).catch(() => {});
    else {
      v.pause();
      setPaused(true);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} — snimak nastupa`}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] md:px-8 md:pt-6">
            <p className="eyebrow text-[0.62rem] text-sand">
              {String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onChange(null)}
              aria-label="Zatvori"
              className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 md:px-24">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Prethodni snimak"
              className="absolute left-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold md:grid"
            >
              <ArrowLeft />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.slug}
                className="relative aspect-[9/16] h-full max-h-[78svh] max-w-full overflow-hidden bg-black shadow-[0_40px_120px_-40px_rgba(201,165,92,0.35)]"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
              >
                <video
                  ref={videoRef}
                  src={item.video}
                  poster={item.poster}
                  playsInline
                  loop
                  preload="auto"
                  onClick={togglePlay}
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (v.duration) setProgress(v.currentTime / v.duration);
                  }}
                  className="h-full w-full cursor-pointer object-cover"
                />
                {paused && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label="Pusti"
                    className="absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full bg-gold text-ink"
                  >
                    <PlayIcon width={24} height={24} />
                  </button>
                )}
                <div className="absolute inset-x-0 bottom-0 h-[3px] bg-ivory/15">
                  <div
                    className="h-full origin-left bg-gold transition-transform duration-200 ease-linear"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                </div>
                <div className="absolute bottom-4 right-3 flex gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={paused ? "Pusti" : "Pauziraj"}
                    className="grid h-11 w-11 place-items-center rounded-full bg-ink/50 text-ivory backdrop-blur"
                  >
                    {paused ? <PlayIcon width={14} height={14} /> : <PauseIcon width={14} height={14} />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "Uključi zvuk" : "Isključi zvuk"}
                    className="grid h-11 w-11 place-items-center rounded-full bg-ink/50 text-ivory backdrop-blur"
                  >
                    {muted ? <VolumeOff width={18} height={18} /> : <VolumeOn width={18} height={18} />}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Sledeći snimak"
              className="absolute right-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold md:grid"
            >
              <ArrowRight />
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:flex-row md:items-end md:justify-between md:pb-8">
            <div>
              <p className="eyebrow text-[0.6rem] text-gold">{item.label}</p>
              <p className="display mt-1 text-3xl">{item.title}</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={item.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pogledajte na Instagramu"
                className="grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                <InstagramIcon width={18} height={18} />
              </a>
              <a
                href="#upit"
                onClick={(e) => {
                  e.preventDefault();
                  onChange(null);
                  setTimeout(
                    () => document.getElementById("upit")?.scrollIntoView({ behavior: "smooth" }),
                    420,
                  );
                }}
                className="btn btn-gold flex-1 md:flex-none"
              >
                Želim ovakvo veselje
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
