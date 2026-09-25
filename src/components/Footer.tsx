import { contact, socials } from "@/lib/site";
import { FacebookIcon, InstagramIcon, PhoneIcon, TiktokIcon, YoutubeIcon } from "./Icons";
import { Wordmark } from "./Header";

const icons = {
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  TikTok: TiktokIcon,
  Facebook: FacebookIcon,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-ink pb-28 pt-16 md:pb-12 md:pt-20">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Wordmark />
          <div className="hairline mt-6 max-w-xs" />
          <p className="mt-6 max-w-sm leading-relaxed text-sand">
            Zoran Nedeljkov i Orkestar Tradicija — orkestar za svadbe, rođendane i sva vaša veselja.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-[0.6rem] text-gold">Booking &amp; menadžment</p>
          <a
            href={contact.phoneHref}
            className="display mt-4 flex items-center gap-3 text-3xl tabular-nums transition-colors hover:text-gold-light"
          >
            <PhoneIcon width={20} height={20} className="text-gold" />
            {contact.phoneDisplay}
          </a>
          <p className="mt-2 text-sm text-sand">{contact.leader}</p>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-[0.6rem] text-gold">Pratite nas</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
            {Object.values(socials).map((s) => {
              const Icon = icons[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-3 text-ivory/80 transition-colors hover:text-gold-light"
                  >
                    <Icon width={18} height={18} />
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[88rem] flex-col gap-3 px-5 text-xs text-sand/80 md:flex-row md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Orkestar Tradicija. Sva prava zadržana.</p>
        <p>Muzika uživo za svadbe i proslave</p>
      </div>
    </footer>
  );
}
