import Link from "next/link";
import { Brand } from "@/components/Brand";
import { InkScene } from "@/components/InkScene";
import { IntroOverlay } from "@/components/IntroOverlay";
import { posts, users } from "@/data/demo";
import { Avatar } from "@/components/Avatar";
import { Icon } from "@/components/Icon";
import { LandingMotion } from "@/components/LandingMotion";
import { RetroPropScene } from "@/components/RetroPropScene";

export default function LandingPage() {
  return (
    <main className="landing">
      <LandingMotion />
      <IntroOverlay />
      <div className="film-layer" />
      <header className="landing-nav">
        <Brand />
        <nav>
          <a href="#community">Community</a>
          <a href="#rankings">Rankings</a>
          <a href="#achievements">Achievements</a>
        </nav>
        <div>
          <Link className="ghost-button" href="/login">Sign in</Link>
          <Link className="primary-button" href="/register">Join the club</Link>
        </div>
      </header>

      <section className="hero">
        <InkScene />
        <div className="hero-copy">
          <span className="eyebrow">Broadcasting live from the inkwell</span>
          <h1>WELCOME TO<br /><em>THE SHOW.</em></h1>
          <p>A living community for players, artists, guide writers, speedrunners and anyone with enough nerve to sign the contract.</p>
          <div className="hero-actions">
            <Link className="primary-button large" href="/home">Enter community <Icon name="arrow" /></Link>
            <a className="ghost-button large" href="#community">See what&apos;s happening</a>
          </div>
          <div className="live-strip">
            <span><i className="live-dot" /> 1,284 online</span>
            <span>22,491 members</span>
            <span>317 posts today</span>
          </div>
        </div>

        <div className="hero-ticket">
          <small>ADMIT ONE</small>
          <b>INKSIDE<br />SOCIAL CLUB</b>
          <span>EST. 1936-ish</span>
          <i>№ 00047</i>
        </div>
      </section>

      <section className="marquee" aria-hidden="true">
        <div>FAN ART ✦ SPEEDRUNS ✦ BOSS GUIDES ✦ CHALLENGES ✦ FRIENDS ✦ ACHIEVEMENTS ✦ FAN ART ✦ SPEEDRUNS ✦</div>
      </section>

      <section className="landing-section world-switchboard">
        <div className="section-title world-title">
          <span className="eyebrow">Pick a reel</span>
          <h2>STEP INTO<br />THE CLUB.</h2>
          <p>Each corner of the community has its own little stage. The props change with the page instead of repeating the same 3D trick everywhere.</p>
        </div>
        <div className="world-grid">
          <Link href="/leaderboards" className="world-link world-casino">
            <div><span>01 · HIGH SCORE ROOM</span><h3>CASINO<br/>SCOREBOARD</h3><p>Trophies, coins, dice and weekly bragging rights.</p></div>
            <RetroPropScene variant="casino" />
          </Link>
          <Link href="/messages" className="world-link world-radio">
            <div><span>02 · PRIVATE LINE</span><h3>RADIO<br/>STUDIO</h3><p>Direct messages broadcast from a tiny late-night booth.</p></div>
            <RetroPropScene variant="radio" />
          </Link>
          <Link href="/challenges" className="world-link world-desk">
            <div><span>03 · SIGN HERE</span><h3>CONTRACT<br/>DESK</h3><p>Challenges, proof submissions and questionable agreements.</p></div>
            <RetroPropScene variant="desk" />
          </Link>
        </div>
      </section>

      <section id="community" className="landing-section activity-showcase">
        <div className="section-title">
          <span className="eyebrow">Tonight on the network</span>
          <h2>THE COMMUNITY<br />NEVER STOPS.</h2>
        </div>

        <RetroPropScene variant="dice" className="landing-prop community-prop" />
        <div className="landing-posts">
          {posts.slice(0, 3).map((post, index) => (
            <article className={`landing-post tilt-${index + 1}`} key={post.id}>
              <div className="post-topline">
                <Avatar user={post.author} />
                <div className="post-author">
                  <strong>{post.author.name}</strong>
                  <small>@{post.author.username} · {post.createdAt}</small>
                </div>
              </div>
              <span className="post-tag">{post.kind}</span>
              <p>{post.content}</p>
              <footer>♥ {post.likes} <span>● {post.comments}</span></footer>
            </article>
          ))}
        </div>
      </section>

      <section id="rankings" className="landing-section scoreboard">
        <div className="scoreboard-copy">
          <span className="eyebrow">Weekly leaderboard</span>
          <h2>MAKE SOME<br />NOISE.</h2>
          <p>Posts, guides, challenges and community contributions all feed a progression system built to reward participation rather than spam.</p>
          <Link href="/leaderboards" className="text-link">Open leaderboards <Icon name="arrow" size={18} /></Link>
        </div>
        <div className="scoreboard-stage">
          <RetroPropScene variant="trophy" className="landing-prop scoreboard-prop" />
          {users.slice(0, 3).map((user, index) => (
            <div className={`podium-card place-${index + 1}`} key={user.id}>
              <small>#{index + 1}</small>
              <Avatar user={user} size="lg" />
              <strong>{user.name}</strong>
              <span>Lv. {user.level}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="achievements" className="landing-section achievement-banner">
        <RetroPropScene variant="contract" className="landing-prop achievement-prop" />
        <div>
          <span className="achievement-spark">★</span>
          <span className="eyebrow">Achievement unlocked</span>
          <h2>YOU FOUND<br />YOUR PEOPLE.</h2>
          <p>Collect titles, profile cosmetics and rare badges by actually participating in the community.</p>
        </div>
        <Link className="primary-button large" href="/register">Create your profile</Link>
      </section>

      <footer className="landing-footer">
        <Brand />
        <p>Original fan-community concept. No official game assets are bundled.</p>
        <span>© 2026 Cup Club</span>
      </footer>
    </main>
  );
}
