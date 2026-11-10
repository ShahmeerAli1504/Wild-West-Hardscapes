import { NextResponse } from "next/server";
import { BUDGETS, CONTACT, CONTACT_PREFS, SERVICE_NAMES, TIMELINES } from "@/lib/site-data";
import { escapeHtml, getTransporter, mailConfig } from "@/lib/mailer";

export const runtime = "nodejs";

type Lead = {
  name: string; phone: string; email: string; location: string; services: string[];
  budget: string; timeline: string; special: boolean; message: string; contact_pref: string;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const oneOf = (v: string, list: readonly string[]) => (list.includes(v) ? v : "");

// Basic per-IP rate limit (best effort: resets when a serverless instance is recycled).
const hits = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

function parse(body: Record<string, unknown>): { lead?: Lead; error?: string } {
  const lead: Lead = {
    name: str(body.name, 120),
    phone: str(body.phone, 40),
    email: str(body.email, 200),
    location: str(body.location, 200),
    services: Array.isArray(body.services)
      ? body.services.filter((s): s is string => typeof s === "string" && SERVICE_NAMES.includes(s))
      : [],
    budget: oneOf(str(body.budget, 80), BUDGETS),
    timeline: oneOf(str(body.timeline, 80), TIMELINES),
    special: body.special === true,
    message: str(body.message, 5000),
    contact_pref: oneOf(str(body.contact_pref, 10), CONTACT_PREFS) || "Call",
  };
  if (!lead.name) return { error: "Please add your name." };
  if (lead.phone.replace(/\D/g, "").length < 10) return { error: "Please add a valid phone number." };
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return { error: "Please check your email address." };
  return { lead };
}

function rows(l: Lead): [string, string][] {
  return [
    ["Name", l.name],
    ["Phone", l.phone],
    ["Email", l.email],
    ["Location", l.location],
    ["Services", l.services.join(", ")],
    ["Budget", l.budget],
    ["Timeline", l.timeline],
    ["Winter Special", l.special ? "Yes" : "No"],
    ["Best contact", l.contact_pref],
    ["Notes", l.message],
  ].filter(([, v]) => v) as [string, string][];
}

function ownerEmail(l: Lead) {
  const r = rows(l);
  const text = ["New estimate request — Wild West Hardscapes", "", ...r.map(([k, v]) => `${k}: ${v}`)].join("\n");
  const tel = l.phone.replace(/[^\d+]/g, "");
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f3e3cc;padding:24px">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#fffaf2;border-radius:12px;overflow:hidden;border-collapse:collapse">
      <tr><td style="background:#0f0c0a;color:#e3aa4c;padding:18px 24px;font-size:20px;font-weight:bold;letter-spacing:1px">
        NEW ESTIMATE REQUEST${l.special ? ' <span style="background:#c2462b;color:#fff;font-size:12px;padding:3px 8px;border-radius:4px;vertical-align:middle">WINTER SPECIAL</span>' : ""}
      </td></tr>
      ${r
        .map(
          ([k, v]) => `<tr>
        <td style="padding:10px 24px;border-bottom:1px solid #ead9bf;color:#2a1d14;font-size:15px">
          <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#7a4a2a;margin-bottom:2px">${escapeHtml(k)}</div>
          ${escapeHtml(v).replace(/\n/g, "<br>")}
        </td></tr>`,
        )
        .join("")}
      <tr><td style="padding:18px 24px">
        <a href="tel:${escapeHtml(tel)}" style="display:inline-block;background:#c2462b;color:#fff;text-decoration:none;padding:10px 18px;border-radius:999px;font-weight:bold">Call ${escapeHtml(l.name.split(" ")[0])}</a>
        ${l.email ? `&nbsp;<a href="mailto:${escapeHtml(l.email)}" style="display:inline-block;color:#2a1d14;padding:10px 6px">Reply by email</a>` : ""}
      </td></tr>
    </table>
  </div>`;
  return { text, html };
}

function confirmationEmail(l: Lead) {
  const first = l.name.split(" ")[0];
  const via = l.contact_pref.toLowerCase();
  const text = `Hi ${first},

Thanks for reaching out to Wild West Hardscapes! We received your estimate request and will reach out by ${via} soon to schedule your free estimate.

Questions in the meantime? Call or text ${CONTACT.PHONE_DISPLAY}.

— Alfonso Almaraz
Wild West Hardscapes LLC · NV Lic. #0096054`;
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f3e3cc;padding:24px">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#fffaf2;border-radius:12px;border-collapse:collapse">
      <tr><td style="background:#0f0c0a;color:#e3aa4c;padding:18px 24px;font-size:20px;font-weight:bold;letter-spacing:1px">WILD WEST HARDSCAPES</td></tr>
      <tr><td style="padding:24px;color:#2a1d14;font-size:15px;line-height:1.6">
        <p style="margin:0 0 12px">Hi ${escapeHtml(first)},</p>
        <p style="margin:0 0 12px">Thanks for reaching out! We received your estimate request and will reach out by <b>${escapeHtml(via)}</b> soon to schedule your free estimate.</p>
        <p style="margin:0 0 20px">Questions in the meantime? Call or text <a href="tel:${CONTACT.PHONE}" style="color:#c2462b;font-weight:bold">${CONTACT.PHONE_DISPLAY}</a>.</p>
        <p style="margin:0;color:#5a4636">— Alfonso Almaraz<br>Wild West Hardscapes LLC · NV Lic. #0096054</p>
      </td></tr>
    </table>
  </div>`;
  return { text, html };
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success.
  if (str(body.company_website, 200)) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: `Too many requests. Please call or text ${CONTACT.PHONE_DISPLAY}.` }, { status: 429 });
  }

  const { lead, error } = parse(body);
  if (!lead) return NextResponse.json({ error }, { status: 400 });

  const cfg = mailConfig();
  if (!cfg) {
    console.warn("[contact] GMAIL_USER / GMAIL_APP_PASSWORD not set — falling back to text message.");
    return NextResponse.json({ code: "not_configured" }, { status: 503 });
  }

  const mail = getTransporter(cfg.user, cfg.pass);
  const from = `"Wild West Hardscapes Website" <${cfg.user}>`;

  try {
    const owner = ownerEmail(lead);
    await mail.sendMail({
      from,
      to: cfg.to,
      replyTo: lead.email ? `"${lead.name.replace(/"/g, "")}" <${lead.email}>` : undefined,
      subject: `Estimate request from ${lead.name}${lead.special ? " (Winter Special)" : ""}`,
      text: owner.text,
      html: owner.html,
    });
  } catch (err) {
    console.error("[contact] failed to send owner email", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  if (lead.email && cfg.sendConfirmation) {
    const c = confirmationEmail(lead);
    // The request is already delivered; a failed confirmation shouldn't fail the submission.
    await mail
      .sendMail({ from: `"Wild West Hardscapes" <${cfg.user}>`, to: lead.email, subject: "We got your estimate request — Wild West Hardscapes", text: c.text, html: c.html })
      .catch((err) => console.error("[contact] failed to send confirmation", err));
  }

  return NextResponse.json({ ok: true });
}
