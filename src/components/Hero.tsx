import { getImageProps } from "next/image";
import { contact } from "@/lib/site";
import { PhoneIcon } from "./Icons";

export function Hero() {
  const common = { alt: "Orkestar Tradicija svira na svadbi pod šatorom", fill: true, sizes: "100vw" } as const;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: "/media/img/hero-desktop.jpg" });
  const {
    props: { srcSet: mobileSet, ...rest },
  } = getImageProps({ ...common, src: "/media/img/hero-mobile.jpg", fetchPriority: "high", loading: "eager" });

  return (
    <section id="top" className="relative isolate flex min-h-[72svh] items-end bg-ink text-white md:min-h-[78vh]">
      <picture>
        <source media="(min-aspect-ratio: 1/1)" srcSet={desktopSet} />
        <source srcSet={mobileSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img {...rest} className="-z-10 object-cover" />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

      <div className="wrap pb-10 pt-32 md:pb-16">
        <h1 className="max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)]">
          Zoran Nedeljkov i Orkestar Tradicija
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/85 md:text-xl">
          Orkestar za svadbe, rođendane i sva vaša veselja. Srbija i region.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={contact.phoneHref} className="btn btn-gold">
            <PhoneIcon width={18} height={18} />
            Pozovite {contact.phoneDisplay}
          </a>
          <a href="#kontakt" className="btn btn-light">
            Pošaljite upit
          </a>
        </div>
      </div>
    </section>
  );
}
