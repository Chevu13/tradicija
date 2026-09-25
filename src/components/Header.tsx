import { contact } from "@/lib/site";
import { PhoneIcon } from "./Icons";

const nav = [
  { href: "#snimak", label: "Snimak" },
  { href: "#o-orkestru", label: "O orkestru" },
  { href: "#proslave", label: "Proslave" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="text-lg font-bold tracking-tight">
          Orkestar Tradicija
        </a>
        <nav aria-label="Glavna navigacija" className="hidden md:block">
          <ul className="flex gap-8 text-[0.95rem] text-white/80">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={contact.phoneHref}
          className="inline-flex items-center gap-2 font-semibold tabular-nums text-gold hover:text-white"
        >
          <PhoneIcon width={18} height={18} />
          {contact.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
