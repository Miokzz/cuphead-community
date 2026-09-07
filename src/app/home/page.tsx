"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PostCard } from "@/components/PostCard";
import { currentUser } from "@/data/demo";
import { Avatar } from "@/components/Avatar";
import { useCommunity } from "@/components/CommunityProvider";

export default function HomePage() {
  const c = useCommunity();
  const [tab,setTab] = useState("For you");
  const shown = tab === "Fresh ink" ? [...c.posts].reverse() : c.posts;
  return (
    <AppShell title="Home" eyebrow="Good afternoon">
      <div className="feed-grid">
        <div className="feed-column">
          <button className="composer-card" onClick={c.openComposer}>
            <Avatar user={currentUser} />
            <span>Share a run, guide, drawing or terrible decision...</span>
            <i>＋</i>
          </button>
          <div className="feed-tabs">
            {["For you", "Following", "Fresh ink"].map(x=><button onClick={()=>setTab(x)} className={tab===x?"active":""} key={x}>{x}</button>)}
          </div>
          {shown.map(post => <PostCard post={post} key={post.id} />)}
        </div>
      </div>
    </AppShell>
  );
}
