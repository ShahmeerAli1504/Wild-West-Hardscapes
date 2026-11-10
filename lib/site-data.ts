export const CONTACT = {
  PHONE: "+17752292991",
  PHONE_DISPLAY: "775-229-2991",
  INSTAGRAM: "https://www.instagram.com/wildwesthardscapes/",
  TIKTOK: "https://www.tiktok.com/@wildwesthardscape",
  FACEBOOK: "https://www.facebook.com/profile.php?id=61595977372303",
};

export type IconName =
  | "pavers" | "driveway" | "wall" | "fire" | "water" | "turf" | "putting" | "light" | "xeri" | "remodel";

export type Service = {
  id: string;
  name: string;
  short: string;
  icon: IconName;
  img: string | null;
  video?: string;
  text: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    id: "patios", name: "Paver Patios", short: "Cambridge Cobble & custom layouts", icon: "pavers",
    img: "/assets/img/mountain-patio.jpg", video: "pergola-patio-steps-seat-wall",
    text: "Custom paver patios made for entertaining — clean curves, solid borders and a color blend you choose. We feature premium Cambridge Cobble pavers built for Northern Nevada seasons.",
    points: ["Cambridge Cobble pavers", "Your choice of color", "Curved & custom borders", "Steps & seat walls", "Proper compacted base", "Patio extensions"],
  },
  {
    id: "driveways", name: "Driveways & Walkways", short: "Driveways, sidewalks & paths", icon: "driveway",
    img: "/assets/img/mountain-paver-driveway-curve.jpg", video: "paver-driveway-crew-at-work",
    text: "Make a first impression from the street. Paver driveways, sidewalks and garden paths that connect every part of your property — and hold up to daily use.",
    points: ["Paver driveways", "Sidewalks & entries", "Garden & side-yard paths", "Driveway extensions", "Borders & edging", "Durable base prep"],
  },
  {
    id: "walls", name: "Retaining Walls", short: "Block, seat & tiered walls", icon: "wall",
    img: "/assets/img/tiered-retaining-walls-gravel.jpg", video: "patio-seat-walls-turf-build",
    text: "Turn slopes into usable space. Retaining walls, seat walls and tiered terraces that look great and keep your yard where it belongs.",
    points: ["Retaining walls", "Seat walls", "Tiered terraces", "Planter walls", "Wall caps", "Slope solutions"],
  },
  {
    id: "fire", name: "Fire Pits", short: "Gather around the glow", icon: "fire",
    img: "/assets/img/fire-pit-seat-wall.jpg", video: "backyard-patio-turf-fire-pit",
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
    img: "/assets/img/turf-lawn-retaining-wall.jpg", video: "turf-stepper-path-day-to-night",
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
    img: "/assets/img/poster-lights-in-pavers-night.jpg", video: "lights-in-pavers-night",
    text: "Lighting built directly into your pavers, steps and walls — beautiful at night and safer underfoot. Ask about 6 free paver lights with our winter upgrade.",
    points: ["Paver lights", "Step & wall lights", "Path lighting", "Patio ambiance", "Added nighttime safety", "Ask about 6 FREE lights"],
  },
  {
    id: "xeriscape", name: "Xeriscape", short: "Rock & drought-smart design", icon: "xeri",
    img: "/assets/img/backyard-patio-firepit.jpg", video: "front-yard-pavers-rock-irrigation",
    text: "High-desert landscaping that looks good and saves water. Rock, boulders and drought-tolerant design that pairs perfectly with your hardscape.",
    points: ["Decorative rock", "Boulders & accents", "Drought-tolerant layouts", "Low water use", "Weed barrier & edging", "Pairs with pavers"],
  },
  {
    id: "remodels", name: "Complete Remodels", short: "Full backyard transformations", icon: "remodel",
    img: "/assets/img/patio-fire-table-turf.jpg", video: "seat-walls-pillars-water-feature",
    text: "Patio, walls, turf, fire features and lighting — all from one crew. We transform the whole backyard into the space you've always wanted.",
    points: ["Full backyard makeovers", "Outdoor living spaces", "Patio + lawn + fire combos", "Remodels of existing yards", "One crew start to finish", "Winter Special eligible"],
  },
];

export const SERVICE_NAMES = SERVICES.map((s) => s.name);

export type Photo = { src: string; w: number; h: number; cap: string; tags: string[]; full?: string };

export const GALLERY: Photo[] = [
  { src: "/assets/img/mountain-paver-driveway-curve.jpg", w: 1200, h: 1600, cap: "Paver driveway with curved border — mountain home", tags: ["driveways", "paths"] },
  { src: "/assets/img/paver-patio-turf-two-story.jpg", w: 1000, h: 1000, cap: "Gray paver patio, turf & seat wall", tags: ["patios", "turf", "walls"] },
  { src: "/assets/img/tiered-retaining-walls-gravel.jpg", w: 1600, h: 1200, cap: "Tiered retaining walls & gravel terraces", tags: ["walls"] },
  { src: "/assets/img/turf-lawn-retaining-wall.jpg", w: 1200, h: 1600, cap: "Turf lawn with paver border & retaining wall", tags: ["turf", "walls", "paths"] },
  { src: "/assets/img/retaining-wall-low-angle.jpg", w: 1000, h: 1000, cap: "Block retaining wall with rock & gravel", tags: ["walls"] },
  { src: "/assets/img/retaining-wall-paver-pad.jpg", w: 1600, h: 1200, cap: "Retaining wall wrapped around a paver pad", tags: ["walls", "patios"] },
  { src: "/assets/img/mountain-paver-driveway.jpg", w: 1200, h: 1600, cap: "Wide paver driveway with mountain views", tags: ["driveways"] },
  { src: "/assets/img/patio-firepit.jpg", w: 900, h: 675, full: "/assets/img/patio-firepit-hero.jpg", cap: "Paver patio, fire pit & retaining walls", tags: ["patios", "fire", "walls"] },
  { src: "/assets/img/fire-pit-seat-wall.jpg", w: 720, h: 960, cap: "Fire pit with seat walls", tags: ["fire", "walls", "patios"] },
  { src: "/assets/img/cambridge-path-turf.jpg", w: 716, h: 1040, cap: "Curved paver path & turf", tags: ["paths", "turf"] },
  { src: "/assets/img/mountain-patio.jpg", w: 716, h: 665, cap: "Mountain-view patio", tags: ["patios", "walls"] },
  { src: "/assets/img/patio-fire-table-turf.jpg", w: 720, h: 960, cap: "Backyard makeover — patio & fire table", tags: ["patios", "fire", "turf"] },
  { src: "/assets/img/backyard-patio-firepit.jpg", w: 716, h: 400, cap: "New-build patio with fire pit", tags: ["patios", "fire"] },
  { src: "/assets/img/side-yard-pavers.jpg", w: 720, h: 960, cap: "Side-yard paver walkway", tags: ["paths", "patios"] },
  { src: "/assets/img/fire-pit-closeup.jpg", w: 720, h: 960, cap: "Square fire pit & seat wall", tags: ["fire", "walls"] },
  { src: "/assets/img/turf-paver-edge.jpg", w: 720, h: 900, cap: "Lawn with paver borders", tags: ["turf", "paths"] },
  { src: "/assets/img/paver-patio-hot-tub.jpg", w: 720, h: 960, cap: "Patio for hot tub & dining", tags: ["patios"] },
  { src: "/assets/img/turf-gravel-pavers.jpg", w: 720, h: 960, cap: "Lawn, gravel & paver details", tags: ["turf", "patios"] },
  { src: "/assets/img/side-yard-turf.jpg", w: 720, h: 900, cap: "Side yard paver path & lawn", tags: ["paths", "turf"] },
];

export const GALLERY_FILTERS = [
  { id: "all", label: "All" },
  { id: "patios", label: "Patios" },
  { id: "fire", label: "Fire Pits" },
  { id: "driveways", label: "Driveways" },
  { id: "walls", label: "Walls" },
  { id: "turf", label: "Turf & Lawn" },
  { id: "paths", label: "Walkways" },
];

export type Video = { id: string; title: string; desc: string; tags: string[]; dur: string; orient: "port" | "land" | "square" };

export const VIDEOS: Video[] = [
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

export const VIDEO_FILTERS = [
  { id: "all", label: "All" },
  { id: "patios", label: "Patios" },
  { id: "driveways", label: "Driveways" },
  { id: "walls", label: "Walls" },
  { id: "turf", label: "Turf" },
  { id: "lighting", label: "Lighting" },
  { id: "process", label: "In Progress" },
];

export const TAG_LABEL: Record<string, string> = {
  patios: "Patios", driveways: "Driveways", walls: "Walls", turf: "Turf", lighting: "Lighting",
  fire: "Fire Pits", paths: "Walkways", xeriscape: "Rock & Xeriscape", process: "In Progress",
};

export const BUDGETS = ["Under $5,000", "$5,000 – $13,000", "$13,000+ (Winter Special eligible)", "Not sure yet"];
export const TIMELINES = ["As soon as possible", "Before spring", "Later this year", "Just planning"];
export const CONTACT_PREFS = ["Call", "Text", "Email"] as const;

export const videoSrc = (id: string) => `/assets/video/${id}.mp4`;
export const posterSrc = (id: string) => `/assets/img/poster-${id}.jpg`;
