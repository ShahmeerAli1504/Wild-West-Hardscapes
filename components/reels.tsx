"use client";

import { useRef, useState } from "react";
import { CONTACT, VIDEOS, VIDEO_FILTERS, TAG_LABEL, posterSrc, videoSrc } from "@/lib/site-data";
import { cn } from "@/lib/ui";
import { Filters } from "./filters";
import { Eyebrow, PhoneFrame } from "./phone-frame";
import { useSite } from "./site-provider";
import { useAutoplayInView } from "./use-autoplay";

const REELS = [
  { src: "/assets/video/reel-backyard-makeover.mp4", poster: "/assets/img/poster-reel-backyard.jpg", title: "Complete Backyard Makeover", sub: "Pavers · seat walls · fire table · lawn" },
  { src: "/assets/video/reel-cambridge-firepit.mp4", poster: "/assets/img/poster-reel-cambridge.jpg", title: "Cambridge Cobble + Free Fire Pit", sub: "Patios, borders & fire features" },
];

const SOCIALS = [
  {
    href: CONTACT.INSTAGRAM, name: "Instagram", handle: "@wildwesthardscapes",
    icon: (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></>),
  },
  {
    href: CONTACT.TIKTOK, name: "TikTok", handle: "@wildwesthardscape",
    icon: (<><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.5 2.6 2.4 4.4 5 4.6" /></>),
  },
  {
    href: CONTACT.FACEBOOK, name: "Facebook", handle: "Wild West Hardscapes",
    icon: (<path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6.5v3.5H9V21h3.5v-8.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" />),
  },
];

function Reel({ reel, offset, soundOn, onToggle }: { reel: (typeof REELS)[number]; offset: boolean; soundOn: boolean; onToggle: (v: HTMLVideoElement) => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplayInView(ref);
  return (
    <figure className={cn("reveal m-0", offset && "mt-[70px] upto-480:mt-10")}>
      <PhoneFrame className="relative cursor-pointer" onClick={() => ref.current && onToggle(ref.current)}>
        <video ref={ref} src={reel.src} poster={reel.poster} muted loop playsInline preload="none" />
        <button
          className="absolute right-[18px] bottom-[18px] z-3 w-[42px] h-[42px] rounded-full border-0 bg-[rgba(15,12,10,.75)] text-white text-[1.05rem] backdrop-blur-[6px]"
          aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
        >
          {soundOn ? "🔊" : "🔇"}
        </button>
      </PhoneFrame>
      <figcaption className="mt-4 text-bone-dim text-[.92rem]">
        <b className="block font-head font-semibold text-[1.05rem] leading-[normal] tracking-[.06em] uppercase text-bone">{reel.title}</b>
        {reel.sub}
      </figcaption>
    </figure>
  );
}

export function Reels() {
  const [soundIdx, setSoundIdx] = useState<number | null>(null);

  // only one reel with sound at a time
  const toggle = (i: number) => (v: HTMLVideoElement) => {
    const turnOn = v.muted;
    v.closest("[data-reels]")?.querySelectorAll("video").forEach((o) => { o.muted = true; });
    v.muted = !turnOn;
    if (turnOn) {
      v.play().catch(() => {});
      setSoundIdx(i);
    } else setSoundIdx(null);
  };

  return (
    <section
      id="reels"
      className="relative py-[120px] overflow-hidden bg-[linear-gradient(160deg,#1e130d_0%,var(--color-ink)_60%)] before:content-['WILD_WEST'] before:absolute before:right-[-2%] before:top-1/2 before:[transform:translateY(-50%)_rotate(-90deg)] before:origin-right before:font-west before:font-normal before:text-[length:clamp(5rem,12vw,10rem)] before:leading-[normal] before:text-[rgba(243,227,204,.03)] before:whitespace-nowrap before:pointer-events-none"
    >
      <div className="wrap grid grid-cols-[.9fr_1.1fr] gap-[60px] items-center upto-900:grid-cols-1">
        <div className="reveal [&>p]:text-bone-dim [&>p]:text-[1.1rem]">
          <Eyebrow num="No. 04">Watch the Reels</Eyebrow>
          <h2>See the craft <em>in motion.</em></h2>
          <p>Walk through finished projects the way our customers see them. Tap a reel for sound.</p>
          <div className="grid gap-3 mt-[30px] max-w-[380px]">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3.5 py-3.5 px-4 border border-line rounded-[14px] bg-[rgba(243,227,204,.03)] transition-[border-color,translate,background-color] duration-200 hover:border-rust hover:translate-x-1 hover:bg-[rgba(194,70,43,.08)]"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[26px] h-[26px] fill-none stroke-gold stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] shrink-0">{s.icon}</svg>
                <span className="flex flex-col text-[.92rem] text-bone-dim leading-[1.3]">
                  <b className="font-head font-semibold text-[1rem] leading-[normal] tracking-[.08em] uppercase text-bone">{s.name}</b>
                  {s.handle}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div data-reels className="grid grid-cols-2 gap-7 upto-900:max-w-[560px] upto-480:gap-3.5">
          {REELS.map((r, i) => (
            <Reel key={r.src} reel={r} offset={i === 1} soundOn={soundIdx === i} onToggle={toggle(i)} />
          ))}
        </div>
      </div>

      <VideoLibrary />
    </section>
  );
}

function VideoLibrary() {
  const { openVideo } = useSite();
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="wrap mt-[110px] relative" id="videos">
      <div className="reveal flex flex-wrap justify-between items-end gap-x-10 gap-y-2.5 mb-[26px]">
        <div>
          <Eyebrow num="No. 04b">Project Video Library</Eyebrow>
          <h2 className="m-0">Walk through <em>real jobs.</em></h2>
        </div>
        <p className="max-w-[420px] text-bone-dim m-0">Driveways, patios, walls, turf and lighting from start to finish. Tap any video to watch it with sound.</p>
      </div>

      <Filters items={VIDEO_FILTERS} active={filter} onChange={setFilter} label="Filter videos" />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[22px] upto-560:grid-cols-2 upto-560:gap-3">
        {VIDEOS.map((v) => {
          const hidden = filter !== "all" && !v.tags.includes(filter);
          const previewing = preview === v.id;
          return (
            <article
              key={v.id}
              className={cn(
                "reveal group bg-ink-2 border border-line rounded-2xl overflow-hidden flex-col transition-[border-color,translate] duration-[250ms] hover:border-[rgba(194,70,43,.6)] hover:-translate-y-1",
                hidden ? "hidden" : "flex",
              )}
            >
              <button
                onClick={() => { setPreview(null); openVideo(v.id); }}
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setPreview(v.id); }}
                onPointerLeave={() => setPreview((p) => (p === v.id ? null : p))}
                aria-label={`Play video: ${v.title}`}
                className="relative aspect-[4/5] p-0 border-0 bg-black overflow-hidden block w-full after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(transparent_55%,rgba(0,0,0,.6))] after:pointer-events-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={posterSrc(v.id)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105" />
                {previewing && (
                  <video src={videoSrc(v.id)} muted loop playsInline autoPlay aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <span
                  className={cn(
                    "absolute z-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[62px] h-[62px] rounded-full bg-[rgba(194,70,43,.92)] grid place-items-center shadow-[0_10px_30px_-8px_rgba(0,0,0,.7)] transition-[scale,opacity] duration-[250ms] group-hover:scale-[1.08] upto-560:w-[46px] upto-560:h-[46px]",
                    previewing && "opacity-0",
                  )}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] fill-white ml-[3px]"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="absolute z-2 right-2.5 bottom-2.5 bg-[rgba(15,12,10,.85)] text-bone font-head font-semibold text-[.75rem] leading-[normal] tracking-[.08em] py-[.3em] px-[.6em] rounded-md">{v.dur}</span>
              </button>
              <div className="pt-4 px-[18px] pb-[18px] flex flex-col flex-1 upto-560:p-3">
                <h3 className="text-[1.08rem] uppercase tracking-[.03em] mb-1.5 upto-560:text-[.9rem]">{v.title}</h3>
                <p className="text-bone-dim text-[.92rem] leading-[1.5] mb-3 upto-560:hidden">{v.desc}</p>
                <ul className="list-none p-0 mt-auto mb-0 mx-0 flex flex-wrap gap-1.5">
                  {v.tags.map((t) => (
                    <li key={t} className="font-head font-medium text-[.68rem] leading-[normal] tracking-[.12em] uppercase text-gold border border-[rgba(227,170,76,.35)] rounded-full py-[.3em] px-[.7em]">{TAG_LABEL[t] || t}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
