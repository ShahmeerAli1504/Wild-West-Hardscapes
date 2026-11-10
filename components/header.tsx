"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { CONTACT } from "@/lib/site-data";
import { btn, cn } from "@/lib/ui";

const LINKS = [
  { id: "story", label: "Our Story" },
  { id: "services", label: "Services" },
  { id: "specials", label: "Winter Specials" },
  { id: "work", label: "Our Work" },
  { id: "reels", label: "Videos" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQ" },
];

/** Logo / #top links scroll back to the very top and clear the hash. */
export function scrollToTop(e: MouseEvent) {
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight current section
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  return (
    <header
      id="top"
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-(--nav-h) border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled ? "bg-[rgba(15,12,10,.88)] backdrop-blur-[12px] border-line" : "border-transparent",
      )}
    >
      <div className="h-full w-[min(1320px,100%_-_32px)] mx-auto flex items-center gap-6">
        <a href="#top" onClick={scrollToTop} className="flex items-center gap-3 shrink-0" aria-label="Wild West Hardscapes home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/logo.jpg" alt="" width={52} height={52} className="w-[52px] h-[52px] rounded-full" />
          <span className="flex flex-col leading-none">
            <strong className="font-west font-normal text-[1.25rem] leading-[normal] text-bone tracking-[.02em]">Wild West</strong>
            <small className="font-head font-semibold text-[.7rem] leading-[normal] tracking-[.28em] uppercase text-gold mt-1">Hardscapes LLC</small>
          </span>
        </a>

        <nav className="flex gap-[22px] ml-auto upto-1240:hidden" aria-label="Main">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "relative whitespace-nowrap py-1.5 font-head font-medium text-[.88rem] leading-[normal] tracking-[.12em] uppercase hover:text-bone",
                "after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-rust after:origin-left after:transition-transform after:duration-[250ms] hover:after:scale-x-100",
                current === id ? "text-bone after:scale-x-100" : "text-bone-dim after:scale-x-0",
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex gap-2.5 upto-1240:hidden">
          <a className={btn("ghost", { size: "sm" })} href={`tel:${CONTACT.PHONE}`}>{CONTACT.PHONE_DISPLAY}</a>
          <a className={btn("rust", { size: "sm" })} href="#contact">Free Estimate</a>
        </div>

        <button
          className="hidden upto-1240:flex ml-auto w-11 h-11 bg-transparent border border-line rounded-[10px] py-[11px] px-2.5 flex-col justify-between"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((o) => !o)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "block h-0.5 bg-bone rounded-[2px] transition-[translate,rotate,opacity] duration-[250ms]",
                open && i === 0 && "translate-y-2 rotate-45",
                open && i === 1 && "opacity-0",
                open && i === 2 && "-translate-y-2 -rotate-45",
              )}
            />
          ))}
        </button>
      </div>

      <div
        id="mobileMenu"
        hidden={!open}
        className="absolute top-(--nav-h) inset-x-0 bg-[rgba(15,12,10,.97)] backdrop-blur-[12px] border-b border-line pt-2.5 px-4 pb-[22px] grid gap-1"
      >
        {LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setOpen(false)}
            className="py-3.5 px-1.5 font-head font-medium text-[1.05rem] leading-[normal] tracking-[.1em] uppercase border-b border-line"
          >
            {label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)} className={cn(btn("rust"), "mt-3.5")}>Get a Free Estimate</a>
      </div>
    </header>
  );
}
