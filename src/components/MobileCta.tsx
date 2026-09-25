"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { contact } from "@/lib/site";
import { PhoneIcon } from "./Icons";

/** Diskretna traka na telefonu: pojavljuje se posle hero sekcije, nestaje kod forme i footera. */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hidden = new Set<string>();
    let pastHero = false;
    const update = () => setVisible(pastHero && hidden.size === 0);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.85;
      update();
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const key = (e.target as HTMLElement).dataset.ctaHide ?? e.target.id;
          if (e.isIntersecting) hidden.add(key);
          else hidden.delete(key);
        });
        update();
      },
      { threshold: 0.05 },
    );
    ["upit"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    document.querySelectorAll("footer").forEach((el) => {
      (el as HTMLElement).dataset.ctaHide = "footer";
      io.observe(el);
    });

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-ink/85 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex gap-3">
            <a
              href={contact.phoneHref}
              aria-label={`Pozovite ${contact.phoneDisplay}`}
              className="grid h-12 w-12 shrink-0 place-items-center border border-ivory/25 text-ivory"
            >
              <PhoneIcon width={18} height={18} />
            </a>
            <a href="#upit" className="btn btn-gold min-h-12 flex-1">
              Proverite datum
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
