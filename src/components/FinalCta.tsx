import Image from "next/image";
import { contact } from "@/lib/site";
import { PhoneIcon } from "./Icons";
import { Parallax } from "./Parallax";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section aria-label="Pošaljite upit" className="grain relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0 -z-10">
        <Parallax amount={70} className="absolute -inset-y-24 inset-x-0">
          <Image
            src="/media/img/sator-svetla.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top opacity-85"
          />
        </Parallax>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(11,10,8,0.62)_0%,rgba(11,10,8,0.25)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-transparent to-ink" />

      <div className="mx-auto flex max-w-[60rem] flex-col items-center px-5 py-32 text-center md:py-48">
        <Reveal>
          <svg width="18" height="18" viewBox="0 0 14 14" className="text-gold" aria-hidden>
            <path d="M7 0 8.6 5.4 14 7 8.6 8.6 7 14 5.4 8.6 0 7 5.4 5.4Z" fill="currentColor" />
          </svg>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mt-8 text-[clamp(2.5rem,6.6vw,5.8rem)]">
            Vaše slavlje.
            <br />
            Vaša priča.
            <br />
            <em className="gold-text">Muzika koju ćete pamtiti.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="mt-12 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <a href="#upit" className="btn btn-gold w-full sm:w-auto">
            Pošaljite upit za vaš datum
          </a>
          <a href={contact.phoneHref} className="btn btn-ghost w-full sm:w-auto">
            <PhoneIcon width={16} height={16} />
            <span className="tabular-nums">{contact.phoneDisplay}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
