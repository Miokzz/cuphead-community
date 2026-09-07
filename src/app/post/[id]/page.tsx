"use client";
import { FormEvent,useState } from "react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PostCard } from "@/components/PostCard";
import { useCommunity } from "@/components/CommunityProvider";
import { Avatar } from "@/components/Avatar";
import { currentUser,users } from "@/data/demo";
export default function PostDetail(){const {id}=useParams<{id:string}>();const c=useCommunity();const post=c.posts.find(p=>p.id===id)||c.posts[0];const [text,setText]=useState("");const [comments,setComments]=useState([{id:"c1",user:users[1],body:"That run was cleaner than it had any right to be.",time:"2 min"},{id:"c2",user:users[3],body:"The final phase dodge was cinema.",time:"1 min"}]);function submit(e:FormEvent){e.preventDefault();if(!text.trim())return;setComments(v=>[...v,{id:crypto.randomUUID(),user:currentUser,body:text.trim(),time:"now"}]);setText("")}return <AppShell title="Post" eyebrow="Full transmission"><div className="post-detail"><PostCard post={post}/><section className="comments-card"><h2>Comments</h2><form onSubmit={submit}><Avatar user={currentUser}/><input value={text} onChange={e=>setText(e.target.value)} placeholder="Write a reply..."/><button className="primary-button">Reply</button></form>{comments.map(x=><article key={x.id}><Avatar user={x.user} size="sm"/><div><b>{x.user.name}</b><small>@{x.user.username} · {x.time}</small><p>{x.body}</p><button>Reply</button> <button>♥ Like</button></div></article>)}</section></div></AppShell>}
