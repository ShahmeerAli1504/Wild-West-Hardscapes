export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

type BtnVariant = "rust" | "ghost" | "dark" | "ghostDark";
type BtnSize = "md" | "sm" | "lg";

const VARIANTS: Record<BtnVariant, string> = {
  rust: "bg-rust text-white border-rust shadow-[0_10px_30px_-10px_rgba(194,70,43,.7)] hover:bg-[#d4532f]",
  ghost: "bg-transparent text-bone border-[rgba(243,227,204,.35)] hover:border-gold hover:text-gold",
  dark: "bg-parch-ink text-parch border-parch-ink",
  ghostDark: "bg-transparent text-parch-ink border-[rgba(42,29,20,.35)]",
};

const SIZES: Record<BtnSize, string> = {
  md: "py-[.85em] px-[1.5em] text-[.95rem]",
  sm: "py-[.7em] px-[1.1em] text-[.82rem]",
  lg: "py-[1.05em] px-[1.8em] text-[1rem]",
};

/** Pill button styles (the original `.btn` family). */
export function btn(
  variant: BtnVariant,
  { size = "md", block = false, wrapText = false }: { size?: BtnSize; block?: boolean; wrapText?: boolean } = {},
) {
  return cn(
    "inline-flex items-center justify-center gap-[.5em] rounded-full border-[1.5px] border-solid",
    "font-head font-semibold tracking-[.08em] uppercase no-underline",
    "transition-[translate,background-color,border-color,box-shadow] duration-200 hover:-translate-y-0.5",
    wrapText ? "whitespace-normal text-center leading-[1.2]" : "whitespace-nowrap leading-none",
    SIZES[size],
    VARIANTS[variant],
    block && "w-full",
  );
}

/** Shared label typography used for most Oswald uppercase captions. */
export const caps = "font-head uppercase leading-[normal]";
