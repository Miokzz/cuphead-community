"use client";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { leaderboard } from "@/data/demo";
import { Avatar } from "@/components/Avatar";
import { DioramaHero } from "@/components/DioramaHero";

export default function LeaderboardsPage(){
  const [period,setPeriod]=useState("Weekly");
  return <AppShell title="Leaderboards" eyebrow={`${period} transmission`}>
    <DioramaHero variant="casino" eyebrow="High score room" title="ROLL FOR GLORY." copy="A little casino stage for the people who turned community participation into a competitive sport. Coins, dice and the weekly trophy all live here." />
    <div className="sub-tabs centered">{["Weekly","Monthly","All time"].map(x=><button className={period===x?"active":""} onClick={()=>setPeriod(x)} key={x}>{x}</button>)}</div>
    <div className="leader-hero">{leaderboard.slice(0,3).map(entry=><article className={`leader-poster rank-${entry.rank}`} key={entry.user.id}><span>#{entry.rank}</span><Avatar user={entry.user} size="lg"/><small>{entry.user.title}</small><h3>{entry.user.name}</h3><b>{(entry.score+(period==="Monthly"?3200:period==="All time"?18100:0)).toLocaleString()} XP</b></article>)}</div>
    <div className="leader-table"><div className="leader-table-head"><span>Rank</span><span>Player</span><span>Level</span><span>Score</span><span>Move</span></div>{leaderboard.map(entry=><div className="leader-table-row" key={entry.user.id}><strong>#{String(entry.rank).padStart(2,"0")}</strong><span className="table-user"><Avatar user={entry.user} size="sm"/><b>{entry.user.name}</b></span><span>Lv. {entry.user.level}</span><span>{entry.score.toLocaleString()}</span><span className={entry.change>0?"up":entry.change<0?"down":""}>{entry.change>0?`↑ ${entry.change}`:entry.change<0?`↓ ${Math.abs(entry.change)}`:"—"}</span></div>)}</div>
  </AppShell>;
}
