import Image from "next/image";
import { ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";

const events = [
  {
    title: "Svadbe",
    text: "Od dočeka svatova do poslednjeg kola — muzika koja prati svaki trenutak vašeg dana.",
    image: "/media/img/mladenci.jpg",
    alt: "Mladenci igraju u kolu pod šatorom",
  },
  {
    title: "Punoletstva i rođendani",
    text: "Veče koje slavljenik pamti — a gosti prepričavaju još dugo posle.",
    image: "/media/img/uvod.jpg",
    alt: "Orkestar na proslavi punoletstva",
  },
  {
    title: "Porodična veselja",
    text: "Slavlja, okupljanja i proslave po vašoj meri — uz pravu živu muziku.",
    image: "/media/img/veselje.jpg",
    alt: "Gosti igraju uz orkestar na porodičnoj proslavi",
  },
];

export function Events() {
  return (
    <section id="proslave" className="relative bg-ivory py-24 text-ink md:py-36">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-gold-ink">
                <span className="h-px w-10 bg-gold-deep/60" aria-hidden />
                Proslave
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-6 text-[clamp(2.4rem,5.4vw,4.75rem)]">
                Za svako vaše <em className="text-gold-deep">veselje.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="display text-2xl italic leading-snug text-ink/70">
              „Orkestar za sve vrste vaših veselja.“
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
          {events.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 0.1} className={i === 1 ? "md:mt-16" : ""}>
              <a href="#upit" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                  <Image
                    src={e.image}
                    alt={e.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
                  <span className="display absolute left-5 top-4 text-lg text-ivory/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display absolute inset-x-5 bottom-5 text-[2.2rem] leading-none text-ivory md:text-[2.5rem]">
                    {e.title}
                  </h3>
                </div>
                <div className="flex items-start justify-between gap-6 border-b border-ink/15 py-5">
                  <p className="max-w-xs text-[0.96rem] leading-relaxed text-ink/70">{e.text}</p>
                  <ArrowRight className="mt-1 shrink-0 text-gold-deep transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
