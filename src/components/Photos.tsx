import Image from "next/image";

// Vrste proslava prema opisima orkestra na Instagramu i YouTube-u.
const events = [
  {
    title: "Svadbe",
    text: "Od dočeka svatova do poslednjeg kola.",
    src: "/media/img/mladenci.jpg",
    alt: "Mladenci igraju u kolu pod šatorom",
  },
  {
    title: "Doček svatova",
    text: "Harmonika i kolo ispred kuće, pre polaska.",
    src: "/media/img/svatovi-mlada.jpg",
    alt: "Mlada među svatovima uz orkestar",
  },
  {
    title: "Rođendani i punoletstva",
    text: "Veče koje slavljenik i gosti pamte.",
    src: "/media/img/punoletstvo.jpg",
    alt: "Dve harmonike na proslavi punoletstva",
  },
  {
    title: "Proslave i veselja",
    text: "Porodična slavlja i okupljanja po vašoj meri.",
    src: "/media/img/proslava.jpg",
    alt: "Gosti igraju uz orkestar na proslavi",
  },
];

export function Photos() {
  return (
    <section id="proslave" className="py-16 md:py-24">
      <div className="wrap">
        <h2 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">Na kojim proslavama sviramo</h2>
        <p className="mt-4 max-w-lg text-mute">
          Orkestar za sve vrste vaših veselja — od svadbi i punoletstava do porodičnih proslava.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {events.map((e) => (
            <li key={e.title}>
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <Image src={e.src} alt={e.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
              <h3 className="mt-4 text-lg md:text-xl">{e.title}</h3>
              <p className="mt-1 text-[0.95rem] leading-snug text-mute">{e.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
