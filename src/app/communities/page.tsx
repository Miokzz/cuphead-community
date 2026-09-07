"use client";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useCommunity } from "@/components/CommunityProvider";
import { DioramaHero } from "@/components/DioramaHero";
const communities = [["boss-strategies","Boss Strategies","Tactics, patterns and loadouts without thirty-minute intros.",4812,"♟"],["fan-art","Fan Art","Posters, sketches, animation tests and glorious ink spills.",7360,"✒"],["speedrunning","Speedrunning","Routes, splits, records and frames that absolutely matter.",2944,"⏱"],["lore","Lore & Secrets","Contracts, islands, background details and theories.",3511,"⌕"],["challenges","Challenges","Community events with rules, rankings and bragging rights.",4206,"♛"],["memes","Memes","Where good taste goes to get hit by a piano.",9120,"☺"]] as const;
export default function CommunitiesPage(){const c=useCommunity();return <AppShell title="Communities" eyebrow="Pick a table">
  <DioramaHero variant="island" eyebrow="Community map" title="PICK AN ISLAND." copy="The community map is a miniature rubber-hose world: a tiny island, booth, paths, props and a club mascot. Each community becomes a different stop on the map." />
  <div className="community-grid">{communities.map(([slug,name,desc,count,icon],i)=><article className={`community-card cc-${i+1}`} key={slug}><div className="community-icon">{icon}</div><small>{count.toLocaleString()} MEMBERS</small><h2>{name}</h2><p>{desc}</p><footer><Link href={`/community/${slug}`} className="ghost-button">Open</Link><button onClick={()=>c.toggleCommunity(slug)} className={c.joinedCommunities.has(slug)?"joined-button":"primary-button"}>{c.joinedCommunities.has(slug)?"✓ Joined":"Join"}</button></footer></article>)}</div>
</AppShell>}
