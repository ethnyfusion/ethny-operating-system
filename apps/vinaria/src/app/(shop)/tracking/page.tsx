import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { TrackingClient } from "@/components/tracking-client";

export const metadata = { title: "Suivi de commande" } as const;

export default function TrackingPage() {
  return (
    <>
      <PageHero eyebrow="Suivi" title="Votre sélection, étape par étape.">
        <p>Utilisez la référence reçue dans votre email de confirmation.</p>
      </PageHero>
      <section className="content-section"><div className="shell narrow">
        <Suspense fallback={<div className="notice">Chargement du suivi…</div>}><TrackingClient /></Suspense>
      </div></section>
    </>
  );
}
