import { cn } from "@/lib/ui";

export function Filters({
  items, active, onChange, label,
}: { items: { id: string; label: string }[]; active: string; onChange: (id: string) => void; label: string }) {
  return (
    <div className="flex flex-wrap gap-2.5 mb-[30px]" role="group" aria-label={label}>
      {items.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          aria-pressed={active === f.id}
          className={cn(
            "border-[1.5px] rounded-full py-[.6em] px-[1.15em] font-head font-medium text-[.85rem] leading-[normal] tracking-[.1em] uppercase transition-all duration-200",
            active === f.id
              ? "bg-bone text-ink border-bone"
              : "bg-transparent text-bone-dim border-line hover:text-bone hover:border-[rgba(243,227,204,.35)]",
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
