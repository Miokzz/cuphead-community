import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { users,currentUser } from "@/data/demo";
import { Avatar } from "@/components/Avatar";
import { DioramaHero } from "@/components/DioramaHero";

export default function MessagesPage(){return <AppShell title="Messages" eyebrow="Private line">
  <DioramaHero variant="radio" eyebrow="Late-night frequency" title="YOU'RE ON THE AIR." copy="A private radio booth for direct messages. The mic, record and old receiver all move independently while the actual conversation stays fast and readable." />
  <div className="inbox-card"><header><span>CONVERSATIONS</span><b>3 active</b></header>{users.filter(u=>u.id!==currentUser.id).map((u,i)=><Link href={`/messages/${u.username}`} className="inbox-row" key={u.id}><Avatar user={u}/><div><b>{u.name}</b><span>{["You joining No-Hit Night?","Found another 0.4s.","I posted the lore thread."][i]}</span></div><small>{["now","42m","1h"][i]}</small></Link>)}</div>
</AppShell>}
