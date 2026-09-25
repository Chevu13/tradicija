/**
 * Centralni podaci sajta.
 * Sve činjenice su preuzete sa javnih profila orkestra (Instagram, YouTube, Facebook, TikTok).
 * Pre objave proveriti sa klijentom: domen (SITE_URL) i eventualni email.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://orkestar-tradicija.vercel.app";

export const contact = {
  phoneDisplay: "060 0157 503",
  phoneIntl: "+381 60 0157503",
  phoneHref: "tel:+381600157503",
  leader: "Zoran Nedeljkov",
};

export const socials = {
  instagram: {
    label: "Instagram",
    handle: "@orkestar_tradicija_",
    href: "https://www.instagram.com/orkestar_tradicija_/",
  },
  youtube: {
    label: "YouTube",
    handle: "@OrkestarTradicija",
    href: "https://www.youtube.com/@OrkestarTradicija",
  },
  tiktok: {
    label: "TikTok",
    handle: "@orkestar.tradicija",
    href: "https://www.tiktok.com/@orkestar.tradicija",
  },
  facebook: {
    label: "Facebook",
    handle: "Orkestar Tradicija",
    href: "https://www.facebook.com/orkestar.tradicija.2025/",
  },
} as const;

/** Zvanični studijski spot sa YouTube-a. */
export const featuredVideo = {
  youtubeId: "TTfJROKqb2c",
  title: "Splet kola",
};

export const eventTypes = [
  "Svadba",
  "Punoletstvo / rođendan",
  "Krštenje",
  "Veridba",
  "Ispraćaj",
  "Druga proslava",
] as const;
