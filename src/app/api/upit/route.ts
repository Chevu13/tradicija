import { NextResponse } from "next/server";

type Upit = {
  ime: string;
  telefon: string;
  email?: string;
  datum: string;
  vrsta: string;
  grad: string;
  lokacija?: string;
  gosti?: string;
  poruka?: string;
};

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const u: Upit = {
    ime: str(body.ime, 120),
    telefon: str(body.telefon, 40),
    email: str(body.email, 160),
    datum: str(body.datum, 10),
    vrsta: str(body.vrsta, 60),
    grad: str(body.grad, 120),
    lokacija: str(body.lokacija, 160),
    gosti: str(body.gosti, 6),
    poruka: str(body.poruka, 2000),
  };

  if (!u.ime || u.telefon.replace(/\D/g, "").length < 6 || !/^\d{4}-\d{2}-\d{2}$/.test(u.datum) || !u.vrsta || !u.grad) {
    return NextResponse.json({ ok: false, error: "Nepotpun upit" }, { status: 422 });
  }

  const rows: [string, string | undefined][] = [
    ["Ime i prezime", u.ime],
    ["Telefon", u.telefon],
    ["Email", u.email],
    ["Datum", u.datum],
    ["Vrsta proslave", u.vrsta],
    ["Mesto / grad", u.grad],
    ["Lokacija / sala", u.lokacija],
    ["Broj gostiju", u.gosti],
    ["Poruka", u.poruka],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;

  if (apiKey && to) {
    const html = `<h2>Novi upit za nastup</h2><table cellpadding="6">${rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v!)}</td></tr>`)
      .join("")}</table>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL ?? "Orkestar Tradicija <upit@resend.dev>",
        to: [to],
        reply_to: u.email || undefined,
        subject: `Upit: ${u.vrsta} — ${u.datum} — ${u.grad}`,
        html,
      }),
    });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
  } else {
    console.info("[upit]", Object.fromEntries(rows.filter(([, v]) => v)));
  }

  return NextResponse.json({ ok: true });
}
