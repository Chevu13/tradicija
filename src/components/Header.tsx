"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { contact, socials } from "@/lib/site";
import { InstagramIcon, PhoneIcon } from "./Icons";

const nav = [
  { href: "#orkestar", label: "Orkestar" },
  { href: "#nastupi", label: "Nastupi" },
  { href: "#repertoar", label: "Repertoar" },
  { href: "#proslave", label: "Proslave" },
  { href: "#galerija", label: "Galerija" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="eyebrow text-[0.55rem] tracking-[0.42em] text-gold">Orkestar</span>
      <span className="display mt-1 text-[1.6rem] tracking-[0.16em] text-ivory">TRADICIJA</span>
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled && !open
          ? "border-b border-gold/15 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[88rem] items-center justify-between px-5 md:px-10">
        <a href="#top" aria-label="Orkestar Tradicija — početak" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="eyebrow text-[0.66rem] text-ivory/75 transition-colors duration-300 hover:text-gold-light"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contact.phoneHref}
            className="hidden items-center gap-2 px-3 text-sm text-ivory/80 transition-colors hover:text-gold-light md:flex"
          >
            <PhoneIcon width={16} height={16} />
            <span className="tabular-nums tracking-wide">{contact.phoneDisplay}</span>
          </a>
          <a href="#upit" className="btn btn-gold hidden min-h-11 px-5 sm:inline-flex">
            Pošaljite upit
          </a>
          <button
            type="button"
            className="relative -mr-2 grid h-12 w-12 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobilni-meni"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-px w-6 bg-ivory transition-transform duration-500 ${
                open ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-ivory transition-transform duration-500 ${
                open ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobilni-meni"
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 flex flex-col bg-ink px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav aria-label="Mobilna navigacija">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-gold/10"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline justify-between py-4 text-[2.4rem]"
                    >
                      {item.label}
                      <span className="eyebrow text-[0.6rem] text-gold/70">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto grid gap-3">
              <a href="#upit" onClick={() => setOpen(false)} className="btn btn-gold w-full">
                Pošaljite upit
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href={contact.phoneHref} className="btn btn-ghost w-full px-3">
                  <PhoneIcon width={16} height={16} /> Pozovite
                </a>
                <a
                  href={socials.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full px-3"
                >
                  <InstagramIcon width={16} height={16} /> Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
