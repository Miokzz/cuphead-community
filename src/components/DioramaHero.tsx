import Link from "next/link";
import { RetroPropScene, type RetroSceneVariant } from "./RetroPropScene";

export function DioramaHero({
  variant,
  eyebrow,
  title,
  copy,
  action,
  href,
  children,
}: {
  variant: RetroSceneVariant;
  eyebrow: string;
  title: string;
  copy: string;
  action?: string;
  href?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-diorama diorama-${variant}`}>
      <div className="diorama-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
        {action && href ? <Link href={href} className="ghost-button diorama-action">{action}</Link> : null}
        {children}
      </div>
      <div className="diorama-stage">
        <span className="diorama-stamp">LIVE SET · 1936</span>
        <RetroPropScene variant={variant} />
      </div>
    </section>
  );
}