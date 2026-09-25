import { contact, socials } from "@/lib/site";
import { FacebookIcon, InstagramIcon, PhoneIcon, TiktokIcon, YoutubeIcon } from "./Icons";
import { Logo } from "./Header";

const icons = { Instagram: InstagramIcon, YouTube: YoutubeIcon, TikTok: TiktokIcon, Facebook: FacebookIcon } as const;

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink pb-28 pt-14 md:pb-14 md:pt-16">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-10 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <Logo />
        <a
          href={contact.phoneHref}
          className="headline inline-flex items-center gap-3 text-3xl tabular-nums transition-colors hover:text-gold"
        >
          <PhoneIcon width={22} height={22} className="text-gold" />
          {contact.phoneDisplay}
        </a>
        <ul className="flex gap-2">
          {Object.values(socials).map((s) => {
            const Icon = icons[s.label];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-12 w-12 place-items-center border border-paper/15 text-paper transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon width={20} height={20} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="mx-auto mt-12 max-w-[90rem] px-5 text-sm text-mute md:px-8">
        © {new Date().getFullYear()} Zoran Nedeljkov &amp; Orkestar Tradicija
      </p>
    </footer>
  );
}
