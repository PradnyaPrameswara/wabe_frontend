"use client";

import { useEffect } from "react";

export function StickyHeaderClient() {
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 992px)");
    const marker = document.getElementById("sticky-header-marker");
    const anchor = document.getElementById("sticky-header-anchor");
    const bar = document.getElementById("sticky-header-bar");

    if (!marker || !anchor || !bar) return;

    let stickyObserver: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;

    const syncStickyHeight = () => {
      anchor.style.setProperty("--sticky-header-height", `${bar.offsetHeight}px`);
    };

    const enableSticky = () => {
      syncStickyHeight();
      resizeObserver = new ResizeObserver(syncStickyHeight);
      resizeObserver.observe(bar);

      stickyObserver = new IntersectionObserver(
        ([entry]) => {
          anchor.classList.toggle("is-stuck", !entry.isIntersecting);
        },
        { threshold: 0 }
      );
      stickyObserver.observe(marker);
    };

    const disableSticky = () => {
      anchor.classList.remove("is-stuck");
      stickyObserver?.disconnect();
      resizeObserver?.disconnect();
      stickyObserver = undefined;
      resizeObserver = undefined;
    };

    const syncMode = () => {
      disableSticky();
      if (desktopQuery.matches) enableSticky();
    };

    syncMode();
    desktopQuery.addEventListener("change", syncMode);
    window.addEventListener("resize", syncStickyHeight);

    return () => {
      desktopQuery.removeEventListener("change", syncMode);
      window.removeEventListener("resize", syncStickyHeight);
      disableSticky();
    };
  }, []);

  return null;
}
