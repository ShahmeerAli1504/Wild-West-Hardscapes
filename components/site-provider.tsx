"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { SERVICES } from "@/lib/site-data";

export type EstimateForm = {
  name: string;
  phone: string;
  email: string;
  location: string;
  services: string[];
  budget: string;
  timeline: string;
  special: boolean;
  message: string;
  contact_pref: string;
  company_website: string; // honeypot
};

export const EMPTY_FORM: EstimateForm = {
  name: "", phone: "", email: "", location: "", services: [], budget: "", timeline: "",
  special: false, message: "", contact_pref: "Call", company_website: "",
};

export type LightboxItem = { src: string; cap: string };

type SiteCtx = {
  activeService: string;
  setActiveService: (id: string) => void;
  form: EstimateForm;
  setForm: React.Dispatch<React.SetStateAction<EstimateForm>>;
  pickService: (name: string) => void;
  claimOffer: (kind: "upgrade" | "firepit") => void;
  lightbox: { items: LightboxItem[]; index: number } | null;
  openLightbox: (items: LightboxItem[], index?: number) => void;
  closeLightbox: () => void;
  setLightboxIndex: (i: number) => void;
  videoId: string | null;
  openVideo: (id: string) => void;
  closeVideo: () => void;
};

const Ctx = createContext<SiteCtx | null>(null);

export function useSite() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSite must be used inside <SiteProvider>");
  return c;
}

const addService = (list: string[], name: string) => (list.includes(name) ? list : [...list, name]);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [activeService, setActiveService] = useState(SERVICES[0].id);
  const [form, setForm] = useState<EstimateForm>(EMPTY_FORM);
  const [lightbox, setLightbox] = useState<SiteCtx["lightbox"]>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  const pickService = useCallback((name: string) => {
    setForm((f) => ({ ...f, services: addService(f.services, name) }));
  }, []);

  const claimOffer = useCallback((kind: "upgrade" | "firepit") => {
    const line = kind === "upgrade"
      ? "I'd like to reserve a spot for the $13k+ free upgrade (800 sq ft Cambridge Cobble + fire pit or 6 paver lights)."
      : "I'd like to claim the free fire pit with an 800 sq ft Cambridge Cobble paver patio.";
    setForm((f) => {
      let services = addService(f.services, "Paver Patios");
      if (kind === "firepit") services = addService(services, "Fire Pits");
      return {
        ...f,
        special: true,
        services,
        budget: kind === "upgrade" ? "$13,000+ (Winter Special eligible)" : f.budget,
        message: f.message.includes(line) ? f.message : (f.message ? f.message + "\n" : "") + line,
      };
    });
  }, []);

  const value = useMemo<SiteCtx>(() => ({
    activeService, setActiveService, form, setForm, pickService, claimOffer,
    lightbox,
    openLightbox: (items, index = 0) => setLightbox({ items, index }),
    closeLightbox: () => setLightbox(null),
    setLightboxIndex: (i) => setLightbox((l) => (l ? { ...l, index: i } : l)),
    videoId,
    openVideo: (id) => setVideoId(id),
    closeVideo: () => setVideoId(null),
  }), [activeService, form, pickService, claimOffer, lightbox, videoId]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
