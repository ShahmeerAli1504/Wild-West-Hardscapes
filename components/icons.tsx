import type { ReactNode } from "react";
import type { IconName } from "@/lib/site-data";

const PATHS: Record<IconName, ReactNode> = {
  pavers: (<><rect x="3" y="4" width="8" height="5" rx="1" /><rect x="13" y="4" width="8" height="5" rx="1" /><rect x="3" y="11" width="5" height="4" rx="1" /><rect x="10" y="11" width="11" height="4" rx="1" /><rect x="3" y="17" width="11" height="4" rx="1" /><rect x="16" y="17" width="5" height="4" rx="1" /></>),
  driveway: (<><path d="M9 21 11 3h2l2 18" /><path d="M4 21 8 3" /><path d="m20 21-4-18" /><path d="M12 7v2M12 12v2M12 17v2" /></>),
  wall: (<><path d="M3 20h18" /><rect x="3" y="15" width="6" height="5" /><rect x="9" y="15" width="6" height="5" /><rect x="15" y="15" width="6" height="5" /><rect x="6" y="10" width="6" height="5" /><rect x="12" y="10" width="6" height="5" /><rect x="9" y="5" width="6" height="5" /></>),
  fire: (<><path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-7.5z" /><path d="M4 21h16" /><path d="M6 18h12" /></>),
  water: (<><path d="M4 9h7v12H4z" /><path d="M11 9c4 0 6 3 6 7" /><path d="M17 16c0 2-1 3-2 3M19 14v1M20 18v1" /><path d="M3 21h18" /></>),
  turf: (<><path d="M3 21h18" /><path d="M5 21c0-4-1-7-2-9M8 21c0-5 1-9 3-12M12 21c0-6 0-10-1-14M15 21c0-4 1-8 4-11M18 21c0-3 1-5 3-6" /></>),
  putting: (<><path d="M12 3v14" /><path d="M12 3l7 3-7 3" /><ellipse cx="12" cy="19" rx="8" ry="2.5" /><circle cx="12" cy="19" r=".8" fill="currentColor" /></>),
  light: (<><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z" /></>),
  xeri: (<><path d="M12 21v-9" /><path d="M12 12c-3 0-5-2-5-5 3 0 5 2 5 5zM12 14c3 0 5-2 5-5-3 0-5 2-5 5z" /><ellipse cx="6" cy="20" rx="3" ry="1.5" /><ellipse cx="18" cy="20" rx="3" ry="1.5" /></>),
  remodel: (<><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M9 20v-5h6v5" /></>),
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {PATHS[name]}
    </svg>
  );
}

export const PhoneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const ChatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d="M4 5h16v11H8l-4 4z" />
  </svg>
);
