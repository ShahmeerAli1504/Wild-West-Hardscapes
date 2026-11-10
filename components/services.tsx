"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { CONTACT, SERVICES } from "@/lib/site-data";
import { btn, cn } from "@/lib/ui";
import { ServiceIcon } from "./icons";
import { Eyebrow, SectionHead } from "./phone-frame";
import { useSite } from "./site-provider";

export function Services() {
  const { activeService, setActiveService, pickService, openVideo } = useSite();
  const i = Math.max(0, SERVICES.findIndex((s) => s.id === activeService));
  const s = SERVICES[i];
  const num = `No. ${String(i + 1).padStart(2, "0")}`;

  const onTabClick = (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
    setActiveService(id);
    if (window.innerWidth <= 960) e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLOListElement>) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = SERVICES[(i + dir + SERVICES.length) % SERVICES.length];
    e.preventDefault();
    document.getElementById(`tab-${next.id}`)?.focus();
    setActiveService(next.id);
  };

  return (
    <section id="services" className="bg-pavers py-[120px]">
      <div className="wrap">
        <SectionHead>
          <Eyebrow num="No. 01">What We Build</Eyebrow>
          <h2>Every hardscape need, <em>one crew.</em></h2>
          <p>Pick a service to see what&apos;s included — then send it straight to your estimate request.</p>
        </SectionHead>

        <div className="grid grid-cols-[380px_1fr] gap-10 items-start upto-960:grid-cols-1">
          <ol
            role="tablist"
            aria-label="Services"
            onKeyDown={onKeyDown}
            className="list-none m-0 p-0 grid gap-1.5 sticky top-[calc(var(--nav-h)+20px)] upto-960:static upto-960:grid-flow-col upto-960:auto-cols-max upto-960:overflow-x-auto upto-960:pb-2 upto-960:snap-x upto-960:snap-mandatory upto-960:[scrollbar-width:thin] upto-960:-mx-4 upto-960:px-4"
          >
            {SERVICES.map((t) => {
              const sel = t.id === s.id;
              return (
                <li key={t.id} className="upto-960:snap-start">
                  <button
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-controls="svc-panel"
                    aria-selected={sel}
                    onClick={onTabClick(t.id)}
                    className={cn(
                      "w-full flex items-center gap-4 text-left border rounded-xl py-3.5 px-4 transition-[background-color,color,border-color] duration-200 upto-960:py-2.5 upto-960:px-3.5",
                      sel
                        ? "bg-ink-3 text-bone border-[rgba(194,70,43,.55)]"
                        : "bg-transparent text-bone-dim border-transparent hover:bg-ink-2 hover:text-bone upto-960:border-line",
                    )}
                  >
                    <span className={cn("w-[42px] h-[42px] shrink-0 rounded-[10px] grid place-items-center upto-960:w-[34px] upto-960:h-[34px]", sel ? "bg-rust text-white" : "bg-[rgba(243,227,204,.06)] text-gold")}>
                      <ServiceIcon name={t.icon} className="w-[22px] h-[22px]" />
                    </span>
                    <span>
                      <b className="block font-head font-semibold text-[1.08rem] leading-[normal] tracking-[.06em] uppercase">{t.name}</b>
                      <small className="text-[.85rem] opacity-75 upto-960:hidden">{t.short}</small>
                    </span>
                    <span className={cn("ml-auto font-[system-ui] transition-[opacity,translate] duration-200 upto-960:hidden", sel ? "opacity-100 translate-x-[3px] text-rust" : "opacity-0")}>→</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <article id="svc-panel" role="tabpanel" aria-live="polite" aria-labelledby={`tab-${s.id}`} className="bg-ink-2 border border-line rounded-[20px] overflow-hidden shadow-deep">
            <div key={`m-${s.id}`} className={cn("relative aspect-video overflow-hidden bg-ink-3", !s.img && "grid place-items-center bg-svc-art")}>
              {s.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.img} alt={`${s.name} by Wild West Hardscapes`} loading="lazy" className="w-full h-full object-cover animate-kenburns" />
              ) : (
                <ServiceIcon name={s.icon} className="w-[120px] h-[120px] text-gold opacity-90" />
              )}
              <span className="absolute top-4 left-4 font-west font-normal text-[1rem] leading-[normal] bg-[rgba(15,12,10,.75)] py-1.5 px-3 rounded-lg text-gold">{num}</span>
            </div>
            <div key={`b-${s.id}`} className="pt-8 px-9 pb-9 animate-fade-up upto-960:pt-6 upto-960:px-5 upto-960:pb-[26px]">
              <h3 className="text-[2rem] uppercase">{s.name}</h3>
              <p className="text-bone-dim text-[1.08rem]">{s.text}</p>
              <ul className="list-none p-0 mt-5 mb-7 grid grid-cols-2 gap-x-[22px] gap-y-2.5 upto-960:grid-cols-1">
                {s.points.map((p) => (
                  <li key={p} className="pl-[26px] relative before:content-['★'] before:absolute before:left-0 before:text-rust before:text-[.9rem] before:top-0.5">{p}</li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <a href="#contact" className={btn("rust", { wrapText: true })} onClick={() => pickService(s.name)}>{`Get an estimate for ${s.name}`}</a>
                {s.video ? (
                  <button type="button" className={btn("ghost", { wrapText: true })} onClick={() => openVideo(s.video!)}>▶ Watch the video</button>
                ) : (
                  <a href={`tel:${CONTACT.PHONE}`} className={btn("ghost", { wrapText: true })}>Call {CONTACT.PHONE_DISPLAY}</a>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
