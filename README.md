# Orkestar Tradicija — demo sajt

Prezentacioni sajt za **Zoran Nedeljkov i Orkestar Tradicija** (Next.js 16, TypeScript, Tailwind CSS 4, Motion).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produkcijski build (Vercel-ready)
```

## Struktura

| Deo | Fajl |
| --- | --- |
| Svi podaci (telefon, mreže, snimci) | `src/lib/site.ts` |
| Sekcije stranice | `src/components/*` |
| Forma „Proveri datum“ (API) | `src/app/api/upit/route.ts` |
| SEO: metadata, OpenGraph, JSON-LD | `src/app/layout.tsx`, `sitemap.ts`, `robots.ts` |
| Fotografije i video | `public/media/` |

## Upit za nastup — slanje na email

Bez podešavanja forma radi, a upit se samo loguje na serveru. Za slanje na email (preko [Resend](https://resend.com)) dodati u Vercel → Environment Variables:

```
RESEND_API_KEY=re_...
INQUIRY_TO_EMAIL=adresa@orkestra.rs
INQUIRY_FROM_EMAIL="Orkestar Tradicija <upit@verifikovan-domen.rs>"   # opciono
NEXT_PUBLIC_SITE_URL=https://pravi-domen.rs
```

## Proveriti sa klijentom pre objave

- Domen (`NEXT_PUBLIC_SITE_URL`) i email adresa za upite — email nije javno dostupan.
- „Srbija i region“ (izvedeno iz snimka „Svatovi u Tuzli“) i postava „harmonika, saksofon, klavijature“ (vidljivo na snimcima).
- Lista vrsta proslava u formi (`eventTypes` u `site.ts`).
- Svi snimci i fotografije su sa zvaničnih profila orkestra (Instagram, YouTube) — za finalnu verziju poželjno dobiti originalne fajlove u višoj rezoluciji.
- Utisci klijenata nisu pronađeni javno, pa sekcija nije pravljena.
