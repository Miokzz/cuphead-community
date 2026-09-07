"use client";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { useCommunity } from "@/components/CommunityProvider";
import { DioramaHero } from "@/components/DioramaHero";
const names:Record<string,string>={"no-hit-night":"NO-HIT NIGHT","pea-shooter-panic":"PEA SHOOTER PANIC","s-rank-sunday":"S-RANK SUNDAY","under-two":"UNDER TWO"};
export default function ChallengeDetail(){const {slug}=useParams<{slug:string}>();const c=useCommunity();const joined=c.joinedChallenges.has(slug);return <AppShell title={names[slug]||"Challenge"} eyebrow="Community challenge">
  <DioramaHero variant="desk" eyebrow="Contract desk" title="READ THE FINE PRINT." copy="The challenge lives on a physical little desk: contract, seal, pen, lamp and a nervous cup-shaped club mascot watching you sign your evening away." />
  <section className="challenge-detail"><div className="challenge-seal">♛</div><span className="eyebrow">OFFICIAL COMMUNITY EVENT</span><h2>{names[slug]||"CHALLENGE"}</h2><p>Complete the objective, capture proof and submit your run. Community moderators verify qualifying submissions before the leaderboard locks.</p><div className="challenge-facts"><span><small>REWARD</small><b>+500 XP</b></span><span><small>PLAYERS</small><b>286</b></span><span><small>DIFFICULTY</small><b>HARD</b></span><span><small>ENDS</small><b>Tonight</b></span></div><button onClick={()=>c.toggleChallenge(slug)} className={joined?"joined-button large":"primary-button large"}>{joined?"✓ Challenge accepted":"Accept challenge"}</button>{joined&&<div className="submission-box"><b>SUBMIT YOUR RUN</b><input placeholder="Paste video / proof URL"/><button className="ghost-button" onClick={()=>c.notify("Submission received","Your proof is queued for review.","✓")}>Submit proof</button></div>}</section>
</AppShell>}
