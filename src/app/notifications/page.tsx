"use client";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useCommunity } from "@/components/CommunityProvider";
export default function NotificationsPage(){const c=useCommunity();return <AppShell title="Notifications" eyebrow="Incoming transmissions"><div className="notifications-page"><div className="notifications-toolbar"><span>{c.notifications.filter(n=>!n.read).length} unread</span><button className="ghost-button" onClick={c.markNotificationsRead}>Mark all read</button></div>{c.notifications.map(n=><Link href={n.href} className={`notification-page-row ${n.read?"":"unread"}`} key={n.id}><span>{n.icon}</span><div><b>{n.title}</b><p>{n.body}</p></div><small>{n.time}</small></Link>)}</div></AppShell>}
