"use client";

import { useRef } from "react";
import { CONTACT } from "@/lib/site-data";
import { btn } from "@/lib/ui";
import { PhoneFrame } from "./phone-frame";
import { useAutoplayInView } from "./use-autoplay";

export function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  useAutoplayInView(video);

  return (
    <section className="relative min-h-svh flex items-center pt-[calc(var(--nav-h)+40px)] pb-20 overflow-hidden isolate">
      <div
        className="absolute inset-0 bg-cover bg-[center_60%] -z-2 scale-[1.05]"
        style={{ backgroundImage: "url('/assets/img/patio-firepit-hero.jpg')" }}
        aria-hidden="true"
      />
      <div className="hero-shade absolute inset-0 -z-1" aria-hidden="true" />

      <div className="w-[min(1280px,100%_-_32px)] mx-auto grid grid-cols-[1.1fr_.9fr] gap-12 items-center upto-900:grid-cols-1">
        <div className="reveal">
          <p className="inline-block font-head font-semibold text-[.78rem] leading-[normal] tracking-[.22em] uppercase text-gold border-[1.5px] border-dashed border-[rgba(227,170,76,.55)] py-[.55em] px-[1em] rounded-md mb-[26px]">
            Reno · Northern Nevada · NV Lic. #0096054
          </p>
          <h1 className="text-[length:clamp(2.6rem,6.4vw,5.4rem)] uppercase font-bold leading-[.98]">
            <span className="block font-west font-normal text-[.62em] leading-[1.1] normal-case text-rust tracking-[.01em] mb-[.1em]">Transforming</span>
            Outdoor Spaces into <em>Lasting Impressions</em>
          </h1>
          <p className="text-[1.15rem] text-bone-dim max-w-[36em] mt-[22px] mb-[30px]">
            Paver patios, driveways, retaining walls, fire pits, water features, turf and lighting built right into your pavers — complete backyard transformations crafted by a licensed &amp; insured local crew.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a className={`${btn("rust", { size: "lg" })} upto-520:flex-[1_1_100%]`} href="#contact">Get My Free Estimate</a>
            <a className={`${btn("ghost", { size: "lg" })} upto-520:flex-[1_1_100%]`} href={`sms:${CONTACT.PHONE}`}>Text Alfonso</a>
          </div>
          <ul className="list-none p-0 mt-7 mb-0 flex flex-wrap gap-x-[22px] gap-y-2.5 font-head font-medium text-[.9rem] leading-[normal] tracking-[.08em] uppercase text-bone-dim" aria-label="Highlights">
            <li>✓ Free estimates</li>
            <li>✓ Licensed &amp; insured</li>
            <li>✓ Cambridge Cobble pavers</li>
          </ul>
        </div>

        <div className="reveal relative h-[600px] upto-900:h-[460px] upto-900:max-w-[520px] upto-900:w-full upto-900:mx-auto upto-520:h-[380px]">
          <figure className="absolute left-0 top-10 w-[74%] m-0 rounded-[14px] overflow-hidden shadow-deep rotate-[-3deg] border-[6px] border-bone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/img/mountain-patio.jpg" alt="Finished paver patio with fire pit and seat wall below the mountains" loading="eager" className="aspect-[716/665] object-cover w-full" />
            <figcaption className="absolute bottom-0 inset-x-0 pt-[26px] px-3.5 pb-2.5 bg-[linear-gradient(transparent,rgba(0,0,0,.75))] font-head font-medium text-[.8rem] leading-[normal] tracking-[.14em] uppercase">
              Fire pit patio · Reno foothills
            </figcaption>
          </figure>
          <PhoneFrame className="absolute right-0 bottom-0 w-[46%] max-w-[280px] rotate-[4deg]">
            <video
              ref={video}
              src="/assets/video/reel-cambridge-firepit.mp4"
              poster="/assets/img/poster-reel-cambridge.jpg"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              aria-label="Wild West Hardscapes project reel"
            />
          </PhoneFrame>
          <div
            className="absolute left-[6%] bottom-10 w-32 h-32 rounded-full bg-rust text-white grid place-content-center text-center shadow-[0_0_0_6px_var(--color-ink),0_0_0_8px_var(--color-rust),0_24px_60px_-24px_rgba(0,0,0,.7)] [transform:rotate(-12deg)] font-head uppercase leading-[1.05] animate-spin-in upto-520:w-[104px] upto-520:h-[104px] upto-520:bottom-4"
            aria-hidden="true"
          >
            <span className="text-[.7rem] tracking-[.25em]">Built</span>
            <strong className="font-west font-normal text-[1.25rem] leading-[normal] normal-case my-0.5">to Last</strong>
            <span className="text-[.7rem] tracking-[.25em]">★ ★ ★</span>
          </div>
        </div>
      </div>
    </section>
  );
}
