"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PostCard } from "@/components/PostCard";
import { useCommunity } from "@/components/CommunityProvider";

const info:Record<string,{name:string;desc:string;rules:string[]}>={
 "boss-strategies":{name:"Boss Strategies",desc:"Patterns, builds and clear explanations for players who would rather fight than watch a 40-minute intro.",rules:["Tag spoilers","Explain the setup","No fake records"]},
 "fan-art":{name:"Fan Art",desc:"The drawing room. Posters, sketches, animation tests and handmade chaos.",rules:["Credit artists","No repost farms","WIP is welcome"]},
 speedrunning:{name:"Speedrunning",desc:"Splits, routes, PBs and the science of shaving frames.",rules:["Show timing method","Label categories","Keep runs verifiable"]},
 lore:{name:"Lore & Secrets",desc:"Tiny background details, contracts, theories and suspicious furniture.",rules:["Mark spoilers","Source claims","Theories are theories"]},
 challenges:{name:"Challenges",desc:"Community events, submissions and seasonal nonsense.",rules:["Follow event rules","One submission per run","Good sportsmanship"]},
 memes:{name:"Memes",desc:"A piano may fall on this page at any time.",rules:["Keep it readable","No harassment","Low effort gets booed"]}
};
export default function CommunityPage(){const {slug}=useParams<{slug:string}>();const c=useCommunity();const d=info[slug]||info["boss-strategies"];return <AppShell title={d.name} eyebrow="Community channel">
 <section className="community-hero"><div><span className="eyebrow">PUBLIC COMMUNITY</span><h2>{d.name.toUpperCase()}</h2><p>{d.desc}</p></div><button className={c.joinedCommunities.has(slug)?"joined-button large":"primary-button large"} onClick={()=>c.toggleCommunity(slug)}>{c.joinedCommunities.has(slug)?"✓ Joined":"Join community"}</button></section>
 <div className="community-layout"><section><div className="community-toolbar"><button className="active">Hot</button><button>New</button><button>Top</button><button className="primary-button small" onClick={c.openComposer}>＋ Create post</button></div><div className="feed-column">{c.posts.slice(0,3).map(p=><PostCard post={p} key={p.id}/>)}</div></section><aside className="rules-card"><small>HOUSE RULES</small><h3>Play nice.</h3>{d.rules.map((r,i)=><p key={r}><b>0{i+1}</b>{r}</p>)}<Link href="/communities">← All communities</Link></aside></div>
 </AppShell>}
