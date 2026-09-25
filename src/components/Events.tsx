import Image from "next/image";
import { Reveal } from "./Reveal";

const events = [
  { title: "Svadbe", image: "/media/img/mladenci.jpg", alt: "Mladenci igraju u kolu pod šatorom" },
  { title: "Rođendani i punoletstva", image: "/media/img/uvod.jpg", alt: "Harmonike na proslavi punoletstva" },
  { title: "Porodična i privatna veselja", image: "/media/img/veselje.jpg", alt: "Gosti igraju uz orkestar" },
];

export function Events() {
  return (
    <section aria-labelledby="proslave-naslov" className="bg-paper pt-16 text-ink md:pt-24">
      <div className="mx-auto max-w-[90rem] px-4 md:px-8">
        <h2 id="proslave-naslov" className="headline text-[clamp(2.9rem,7vw,6.5rem)]">
          Za svako vaše veselje.
        </h2>
      </div>

      <div className="mt-10 grid gap-1 bg-ink md:mt-14 md:grid-cols-3">
        {events.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <a href="#kontakt" className="group relative block aspect-[5/4] overflow-hidden bg-ink md:aspect-[3/4]">
              <Image
                src={e.image}
                alt={e.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <h3 className="headline absolute inset-x-4 bottom-5 text-[2.6rem] text-paper md:inset-x-6 md:bottom-7 md:text-[clamp(2.4rem,3.6vw,3.6rem)]">
                {e.title}
              </h3>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
