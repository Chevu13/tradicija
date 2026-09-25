"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
import { contact, eventTypes } from "@/lib/site";
import { CheckIcon, PhoneIcon } from "./Icons";

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
  "mt-1.5 block h-14 w-full border-2 border-transparent bg-paper px-4 text-base text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none aria-[invalid=true]:border-[#e0664f]";

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
      <label htmlFor={id} className="text-sm font-semibold text-paper/90">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-greska`} className="mt-1.5 text-sm text-[#f08a76]">
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

  const datum = f.datum
    ? new Date(f.datum + "T12:00:00").toLocaleDateString("sr-Latn-RS", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <section id="kontakt" className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/media/img/sator-svetla.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/70 to-ink" />

      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-16 md:grid-cols-12 md:gap-12 md:px-8 md:py-28">
        <div className="md:col-span-6">
          <h2 className="headline text-[clamp(2.9rem,6.5vw,6rem)]">
            Proverite da li je <span className="text-gold">vaš datum slobodan.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/80">
            Pošaljite datum i mesto — javljamo se sa informacijom o dostupnosti i ponudom.
          </p>
          <a href={contact.phoneHref} className="group mt-8 inline-flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center bg-gold text-ink">
              <PhoneIcon width={24} height={24} />
            </span>
            <span>
              <span className="block text-sm text-paper/70">Ili pozovite direktno</span>
              <span className="headline block text-4xl tabular-nums transition-colors group-hover:text-gold md:text-5xl">
                {contact.phoneDisplay}
              </span>
            </span>
          </a>
        </div>

        <div className="md:col-span-6">
          {status === "sent" ? (
            <div role="status" aria-live="polite" className="bg-ink-2/90 p-6 md:p-10">
              <span className="grid h-14 w-14 place-items-center bg-gold text-ink">
                <CheckIcon width={26} height={26} />
              </span>
              <h3 className="headline mt-6 text-5xl">Hvala, {f.ime.split(" ")[0]}!</h3>
              <p className="mt-4 text-lg leading-relaxed text-paper/85">
                Upit za {datum} ({f.vrsta.toLowerCase()}, {f.grad}) je poslat. Javićemo vam se na{" "}
                <strong className="text-paper">{f.telefon}</strong>.
              </p>
              <p className="mt-4 text-sm text-paper/60">
                Upit ne predstavlja potvrdu rezervacije — termin se potvrđuje dogovorom sa orkestrom.
              </p>
              <button
                type="button"
                onClick={() => {
                  setF(empty);
                  setStatus("idle");
                }}
                className="btn btn-line mt-8"
              >
                Novi upit
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} aria-label="Provera datuma" className="grid gap-5 sm:grid-cols-2">
              <Field id="ime" label="Ime i prezime" error={errors.ime} className="sm:col-span-2">
                <input id="ime" autoComplete="name" value={f.ime} onChange={(e) => set("ime")(e.target.value)} className={input} {...err("ime")} />
              </Field>
              <Field id="telefon" label="Telefon" error={errors.telefon}>
                <input
                  id="telefon"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="06x xxx xxxx"
                  value={f.telefon}
                  onChange={(e) => set("telefon")(e.target.value)}
                  className={input}
                  {...err("telefon")}
                />
              </Field>
              <Field id="vrsta" label="Vrsta proslave" error={errors.vrsta}>
                <select
                  id="vrsta"
                  value={f.vrsta}
                  onChange={(e) => set("vrsta")(e.target.value)}
                  className={`${input} appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%230c0b09' stroke-width='2.5'><path d='m6 9 6 6 6-6'/></svg>")] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10 ${f.vrsta ? "" : "text-ink/45"}`}
                  {...err("vrsta")}
                >
                  <option value="" disabled>
                    Izaberite…
                  </option>
                  {eventTypes.map((t) => (
                    <option key={t} value={t} className="text-ink">
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
                  className={`${input} [color-scheme:light] ${f.datum ? "" : "text-ink/45"}`}
                  {...err("datum")}
                />
              </Field>
              <Field id="grad" label="Grad / mesto" error={errors.grad}>
                <input
                  id="grad"
                  autoComplete="address-level2"
                  placeholder="npr. Beograd"
                  value={f.grad}
                  onChange={(e) => set("grad")(e.target.value)}
                  className={input}
                  {...err("grad")}
                />
              </Field>
              <Field id="poruka" label="Poruka (opciono)" className="sm:col-span-2">
                <textarea
                  id="poruka"
                  rows={3}
                  placeholder="Sala, broj gostiju, posebne želje…"
                  value={f.poruka}
                  onChange={(e) => set("poruka")(e.target.value)}
                  className={`${input} h-auto resize-none py-3`}
                />
              </Field>
              <div className="sm:col-span-2">
                <button type="submit" disabled={status === "sending"} className="btn btn-gold min-h-[3.75rem] w-full text-lg disabled:opacity-70">
                  {status === "sending" ? "Šaljemo…" : "Proveri datum"}
                </button>
                {status === "error" && (
                  <p role="alert" className="mt-3 text-sm text-[#f08a76]">
                    Slanje nije uspelo. Pozovite nas na {contact.phoneDisplay}.
                  </p>
                )}
                <p className="mt-3 text-sm text-paper/60">
                  Upit ne predstavlja potvrdu rezervacije.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
