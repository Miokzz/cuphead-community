"use client";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useCommunity } from "@/components/CommunityProvider";
import { DioramaHero } from "@/components/DioramaHero";
const challenges=[
 ["no-hit-night","NO-HIT NIGHT","Clear any boss without taking damage.","HARD",500,286,"Tonight · 21:00"],
 ["pea-shooter-panic","PEA SHOOTER PANIC","Starting weapon only. No super arts.","NORMAL",250,812,"3 days left"],
 ["s-rank-sunday","S-RANK SUNDAY","Post your cleanest S-Rank of the week.","LEGENDARY",900,164,"Sunday"],
 ["under-two","UNDER TWO","Finish a qualifying encounter under two minutes.","HARD",450,392,"5 days left"]
] as const;
export default function ChallengesPage(){const c=useCommunity();return <AppShell title="Challenges" eyebrow="Sign the dangerous paper"><DioramaHero variant="desk" eyebrow="Contract office" title="PICK YOUR PROBLEM." copy="Every challenge starts on the same strange little desk: lamp on, pen ready, contract stamped, consequences pending."/><div className="challenge-grid">{challenges.map(([slug,name,desc,diff,xp,count,time],i)=><article className={`challenge-poster ch-${i+1}`} key={slug}><div className="challenge-stamp">{diff}</div><small>{time}</small><h2>{name}</h2><p>{desc}</p><div className="challenge-meta"><span><b>+{xp}</b> XP</span><span><b>{count}</b> joined</span></div><footer><Link href={`/challenges/${slug}`} className="ghost-button">Details</Link><button className={c.joinedChallenges.has(slug)?"joined-button":"primary-button"} onClick={()=>c.toggleChallenge(slug)}>{c.joinedChallenges.has(slug)?"✓ Accepted":"Accept"}</button></footer></article>)}</div></AppShell>}
