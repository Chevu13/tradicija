import Image from "next/image";

const facts: [string, string][] = [
  ["Vođa orkestra", "Zoran Nedeljkov, harmonika"],
  ["Postava", "Harmonika, saksofon, klavijature"],
  ["Muzika", "Narodna muzika i kola"],
  ["Nastupi", "Svadbe, rođendani, punoletstva i druga veselja"],
  ["Gde sviramo", "Srbija i region"],
];

export function About() {
  return (
    <section id="o-orkestru" className="border-t border-line bg-white py-16 md:py-24">
      <div className="wrap grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">O orkestru</h2>
          <p className="mt-4 max-w-lg text-mute">
            Orkestar Tradicija vodi harmonikaš Zoran Nedeljkov. Sviramo uživo na svadbama,
            rođendanima i porodičnim slavljima — od uvoda i spleta kola do narodnih pesama koje cela
            sala peva.
          </p>

          <dl className="mt-8 border-t border-line">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-3">
                <dt className="text-mute">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-[4/3] bg-ink md:aspect-auto md:min-h-full">
          <Image
            src="/media/img/zoran-harmonika.jpg"
            alt="Zoran Nedeljkov sa harmonikom"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[40%_center]"
          />
        </div>
      </div>
    </section>
  );
}
