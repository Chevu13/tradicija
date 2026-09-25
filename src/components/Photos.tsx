import Image from "next/image";

const photos = [
  { src: "/media/img/mladenci.jpg", alt: "Mladenci igraju u kolu pod šatorom" },
  { src: "/media/img/sator-bina.jpg", alt: "Pevačica i orkestar na svadbi pod šatorom" },
  { src: "/media/img/svatovi-mlada.jpg", alt: "Mlada među svatovima uz orkestar" },
  { src: "/media/img/punoletstvo.jpg", alt: "Dve harmonike na proslavi punoletstva" },
];

export function Photos() {
  return (
    <section aria-label="Fotografije sa nastupa" className="py-16 md:py-24">
      <div className="wrap">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {photos.map((p) => (
            <li key={p.src} className="relative aspect-[4/5] overflow-hidden bg-ink">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
