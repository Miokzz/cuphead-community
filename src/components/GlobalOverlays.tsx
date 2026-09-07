"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { achievements, users } from "@/data/demo";
import { useCommunity } from "./CommunityProvider";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import type { PostKind } from "@/types/community";

const kinds: PostKind[] = ["Discussion", "Fan Art", "Guide", "Speedrun", "Achievement"];

export function GlobalOverlays() {
  const c = useCommunity();
  const router = useRouter();
  const [postBody, setPostBody] = useState("");
  const [kind, setKind] = useState<PostKind>("Discussion");
  const [query, setQuery] = useState("");
  const [posting, setPosting] = useState(false);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return [
      ...users.filter(u => `${u.name} ${u.username}`.toLowerCase().includes(q)).map(u => ({ icon: "☺", label: u.name, meta: `@${u.username}`, href: `/u/${u.username}` })),
      ...c.posts.filter(p => p.content.toLowerCase().includes(q)).slice(0,4).map(p => ({ icon: "✒", label: p.content.slice(0,54), meta: p.kind, href: `/post/${p.id}` })),
      ...achievements.filter(a => a.name.toLowerCase().includes(q)).map(a => ({ icon: a.icon, label: a.name, meta: "Achievement", href: "/achievements" }))
    ].slice(0,9);
  }, [query, c.posts]);

  async function publish() {
    if (postBody.trim().length < 2) return;
    setPosting(true);
    await c.createPost(postBody.trim(), kind);
    setPostBody("");
    setPosting(false);
  }

  return <>
    {c.composerOpen && <div className="backdrop" onMouseDown={c.closeComposer}>
      <section className="composer-modal" onMouseDown={e => e.stopPropagation()}>
        <header><div><span className="eyebrow">New transmission</span><h2>CREATE POST</h2></div><button className="icon-button" onClick={c.closeComposer}>×</button></header>
        <div className="composer-user"><Avatar user={users[0]} /><span><b>{c.authUsername || users[0].name}</b><small>{c.signedIn ? "Posting to the live community" : "Guest preview · saved on this device"}</small></span></div>
        <textarea autoFocus value={postBody} onChange={e => setPostBody(e.target.value)} maxLength={5000} placeholder="Share a run, guide, drawing or terrible decision..." />
        <div className="post-kinds">{kinds.map(item => <button key={item} className={kind===item?"active":""} onClick={()=>setKind(item)}>{item}</button>)}</div>
        <footer><span>{postBody.length}/5000</span><button className="primary-button" disabled={posting || postBody.trim().length < 2} onClick={publish}>{posting ? "Broadcasting..." : "Broadcast post"}</button></footer>
      </section>
    </div>}

    {c.searchOpen && <div className="backdrop palette-backdrop" onMouseDown={c.closeSearch}>
      <section className="command-palette" onMouseDown={e => e.stopPropagation()}>
        <div className="command-head"><Icon name="search"/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search people, posts, achievements..."/><kbd>ESC</kbd></div>
        <div className="command-results">
          {!query && [["⌂","Home","/home"],["◎","Communities","/communities"],["✉","Messages","/messages"],["♛","Challenges","/challenges"],["★","Achievements","/achievements"],["⚙","Settings","/settings"]].map(([icon,label,href])=><button className="command-result" key={href} onClick={()=>{c.closeSearch();router.push(href)}}><span>{icon}</span><b>{label}</b><small>{href}</small></button>)}
          {query && results.length===0 && <div className="command-empty">No ink found for “{query}”.</div>}
          {results.map(item=><button className="command-result" key={`${item.href}-${item.label}`} onClick={()=>{c.closeSearch();router.push(item.href)}}><span>{item.icon}</span><b>{item.label}</b><small>{item.meta}</small></button>)}
        </div>
      </section>
    </div>}

    {c.notificationsOpen && <button className="drawer-scrim" aria-label="Close notifications" onClick={c.closeNotifications}/>}
    <aside className={`notification-drawer ${c.notificationsOpen?"open":""}`}>
      <div className="drawer-header"><div><span className="eyebrow">Incoming</span><h2>NOTIFICATIONS</h2></div><button onClick={c.closeNotifications}>×</button></div>
      <button className="text-action" onClick={c.markNotificationsRead}>Mark all as read</button>
      <div className="drawer-list">{c.notifications.map(n=><Link href={n.href} onClick={c.closeNotifications} className={`drawer-item ${n.read?"":"unread"}`} key={n.id}><span>{n.icon}</span><div><b>{n.title}</b><p>{n.body}</p><small>{n.time}</small></div></Link>)}</div>
      <Link href="/notifications" onClick={c.closeNotifications} className="drawer-footer">Open notification center →</Link>
    </aside>

    {c.toasts.map(t=><div className="toast" key={t.id}><span>{t.icon}</span><div><small>COMMUNITY UPDATE</small><b>{t.title}</b>{t.body&&<p>{t.body}</p>}</div></div>)}
  </>;
}