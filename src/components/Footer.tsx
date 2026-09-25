import { contact, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink py-10 text-white/70">
      <div className="wrap flex flex-col gap-4 text-[0.95rem] md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-semibold text-white">Zoran Nedeljkov i Orkestar Tradicija</span>
          <span className="mx-2">·</span>
          <a href={contact.phoneHref} className="whitespace-nowrap tabular-nums hover:text-white">
            {contact.phoneDisplay}
          </a>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {Object.values(socials).map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
