import { Suspense } from "react";
import { ConfirmationClient } from "@/components/confirmation-client";

export const metadata = { title: "Confirmation" } as const;

export default function ConfirmationPage() {
  return (
    <section className="confirmation-section">
      <div className="shell narrow">
        <Suspense fallback={<div className="confirmation-card">Confirmation en cours…</div>}>
          <ConfirmationClient />
        </Suspense>
      </div>
    </section>
  );
}
