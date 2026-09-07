"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export function IntroOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("cupclub:intro")) return;

    setVisible(true);
    sessionStorage.setItem("cupclub:intro", "1");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".intro-ring", { scale: 0.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55 })
        .fromTo(".intro-word", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.2")
        .to(".intro-overlay", { clipPath: "circle(0% at 50% 50%)", duration: 0.85, ease: "power4.inOut", delay: 0.25 })
        .call(() => setVisible(false));
    });

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-overlay">
      <div className="intro-ring"><span>C</span></div>
      <div className="intro-word">CUP CLUB</div>
    </div>
  );
}