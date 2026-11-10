"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { BUDGETS, CONTACT, CONTACT_PREFS, SERVICE_NAMES, TIMELINES } from "@/lib/site-data";
import { btn, cn } from "@/lib/ui";
import { PhoneIcon } from "./icons";
import { Eyebrow } from "./phone-frame";
import { useSite, type EstimateForm } from "./site-provider";

const fieldLabel = "font-head font-semibold text-[.8rem] leading-[normal] tracking-[.14em] uppercase text-[#5a4636] p-0 mb-[7px]";
const control = (bad = false) =>
  cn(
    "w-full font-body font-normal text-[1rem] leading-[normal] text-parch-ink border-[1.5px] rounded-[10px] py-[.8em] px-[.9em] transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-rust focus:shadow-[0_0_0_4px_rgba(194,70,43,.15)]",
    bad ? "border-rust bg-[#fff0ec]" : "border-[#d8c4a6] bg-[#fffaf2]",
  );
const field = "grid gap-[7px] border-0 p-0 m-0 min-w-0";
const pill = "peer-focus-visible:outline-3 peer-focus-visible:outline-solid peer-focus-visible:outline-rust";

type Errors = { name?: boolean; phone?: boolean; email?: boolean };
type Done = { sent: boolean; first: string; pref: string; sms: string } | null;

const summary = (d: EstimateForm) =>
  [
    "New estimate request — Wild West Hardscapes",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    d.email && `Email: ${d.email}`,
    d.location && `Location: ${d.location}`,
    d.services.length && `Services: ${d.services.join(", ")}`,
    d.budget && `Budget: ${d.budget}`,
    d.timeline && `Timeline: ${d.timeline}`,
    `Winter Special: ${d.special ? "Yes" : "No"}`,
    `Best contact: ${d.contact_pref}`,
    d.message && `Notes: ${d.message}`,
  ].filter(Boolean).join("\n");

export function Contact() {
  const { form, setForm } = useSite();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "" | "error"; text: string; withPhone?: boolean }>({ kind: "", text: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done>(null);
  const refs = { name: useRef<HTMLInputElement>(null), phone: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null) };

  const set = <K extends keyof EstimateForm>(k: K, v: EstimateForm[K]) => setForm((f) => ({ ...f, [k]: v }));
  const onText = (k: "name" | "phone" | "email" | "location" | "message" | "budget" | "timeline" | "company_website") =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      set(k, e.target.value);
      if (k === "name" || k === "phone" || k === "email") setErrors((x) => ({ ...x, [k]: false }));
    };
  const toggleService = (name: string, on: boolean) =>
    setForm((f) => ({ ...f, services: on ? [...f.services, name] : f.services.filter((s) => s !== name) }));

  const finish = (sent: boolean) => {
    const d = { ...form, name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), location: form.location.trim(), message: form.message.trim() };
    const sep = /iPhone|iPad|Mac/.test(navigator.userAgent) ? "&" : "?";
    setDone({ sent, first: d.name.split(" ")[0], pref: d.contact_pref.toLowerCase(), sms: `sms:${CONTACT.PHONE}${sep}body=${encodeURIComponent(summary(d))}` });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.company_website) return; // honeypot
    const badName = !form.name.trim();
    const badPhone = form.phone.replace(/\D/g, "").length < 10;
    const badEmail = !!form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    setErrors({ name: badName, phone: badPhone, email: badEmail });
    if (badName || badPhone || badEmail) {
      setStatus({ kind: "error", text: badName ? "Please add your name." : badPhone ? "Please add a valid phone number." : "Please check your email address." });
      (badName ? refs.name : badPhone ? refs.phone : refs.email).current?.focus();
      return;
    }
    setStatus({ kind: "", text: "" });
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) return finish(true);
      const body = await res.json().catch(() => ({}));
      // Email isn't connected yet: fall back to a pre-filled text message to the owner.
      if (res.status === 503 && body?.code === "not_configured") return finish(false);
      if (res.status === 400 && body?.error) {
        setStatus({ kind: "error", text: body.error });
        return;
      }
      throw new Error(String(res.status));
    } catch {
      setStatus({ kind: "error", text: "Something went wrong sending your request. Please call or text", withPhone: true });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-contact py-[120px]">
      <div className="wrap grid grid-cols-[.85fr_1.15fr] gap-14 items-start upto-900:grid-cols-1">
        <div className="reveal [&>p]:text-bone-dim [&>p]:text-[1.08rem]">
          <Eyebrow num="No. 07">Free Estimate</Eyebrow>
          <h2>Let&apos;s get your outdoor space <em>ready.</em></h2>
          <p>Tell us a little about your project and we&apos;ll reach out to schedule your free estimate. Prefer to talk? Call or text Alfonso directly.</p>

          <a className="flex items-center gap-[18px] mt-[30px] mb-[18px]" href={`tel:${CONTACT.PHONE}`}>
            <span className="w-16 h-16 rounded-full bg-rust grid place-items-center animate-ring shrink-0" aria-hidden="true">
              <PhoneIcon className="w-7 h-7 fill-none stroke-white stroke-2 [stroke-linejoin:round]" />
            </span>
            <span className="font-head font-bold text-[length:clamp(2rem,4vw,2.8rem)] leading-none tracking-[.02em]">
              <small className="block font-head font-medium text-[.8rem] leading-[normal] tracking-[.22em] uppercase text-gold mb-1.5">Call or text</small>
              {CONTACT.PHONE_DISPLAY}
            </span>
          </a>
          <div className="flex flex-wrap gap-2.5">
            <a className={btn("ghost")} href={`sms:${CONTACT.PHONE}`}>Send a text</a>
            <a className={btn("ghost")} href={CONTACT.INSTAGRAM} target="_blank" rel="noopener">DM on Instagram</a>
          </div>
          <p className="mt-[26px]">Call <b>Alfonso Almaraz</b> · NV Lic. #0096054</p>
        </div>

        <form
          id="estimateForm"
          noValidate
          onSubmit={onSubmit}
          className="reveal bg-bone text-parch-ink rounded-[22px] p-[34px] shadow-deep grid gap-[18px] upto-560:pt-6 upto-560:px-[18px] upto-560:pb-6 upto-560:rounded-[18px]"
        >
          {done ? (
            <div className="text-center pt-5 px-1.5 pb-5 [&_p]:text-[#5a4636]">
              <p className="font-west font-normal text-[2.2rem] leading-[normal] !text-rust-d mb-2">
                {done.sent ? `Thank you, ${done.first}!` : `Almost there, ${done.first}!`}
              </p>
              <p>
                {done.sent
                  ? `Your request is in. We'll reach out by ${done.pref} soon to schedule your free estimate.`
                  : "Tap below to send your project details straight to Alfonso by text — everything is filled in for you."}
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center mt-[18px]">
                {!done.sent && <a className={btn("rust")} href={done.sms}>Send by Text</a>}
                <a className={btn(done.sent ? "rust" : "ghostDark")} href={`tel:${CONTACT.PHONE}`}>Call {CONTACT.PHONE_DISPLAY}</a>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-[1.7rem] uppercase mb-1">Request a free estimate</h3>
                <p className="m-0 text-[#6b5644] text-[.95rem]">Takes about a minute. <span className="text-rust">*</span> required</p>
              </div>

              <input type="text" name="company_website" value={form.company_website} onChange={onText("company_website")} className="absolute -left-[9999px] w-px h-px opacity-0" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="grid grid-cols-2 gap-4 upto-560:grid-cols-1">
                <label className={field}>
                  <span className={fieldLabel}>Full name <span className="text-rust">*</span></span>
                  <input ref={refs.name} type="text" name="name" autoComplete="name" required value={form.name} onChange={onText("name")} className={control(errors.name)} aria-invalid={errors.name || undefined} />
                </label>
                <label className={field}>
                  <span className={fieldLabel}>Phone <span className="text-rust">*</span></span>
                  <input ref={refs.phone} type="tel" name="phone" autoComplete="tel" inputMode="tel" required value={form.phone} onChange={onText("phone")} className={control(errors.phone)} aria-invalid={errors.phone || undefined} />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4 upto-560:grid-cols-1">
                <label className={field}>
                  <span className={fieldLabel}>Email</span>
                  <input ref={refs.email} type="email" name="email" autoComplete="email" value={form.email} onChange={onText("email")} className={control(errors.email)} aria-invalid={errors.email || undefined} />
                </label>
                <label className={field}>
                  <span className={fieldLabel}>Project city / address</span>
                  <input type="text" name="location" placeholder="e.g. Reno, Sparks…" autoComplete="street-address" value={form.location} onChange={onText("location")} className={control()} />
                </label>
              </div>

              <fieldset className={field}>
                <legend className={fieldLabel}>What are you interested in?</legend>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_NAMES.map((name) => (
                    <label key={name} className="relative">
                      <input type="checkbox" name="services" value={name} checked={form.services.includes(name)} onChange={(e) => toggleService(name, e.target.checked)} className="peer absolute opacity-0 inset-0 cursor-pointer" />
                      <span className={cn("inline-block py-[.55em] px-[.95em] rounded-full border-[1.5px] border-[#d1bb9a] bg-[#fffaf2] font-head font-medium text-[.85rem] leading-[normal] tracking-[.06em] uppercase cursor-pointer transition-all duration-150 select-none peer-checked:bg-parch-ink peer-checked:text-parch peer-checked:border-parch-ink peer-checked:before:content-['✓_'] peer-checked:before:text-gold peer-focus-visible:outline-offset-2", pill)}>
                        {name}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid grid-cols-2 gap-4 upto-560:grid-cols-1">
                <label className={field}>
                  <span className={fieldLabel}>Estimated budget</span>
                  <select name="budget" value={form.budget} onChange={onText("budget")} className={control()}>
                    <option value="">Select…</option>
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
                <label className={field}>
                  <span className={fieldLabel}>Timeline</span>
                  <select name="timeline" value={form.timeline} onChange={onText("timeline")} className={control()}>
                    <option value="">Select…</option>
                    {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
              </div>

              <label className="flex gap-3 items-start bg-[#e9f0f6] border-[1.5px] border-dashed border-[#9fb4c8] rounded-xl py-3.5 px-4 cursor-pointer text-[.98rem]">
                <input type="checkbox" name="special" checked={form.special} onChange={(e) => set("special", e.target.checked)} className="w-5 h-5 accent-rust mt-0.5 mr-[3px] mb-[3px] ml-1 shrink-0" />
                <span>I&apos;m interested in a <b>Winter Special</b> (free upgrade / free fire pit)</span>
              </label>

              <label className={field}>
                <span className={fieldLabel}>Tell us about your project</span>
                <textarea name="message" rows={4} placeholder="Size of the area, what you'd like, colors you love…" value={form.message} onChange={onText("message")} className={cn(control(), "resize-y min-h-[110px]")} />
              </label>

              <fieldset className={field}>
                <legend className={fieldLabel}>Best way to reach you</legend>
                <div className="inline-flex bg-[#ead9bf] rounded-full p-1 gap-1">
                  {CONTACT_PREFS.map((p) => (
                    <label key={p} className="relative">
                      <input type="radio" name="contact_pref" value={p} checked={form.contact_pref === p} onChange={() => set("contact_pref", p)} className="peer absolute opacity-0 inset-0 cursor-pointer" />
                      <span className={cn("block py-[.5em] px-[1.3em] rounded-full font-head font-semibold text-[.85rem] leading-[normal] tracking-[.1em] uppercase cursor-pointer peer-checked:bg-parch-ink peer-checked:text-parch", pill)}>{p}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button className={btn("rust", { size: "lg", block: true })} type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send My Request"}
              </button>
              <p className={cn("m-0 font-semibold min-h-[1.4em]", status.kind === "error" && "text-rust-d")} role="status" aria-live="polite">
                {status.text}
                {status.withPhone && <> <a className="underline" href={`tel:${CONTACT.PHONE}`}>{CONTACT.PHONE_DISPLAY}</a>.</>}
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
