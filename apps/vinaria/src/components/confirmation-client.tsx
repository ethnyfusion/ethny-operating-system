"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function ConfirmationClient() {
  const params = useSearchParams();
  const reference = params.get("reference") ?? "VIN-EN-COURS";
  return (
    <div className="confirmation-card">
      <CheckCircle2 size={54} />
      <span className="eyebrow">Demande reçue</span>
      <h1>Votre table peut commencer à se réjouir.</h1>
      <p>
        La demande <strong>{reference}</strong> est enregistrée. Ethny vérifie maintenant la disponibilité avec le caviste, puis vous recevrez la sélection confirmée et le lien de paiement.
      </p>
      <div className="confirmation-steps">
        <span><strong>1</strong> Demande reçue — confirmation sous 24 h</span>
        <span><strong>2</strong> Sélection validée + lien Stripe 72 h</span>
        <span><strong>3</strong> Préparation caviste puis livraison</span>
      </div>
      <p className="mail-note"><Mail size={16} /> Un email “Demande reçue” vient confirmer le récapitulatif.</p>
      <Link className="primary-button" href={`/tracking?reference=${encodeURIComponent(reference)}`}>
        Suivre ma commande <ArrowRight size={17} />
      </Link>
    </div>
  );
}
