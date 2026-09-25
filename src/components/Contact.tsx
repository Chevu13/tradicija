"use client";

import { useMemo, useState, type FormEvent } from "react";
import { contact, eventTypes, socials } from "@/lib/site";
import { PhoneIcon } from "./Icons";

type Fields = { ime: string; telefon: string; vrsta: string; datum: string; grad: string; poruka: string };
const empty: Fields = { ime: "", telefon: "", vrsta: "", datum: "", grad: "", poruka: "" };

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.ime.trim().length < 2) e.ime = "Unesite ime i prezime.";
  if (f.telefon.replace(/\D/g, "").length < 6) e.telefon = "Unesite broj telefona.";
  if (!f.vrsta) e.vrsta = "Izaberite vrstu proslave.";
  if (!f.datum) e.datum = "Izaberite datum.";
  if (f.grad.trim().length < 2) e.grad = "Unesite grad ili mesto.";
  return e;
}

const input =
  "mt-1.5 block h-12 w-full rounded border border-line bg-white px-3.5 text-base text-ink placeholder:text-mute/70 focus:border-ink focus:outline-none aria-[invalid=true]:border-[#b3261e]";

function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[0.95rem] font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-greska`} className="mt-1 text-sm text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const set = (k: keyof Fields) => (v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };
  const err = (k: keyof Fields) =>
    errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-greska` } : {};

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/upit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="border-t border-line bg-white py-16 md:py-24">
      <div className="wrap grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <div>
          <h2 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">Upit za nastup</h2>
          <p className="mt-4 max-w-md text-mute">
            Pošaljite datum i mesto proslave, a mi ćemo vam javiti da li smo slobodni i koliko košta
            nastup. Najbrže je telefonom.
          </p>
          <a
            href={contact.phoneHref}
            className="mt-8 inline-flex items-center gap-3 text-3xl font-bold tabular-nums hover:text-gold-dark"
          >
            <PhoneIcon width={26} height={26} />
            {contact.phoneDisplay}
          </a>
          <p className="mt-2 text-mute">Booking: {contact.leader}</p>
          <p className="mt-6">
            <a className="link" href={socials.instagram.href} target="_blank" rel="noopener noreferrer">
              Pišite nam na Instagramu
            </a>
          </p>
        </div>

        {status === "sent" ? (
          <div role="status" aria-live="polite" className="rounded border border-line bg-paper p-6 md:p-8">
            <h3 className="text-2xl">Hvala, upit je poslat.</h3>
            <p className="mt-3 text-mute">
              Javićemo vam se na broj <strong className="text-ink">{f.telefon}</strong>. Upit ne
              predstavlja potvrdu rezervacije — termin se potvrđuje dogovorom.
            </p>
            <button
              type="button"
              onClick={() => {
                setF(empty);
                setStatus("idle");
              }}
              className="link mt-6"
            >
              Pošaljite novi upit
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} aria-label="Upit za nastup" className="grid gap-5 sm:grid-cols-2">
            <Field id="ime" label="Ime i prezime" error={errors.ime}>
              <input id="ime" autoComplete="name" value={f.ime} onChange={(e) => set("ime")(e.target.value)} className={input} {...err("ime")} />
            </Field>
            <Field id="telefon" label="Telefon" error={errors.telefon}>
              <input
                id="telefon"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={f.telefon}
                onChange={(e) => set("telefon")(e.target.value)}
                className={input}
                {...err("telefon")}
              />
            </Field>
            <Field id="vrsta" label="Vrsta proslave" error={errors.vrsta}>
              <select id="vrsta" value={f.vrsta} onChange={(e) => set("vrsta")(e.target.value)} className={input} {...err("vrsta")}>
                <option value="" disabled>
                  Izaberite
                </option>
                {eventTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="datum" label="Datum" error={errors.datum}>
              <input
                id="datum"
                type="date"
                min={today}
                value={f.datum}
                onChange={(e) => set("datum")(e.target.value)}
                className={input}
                {...err("datum")}
              />
            </Field>
            <Field id="grad" label="Grad / mesto" error={errors.grad} className="sm:col-span-2">
              <input
                id="grad"
                autoComplete="address-level2"
                value={f.grad}
                onChange={(e) => set("grad")(e.target.value)}
                className={input}
                {...err("grad")}
              />
            </Field>
            <Field id="poruka" label="Poruka (nije obavezno)" className="sm:col-span-2">
              <textarea
                id="poruka"
                rows={3}
                placeholder="Sala, broj gostiju, satnica…"
                value={f.poruka}
                onChange={(e) => set("poruka")(e.target.value)}
                className={`${input} h-auto py-2.5`}
              />
            </Field>
            <div className="sm:col-span-2">
              <button type="submit" disabled={status === "sending"} className="btn btn-dark w-full sm:w-auto disabled:opacity-60">
                {status === "sending" ? "Šaljemo…" : "Pošaljite upit"}
              </button>
              {status === "error" && (
                <p role="alert" className="mt-3 text-sm text-[#b3261e]">
                  Slanje nije uspelo. Pozovite nas na {contact.phoneDisplay}.
                </p>
              )}
              <p className="mt-3 text-sm text-mute">Upit ne predstavlja potvrdu rezervacije.</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
