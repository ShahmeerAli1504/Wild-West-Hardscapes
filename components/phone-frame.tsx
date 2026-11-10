import type { ReactNode } from "react";
import { cn } from "@/lib/ui";

/** Phone-shaped frame with a notch, used for vertical reels. Pass `relative` or `absolute` in className. */
export function PhoneFrame({ className, children, onClick }: { className?: string; children: ReactNode; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "aspect-[9/16] rounded-[34px] p-[9px] bg-[linear-gradient(145deg,#3a2e25,#120d0a)]",
        "shadow-[0_24px_60px_-24px_rgba(0,0,0,.7),inset_0_0_0_1.5px_rgba(243,227,204,.15)]",
        "before:content-[''] before:absolute before:top-[18px] before:left-1/2 before:w-[70px] before:h-[18px] before:-translate-x-1/2 before:bg-[#0a0806] before:rounded-xl before:z-2",
        "upto-480:rounded-3xl upto-480:p-1.5 upto-480:before:w-[46px] upto-480:before:h-3 upto-480:before:top-3",
        "[&_video]:w-full [&_video]:h-full [&_video]:object-cover [&_video]:rounded-[26px] [&_video]:bg-black upto-480:[&_video]:rounded-[19px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ num, children }: { num: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-head font-semibold text-[.82rem] leading-[normal] tracking-[.24em] uppercase text-gold mb-[18px]">
      <span className="bg-rust text-white py-[.35em] px-[.7em] rounded tracking-[.12em]">{num}</span> {children}
    </p>
  );
}

export function SectionHead({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={cn("reveal max-w-[760px] mb-14 [&>p:last-child]:text-[1.1rem]", light ? "[&>p:last-child]:text-[#b9c7d6]" : "[&>p:last-child]:text-bone-dim")}>
      {children}
    </div>
  );
}
