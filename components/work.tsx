"use client";

import { useState } from "react";
import { GALLERY, GALLERY_FILTERS } from "@/lib/site-data";
import { cn } from "@/lib/ui";
import { Filters } from "./filters";
import { Eyebrow, SectionHead } from "./phone-frame";
import { useSite } from "./site-provider";

export function Work() {
  const { openLightbox } = useSite();
  const [filter, setFilter] = useState("all");
  const visible = GALLERY.filter((p) => filter === "all" || p.tags.includes(filter));

  return (
    <section id="work" className="bg-pavers py-[120px]">
      <div className="wrap">
        <SectionHead>
          <Eyebrow num="No. 03">Recent Work</Eyebrow>
          <h2>Backyards with a <em>glow-up.</em></h2>
          <p>From the putting green to the pavers and rock details, every little touch makes a difference.</p>
        </SectionHead>

        <Filters items={GALLERY_FILTERS} active={filter} onChange={setFilter} label="Filter projects" />

        <div className="columns-[3_280px] gap-x-4">
          {GALLERY.map((p) => {
            const hidden = !visible.includes(p);
            return (
              <button
                key={p.src}
                aria-label={`View: ${p.cap}`}
                onClick={() => openLightbox(visible.map((v) => ({ src: v.full || v.src, cap: v.cap })), visible.indexOf(p))}
                className={cn(
                  "reveal group break-inside-avoid mt-0 mb-4 relative rounded-xl overflow-hidden cursor-zoom-in bg-ink-3 border-0 p-0 w-full text-inherit text-left transition-[opacity,translate] duration-300",
                  hidden ? "hidden" : "block",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} width={p.w} height={p.h} alt={p.cap} loading="lazy" className="w-full h-auto transition-transform duration-[600ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 pt-9 px-4 pb-3.5 bg-[linear-gradient(transparent,rgba(0,0,0,.85))] font-head font-medium text-[.85rem] leading-[normal] tracking-[.12em] uppercase translate-y-2 opacity-90 transition-[translate,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.cap}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
