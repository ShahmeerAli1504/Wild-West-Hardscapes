/* =========================================================
   Wild West Hardscapes LLC — site script (no dependencies)
   ========================================================= */

/* ---------- CONFIG ----------
   Contact form delivery. Leave FORM_ENDPOINT empty until the client's
   email is connected. Works with Formspree ("https://formspree.io/f/xxxx"),
   Web3Forms ("https://api.web3forms.com/submit" + WEB3FORMS_KEY), or your
   own endpoint (e.g. a Vercel function at "/api/contact") that accepts JSON.
   Until then, submissions fall back to a pre-filled text message to the owner. */
const CONFIG = {
  FORM_ENDPOINT: "",
  WEB3FORMS_KEY: "",
  PHONE: "+17752292991",
  PHONE_DISPLAY: "775-229-2991",
};

document.documentElement.classList.remove("no-js");

/* ---------- Icons ---------- */
const I = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS = {
  pavers: I('<rect x="3" y="4" width="8" height="5" rx="1"/><rect x="13" y="4" width="8" height="5" rx="1"/><rect x="3" y="11" width="5" height="4" rx="1"/><rect x="10" y="11" width="11" height="4" rx="1"/><rect x="3" y="17" width="11" height="4" rx="1"/><rect x="16" y="17" width="5" height="4" rx="1"/>'),
  driveway: I('<path d="M9 21 11 3h2l2 18"/><path d="M4 21 8 3"/><path d="m20 21-4-18"/><path d="M12 7v2M12 12v2M12 17v2"/>'),
  wall: I('<path d="M3 20h18"/><rect x="3" y="15" width="6" height="5"/><rect x="9" y="15" width="6" height="5"/><rect x="15" y="15" width="6" height="5"/><rect x="6" y="10" width="6" height="5"/><rect x="12" y="10" width="6" height="5"/><rect x="9" y="5" width="6" height="5"/>'),
  fire: I('<path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-7.5z"/><path d="M4 21h16"/><path d="M6 18h12"/>'),
  water: I('<path d="M4 9h7v12H4z"/><path d="M11 9c4 0 6 3 6 7"/><path d="M17 16c0 2-1 3-2 3M19 14v1M20 18v1"/><path d="M3 21h18"/>'),
  turf: I('<path d="M3 21h18"/><path d="M5 21c0-4-1-7-2-9M8 21c0-5 1-9 3-12M12 21c0-6 0-10-1-14M15 21c0-4 1-8 4-11M18 21c0-3 1-5 3-6"/>'),
  putting: I('<path d="M12 3v14"/><path d="M12 3l7 3-7 3"/><ellipse cx="12" cy="19" rx="8" ry="2.5"/><circle cx="12" cy="19" r=".8" fill="currentColor"/>'),
  light: I('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>'),
  xeri: I('<path d="M12 21v-9"/><path d="M12 12c-3 0-5-2-5-5 3 0 5 2 5 5zM12 14c3 0 5-2 5-5-3 0-5 2-5 5z"/><ellipse cx="6" cy="20" rx="3" ry="1.5"/><ellipse cx="18" cy="20" rx="3" ry="1.5"/>'),
  remodel: I('<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-5h6v5"/>'),
};

/* ---------- Services data ---------- */
const SERVICES = [
  {
    id: "patios", name: "Paver Patios", short: "Cambridge Cobble & custom layouts", icon: "pavers",
    img: "assets/img/mountain-patio.jpg", video: "pergola-patio-steps-seat-wall",
    text: "Custom paver patios made for entertaining — clean curves, solid borders and a color blend you choose. We feature premium Cambridge Cobble pavers built for Northern Nevada seasons.",
    points: ["Cambridge Cobble pavers", "Your choice of color", "Curved & custom borders", "Steps & seat walls", "Proper compacted base", "Patio extensions"],
  },
  {
    id: "driveways", name: "Driveways & Walkways", short: "Driveways, sidewalks & paths", icon: "driveway",
    img: "assets/img/mountain-paver-driveway-curve.jpg", video: "paver-driveway-crew-at-work",
    text: "Make a first impression from the street. Paver driveways, sidewalks and garden paths that connect every part of your property — and hold up to daily use.",
    points: ["Paver driveways", "Sidewalks & entries", "Garden & side-yard paths", "Driveway extensions", "Borders & edging", "Durable base prep"],
  },
  {
    id: "walls", name: "Retaining Walls", short: "Block, seat & tiered walls", icon: "wall",
    img: "assets/img/tiered-retaining-walls-gravel.jpg", video: "patio-seat-walls-turf-build",
    text: "Turn slopes into usable space. Retaining walls, seat walls and tiered terraces that look great and keep your yard where it belongs.",
    points: ["Retaining walls", "Seat walls", "Tiered terraces", "Planter walls", "Wall caps", "Slope solutions"],
  },
  {
    id: "fire", name: "Fire Pits", short: "Gather around the glow", icon: "fire",
    img: "assets/img/fire-pit-seat-wall.jpg", video: "backyard-patio-turf-fire-pit",
    text: "The centerpiece of any backyard. Paver fire pits and fire features designed to match your patio, with seating walls for nights with family and friends.",
    points: ["Round & square fire pits", "Matching seat walls", "Fire tables & features", "Integrated into patios", "Ask about the FREE fire pit special", "Built to last"],
  },
  {
    id: "water", name: "Water Features", short: "Fountains, falls & fixtures", icon: "water",
    img: null,
    text: "Add the sound of moving water. Custom water features and fixtures that bring calm and character to your outdoor space.",
    points: ["Water fixtures", "Wall waterfalls", "Fountains", "Stone accents", "Lighting options", "Designed to fit your yard"],
  },
  {
    id: "turf", name: "Artificial Turf", short: "Green all year, no mowing", icon: "turf",
    img: "assets/img/turf-lawn-retaining-wall.jpg", video: "turf-stepper-path-day-to-night",
    text: "A lush lawn without the water bill or the mowing. Artificial turf installed with clean paver borders for a crisp, low-maintenance yard.",
    points: ["Artificial turf installs", "Paver-edged lawns", "Pet & kid friendly areas", "Low water use", "Clean borders", "Lawn areas & side yards"],
  },
  {
    id: "putting", name: "Putting Greens", short: "Practice in your backyard", icon: "putting",
    img: null,
    text: "Bring the course home. Backyard putting greens blended with pavers and rock details — a space to relax, play and make memories.",
    points: ["Custom putting greens", "Paver surrounds", "Rock & boulder details", "Low maintenance", "Fits small or large yards", "Pairs with turf"],
  },
  {
    id: "lighting", name: "Lights in Pavers", short: "Glow built into the ground", icon: "light",
    img: "assets/img/poster-lights-in-pavers-night.jpg", video: "lights-in-pavers-night",
    text: "Lighting built directly into your pavers, steps and walls — beautiful at night and safer underfoot. Ask about 6 free paver lights with our winter upgrade.",
    points: ["Paver lights", "Step & wall lights", "Path lighting", "Patio ambiance", "Added nighttime safety", "Ask about 6 FREE lights"],
  },
  {
    id: "xeriscape", name: "Xeriscape", short: "Rock & drought-smart design", icon: "xeri",
    img: "assets/img/backyard-patio-firepit.jpg", video: "front-yard-pavers-rock-irrigation",
    text: "High-desert landscaping that looks good and saves water. Rock, boulders and drought-tolerant design that pairs perfectly with your hardscape.",
    points: ["Decorative rock", "Boulders & accents", "Drought-tolerant layouts", "Low water use", "Weed barrier & edging", "Pairs with pavers"],
  },
  {
    id: "remodels", name: "Complete Remodels", short: "Full backyard transformations", icon: "remodel",
    img: "assets/img/patio-fire-table-turf.jpg", video: "seat-walls-pillars-water-feature",
    text: "Patio, walls, turf, fire features and lighting — all from one crew. We transform the whole backyard into the space you've always wanted.",
    points: ["Full backyard makeovers", "Outdoor living spaces", "Patio + lawn + fire combos", "Remodels of existing yards", "One crew start to finish", "Winter Special eligible"],
  },
];

/* ---------- Gallery data ---------- */
const GALLERY = [
  { src: "assets/img/mountain-paver-driveway-curve.jpg", w: 1200, h: 1600, cap: "Paver driveway with curved border — mountain home", tags: ["driveways", "paths"] },
  { src: "assets/img/paver-patio-turf-two-story.jpg", w: 1000, h: 1000, cap: "Gray paver patio, turf & seat wall", tags: ["patios", "turf", "walls"] },
  { src: "assets/img/tiered-retaining-walls-gravel.jpg", w: 1600, h: 1200, cap: "Tiered retaining walls & gravel terraces", tags: ["walls"] },
  { src: "assets/img/turf-lawn-retaining-wall.jpg", w: 1200, h: 1600, cap: "Turf lawn with paver border & retaining wall", tags: ["turf", "walls", "paths"] },
  { src: "assets/img/retaining-wall-low-angle.jpg", w: 1000, h: 1000, cap: "Block retaining wall with rock & gravel", tags: ["walls"] },
  { src: "assets/img/retaining-wall-paver-pad.jpg", w: 1600, h: 1200, cap: "Retaining wall wrapped around a paver pad", tags: ["walls", "patios"] },
  { src: "assets/img/mountain-paver-driveway.jpg", w: 1200, h: 1600, cap: "Wide paver driveway with mountain views", tags: ["driveways"] },
  { src: "assets/img/patio-firepit.jpg", w: 900, h: 675, full: "assets/img/patio-firepit-hero.jpg", cap: "Paver patio, fire pit & retaining walls", tags: ["patios", "fire", "walls"] },
  { src: "assets/img/fire-pit-seat-wall.jpg", w: 720, h: 960, cap: "Fire pit with seat walls", tags: ["fire", "walls", "patios"] },
  { src: "assets/img/cambridge-path-turf.jpg", w: 716, h: 1040, cap: "Curved paver path & turf", tags: ["paths", "turf"] },
  { src: "assets/img/mountain-patio.jpg", w: 716, h: 665, cap: "Mountain-view patio", tags: ["patios", "walls"] },
  { src: "assets/img/patio-fire-table-turf.jpg", w: 720, h: 960, cap: "Backyard makeover — patio & fire table", tags: ["patios", "fire", "turf"] },
  { src: "assets/img/backyard-patio-firepit.jpg", w: 716, h: 400, cap: "New-build patio with fire pit", tags: ["patios", "fire"] },
  { src: "assets/img/side-yard-pavers.jpg", w: 720, h: 960, cap: "Side-yard paver walkway", tags: ["paths", "patios"] },
  { src: "assets/img/fire-pit-closeup.jpg", w: 720, h: 960, cap: "Square fire pit & seat wall", tags: ["fire", "walls"] },
  { src: "assets/img/turf-paver-edge.jpg", w: 720, h: 900, cap: "Lawn with paver borders", tags: ["turf", "paths"] },
  { src: "assets/img/paver-patio-hot-tub.jpg", w: 720, h: 960, cap: "Patio for hot tub & dining", tags: ["patios"] },
  { src: "assets/img/turf-gravel-pavers.jpg", w: 720, h: 960, cap: "Lawn, gravel & paver details", tags: ["turf", "patios"] },
  { src: "assets/img/side-yard-turf.jpg", w: 720, h: 900, cap: "Side yard paver path & lawn", tags: ["paths", "turf"] },
];

/* ---------- Project videos ---------- */
const VIDEOS = [
  { id: "lights-in-pavers-night", title: "Lights in Pavers After Dark", desc: "Walkway and step lights built right into the pavers, plus wall lighting — the whole entry glows at night.", tags: ["lighting", "paths"], dur: "0:56", orient: "port" },
  { id: "paver-driveway-crew-at-work", title: "Paver Driveway — Crew at Work", desc: "Our crew finishing a full paver driveway, from the street to the garage.", tags: ["driveways", "process"], dur: "1:04", orient: "port" },
  { id: "pergola-patio-steps-seat-wall", title: "Patio, Steps & Seat Wall", desc: "A backyard paver patio with steps off the house, a seat wall and room for the grill and pergola.", tags: ["patios", "walls"], dur: "0:45", orient: "port" },
  { id: "seat-walls-pillars-water-feature", title: "Seat Walls, Pillars & Rock Accent", desc: "Seat walls, block pillars and a basalt-column rock bed — just waiting on the granite caps.", tags: ["walls", "patios", "process"], dur: "0:57", orient: "port" },
  { id: "backyard-patio-turf-fire-pit", title: "Backyard Makeover — Patio, Turf & Fire Pit", desc: "Pavers wrapping the house, a seat wall, fire pit and fresh green lawn.", tags: ["patios", "turf", "fire"], dur: "0:35", orient: "port" },
  { id: "turf-stepper-path-day-to-night", title: "Turf, Stepper Path & Lighting — Day to Night", desc: "A side-yard stepper path, artificial turf and border lighting, shown in daylight and after dark.", tags: ["turf", "lighting", "paths"], dur: "1:32", orient: "square" },
  { id: "front-yard-pavers-rock-irrigation", title: "Front Yard Pavers, Rock & Irrigation", desc: "Completely done with the front of this home — paver walkways, added rock and irrigation.", tags: ["xeriscape", "paths"], dur: "0:59", orient: "port" },
  { id: "patio-turf-stepping-stones", title: "Patio, Turf & Stepping Stones", desc: "Paver patio, side-yard pavers and stepping stones set into new artificial turf.", tags: ["patios", "turf", "paths"], dur: "0:23", orient: "port" },
  { id: "patio-seat-walls-turf-build", title: "Patio & Seat Wall Build", desc: "From bare concrete to a paver patio with block seat walls, a fire feature and turf.", tags: ["patios", "walls", "process"], dur: "0:19", orient: "port" },
  { id: "flagstone-side-yard-patio", title: "Flagstone Side Yard & Patio", desc: "Natural flagstone running down the side yard into a shaded patio.", tags: ["patios", "paths"], dur: "0:16", orient: "land" },
  { id: "turf-border-lights-night", title: "Turf Border Lights at Night", desc: "A row of lights built into the paver border lighting up the lawn at night.", tags: ["lighting", "turf"], dur: "0:18", orient: "port" },
  { id: "mountain-driveway-walkthrough", title: "Mountain-View Driveway Walkthrough", desc: "A quick walk across a finished paver driveway with rock landscaping and mountain views.", tags: ["driveways", "xeriscape"], dur: "0:07", orient: "port" },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Nav ---------- */
(() => {
  const nav = $(".nav");
  const toggle = $(".nav__toggle");
  const menu = $("#mobileMenu");
  const bar = $(".actionbar");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 30);
    bar.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const close = () => { menu.hidden = true; toggle.setAttribute("aria-expanded", "false"); };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    menu.hidden = open;
    toggle.setAttribute("aria-expanded", String(!open));
  });
  $$("a", menu).forEach((a) => a.addEventListener("click", close));

  // highlight current section
  const links = $$(".nav__links a");
  const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && map.has(e.target.id)) {
        links.forEach((l) => l.classList.remove("is-current"));
        map.get(e.target.id).classList.add("is-current");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  map.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
})();

/* ---------- Services: tabs + panel ---------- */
(() => {
  const list = $(".svc__list");
  const panel = $(".svc__panel");
  if (!list) return;

  list.innerHTML = SERVICES.map((s, i) => `
    <li><button class="svc__tab" role="tab" id="tab-${s.id}" aria-controls="svc-panel" aria-selected="${i === 0}" data-id="${s.id}">
      <span class="ico">${ICONS[s.icon]}</span>
      <span><b>${s.name}</b><small>${s.short}</small></span>
      <span class="arrow">→</span>
    </button></li>`).join("");
  panel.id = "svc-panel";

  const render = (id) => {
    const i = SERVICES.findIndex((s) => s.id === id);
    const s = SERVICES[i];
    const media = s.img
      ? `<div class="svc__media"><img src="${s.img}" alt="${s.name} by Wild West Hardscapes" loading="lazy"/><span class="num">No. ${String(i + 1).padStart(2, "0")}</span></div>`
      : `<div class="svc__media svc__media--art">${ICONS[s.icon]}<span class="num">No. ${String(i + 1).padStart(2, "0")}</span></div>`;
    panel.innerHTML = `${media}
      <div class="svc__body">
        <h3>${s.name}</h3>
        <p>${s.text}</p>
        <ul>${s.points.map((p) => `<li>${p}</li>`).join("")}</ul>
        <div class="svc__actions">
          <a href="#contact" class="btn btn--rust" data-pick="${s.name}">Get an estimate for ${s.name}</a>
          ${s.video ? `<button type="button" class="btn btn--ghost" data-play="${s.video}">▶ Watch the video</button>` : `<a href="tel:${CONFIG.PHONE}" class="btn btn--ghost">Call ${CONFIG.PHONE_DISPLAY}</a>`}
        </div>
      </div>`;
    panel.setAttribute("aria-labelledby", `tab-${s.id}`);
    panel.classList.remove("is-swapping"); void panel.offsetWidth; panel.classList.add("is-swapping");
    $$(".svc__tab", list).forEach((t) => t.setAttribute("aria-selected", String(t.dataset.id === id)));
  };

  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".svc__tab");
    if (!btn) return;
    render(btn.dataset.id);
    if (window.innerWidth <= 960) {
      btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  });
  list.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const tabs = $$(".svc__tab", list);
    const cur = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(cur + dir + tabs.length) % tabs.length];
    e.preventDefault(); next.focus(); render(next.dataset.id);
  });
  render(SERVICES[0].id);

  // footer list
  const fl = $("[data-footer-services]");
  if (fl) fl.innerHTML = SERVICES.slice(0, 6).map((s) => `<li><a href="#services" data-open="${s.id}">${s.name}</a></li>`).join("");
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-open]");
    if (a) render(a.dataset.open);
  });
})();

/* ---------- Gallery + filters ---------- */
(() => {
  const g = $("[data-gallery]");
  if (!g) return;
  g.innerHTML = GALLERY.map((p, i) => `
    <button class="tile reveal" data-i="${i}" data-tags="${p.tags.join(" ")}" aria-label="View: ${p.cap}">
      <img src="${p.src}" width="${p.w}" height="${p.h}" alt="${p.cap}" loading="lazy"/>
      <span class="cap">${p.cap}</span>
    </button>`).join("");

  $$(".filters .chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".filters .chip").forEach((c) => c.classList.toggle("is-active", c === chip));
    const f = chip.dataset.filter;
    $$(".tile", g).forEach((t) => t.classList.toggle("is-hidden", f !== "all" && !t.dataset.tags.split(" ").includes(f)));
  }));

  g.addEventListener("click", (e) => {
    const t = e.target.closest(".tile");
    if (!t) return;
    const visible = $$(".tile:not(.is-hidden)", g).map((el) => GALLERY[+el.dataset.i]);
    const idx = visible.indexOf(GALLERY[+t.dataset.i]);
    Lightbox.open(visible.map((p) => ({ src: p.full || p.src, cap: p.cap })), idx);
  });
})();

/* ---------- Lightbox ---------- */
const Lightbox = (() => {
  const box = $(".lightbox");
  const img = $("img", box);
  const cap = $("figcaption", box);
  let items = [], i = 0, lastFocus = null;
  const show = () => { img.src = items[i].src; img.alt = items[i].cap; cap.textContent = items[i].cap;
    $$(".lightbox__nav", box).forEach((b) => (b.hidden = items.length < 2)); };
  const open = (list, idx = 0) => { items = list; i = idx; lastFocus = document.activeElement; show(); box.hidden = false; document.body.style.overflow = "hidden"; $(".lightbox__close", box).focus(); };
  const close = () => { box.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };
  const step = (d) => { i = (i + d + items.length) % items.length; show(); };
  $(".lightbox__close", box).addEventListener("click", close);
  $(".lightbox__prev", box).addEventListener("click", () => step(-1));
  $(".lightbox__next", box).addEventListener("click", () => step(1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  $$("[data-lightbox]").forEach((b) => b.addEventListener("click", () => open([{ src: b.dataset.lightbox, cap: b.dataset.caption || "" }])));
  return { open };
})();

/* ---------- Reels: autoplay in view, tap for sound ---------- */
(() => {
  const vids = $$(".phone video");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { if (v.preload === "none") v.preload = "auto"; v.play().catch(() => {}); }
      else v.pause();
    });
  }, { threshold: 0.35 });
  vids.forEach((v) => io.observe(v));

  $$(".reel .phone").forEach((ph) => {
    const v = $("video", ph);
    const b = $("[data-sound]", ph);
    const toggle = () => {
      const turnOn = v.muted;
      // only one reel with sound at a time
      vids.forEach((o) => { o.muted = true; const ob = o.parentElement.querySelector("[data-sound]"); if (ob) { ob.textContent = "🔇"; ob.setAttribute("aria-label", "Turn sound on"); } });
      v.muted = !turnOn;
      if (turnOn) { v.play().catch(() => {}); b.textContent = "🔊"; b.setAttribute("aria-label", "Turn sound off"); }
    };
    ph.addEventListener("click", toggle);
  });
})();

/* ---------- Video library + player ---------- */
const Player = (() => {
  const box = $(".vplayer");
  const vid = $("video", box);
  const title = $(".vplayer__title", box);
  const desc = $(".vplayer__desc", box);
  let lastFocus = null;
  const open = (id) => {
    const v = VIDEOS.find((x) => x.id === id);
    if (!v) return;
    lastFocus = document.activeElement;
    // pause anything playing on the page
    $$("video").forEach((o) => { if (o !== vid) o.pause(); });
    vid.poster = `assets/img/poster-${v.id}.jpg`;
    vid.src = `assets/video/${v.id}.mp4`;
    box.dataset.orient = v.orient;
    title.textContent = v.title;
    desc.textContent = v.desc;
    box.hidden = false;
    document.body.style.overflow = "hidden";
    vid.play().catch(() => {});
    $(".vplayer__close", box).focus();
  };
  const close = () => {
    vid.pause(); vid.removeAttribute("src"); vid.load();
    box.hidden = true; document.body.style.overflow = "";
    lastFocus && lastFocus.focus();
  };
  $(".vplayer__close", box).addEventListener("click", close);
  $("[data-close-player]", box).addEventListener("click", () => { lastFocus = null; close(); });
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => { if (!box.hidden && e.key === "Escape") close(); });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-play]");
    if (b) { e.preventDefault(); open(b.dataset.play); }
  });
  return { open };
})();

(() => {
  const grid = $("[data-videos]");
  if (!grid) return;
  const LABEL = { patios: "Patios", driveways: "Driveways", walls: "Walls", turf: "Turf", lighting: "Lighting", fire: "Fire Pits", paths: "Walkways", xeriscape: "Rock & Xeriscape", process: "In Progress" };
  grid.innerHTML = VIDEOS.map((v) => `
    <article class="vcard reveal" data-tags="${v.tags.join(" ")}">
      <button class="vcard__media" data-play="${v.id}" aria-label="Play video: ${v.title}">
        <img src="assets/img/poster-${v.id}.jpg" alt="" loading="lazy" />
        <span class="vcard__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
        <span class="vcard__dur">${v.dur}</span>
      </button>
      <div class="vcard__body">
        <h3>${v.title}</h3>
        <p>${v.desc}</p>
        <ul class="vcard__tags">${v.tags.map((t) => `<li>${LABEL[t] || t}</li>`).join("")}</ul>
      </div>
    </article>`).join("");

  // hover preview on desktop: swap in the muted video
  grid.addEventListener("pointerenter", (e) => {
    const m = e.target.closest && e.target.closest(".vcard__media");
    if (!m || e.pointerType !== "mouse" || m.querySelector("video")) return;
    const v = document.createElement("video");
    Object.assign(v, { src: `assets/video/${m.dataset.play}.mp4`, muted: true, loop: true, playsInline: true, autoplay: true });
    v.setAttribute("aria-hidden", "true");
    m.appendChild(v);
    m.addEventListener("pointerleave", () => v.remove(), { once: true });
  }, true);

  $$(".vfilters .chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".vfilters .chip").forEach((c) => c.classList.toggle("is-active", c === chip));
    const f = chip.dataset.vfilter;
    $$(".vcard", grid).forEach((c) => c.classList.toggle("is-hidden", f !== "all" && !c.dataset.tags.split(" ").includes(f)));
  }));
})();

/* ---------- Contact form ---------- */
(() => {
  const form = $("#estimateForm");
  if (!form) return;
  const picks = $("[data-service-picks]", form);
  picks.innerHTML = SERVICES.map((s) => `<label><input type="checkbox" name="services" value="${s.name}"/><span>${s.name}</span></label>`).join("");

  const pickService = (name) => {
    const cb = $(`input[name="services"][value="${CSS.escape(name)}"]`, form);
    if (cb) cb.checked = true;
  };

  // "Get an estimate for X" buttons pre-select that service
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-pick]");
    if (a) pickService(a.dataset.pick);
    const c = e.target.closest("[data-claim]");
    if (c) {
      form.elements.special.checked = true;
      pickService("Paver Patios");
      if (c.dataset.claim === "upgrade") form.elements.budget.value = "$13,000+ (Winter Special eligible)";
      if (c.dataset.claim === "firepit") pickService("Fire Pits");
      const msg = form.elements.message;
      const line = c.dataset.claim === "upgrade"
        ? "I'd like to reserve a spot for the $13k+ free upgrade (800 sq ft Cambridge Cobble + fire pit or 6 paver lights)."
        : "I'd like to claim the free fire pit with an 800 sq ft Cambridge Cobble paver patio.";
      if (!msg.value.includes(line)) msg.value = (msg.value ? msg.value + "\n" : "") + line;
    }
  });

  const status = $(".form__status", form);
  const setErr = (el, bad) => el.closest(".field").classList.toggle("is-invalid", bad);

  const collect = () => {
    const fd = new FormData(form);
    return {
      name: fd.get("name").trim(),
      phone: fd.get("phone").trim(),
      email: fd.get("email").trim(),
      location: fd.get("location").trim(),
      services: fd.getAll("services"),
      budget: fd.get("budget"),
      timeline: fd.get("timeline"),
      winter_special: fd.get("special") ? "Yes" : "No",
      contact_pref: fd.get("contact_pref"),
      message: fd.get("message").trim(),
    };
  };

  const summary = (d) => [
    `New estimate request — Wild West Hardscapes`,
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    d.email && `Email: ${d.email}`,
    d.location && `Location: ${d.location}`,
    d.services.length && `Services: ${d.services.join(", ")}`,
    d.budget && `Budget: ${d.budget}`,
    d.timeline && `Timeline: ${d.timeline}`,
    `Winter Special: ${d.winter_special}`,
    `Best contact: ${d.contact_pref}`,
    d.message && `Notes: ${d.message}`,
  ].filter(Boolean).join("\n");

  const done = (d, sent) => {
    const sms = `sms:${CONFIG.PHONE}${/iPhone|iPad|Mac/.test(navigator.userAgent) ? "&" : "?"}body=${encodeURIComponent(summary(d))}`;
    form.innerHTML = sent
      ? `<div class="form__done"><p class="big">Thank you, ${d.name.split(" ")[0]}!</p>
          <p>Your request is in. We'll reach out by ${d.contact_pref.toLowerCase()} soon to schedule your free estimate.</p>
          <div class="btns"><a class="btn btn--rust" href="tel:${CONFIG.PHONE}">Call ${CONFIG.PHONE_DISPLAY}</a></div></div>`
      : `<div class="form__done"><p class="big">Almost there, ${d.name.split(" ")[0]}!</p>
          <p>Tap below to send your project details straight to Alfonso by text — everything is filled in for you.</p>
          <div class="btns"><a class="btn btn--rust" href="${sms}">Send by Text</a><a class="btn btn--ghost" href="tel:${CONFIG.PHONE}">Call ${CONFIG.PHONE_DISPLAY}</a></div></div>`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.elements.company_website.value) return; // honeypot
    const { name, phone, email } = form.elements;
    const badName = !name.value.trim();
    const badPhone = phone.value.replace(/\D/g, "").length < 10;
    const badEmail = !!email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    setErr(name, badName); setErr(phone, badPhone); setErr(email, badEmail);
    if (badName || badPhone || badEmail) {
      status.className = "form__status is-error";
      status.textContent = badName ? "Please add your name." : badPhone ? "Please add a valid phone number." : "Please check your email address.";
      (badName ? name : badPhone ? phone : email).focus();
      return;
    }
    status.className = "form__status"; status.textContent = "";
    const data = collect();

    if (!CONFIG.FORM_ENDPOINT) { done(data, false); return; }

    const btn = $("button[type=submit]", form);
    btn.disabled = true; btn.textContent = "Sending…";
    try {
      const payload = { ...data, services: data.services.join(", "), subject: `Estimate request from ${data.name}`, from_name: "Wild West Hardscapes Website" };
      if (CONFIG.WEB3FORMS_KEY) payload.access_key = CONFIG.WEB3FORMS_KEY;
      const res = await fetch(CONFIG.FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(res.status);
      done(data, true);
    } catch {
      btn.disabled = false; btn.textContent = "Send My Request";
      status.className = "form__status is-error";
      status.innerHTML = `Something went wrong sending your request. Please call or text <a href="tel:${CONFIG.PHONE}">${CONFIG.PHONE_DISPLAY}</a>.`;
    }
  });

  ["name", "phone", "email"].forEach((n) => form.elements[n].addEventListener("input", () => setErr(form.elements[n], false)));
})();

/* ---------- Reveal on scroll ---------- */
(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
})();

$("[data-year]").textContent = new Date().getFullYear();
