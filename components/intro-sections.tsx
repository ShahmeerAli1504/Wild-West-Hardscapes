import { Fragment } from "react";
import { btn } from "@/lib/ui";
import { Eyebrow } from "./phone-frame";

const TICKER = ["Pavers", "Retaining Walls", "Water Features", "Driveways", "Artificial Turf", "Putting Greens", "Lights in Pavers", "Fire Pits", "Xeriscape", "Remodels"];

export function Ticker() {
  return (
    <div className="bg-rust text-white overflow-hidden py-4 rotate-[-1.2deg] -mt-2.5 -mx-5 mb-0 relative z-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,.6)]" aria-hidden="true">
      <div className="flex gap-7 w-max animate-tick font-head font-semibold text-[1.15rem] leading-[normal] tracking-[.16em] uppercase whitespace-nowrap">
        {[...TICKER, ...TICKER].map((t, i) => (
          <Fragment key={i}>
            <span>{t}</span>
            <i className="not-italic text-ink">★</i>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

const PILLARS = [
  { n: "01", h: "Quality Work", p: "Clean cuts, tight joints and borders that hold their line — quality you can see the day we finish and years after." },
  { n: "02", h: "Reliable Service", p: "Straight answers, a clear plan, and a crew that shows up. Call or text and talk directly with the owner, Alfonso." },
  { n: "03", h: "Built to Last", p: "Proper base prep and compaction made for Northern Nevada freeze-thaw winters and hot high-desert summers." },
];

export function Pillars() {
  return (
    <section className="pt-[90px] pb-[30px]">
      <div className="wrap grid grid-cols-3 gap-0 border-y border-line upto-800:grid-cols-1">
        {PILLARS.map((x) => (
          <div key={x.n} className="reveal py-9 px-8 border-r border-line last:border-r-0 upto-800:border-r-0 upto-800:border-b upto-800:py-7 upto-800:px-1 upto-800:last:border-b-0">
            <span className="font-west font-normal text-[2.4rem] leading-[normal] text-rust block mb-2">{x.n}</span>
            <h3 className="text-[1.5rem] uppercase">{x.h}</h3>
            <p className="text-bone-dim m-0">{x.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const VALUES = [
  { b: "Family", s: "Siblings, side by side" },
  { b: "Hard Work", s: "Done right, every time" },
  { b: "Heart", s: "A legacy for our kids" },
];

const frame =
  "relative rounded-[14px] overflow-hidden shadow-deep aspect-[3/4] after:content-[''] after:absolute after:inset-0 after:border after:border-[rgba(227,170,76,.35)] after:rounded-[14px] after:pointer-events-none";

export function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden py-[110px] bg-[linear-gradient(180deg,var(--color-ink)_0%,var(--color-ink-2)_100%)] upto-900:py-20 before:content-[''] before:absolute before:right-[-10%] before:bottom-[-40%] before:w-[60vw] before:h-[60vw] before:bg-[radial-gradient(circle,rgba(194,70,43,.14),transparent_60%)] before:pointer-events-none"
    >
      <div className="wrap grid grid-cols-[.9fr_1.1fr] gap-[72px] items-center relative upto-900:grid-cols-1 upto-900:gap-14">
        <figure className="reveal m-0 relative grid grid-cols-2 gap-[18px] items-start before:content-[''] before:absolute before:top-[30px] before:right-[-18px] before:bottom-[-18px] before:left-[30px] before:border-2 before:border-rust before:rounded-[14px] before:-z-1 upto-900:max-w-[420px] upto-900:mx-auto upto-900:w-[calc(100%_-_22px)] upto-520:max-w-[520px] upto-520:gap-3">
          <div className={frame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/img/owner.jpg" alt="Wild West Hardscapes co-owner, smiling in a black blouse" width={1024} height={1024} loading="lazy" className="w-full h-full object-cover object-[center_20%]" />
          </div>
          <div className={`${frame} mt-14 upto-520:mt-9`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/img/brother.jpg" alt="Wild West Hardscapes co-owner, her brother, smiling in a black polo" width={1086} height={1448} loading="lazy" className="w-full h-full object-cover object-[center_15%]" />
          </div>
          <figcaption className="absolute -left-[18px] bottom-8 bg-parch text-parch-ink py-3.5 px-5 rounded-[10px] shadow-deep rotate-[-3deg] upto-520:-left-2">
            <span className="block font-head font-semibold text-[.72rem] leading-[normal] tracking-[.22em] uppercase text-saddle">Born &amp; raised</span>
            <strong className="font-west font-normal text-[1.6rem] leading-[1.1] text-rust-d">Reno, NV</strong>
          </figcaption>
        </figure>

        <div className="reveal">
          <Eyebrow num="Est. Reno">Meet the Family</Eyebrow>
          <h2>Our <em>Story.</em></h2>
          <p className="text-[1.18rem] text-bone">
            As proud Nevadans, born and raised in Reno, Wild West Hardscapes is about so much more than creating beautiful outdoor spaces. As siblings, we started this business with one thing at the heart of it all: family.
          </p>
          <p className="text-bone-dim">
            Together, we wanted to build something bigger than ourselves. A strong foundation for our children, an opportunity to create generational wealth, and a lasting legacy our families can be proud of.
          </p>
          <p className="text-bone-dim">
            For us, Wild West Hardscapes isn&rsquo;t just a business. It&rsquo;s a dream we&rsquo;re building together, rooted in family, hard work, and the values we were raised with.
          </p>
          <blockquote className="my-7 mx-0 py-1 pr-0 pl-[22px] border-l-[3px] border-gold font-head font-medium text-[1.35rem] leading-[1.4] text-gold tracking-[.01em] upto-520:text-[1.15rem]">
            Every project brings us one step closer to the legacy we hope to leave behind.
          </blockquote>
          <ul className="list-none mt-0 mb-8 p-0 grid grid-cols-3 border-y border-line upto-520:grid-cols-1">
            {VALUES.map((v) => (
              <li key={v.b} className="py-[18px] px-3.5 border-r border-line last:border-r-0 upto-520:border-r-0 upto-520:border-b upto-520:py-3.5 upto-520:px-1 upto-520:last:border-b-0">
                <b className="block font-west font-normal text-[1.25rem] leading-[normal] text-rust mb-1">{v.b}</b>
                <span className="text-[.92rem] text-bone-dim">{v.s}</span>
              </li>
            ))}
          </ul>
          <a className={btn("rust")} href="#contact">Build With Our Family</a>
        </div>
      </div>
    </section>
  );
}
