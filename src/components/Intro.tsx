import Image from "next/image";
import { Reveal } from "./Reveal";

export function Intro() {
  return (
    <section id="o-nama" className="bg-paper text-ink">
      <div className="grid md:grid-cols-12 md:items-center">
        <div className="relative aspect-[4/3] md:col-span-7 md:aspect-auto md:h-[min(46rem,82vh)]">
          <Image
            src="/media/img/zoran-harmonika.jpg"
            alt="Zoran Nedeljkov svira harmoniku"
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover object-[40%_center]"
          />
        </div>

        <Reveal className="px-4 py-12 md:col-span-5 md:px-12 md:py-16 lg:px-16">
          <h2 className="headline text-[clamp(2.9rem,6vw,5.2rem)]">Orkestar Tradicija</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
            Orkestar za sve vrste vaših veselja, predvođen harmonikašem Zoranom Nedeljkovim.
            Sviramo isključivo uživo — narodnu muziku, kola i pesme koje cela sala zna napamet.
          </p>
          <p className="headline mt-8 text-2xl text-gold-ink md:text-3xl">
            Od prvog kola do poslednje pesme.
          </p>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.08em] text-mute-dark">
            Harmonika · Saksofon · Klavijature
          </p>
        </Reveal>
      </div>
    </section>
  );
}
