"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Avatar } from "@/components/Avatar";
import { achievements, users } from "@/data/demo";
import { PostCard } from "@/components/PostCard";
import { useCommunity } from "@/components/CommunityProvider";

export default function ProfilePage() {
  const {username}=useParams<{username:string}>();
  const c=useCommunity();
  const user = users.find(u => u.username === username) || {...users[0],username,name:username};
  const isSelf = username === c.authUsername || username === "inkrunner";
  const friend = c.friends.has(username);
  return (
    <AppShell title={`@${user.username}`} eyebrow="Player profile">
      <section className="profile-card">
        <div className="profile-banner"><span>INKSIDE MEMBER</span><div className="banner-lines"/></div>
        <div className="profile-core">
          <Avatar user={user} size="lg" />
          <div><h2>{user.name}</h2><span>@{user.username}</span><p>{user.customStatus}</p></div>
          {isSelf?<Link href="/settings" className="ghost-button">Edit profile</Link>:<><button onClick={()=>c.toggleFriend(username)} className={friend?"joined-button":"primary-button"}>{friend?"✓ Friends":"Add friend"}</button><Link className="ghost-button" href={`/messages/${username}`}>Message</Link></>}
        </div>
        <div className="profile-stats"><span><b>{user.level}</b>Level</span><span><b>1.2K</b>Followers</span><span><b>{friend?285:284}</b>Friends</span><span><b>18</b>Achievements</span></div>
      </section>
      <div className="profile-columns"><section><h2 className="content-heading">Recent posts</h2><div className="feed-column">{c.posts.slice(0,2).map(p => <PostCard post={{...p, author:user}} key={p.id} />)}</div></section><aside><h2 className="content-heading">Pinned achievements</h2>{achievements.slice(0,3).map(a => <Link href="/achievements" className="mini-achievement" key={a.id}><span>{a.icon}</span><div><b>{a.name}</b><small>{a.rarity}</small></div></Link>)}</aside></div>
    </AppShell>
  );
}
