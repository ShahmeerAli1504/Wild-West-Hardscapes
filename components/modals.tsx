"use client";

import { useEffect, useRef } from "react";
import { VIDEOS, posterSrc, videoSrc } from "@/lib/site-data";
import { btn, cn } from "@/lib/ui";
import { useSite } from "./site-provider";

/** Locks page scroll and returns focus to the opener when the modal closes. */
function useModal(open: boolean, focusRef: React.RefObject<HTMLElement | null>, restore: React.RefObject<boolean>) {
  useEffect(() => {
    if (!open) return;
    const last = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    focusRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      if (restore.current) last?.focus();
      restore.current = true;
    };
  }, [open, focusRef, restore]);
}

const roundBtn = "w-12 h-12 rounded-full border border-line text-bone text-[1.8rem] leading-none hover:bg-rust hover:border-rust";

export function Lightbox() {
  const { lightbox, closeLightbox, setLightboxIndex } = useSite();
  const closeRef = useRef<HTMLButtonElement>(null);
  const restore = useRef(true);
  useModal(!!lightbox, closeRef, restore);

  const count = lightbox?.items.length ?? 0;
  const step = (d: number) => lightbox && setLightboxIndex((lightbox.index + d + count) % count);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!lightbox) return null;
  const item = lightbox.items[lightbox.index];
  const nav = "absolute top-1/2 -translate-y-1/2 w-[52px] h-[52px] rounded-full border border-line bg-[rgba(15,12,10,.6)] text-bone text-[2rem] leading-none hover:bg-rust hover:border-rust";

  return (
    <div className="fixed inset-0 z-100 bg-[rgba(8,6,5,.95)] grid place-items-center py-[60px] px-4" onClick={(e) => e.target === e.currentTarget && closeLightbox()}>
      <button ref={closeRef} className={cn("absolute top-4 right-4 bg-transparent", roundBtn)} aria-label="Close" onClick={closeLightbox}>×</button>
      {count > 1 && <button className={cn(nav, "left-3.5")} aria-label="Previous" onClick={() => step(-1)}>‹</button>}
      <figure className="m-0 max-w-[min(1100px,100%)] text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.src} alt={item.cap} className="max-h-[78vh] w-auto h-auto object-contain mx-auto rounded-[10px]" />
        <figcaption className="mt-3.5 font-head font-medium text-[.9rem] leading-[normal] tracking-[.12em] uppercase text-bone-dim">{item.cap}</figcaption>
      </figure>
      {count > 1 && <button className={cn(nav, "right-3.5")} aria-label="Next" onClick={() => step(1)}>›</button>}
    </div>
  );
}

export function VideoPlayer() {
  const { videoId, closeVideo } = useSite();
  const closeRef = useRef<HTMLButtonElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const restore = useRef(true);
  const v = VIDEOS.find((x) => x.id === videoId);
  useModal(!!v, closeRef, restore);

  useEffect(() => {
    if (!v) return;
    // pause anything playing on the page
    document.querySelectorAll("video").forEach((o) => { if (o !== vidRef.current) o.pause(); });
    vidRef.current?.play().catch(() => {});
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeVideo();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [v, closeVideo]);

  if (!v) return null;
  const stacked = v.orient !== "port";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Project video"
      className="fixed inset-0 z-110 bg-[rgba(8,6,5,.95)] grid place-items-center py-5 px-4"
      onClick={(e) => e.target === e.currentTarget && closeVideo()}
    >
      <div className={cn("relative flex items-center max-w-[1100px] w-full justify-center upto-760:flex-col upto-760:gap-3.5", stacked ? "flex-col gap-4" : "gap-7")}>
        <button ref={closeRef} className={cn("fixed top-3.5 right-3.5 z-2 bg-[rgba(15,12,10,.7)]", roundBtn)} aria-label="Close video" onClick={closeVideo}>×</button>
        <video
          ref={vidRef}
          key={v.id}
          src={videoSrc(v.id)}
          poster={posterSrc(v.id)}
          controls
          playsInline
          preload="metadata"
          className={cn(
            "max-h-[86vh] rounded-[14px] bg-black shadow-deep upto-760:max-h-[70vh]",
            v.orient === "land" ? "max-w-[min(100%,820px)]" : v.orient === "square" ? "max-w-[min(100%,640px)]" : "max-w-[min(100%,480px)]",
          )}
        />
        <div className={stacked ? "max-w-[820px] text-center" : "max-w-[340px] upto-760:text-center"}>
          <h3 className="text-[1.6rem] uppercase upto-760:text-[1.2rem]">{v.title}</h3>
          <p className="text-bone-dim">{v.desc}</p>
          <a href="#contact" className={btn("rust", { size: "sm" })} onClick={() => { restore.current = false; closeVideo(); }}>Get a free estimate</a>
        </div>
      </div>
    </div>
  );
}
