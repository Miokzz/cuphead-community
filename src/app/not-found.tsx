import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="lost-ring">404</div>
      <span className="eyebrow">Film reel missing</span>
      <h1>THIS SCENE<br />NEVER EXISTED.</h1>
      <p>Somebody cut this page out of the reel.</p>
      <Link href="/home" className="primary-button large">Return to the show</Link>
    </main>
  );
}
