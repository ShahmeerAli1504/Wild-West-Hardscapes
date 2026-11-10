"use client";

import { useEffect } from "react";

/** Fades `.reveal` elements in as they scroll into view (sets `data-in`, which React never touches). */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal:not([data-in])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
