import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-drop" />
        <span className="brand-ring">C</span>
      </span>
      {!compact && (
        <span className="brand-copy">
          <strong>CUP CLUB</strong>
          <small>INKSIDE COMMUNITY</small>
        </span>
      )}
    </Link>
  );
}