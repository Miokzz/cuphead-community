"use client";
import { FormEvent,useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { users } from "@/data/demo";
import { useCommunity } from "@/components/CommunityProvider";
export default function MessageThread(){const {username}=useParams<{username:string}>();const c=useCommunity();const user=users.find(u=>u.username===username)||users[1];const [body,setBody]=useState("");const msgs=c.messages[username]||[];function submit(e:FormEvent){e.preventDefault();c.sendMessage(username,body);setBody("")}return <AppShell title={user.name} eyebrow="Direct message"><div className="chat-window"><header><Link href={`/u/${user.username}`}><Avatar user={user}/></Link><div><b>{user.name}</b><span><i/> {user.status}</span></div><Link className="ghost-button" href="/messages">All messages</Link></header><div className="chat-history">{msgs.map(m=><div className={`bubble ${m.from}`} key={m.id}><p>{m.body}</p><small>{m.time}</small></div>)}</div><form className="message-composer" onSubmit={submit}><button type="button">＋</button><input value={body} onChange={e=>setBody(e.target.value)} placeholder={`Message @${user.username}`}/><button className="primary-button" type="submit">Send</button></form></div></AppShell>}
