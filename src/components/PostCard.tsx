"use client";

import Link from "next/link";
import type { CommunityPost } from "@/types/community";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { useCommunity } from "./CommunityProvider";

export function PostCard({ post }: { post: CommunityPost }) {
  const c = useCommunity();
  const liked = c.liked.has(post.id);
  const saved = c.saved.has(post.id);

  return (
    <article className={`post-card accent-${post.accent}`}>
      <div className="post-topline">
        <Link href={`/u/${post.author.username}`}><Avatar user={post.author} /></Link>
        <div className="post-author">
          <div>
            <Link href={`/u/${post.author.username}`}><strong>{post.author.name}</strong></Link>
            {post.author.verified && <span className="verified">✓</span>}
            <span>@{post.author.username}</span>
          </div>
          <small>{post.createdAt} · {post.kind}</small>
        </div>
        <button className="icon-button" onClick={()=>c.notify("Post menu", "Report, copy link and moderation actions are available here.", "•••")} aria-label="Post menu">•••</button>
      </div>

      <Link href={`/post/${post.id}`}><p className="post-copy">{post.content}</p></Link>

      <Link href={`/post/${post.id}`} className="poster-placeholder" aria-label={`${post.kind} visual`}>
        <span className="poster-kicker">{post.kind.toUpperCase()}</span>
        <strong>{post.kind === "Fan Art" ? "THE MIDNIGHT INK SHOW" : post.kind === "Speedrun" ? "SECONDS ARE CONTRACTS" : "GOOD GAME. BAD IDEAS."}</strong>
        <small>Community transmission · frame 1936</small>
        <i />
      </Link>

      <div className="post-actions">
        <button className={liked ? "active pop" : ""} onClick={() => c.toggleLike(post.id)}>
          <Icon name="heart" size={18} /> {post.likes + (liked ? 1 : 0)}
        </button>
        <Link className="post-action-link" href={`/post/${post.id}`}>
          <Icon name="comment" size={18} /> {post.comments}
        </Link>
        <button className={saved ? "active" : ""} onClick={() => c.toggleSave(post.id)}>
          <Icon name="bookmark" size={18} /> {post.saves + (saved ? 1 : 0)}
        </button>
      </div>
    </article>
  );
}