"use client";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { achievements } from "@/data/demo";
import { useCommunity } from "@/components/CommunityProvider";
import { DioramaHero } from "@/components/DioramaHero";

export default function AchievementsPage(){const [filter,setFilter]=useState("All");const c=useCommunity();const shown=filter==="All"?achievements:achievements.filter(a=>a.rarity===filter);return <AppShell title="Achievements" eyebrow="Your cabinet">
  <DioramaHero variant="cabinet" eyebrow="Trophy cabinet" title="KEEP THE RECEIPTS." copy="A tiny cabinet of trophies, records, dice and odd souvenirs. As your account grows, this is where the visual rewards are meant to become part of your profile identity." />
  <div className="achievement-summary"><div><small>Unlocked</small><strong>18</strong><span>of 64</span></div><div><small>Total XP</small><strong>3,950</strong><span>from achievements</span></div><div><small>Rarest</small><strong>1.8%</strong><span>global unlock rate</span></div></div><div className="sub-tabs centered">{["All","Rare","Epic","Legendary"].map(x=><button className={filter===x?"active":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div><div className="achievement-grid">{shown.map(a=><button onClick={()=>c.notify(a.progress===100?"Achievement unlocked":`${a.progress}% complete`,a.description,a.icon)} className={`achievement-card rarity-${a.rarity.toLowerCase()}`} key={a.id}><span className="achievement-icon">{a.icon}</span><div><small>{a.rarity}</small><h3>{a.name}</h3><p>{a.description}</p></div><div className="achievement-progress"><i style={{width:`${a.progress}%`}}/></div><footer><span>{a.progress}%</span><b>+{a.xp} XP</b></footer></button>)}</div>
</AppShell>}
