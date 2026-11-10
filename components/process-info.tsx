import { Eyebrow, SectionHead } from "./phone-frame";

const STEPS = [
  { h: "Call, text or send the form", p: "Tell us what you're dreaming up — a patio, a driveway, a full backyard. Photos help!" },
  { h: "Free on-site estimate", p: "We walk the space with you, talk layout, materials and colors, and measure it out." },
  { h: "Design & clear quote", p: "You get a straightforward plan and price — plus any winter special you qualify for." },
  { h: "We build it to last", p: "Excavation, base, install and clean-up. Then it's yours to relax, play & make memories." },
];

export function Process() {
  return (
    <section id="process" className="bg-pavers py-[120px]">
      <div className="wrap">
        <SectionHead>
          <Eyebrow num="No. 05">How It Works</Eyebrow>
          <h2>From first call to <em>first fire.</em></h2>
        </SectionHead>
        <ol className="list-none p-0 m-0 grid grid-cols-4 gap-7 relative before:content-[''] before:absolute before:top-7 before:left-7 before:right-7 before:h-0 before:border-t-[3px] before:border-dashed before:border-[rgba(194,70,43,.55)] upto-860:grid-cols-1 upto-860:gap-[30px] upto-860:before:bottom-7 upto-860:before:right-auto upto-860:before:w-0 upto-860:before:h-auto upto-860:before:border-t-0 upto-860:before:border-l-[3px]">
          {STEPS.map((s, i) => (
            <li key={s.h} className="reveal relative upto-860:pl-[82px]">
              <span className="w-[58px] h-[58px] rounded-full grid place-items-center bg-ink border-[3px] border-rust font-west font-normal text-[1.4rem] leading-[normal] text-gold mb-5 relative z-1 upto-860:absolute upto-860:left-0 upto-860:-top-1">
                {i + 1}
              </span>
              <h3 className="text-[1.3rem] uppercase">{s.h}</h3>
              <p className="text-bone-dim m-0">{s.p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const FAQ = [
  { q: "Are your estimates really free?", a: "Yes. Call, text or send the form and we'll set up a free project evaluation and estimate." },
  { q: "Are you licensed and insured?", a: "Yes — Wild West Hardscapes LLC is licensed and insured, operating under Nevada State Contractor License #0096054." },
  { q: "Why plan a project in winter?", a: "Booking during the winter means your design and prep are done ahead of the spring rush — and you can take advantage of our Winter Specials while spots last." },
  { q: "What pavers do you install?", a: "We feature Cambridge Cobble pavers, available in a range of colors, and can talk through other options during your estimate." },
  { q: "Can you do the whole backyard, not just one piece?", a: "Absolutely. We handle complete outdoor remodels — patios, walls, turf, putting greens, fire pits, water features, lighting and xeriscape — so one crew brings the whole vision together." },
  { q: "How do I qualify for the free upgrade?", a: "Spend $13,000 or more on a new backyard installation or remodel to receive 800 sq. ft. of Cambridge Cobble pavers plus a free fire pit or 6 paver lights. Only 10 spots are available." },
];

export function Info() {
  return (
    <section id="faq" className="bg-pavers pt-10 pb-[120px]">
      <div className="wrap grid grid-cols-[1fr_1.1fr] gap-[60px] items-start upto-900:grid-cols-1">
        <div className="reveal [&>p]:text-bone-dim [&>p]:text-[1.08rem]">
          <Eyebrow num="No. 06">Service Area</Eyebrow>
          <h2>Proudly serving <em>Northern Nevada.</em></h2>
          <p>Based in Reno and building outdoor spaces across the Truckee Meadows and surrounding communities. Not sure if we cover your area? Just ask.</p>
          <ul className="list-none p-0 mt-6 mb-[30px] flex flex-wrap gap-2.5">
            {["Reno", "Sparks", "Reno–Tahoe Area", "Northern Nevada"].map((a) => (
              <li key={a} className="border-[1.5px] border-line rounded-lg py-[.5em] px-[1em] font-head font-medium text-[.9rem] leading-[normal] tracking-[.1em] uppercase before:content-['📍_']">{a}</li>
            ))}
          </ul>
          <div className="flex gap-[18px] items-center p-[18px] rounded-2xl bg-ink-2 border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/img/logo.jpg" alt="Wild West Hardscapes LLC logo" width={84} height={84} loading="lazy" className="rounded-full w-[84px] h-[84px]" />
            <div className="flex flex-col text-[.92rem] text-bone-dim">
              <b className="font-head font-semibold text-[1.1rem] leading-[normal] tracking-[.05em] uppercase text-bone">Wild West Hardscapes LLC</b>
              <span>Nevada State Contractor License #0096054</span>
              <span>Licensed &amp; Insured</span>
            </div>
          </div>
        </div>

        <div className="reveal">
          <h3 className="text-[1.5rem] uppercase mb-[18px]">Common questions</h3>
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="list-none cursor-pointer py-5 pr-11 pl-0 relative font-head font-medium text-[1.12rem] leading-[normal] tracking-[.03em] [&::-webkit-details-marker]:hidden after:content-['+'] after:absolute after:right-1 after:top-1/2 after:-translate-y-1/2 after:w-[30px] after:h-[30px] after:rounded-full after:border-[1.5px] after:border-line after:grid after:place-items-center after:text-gold after:transition-[transform,background-color] after:duration-[250ms] group-open:after:content-['–'] group-open:after:bg-rust group-open:after:text-white group-open:after:border-rust">
                {f.q}
              </summary>
              <p className="text-bone-dim pb-5 m-0">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
