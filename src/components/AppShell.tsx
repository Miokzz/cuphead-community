"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "./Brand";
import { Icon } from "./Icon";
import { Avatar } from "./Avatar";
import { currentUser, users } from "@/data/demo";
import { useCommunity } from "./CommunityProvider";
import { GlobalOverlays } from "./GlobalOverlays";
import { AppWorld3D } from "./AppWorld3D";

const nav = [
  { href: "/home", label: "Home", icon: "home" as const },
  { href: "/explore", label: "Explore", icon: "explore" as const },
  { href: "/communities", label: "Communities", icon: "friends" as const },
  { href: "/friends", label: "Friends", icon: "friends" as const },
  { href: "/messages", label: "Messages", icon: "comment" as const },
  { href: "/leaderboards", label: "Leaderboards", icon: "rank" as const },
  { href: "/achievements", label: "Achievements", icon: "award" as const },
  { href: "/challenges", label: "Challenges", icon: "award" as const }
];

export function AppShell({ children, title, eyebrow }: { children: React.ReactNode; title: string; eyebrow?: string }) {
  const pathname = usePathname();
  const c = useCommunity();

  return (
    <div className="app-layout">
      <div className="film-layer app-film" />
      <aside className="side-nav">
        <Link href="/"><Brand /></Link>
        <nav>
          {nav.map(item => (
            <Link key={item.href} href={item.href} className={pathname.startsWith(item.href) ? "active" : ""}>
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="side-bottom">
          <Link href={`/u/${c.authUsername || currentUser.username}`} className="mini-user">
            <Avatar user={currentUser} size="sm" />
            <span><strong>{c.authUsername || currentUser.name}</strong><small>{c.signedIn ? "Live account" : `Lv. ${currentUser.level}`}</small></span>
          </Link>
          <Link href="/settings" className="icon-button" aria-label="Settings"><Icon name="settings" /></Link>
        </div>
      </aside>

      <main className="main-panel">
        <header className="app-header">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
          </div>
          <div className="header-actions">
            <button className="search-pill" onClick={c.openSearch}><Icon name="search" size={17} /> Search <kbd>Ctrl K</kbd></button>
            <button className="icon-button notification-dot" onClick={c.openNotifications} aria-label="Notifications"><Icon name="bell" /></button>
            <button className="primary-button small" onClick={c.openComposer}><Icon name="plus" size={17} /> Post</button>
          </div>
        </header>
        <div className="app-content page-enter">{children}</div>
      </main>

      <aside className="right-rail">
        <AppWorld3D />
        <section className="rail-card">
          <div className="section-heading"><span>Friends online</span><b>{users.filter(u => u.status === "online").length}</b></div>
          <div className="online-list">
            {users.filter(u => u.id !== currentUser.id).map(user => (
              <Link href={`/messages/${user.username}`} className="online-row" key={user.id}>
                <Avatar user={user} size="sm" />
                <span><strong>{user.name}</strong><small>{user.customStatus}</small></span>
              </Link>
            ))}
          </div>
        </section>
        <Link href="/challenges/no-hit-night" className="rail-card challenge-card">
          <span className="eyebrow">Tonight · 21:00</span>
          <h3>NO-HIT NIGHT</h3>
          <p>One boss. One life. Zero excuses.</p>
          <div className="challenge-meter"><i style={{ width: "68%" }} /></div>
          <small>286 players joined · Open challenge →</small>
        </Link>
      </aside>

      <nav className="mobile-nav">
        {nav.slice(0, 4).map(item => (
          <Link key={item.href} href={item.href} className={pathname.startsWith(item.href) ? "active" : ""}><Icon name={item.icon} /></Link>
        ))}
        <Link href={`/u/${c.authUsername || currentUser.username}`}><Icon name="user" /></Link>
      </nav>
      <GlobalOverlays />
    </div>
  );
}