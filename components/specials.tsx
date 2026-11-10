"use client";

import { btn, cn } from "@/lib/ui";
import { Eyebrow, SectionHead } from "./phone-frame";
import { useSite } from "./site-provider";

const poster =
  "reveal bg-poster text-parch-ink rounded-md pt-[30px] px-7 pb-7 relative shadow-deep outline-2 outline-solid outline-parch-ink -outline-offset-[12px] upto-680:rotate-none";
const posterTop = "text-center border-b-2 border-dashed border-[rgba(42,29,20,.35)] pb-4 mb-4";
const tag = "inline-block bg-rust text-white font-head font-semibold text-[.75rem] leading-[normal] tracking-[.2em] uppercase py-[.45em] px-[.9em] rounded-[3px] rotate-[-2deg]";
const wanted = "font-west font-normal text-[length:clamp(2.2rem,4vw,3rem)] leading-none mt-3.5 mb-2 text-parch-ink";
const sub = "font-body font-medium text-[1.02rem] leading-[1.35] m-0";
const choiceBox = "bg-[rgba(42,29,20,.08)] border-[1.5px] border-[rgba(42,29,20,.25)] rounded-[10px] py-3 px-2 font-head font-semibold text-[.92rem] leading-[1.25] uppercase tracking-[.03em]";
const plusLine = "before:content-[''] before:flex-1 before:h-[1.5px] before:bg-current before:opacity-35 after:content-[''] after:flex-1 after:h-[1.5px] after:bg-current after:opacity-35";

export function Specials() {
  const { claimOffer, openLightbox } = useSite();
  const flyer = "/assets/img/winter-specials-flyer.jpg";

  return (
    <section id="specials" className="relative py-[120px] overflow-hidden bg-[linear-gradient(180deg,#0f1824_0%,var(--color-frost)_55%,#0f1824_100%)]">
      <div className="absolute inset-0 pointer-events-none opacity-55 bg-snow animate-snow" aria-hidden="true" />
      <div className="wrap">
        <SectionHead light>
          <Eyebrow num="No. 02">Winter Specials ❄</Eyebrow>
          <h2>Get your project done <em>before spring.</em></h2>
          <p>Plan now, beat the spring rush, and enjoy your new outdoor space the moment the weather turns. Limited spots — once they&apos;re gone, the offer ends.</p>
        </SectionHead>

        <div className="grid grid-cols-[1.05fr_1fr_.8fr] gap-7 items-start relative upto-1000:grid-cols-2 upto-680:grid-cols-1">
          <article className={cn(poster, "rotate-[-1deg]")}>
            <div className={posterTop}>
              <span className={tag}>Only 10 Spots</span>
              <p className={wanted}>Free Upgrade</p>
              <p className={sub}>Spend <strong>$13,000+</strong> on a new backyard install or remodel</p>
            </div>
            <div className="text-center">
              <p className="font-head font-medium text-[.8rem] leading-[normal] tracking-[.3em] uppercase m-0 opacity-70">and receive</p>
              <p className="font-head font-bold text-[3.2rem] leading-none text-rust-d mt-1 mb-0">800 Sq. Ft.</p>
              <p className="font-head font-semibold text-[1.25rem] leading-[normal] uppercase tracking-[.05em] mt-0.5 mb-0">Cambridge Cobble Pavers</p>
              <p className="text-[.9rem] opacity-75 mt-0.5 mb-3.5">Your choice of color</p>
              <div className={cn("flex items-center gap-2.5 font-head font-semibold text-[.78rem] leading-[normal] tracking-[.2em] uppercase mb-3", plusLine)}>
                <span>PLUS choose one</span>
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mb-[22px]">
                <div className={choiceBox}><b className="block text-[1.6rem] mb-1">🔥</b>Free Fire Pit Installation</div>
                <em className="font-west font-normal text-[1.1rem] leading-[normal] not-italic">or</em>
                <div className={choiceBox}><b className="block text-[1.6rem] mb-1">💡</b>Free Install of 6 Paver Lights</div>
              </div>
            </div>
            <a href="#contact" className={btn("rust", { block: true })} onClick={() => claimOffer("upgrade")}>Reserve My Spot</a>
          </article>

          <article className={cn(poster, "rotate-[1.2deg] mt-10 upto-680:mt-0")}>
            <div className={posterTop}>
              <span className={tag}>First 10 Customers</span>
              <p className={wanted}>Free Fire Pit</p>
              <p className={sub}>Giveaway — book an 800 sq. ft. Cambridge Cobble paver patio</p>
            </div>
            <ul className="list-none p-0 mt-0 mb-[22px] grid gap-2.5">
              {[
                "800 sq. ft. premium Cambridge Cobble pavers",
                "Choose your favorite color",
                "Fire pit installed free as part of your project",
                "Expert installation",
                "Perfect for entertaining family & friends",
              ].map((li) => (
                <li key={li} className="pl-[30px] relative font-medium before:content-['✓'] before:absolute before:left-0 before:top-0 before:w-5 before:h-5 before:bg-rust before:text-white before:rounded-full before:grid before:place-items-center before:text-[.75rem] before:font-bold">
                  {li}
                </li>
              ))}
            </ul>
            <a href="#contact" className={btn("dark", { block: true })} onClick={() => claimOffer("firepit")}>Claim the Fire Pit Offer</a>
          </article>

          <aside className="reveal text-[#dbe5ef] upto-1000:col-span-full upto-1000:grid upto-1000:grid-cols-[200px_1fr] upto-1000:gap-6 upto-1000:items-center upto-680:grid-cols-1">
            <button
              className="group block w-full p-0 border-0 bg-transparent rounded-xl overflow-hidden relative shadow-deep upto-680:max-w-[320px]"
              onClick={() => openLightbox([{ src: flyer, cap: "Wild West Hardscapes — Winter Specials flyer" }])}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flyer} alt="Wild West Hardscapes Winter Specials flyer" width={1024} height={1536} loading="lazy" className="w-full h-auto aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              <span className="absolute top-3 right-3 bg-[rgba(15,12,10,.85)] text-bone font-head font-semibold text-[.78rem] leading-[normal] tracking-[.15em] uppercase py-[.55em] px-[.9em] rounded-full">View flyer</span>
            </button>
            <ul className="list-none p-0 mt-[22px] mb-3 grid gap-2">
              {["Enhance your outdoor living space", "Add value to your home", "Create a space your family will love"].map((li) => (
                <li key={li} className="before:content-['✓_'] before:text-gold before:font-bold">{li}</li>
              ))}
            </ul>
            <p className="text-[.82rem] text-[#93a4b6]">Offers are limited and subject to availability. Call or text for details.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
