"use client";

import { useEffect, useState } from "react";
import { contact } from "@/lib/site";
import { PhoneIcon } from "./Icons";

/** Traka na telefonu: pojavljuje se posle hero sekcije, sklanja se kod kontakta i footera. */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hidden = new Set<Element>();
    let pastHero = false;
    const update = () => setVisible(pastHero && hidden.size === 0);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.8;
      update();
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? hidden.add(e.target) : hidden.delete(e.target)));
      update();
    });
    document.querySelectorAll("#kontakt, footer").forEach((el) => io.observe(el));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-ink/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href={contact.phoneHref}
        tabIndex={visible ? 0 : -1}
        aria-label={`Pozovite ${contact.phoneDisplay}`}
        className="grid h-12 w-12 shrink-0 place-items-center border-2 border-paper/40 text-paper"
      >
        <PhoneIcon width={20} height={20} />
      </a>
      <a href="#kontakt" tabIndex={visible ? 0 : -1} className="btn btn-gold min-h-12 flex-1">
        Proveri datum
      </a>
    </div>
  );
}
