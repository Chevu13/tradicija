const words = [
  "Svadbe",
  "Kola",
  "Rođendani",
  "Harmonika uživo",
  "Punoletstva",
  "Narodna muzika",
  "Veselja",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="display px-8 text-[clamp(2rem,4.2vw,3.6rem)] italic text-ivory/90">{w}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" className="text-gold" aria-hidden>
            <path d="M7 0 8.6 5.4 14 7 8.6 8.6 7 14 5.4 8.6 0 7 5.4 5.4Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-gold/15 bg-ink-2 py-6 md:py-8">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-2 md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-2 md:w-40" />
    </div>
  );
}
