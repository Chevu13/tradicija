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

export type Performance = {
  slug: string;
  title: string;
  label: string;
  poster: string;
  video: string;
  source: string;
};

/** Isečci sa zvaničnog Instagram profila orkestra. */
export const performances: Performance[] = [
  {
    slug: "svadba-sator",
    title: "Tuge mi dovoljno",
    label: "Svadba pod šatorom",
    poster: "/media/img/svadba-sator.jpg",
    video: "/media/video/svadba-sator.mp4",
    source: "https://www.instagram.com/reel/DdhW5_aNNp3/",
  },
  {
    slug: "svatovi-tuzla",
    title: "Svatovi u Tuzli",
    label: "Kolo ispred kuće",
    poster: "/media/img/svatovi-tuzla.jpg",
    video: "/media/video/svatovi-tuzla.mp4",
    source: "https://www.instagram.com/reel/DdZa2VTtW3G/",
  },
  {
    slug: "mladenci",
    title: "Mladenci u kolu",
    label: "Svadba",
    poster: "/media/img/mladenci.jpg",
    video: "/media/video/mladenci.mp4",
    source: "https://www.instagram.com/reel/DdMpe_3Dc9T/",
  },
  {
    slug: "nadam-ti-se",
    title: "Nadam ti se",
    label: "Narodna muzika uživo",
    poster: "/media/img/nadam-ti-se.jpg",
    video: "/media/video/nadam-ti-se.mp4",
    source: "https://www.instagram.com/reel/DdO1eMLtzmR/",
  },
  {
    slug: "uvod",
    title: "Za početak, naš uvod",
    label: "Punoletstvo",
    poster: "/media/img/uvod.jpg",
    video: "/media/video/uvod.mp4",
    source: "https://www.instagram.com/reel/DXXKmWfDQHQ/",
  },
  {
    slug: "harmonika",
    title: "Harmonika među gostima",
    label: "Zoran Nedeljkov",
    poster: "/media/img/harmonika.jpg",
    video: "/media/video/harmonika.mp4",
    source: "https://www.instagram.com/reel/Db85wkiNprf/",
  },
  {
    slug: "kolo-sala",
    title: "Kolo do kraja",
    label: "Svadbena sala",
    poster: "/media/img/kolo-sala.jpg",
    video: "/media/video/kolo-sala.mp4",
    source: "https://www.instagram.com/reel/DcRjpKmtgO9/",
  },
  {
    slug: "veselje",
    title: "Veselje",
    label: "Porodična proslava",
    poster: "/media/img/veselje.jpg",
    video: "/media/video/veselje.mp4",
    source: "https://www.instagram.com/reel/DXzx-jWI-K5/",
  },
];

/** Zvanični studijski spot sa YouTube-a. */
export const featuredVideo = {
  youtubeId: "TTfJROKqb2c",
  title: "Splet kola",
  subtitle: "Zoran Nedeljkov & Orkestar Tradicija",
  duration: "11:22",
  poster: "/media/img/zoran-portret.jpg",
};

export const eventTypes = [
  "Svadba",
  "Punoletstvo / rođendan",
  "Krštenje",
  "Veridba",
  "Ispraćaj",
  "Druga proslava",
] as const;
