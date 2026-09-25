"use client";

import { useEffect, useState } from "react";
import { contact } from "@/lib/site";
import { PhoneIcon } from "./Icons";

const nav = [
  { href: "#nastupi", label: "Nastupi" },
  { href: "#o-nama", label: "O nama" },
  { href: "#galerija", label: "Galerija" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Logo() {
  return (
    <span className="flex flex-col leading-none">
      <span className="headline text-[1.55rem] tracking-[0.06em] text-paper">Tradicija</span>
      <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold">
        Zoran Nedeljkov &amp; orkestar
      </span>
    </span>
  );
}

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open ? "bg-ink/95 backdrop-blur" : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-4 md:h-20 md:px-8">
        <a href="#top" aria-label="Orkestar Tradicija — početak" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Glavna navigacija" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="label text-paper/85 transition-colors hover:text-gold-light"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a href="#kontakt" className="btn btn-gold hidden min-h-11 px-5 text-[0.85rem] md:inline-flex">
            Proveri datum
          </a>
          <a
            href={contact.phoneHref}
            aria-label={`Pozovite ${contact.phoneDisplay}`}
            className="grid h-11 w-11 place-items-center text-paper md:hidden"
          >
            <PhoneIcon width={20} height={20} />
          </a>
          <button
            type="button"
            className="relative -mr-2 grid h-11 w-11 place-items-center md:hidden"
            aria-expanded={open}
            aria-controls="mobilni-meni"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-0.5 w-6 bg-paper transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[6px]"}`} />
            <span className={`absolute h-0.5 w-6 bg-paper transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-0.5 w-6 bg-paper transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[6px]"}`} />
          </button>
        </div>
      </div>

      <nav
        id="mobilni-meni"
        aria-label="Mobilna navigacija"
        hidden={!open}
        className="border-t border-paper/10 bg-ink px-4 pb-5 md:hidden"
      >
        <ul>
          {nav.map((item) => (
            <li key={item.href} className="border-b border-paper/10">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="headline block py-4 text-3xl"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#kontakt" onClick={() => setOpen(false)} className="btn btn-gold mt-5 w-full">
          Proveri datum
        </a>
      </nav>
    </header>
  );
}
