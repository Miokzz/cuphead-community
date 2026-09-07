import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { posts } from "@/data/demo";
import { PostCard } from "@/components/PostCard";
const topics=[
 ["boss-strategies","Boss Strategies","Tactics without thirty-minute intros."],
 ["fan-art","Fan Art","Sketchbooks, posters and ink spills."],
 ["speedrunning","Speedrunning","Frames matter. So do questionable choices."],
 ["lore","Lore","Contracts, islands and tiny details."],
 ["challenges","Challenges","Community events with actual stakes."],
 ["memes","Memes","Where good taste goes to get hit by a piano."]
];
export default function ExplorePage() {return <AppShell title="Explore" eyebrow="Find your corner"><div className="topic-grid">{topics.map(([slug,topic,desc],i)=><Link href={`/community/${slug}`} className={`topic-card topic-${i+1}`} key={topic}><small>{118+i*73} online</small><h3>{topic}</h3><p>{desc}</p><b>OPEN →</b></Link>)}</div><h2 className="content-heading">Trending now</h2><div className="feed-column">{posts.slice(1).map(post=><PostCard post={post} key={post.id}/>)}</div></AppShell>}
