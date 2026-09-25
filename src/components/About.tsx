import Image from "next/image";
import { Reveal } from "./Reveal";
import { Parallax } from "./Parallax";

const facts = [
  { label: "Postava", value: "Harmonika, saksofon, klavijature" },
  { label: "Nastupi", value: "Svadbe, rođendani, proslave" },
  { label: "Gde sviramo", value: "Srbija i region" },
];

export function About() {
  return (
    <section id="orkestar" className="relative overflow-hidden bg-ivory text-ink">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pt-10">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-gold-ink">
              <span className="h-px w-10 bg-gold-deep/60" aria-hidden />
              Orkestar
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.4rem)]">
              Harmonika na čelu.
              <br />
              <em className="text-gold-deep">Veselje</em> u srcu.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink/75">
              Orkestar Tradicija predvodi harmonikaš Zoran Nedeljkov. Na svadbama, rođendanima i
              porodičnim slavljima sviramo isključivo uživo — domaću, narodnu muziku i kola koja
              podignu i goste koji „ne igraju“.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink/75">
              Veče vodimo od svečanog uvoda, preko spleta kola, do veselja koje traje dok god ima ko
              da igra.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <dl className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
              {facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="eyebrow text-[0.62rem] text-stone">{f.label}</dt>
                  <dd className="display text-right text-xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <Reveal className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden bg-ink sm:w-[78%]">
            <Parallax amount={40} className="absolute -inset-y-10 inset-x-0">
              <Image
                src="/media/img/zoran-harmonika.jpg"
                alt="Zoran Nedeljkov svira harmoniku"
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover object-[42%_center]"
              />
            </Parallax>
          </Reveal>

          <Reveal
            delay={0.15}
            className="absolute -bottom-8 left-0 aspect-[4/3] w-[58%] overflow-hidden border-[6px] border-ivory bg-ink shadow-[0_30px_60px_-30px_rgba(11,10,8,0.55)] sm:w-[50%] lg:-bottom-12"
          >
            <Image
              src="/media/img/orkestar-uzivo.jpg"
              alt="Orkestar Tradicija uživo — harmonika, saksofon i klavijature"
              fill
              sizes="(min-width: 1024px) 28vw, 55vw"
              className="object-cover object-[35%_center]"
            />
          </Reveal>

          <p
            className="eyebrow absolute right-0 top-full mt-5 hidden text-[0.6rem] text-stone sm:block lg:-right-2 lg:top-1/2 lg:mt-0 lg:origin-center lg:translate-x-1/2 lg:rotate-90"
            aria-hidden
          >
            Zoran Nedeljkov — harmonika
          </p>
        </div>
      </div>
    </section>
  );
}
