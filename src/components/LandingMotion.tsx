"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LandingMotion(){
  useEffect(()=>{
    if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx=gsap.context(()=>{
      gsap.from(".landing-nav > *",{y:-24,opacity:0,duration:.7,stagger:.08,ease:"power3.out"});
      gsap.from(".hero-copy .eyebrow",{x:-30,opacity:0,duration:.7,delay:.15});
      gsap.from(".hero-copy h1",{y:80,rotate:-2,opacity:0,duration:1.05,delay:.2,ease:"expo.out"});
      gsap.from(".hero-copy > p,.hero-actions,.live-strip",{y:28,opacity:0,duration:.8,stagger:.12,delay:.42,ease:"power3.out"});
      gsap.from(".hero-ticket",{x:100,y:80,rotate:30,opacity:0,duration:1.2,delay:.55,ease:"elastic.out(1,.55)"});
      gsap.to(".hero-ticket",{y:-11,rotate:4,duration:2.6,repeat:-1,yoyo:true,ease:"sine.inOut"});
      document.querySelectorAll(".landing-section").forEach(section=>{
        gsap.from(section,{scrollTrigger:{trigger:section,start:"top 82%"},y:70,opacity:0,duration:.9,ease:"power3.out"});
      });
      gsap.from(".landing-post",{scrollTrigger:{trigger:".landing-posts",start:"top 83%"},y:110,rotate:8,opacity:0,duration:.85,stagger:.13,ease:"back.out(1.4)"});
      gsap.from(".podium-card",{scrollTrigger:{trigger:".scoreboard-stage",start:"top 80%"},scaleY:.1,transformOrigin:"bottom",opacity:0,duration:.9,stagger:.12,ease:"back.out(1.5)"});
      gsap.to(".achievement-spark",{scale:1.18,duration:.6,repeat:-1,yoyo:true,ease:"sine.inOut"});
    });
    return()=>ctx.revert();
  },[]);
  return null;
}