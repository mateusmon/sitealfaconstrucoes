"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function MotionProvider() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      duration: 600,
      easing: "ease-out-sine",
    });
  }, []);

  return null;
}
