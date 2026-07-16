"use client";
/* eslint-disable @next/next/no-img-element */

import {
  CalendarDays,
  Grape,
  Info,
  MapPin,
  Plus,
  RotateCcw,
  Thermometer,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { useState, type KeyboardEvent, type MouseEvent } from "react";
import type { WineProduct } from "@/types";
import { useCart } from "./cart-provider";

const colorLabel = {
  red: "Rouge",
  white: "Blanc",
  rose: "Rosé",
  sparkling: "Effervescent",
  dessert: "Vin doux",
};

const pairingLabel: Record<string, string> = {
  poisson: "poissons",
  crustaces: "crustacés",
  volaille: "volaille",
  boeuf: "bœuf",
  canard: "canard",
  dessert: "desserts",
  aperitif: "apéritif",
  fromage: "fromages",
};

function WineFact({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <span className="wine-fact" title={label}>
      <Icon aria-hidden="true" />
      <em>{value}</em>
    </span>
  );
}

export function WineCard({
  wine,
  note,
  suggestedQuantity,
  serviceLabel,
  variant = "cellar",
}: {
  wine: WineProduct;
  note?: string;
  suggestedQuantity?: number;
  serviceLabel?: string;
  variant?: "cellar" | "recommendation";
}) {
  const { addWine } = useCart();
  const [flipped, setFlipped] = useState(false);
  const isCatalogueCapture = wine.image?.includes("catalogue-");
  const pairings = wine.culinaryTags
    .filter((tag) => pairingLabel[tag])
    .slice(0, 3)
    .map((tag) => pairingLabel[tag]);
  const compact = variant === "recommendation";
  const selectWine = () => addWine(wine, suggestedQuantity ?? 1, note, serviceLabel);
  const pairingText = pairings.length ? pairings.join(" · ") : "accord à confirmer";
  const vintageText = wine.vintage ? String(wine.vintage) : "à confirmer";
  const cellarNote = `${wine.producer} · ${vintageText}`;

  const imageBlock = (
    wine.image ? (
      <div className={isCatalogueCapture ? `wine-source-grid focus-${wine.imageFocus ?? "center"}` : "wine-product-photo"}>
        <img src={wine.image} alt={`${wine.name} — ${wine.producer}`} />
      </div>
    ) : (
      <div className="wine-monogram" aria-hidden="true">{wine.name.charAt(0)}</div>
    )
  );

  function openDetailsFromCard(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    setFlipped(true);
  }

  function openDetailsFromKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setFlipped(true);
  }

  const backFace = (
    <div className="wine-face wine-face-back">
      <button className="wine-flip-close" type="button" onClick={() => setFlipped(false)} aria-label="Revenir à la carte">
        <RotateCcw />
      </button>
      <span className="eyebrow">Fiche vin</span>
      <h3>{wine.name}</h3>
      <p className="producer">{wine.producer}</p>
      <p className="wine-back-description">{note ?? wine.description}</p>
      <div className="wine-back-facts">
        <WineFact icon={Grape} label="Cépage" value={wine.grapes.slice(0, 2).join(", ")} />
        <WineFact icon={MapPin} label="Région" value={wine.region} />
        <WineFact icon={Thermometer} label="Température" value={wine.servingTemperature} />
        <WineFact icon={Utensils} label="Accords rapides" value={pairingText} />
        <WineFact icon={CalendarDays} label="Millésime" value={vintageText} />
      </div>
      <button className="cellar-add" type="button" onClick={selectWine}>
        <Plus />
        <span>Sélectionner</span>
      </button>
    </div>
  );

  if (compact) {
    return (
      <article className={flipped ? "wine-card wine-card-recommendation wine-card-flip is-flipped" : "wine-card wine-card-recommendation wine-card-flip"}>
        <div className="wine-flip-shell">
          <div
            className="wine-face wine-face-front"
            role="button"
            tabIndex={0}
            onClick={openDetailsFromCard}
            onKeyDown={openDetailsFromKeyboard}
          >
            <div className="wine-rec-photo">
              {imageBlock}
              <button className="wine-info-button" type="button" onClick={() => setFlipped(true)} aria-label={`Voir la fiche de ${wine.name}`}>
                <Info />
              </button>
            </div>

            <div className="wine-rec-content">
              <div className="wine-rec-topline">
                <span>{colorLabel[wine.color]}</span>
                <strong>Sélection</strong>
              </div>
              <h3>{wine.name}</h3>
              <p>{wine.appellation}</p>
              <div className="wine-rec-icons" aria-label="Informations vin">
                <WineFact icon={Grape} label="Cépage" value={wine.grapes.slice(0, 2).join(", ")} />
                <WineFact icon={MapPin} label="Région" value={wine.region} />
                <WineFact icon={Thermometer} label="Température" value={wine.servingTemperature} />
                <WineFact icon={Utensils} label="Accord rapide" value={pairings[0] ?? "accord libre"} />
              </div>
              <small className="wine-rec-note">{note ?? wine.description}</small>
              <button type="button" onClick={selectWine}>
                Sélectionner
              </button>
            </div>
          </div>
          {backFace}
        </div>
      </article>
    );
  }

  return (
    <article className={flipped ? "wine-card wine-card-curated wine-card-cellar wine-card-flip is-flipped" : "wine-card wine-card-curated wine-card-cellar wine-card-flip"}>
      <div className="wine-flip-shell">
        <div
          className="wine-face wine-face-front"
          role="button"
          tabIndex={0}
          onClick={openDetailsFromCard}
          onKeyDown={openDetailsFromKeyboard}
        >
          <div className="wine-image-stage">
            {imageBlock}
            <button className="wine-info-button" type="button" onClick={() => setFlipped(true)} aria-label={`Voir la fiche de ${wine.name}`}>
              <Info />
            </button>
          </div>

          <div className="wine-content">
            <div className="wine-rec-topline">
              <span>{colorLabel[wine.color]}</span>
              <strong>Accord</strong>
            </div>
            <h3>{wine.name}</h3>
            <p className="producer">{wine.appellation}</p>

            <div className="wine-rec-icons wine-cellar-icons" aria-label="Informations vin">
              <WineFact icon={Grape} label="Cépage" value={wine.grapes.slice(0, 2).join(", ")} />
              <WineFact icon={MapPin} label="Région" value={wine.region} />
              <WineFact icon={Thermometer} label="Température" value={wine.servingTemperature} />
              <WineFact icon={Utensils} label="Accord rapide" value={pairings[0] ?? "accord libre"} />
            </div>

            <p className="wine-cellar-note">{cellarNote}</p>

            <button
              className="cellar-add"
              type="button"
              onClick={selectWine}
              aria-label={`Ajouter ${wine.name} à la sélection`}
            >
              <Plus />
              <span>Sélectionner</span>
            </button>
          </div>
        </div>
        {backFace}
      </div>
    </article>
  );
}
