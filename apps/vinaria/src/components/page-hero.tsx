import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-motif" aria-hidden="true" />
      <div className="shell narrow">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {children && <div className="hero-copy">{children}</div>}
      </div>
    </section>
  );
}
