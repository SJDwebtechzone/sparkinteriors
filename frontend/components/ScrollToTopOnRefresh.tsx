"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Tell browser not to restore previous scroll position on reload or back/forward
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // 2. Immediately scroll to the start of the page
      window.scrollTo(0, 0);

      // 3. Reset scroll position on window load and beforeunload
      const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
      };

      const handleLoad = () => {
        window.scrollTo(0, 0);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  // 4. Ensure navigation between different pages also starts at the top
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
