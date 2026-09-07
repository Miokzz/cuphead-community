"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

const prettyDestination = (pathname: string, fallback = "NEXT REEL") => {
  const part = pathname.split("/").filter(Boolean)[0];
  const names: Record<string,string> = {
    home:"HOME FEED",explore:"EXPLORE",communities:"COMMUNITIES",community:"COMMUNITY",
    friends:"FRIENDS",messages:"PRIVATE LINE",leaderboards:"HIGH SCORES",achievements:"TROPHY CABINET",
    challenges:"CONTRACT DESK",notifications:"NOTIFICATIONS",settings:"SETTINGS",u:"PROFILE",post:"POST"
  };
  return names[part] || fallback;
};

export function SiteEffects() {
  const pathname = usePathname();
  const router = useRouter();
  const iris = useRef<HTMLDivElement>(null);
  const irisLabel = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const trailHost = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const origin = useRef({ x: 50, y: 50 });
  const [destination,setDestination]=useState("NEXT REEL");

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onClick = (event: MouseEvent) => {
      if (reduced || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname || url.hash) return;
      event.preventDefault();
      if (!iris.current || pending.current) return;

      pending.current = true;
      const label=(anchor.textContent||"").trim().replace(/\s+/g," ").slice(0,28);
      setDestination(prettyDestination(url.pathname,label||"NEXT REEL"));
      origin.current = { x: (event.clientX / innerWidth) * 100, y: (event.clientY / innerHeight) * 100 };
      const at = `${origin.current.x}% ${origin.current.y}%`;
      gsap.killTweensOf([iris.current, irisLabel.current]);
      gsap.set(iris.current, { clipPath: `circle(0% at ${at})`, pointerEvents: "auto" });
      gsap.set(irisLabel.current, { opacity: 0, scale: .72, rotate: -7, y: 12 });
      const tl = gsap.timeline({ onComplete: () => router.push(url.pathname + url.search) });
      tl.to(iris.current, { clipPath: `circle(155vmax at ${at})`, duration: .31, ease: "power4.in" })
        .to(irisLabel.current, { opacity: 1, scale: 1, rotate: 0, y:0, duration: .19, ease: "back.out(2.3)" }, "-=.11")
        .to(".iris-clapper",{rotate:-8,duration:.07,yoyo:true,repeat:1,ease:"power1.inOut"},"-=.08");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (!pending.current || !iris.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const at = `${origin.current.x}% ${origin.current.y}%`;
    const tl = gsap.timeline({ onComplete: () => {
      pending.current = false;
      if (iris.current) iris.current.style.pointerEvents = "none";
    }});
    tl.to(irisLabel.current, { opacity: 0, scale: .9, y:-8, duration: .1 })
      .to(iris.current, { clipPath: `circle(0% at ${at})`, duration: .34, ease: "power4.out" }, "-=.01");
  }, [pathname]);

  useEffect(() => {
    if (!cursor.current || matchMedia("(pointer: coarse)").matches) return;
    const el = cursor.current;
    const x = gsap.quickTo(el, "x", { duration: .13, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: .13, ease: "power3.out" });
    let last=0;
    const move = (e: PointerEvent) => {
      x(e.clientX); y(e.clientY);
      if(!trailHost.current || performance.now()-last<42) return;
      last=performance.now();
      const dot=document.createElement("i");
      dot.className="ink-trail-dot";
      dot.style.left=`${e.clientX}px`;dot.style.top=`${e.clientY}px`;
      trailHost.current.appendChild(dot);
      gsap.fromTo(dot,{scale:.85,opacity:.28},{scale:.15,opacity:0,x:(Math.random()-.5)*16,y:8+Math.random()*12,duration:.55,ease:"power2.out",onComplete:()=>dot.remove()});
    };
    const down = () => gsap.to(el, { scale: .48, rotate: 22, duration: .09 });
    const up = () => gsap.to(el, { scale: 1, rotate: 0, duration: .18, ease: "back.out(2)" });
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); };
  }, []);

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const selector = ".post-card,.community-card,.challenge-poster,.achievement-card,.landing-post,.rail-card,.diorama-stage,.world-link";
    const cards = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const cleanups = cards.map(card => {
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        card.style.setProperty("--tilt-x", `${(-py * 4.3).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(px * 5.3).toFixed(2)}deg`);
        card.style.setProperty("--shine-x", `${((px + .5) * 100).toFixed(1)}%`);
        card.style.setProperty("--shine-y", `${((py + .5) * 100).toFixed(1)}%`);
      };
      const leave = () => {
        card.style.setProperty("--tilt-x", "0deg"); card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--shine-x", "50%"); card.style.setProperty("--shine-y", "50%");
      };
      card.addEventListener("pointermove", move); card.addEventListener("pointerleave", leave);
      return () => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); };
    });
    return () => cleanups.forEach(fn => fn());
  }, [pathname]);

  return <>
    <div ref={iris} className="route-iris" aria-hidden="true">
      <div className="iris-rings" />
      <div className="iris-sprocket left"/><div className="iris-sprocket right"/>
      <div ref={irisLabel} className="iris-label">
        <div className="iris-clapper"><b>C</b><i/></div>
        <small>NOW SHOWING</small><span>{destination}</span>
      </div>
    </div>
    <div ref={trailHost} className="ink-trail" aria-hidden="true" />
    <div ref={cursor} className="ink-cursor" />
  </>;
}