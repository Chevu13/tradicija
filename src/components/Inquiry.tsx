"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, type FormEvent } from "react";
import { contact, eventTypes } from "@/lib/site";
import { CheckIcon, PhoneIcon } from "./Icons";
import { Reveal } from "./Reveal";

type Fields = {
  ime: string;
  telefon: string;
  email: string;
  datum: string;
  vrsta: string;
  grad: string;
  lokacija: string;
  gosti: string;
  poruka: string;
};

const empty: Fields = {
  ime: "",
  telefon: "",
  email: "",
  datum: "",
  vrsta: "",
  grad: "",
  lokacija: "",
  gosti: "",
  poruka: "",
};

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.ime.trim().length < 2) e.ime = "Unesite ime i prezime.";
  if (f.telefon.replace(/[^\d]/g, "").length < 6) e.telefon = "Unesite broj telefona na koji možemo da vas pozovemo.";
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Proverite email adresu.";
  if (!f.datum) e.datum = "Izaberite datum proslave.";
  if (!f.vrsta) e.vrsta = "Izaberite vrstu proslave.";
  if (f.grad.trim().length < 2) e.grad = "Unesite mesto ili grad.";
  return e;
}

const steps = [
  { t: "Pošaljete upit", d: "Traje manje od minuta." },
  { t: "Javljamo se", d: "Sa informacijom o dostupnosti i ponudom." },
  { t: "Potvrđujemo termin", d: "Nakon zajedničkog dogovora." },
];

function Field({
  id,
  label,
  optional,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow flex items-baseline justify-between text-[0.62rem] text-stone">
        {label}
        {optional && <span className="normal-case tracking-normal text-stone/70">opciono</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-greska`} className="mt-2 text-[0.82rem] text-[#a33b2b]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "mt-2 block h-[3.25rem] w-full border-0 border-b border-ink/20 bg-transparent px-0 text-base text-ink placeholder:text-ink/35 transition-colors duration-300 focus:border-gold-deep focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#a33b2b]";

export function Inquiry() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const set = (k: keyof Fields) => (v: string) => {
    setF((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(first === "vrsta" ? "vrsta-0" : first)?.focus();
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
      requestAnimationFrame(() =>
        document.getElementById("upit-kartica")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    } catch {
      setStatus("error");
    }
  };

  const err = (k: keyof Fields) =>
    errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-greska` } : {};

  const datumLabel = f.datum
    ? new Date(f.datum + "T12:00:00").toLocaleDateString("sr-Latn-RS", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section id="upit" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="pointer-events-none absolute -right-40 top-20 h-[36rem] w-[36rem] rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-[88rem] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-gold">
                <span className="h-px w-10 bg-gold/60" aria-hidden />
                Upit za nastup
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.4rem)]">
                Da li je vaš <em className="gold-text">datum slobodan?</em>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-sand">
                Pošaljite nam osnovne podatke o proslavi. Javljamo se sa informacijom o dostupnosti
                i ponudom — bez ikakve obaveze.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <ol className="mt-10 grid gap-0 border-t border-ivory/10">
                {steps.map((s, i) => (
                  <li key={s.t} className="flex gap-5 border-b border-ivory/10 py-4">
                    <span className="display w-8 text-xl text-gold">0{i + 1}</span>
                    <span>
                      <span className="block text-[0.98rem] font-medium text-ivory">{s.t}</span>
                      <span className="block text-sm text-sand">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.28}>
              <a
                href={contact.phoneHref}
                className="group mt-10 inline-flex items-center gap-4"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                  <PhoneIcon width={18} height={18} />
                </span>
                <span>
                  <span className="eyebrow block text-[0.58rem] text-sand">Radije biste razgovarali?</span>
                  <span className="display block text-2xl tabular-nums transition-colors group-hover:text-gold-light">
                    {contact.phoneDisplay}
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div id="upit-kartica" className="relative scroll-mt-24 bg-ivory px-5 py-8 text-ink shadow-[0_50px_100px_-50px_rgba(201,165,92,0.45)] sm:px-8 md:px-12 md:py-12">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-deep via-gold-light to-gold-deep" />
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="hvala"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="py-6 md:py-10"
                  role="status"
                  aria-live="polite"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-ink">
                    <CheckIcon width={28} height={28} />
                  </span>
                  <h3 className="display mt-8 text-5xl">Hvala, {f.ime.split(" ")[0]}!</h3>
                  <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink/70">
                    Vaš upit je poslat. Javićemo vam se u najkraćem roku na broj{" "}
                    <strong className="font-semibold text-ink">{f.telefon}</strong> sa informacijom o
                    dostupnosti za vaš datum.
                  </p>
                  <dl className="mt-8 grid grid-cols-2 gap-px bg-ink/10 text-sm">
                    {[
                      ["Datum", datumLabel],
                      ["Proslava", f.vrsta],
                      ["Mesto", f.grad],
                      ["Gosti", f.gosti || "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-ivory py-3 pr-3">
                        <dt className="eyebrow text-[0.58rem] text-stone">{k}</dt>
                        <dd className="mt-1 font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-8 text-sm text-ink/60">
                    Napomena: upit ne predstavlja potvrdu rezervacije. Termin je rezervisan tek nakon
                    dogovora sa orkestrom.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a href={contact.phoneHref} className="btn btn-dark">
                      <PhoneIcon width={16} height={16} /> Pozovite odmah
                    </a>
                    <button
                      type="button"
                      className="btn border border-ink/20 text-ink hover:border-gold-deep"
                      onClick={() => {
                        setF(empty);
                        setStatus("idle");
                      }}
                    >
                      Novi upit
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="forma"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid gap-x-8 gap-y-7 md:grid-cols-2"
                  aria-label="Upit za nastup"
                >
                  <Field id="ime" label="Ime i prezime" error={errors.ime} className="md:col-span-2">
                    <input
                      id="ime"
                      name="ime"
                      autoComplete="name"
                      value={f.ime}
                      onChange={(e) => set("ime")(e.target.value)}
                      placeholder="Vaše ime i prezime"
                      className={inputCls}
                      {...err("ime")}
                    />
                  </Field>

                  <Field id="telefon" label="Telefon" error={errors.telefon}>
                    <input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={f.telefon}
                      onChange={(e) => set("telefon")(e.target.value)}
                      placeholder="06x xxx xxxx"
                      className={inputCls}
                      {...err("telefon")}
                    />
                  </Field>

                  <Field id="email" label="Email" optional error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={f.email}
                      onChange={(e) => set("email")(e.target.value)}
                      placeholder="ime@primer.rs"
                      className={inputCls}
                      {...err("email")}
                    />
                  </Field>

                  <fieldset className="md:col-span-2" aria-describedby={errors.vrsta ? "vrsta-greska" : undefined}>
                    <legend className="eyebrow text-[0.62rem] text-stone">Vrsta proslave</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {eventTypes.map((t, i) => {
                        const on = f.vrsta === t;
                        return (
                          <label key={t} className="relative">
                            <input
                              id={`vrsta-${i}`}
                              type="radio"
                              name="vrsta"
                              value={t}
                              checked={on}
                              onChange={() => set("vrsta")(t)}
                              className="peer sr-only"
                            />
                            <span
                              className={`flex min-h-11 cursor-pointer items-center border px-4 text-[0.9rem] transition-colors duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-gold ${
                                on
                                  ? "border-ink bg-ink text-ivory"
                                  : "border-ink/20 text-ink/80 hover:border-ink/50"
                              }`}
                            >
                              {t}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.vrsta && (
                      <p id="vrsta-greska" className="mt-2 text-[0.82rem] text-[#a33b2b]">
                        {errors.vrsta}
                      </p>
                    )}
                  </fieldset>

                  <Field id="datum" label="Datum proslave" error={errors.datum}>
                    <input
                      id="datum"
                      name="datum"
                      type="date"
                      min={today}
                      value={f.datum}
                      onChange={(e) => set("datum")(e.target.value)}
                      className={`${inputCls} [color-scheme:light] ${f.datum ? "" : "text-ink/40"}`}
                      {...err("datum")}
                    />
                  </Field>

                  <Field id="gosti" label="Broj gostiju" optional>
                    <input
                      id="gosti"
                      name="gosti"
                      type="text"
                      inputMode="numeric"
                      value={f.gosti}
                      onChange={(e) => set("gosti")(e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
                      placeholder="npr. 250"
                      className={inputCls}
                    />
                  </Field>

                  <Field id="grad" label="Mesto / grad" error={errors.grad}>
                    <input
                      id="grad"
                      name="grad"
                      autoComplete="address-level2"
                      value={f.grad}
                      onChange={(e) => set("grad")(e.target.value)}
                      placeholder="npr. Beograd"
                      className={inputCls}
                      {...err("grad")}
                    />
                  </Field>

                  <Field id="lokacija" label="Lokacija / sala" optional>
                    <input
                      id="lokacija"
                      name="lokacija"
                      value={f.lokacija}
                      onChange={(e) => set("lokacija")(e.target.value)}
                      placeholder="Naziv sale, restorana ili šator"
                      className={inputCls}
                    />
                  </Field>

                  <Field id="poruka" label="Dodatna poruka" optional className="md:col-span-2">
                    <textarea
                      id="poruka"
                      name="poruka"
                      rows={3}
                      value={f.poruka}
                      onChange={(e) => set("poruka")(e.target.value)}
                      placeholder="Satnica, posebne želje za pesme, program večeri…"
                      className={`${inputCls} h-auto resize-none py-3 leading-relaxed`}
                    />
                  </Field>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn btn-dark group w-full min-h-[3.75rem] disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory" />
                          Šaljemo…
                        </>
                      ) : (
                        "Pošaljite upit"
                      )}
                    </button>
                    {status === "error" && (
                      <p className="mt-3 text-sm text-[#a33b2b]" role="alert">
                        Slanje nije uspelo. Pokušajte ponovo ili nas pozovite na {contact.phoneDisplay}.
                      </p>
                    )}
                    <p className="mt-4 text-center text-[0.8rem] leading-relaxed text-ink/65">
                      Slanje upita ne predstavlja potvrdu rezervacije. Termin se potvrđuje tek nakon
                      dogovora sa orkestrom.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
