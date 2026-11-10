"use client";

import { useEffect, useState } from "react";
import { CONTACT, SERVICES } from "@/lib/site-data";
import { cn } from "@/lib/ui";
import { ChatIcon, PhoneIcon } from "./icons";
import { useSite } from "./site-provider";

const h4 = "text-[.95rem] tracking-[.2em] uppercase text-gold mb-4";
const links = "list-none p-0 m-0 grid gap-[9px] text-bone-dim text-[.95rem] [&_a:hover]:text-bone";
const social = "w-10 h-10 rounded-full grid place-items-center border border-line font-head font-semibold text-[.78rem] leading-[normal] tracking-[.06em] hover:bg-rust hover:border-rust";

export function Footer() {
  const { setActiveService } = useSite();
  return (
    <footer className="bg-[#0a0807] border-t-4 border-rust pt-[70px] pb-[110px]">
      <div className="wrap grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 upto-900:grid-cols-2 upto-520:grid-cols-1">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/logo.jpg" alt="Wild West Hardscapes LLC" width={96} height={96} loading="lazy" className="rounded-full mb-3.5 w-24 h-24" />
          <p className="font-west font-normal text-[1.4rem] leading-[normal] text-gold mb-1.5">Your Vision. Our Craft.</p>
          <p className="text-bone-dim">Quality you can see, craftsmanship you can trust.</p>
        </div>
        <div>
          <h4 className={h4}>Services</h4>
          <ul className={links}>
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.id}><a href="#services" onClick={() => setActiveService(s.id)}>{s.name}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={h4}>Explore</h4>
          <ul className={links}>
            <li><a href="#specials">Winter Specials</a></li>
            <li><a href="#work">Recent Work</a></li>
            <li><a href="#reels">Reels</a></li>
            <li><a href="#process">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Free Estimate</a></li>
          </ul>
        </div>
        <div>
          <h4 className={h4}>Contact</h4>
          <ul className={links}>
            <li><a href={`tel:${CONTACT.PHONE}`}>{CONTACT.PHONE_DISPLAY}</a></li>
            <li><a href={`sms:${CONTACT.PHONE}`}>Text us</a></li>
            <li>Reno · Northern Nevada</li>
            <li>NV Lic. #0096054</li>
          </ul>
          <div className="flex gap-2.5 mt-[18px]">
            <a className={social} href={CONTACT.INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram">IG</a>
            <a className={social} href={CONTACT.TIKTOK} target="_blank" rel="noopener" aria-label="TikTok">TT</a>
            <a className={social} href={CONTACT.FACEBOOK} target="_blank" rel="noopener" aria-label="Facebook">FB</a>
          </div>
        </div>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-2.5 border-t border-line mt-[50px] pt-[22px] text-[#8d7c68] text-[.85rem] [&>p]:m-0">
        <p>© <span>{new Date().getFullYear()}</span> Wild West Hardscapes LLC. All rights reserved.</p>
        <p>Licensed &amp; Insured · Nevada State Contractor License #0096054</p>
      </div>
      <div className="wrap flex justify-center mt-[18px]">
        <a
          href="https://www.nexoradigital.live/"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 text-[#8d7c68] text-[.8rem] tracking-[.04em] hover:text-bone transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/nexora-logo.png" alt="Nexora Digital LLC logo" width={22} height={22} loading="lazy" className="w-[22px] h-[22px]" />
          Powered by Nexora Digital LLC
        </a>
      </div>
    </footer>
  );
}

export function ActionBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = "flex items-center justify-center gap-1.5 py-3 px-1.5 rounded-[13px] font-head font-semibold text-[.85rem] leading-[normal] tracking-[.1em] uppercase";
  const icon = "w-[18px] h-[18px] fill-none stroke-gold stroke-2 [stroke-linejoin:round]";
  return (
    <div
      aria-label="Quick actions"
      className={cn(
        "fixed z-60 left-3 right-3 bottom-3 hidden upto-760:grid grid-cols-[1fr_1fr_1.6fr] gap-1.5 p-1.5 bg-[rgba(15,12,10,.92)] backdrop-blur-[12px] border border-line rounded-[18px] shadow-deep transition-[translate] duration-[350ms]",
        visible ? "translate-y-0" : "translate-y-[140%]",
      )}
    >
      <a className={item} href={`tel:${CONTACT.PHONE}`}><PhoneIcon className={icon} />Call</a>
      <a className={item} href={`sms:${CONTACT.PHONE}`}><ChatIcon className={icon} />Text</a>
      <a className={cn(item, "bg-rust text-white")} href="#contact">Free Estimate</a>
    </div>
  );
}
