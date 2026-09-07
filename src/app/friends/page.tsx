"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { users, currentUser } from "@/data/demo";
import { useCommunity } from "@/components/CommunityProvider";

export default function FriendsPage() {
  const [tab, setTab] = useState("Online");
  const c = useCommunity();
  const people = users.filter(u => u.id !== currentUser.id);
  const filtered = people.filter(u => {
    if(tab === "Online") return u.status === "online" && c.friends.has(u.username);
    if(tab === "All") return c.friends.has(u.username);
    if(tab === "Pending") return !c.friends.has(u.username);
    return false;
  });

  return (
    <AppShell title="Friends" eyebrow="Your crew">
      <div className="sub-tabs">{["Online", "All", "Pending", "Blocked"].map(item => <button onClick={() => setTab(item)} className={tab === item ? "active" : ""} key={item}>{item}</button>)}</div>
      <div className="friends-list">
        {filtered.map(user => (
          <article className="friend-row" key={user.id}>
            <Link href={`/u/${user.username}`}><Avatar user={user} /></Link>
            <div><Link href={`/u/${user.username}`}><strong>{user.name}</strong></Link><span>@{user.username}</span><small>{user.customStatus}</small></div>
            <span className="friend-level">LV {user.level}</span>
            <div className="friend-actions"><Link className="ghost-button" href={`/messages/${user.username}`}>Message</Link><button className="primary-button small" onClick={()=>c.toggleFriend(user.username)}>{c.friends.has(user.username)?"Remove":"Accept"}</button></div>
          </article>
        ))}
        {filtered.length===0 && <div className="empty-card"><b>{tab === "Blocked" ? "No blocked players." : "Nothing in this pile."}</b><span>The desk is suspiciously clean.</span></div>}
      </div>
    </AppShell>
  );
}
