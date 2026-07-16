"use client";
/* eslint-disable @next/next/no-img-element */

import { CalendarDays, Grape, Info, MapPin, Minus, Plus, RotateCcw, Thermometer, Trash2, Utensils } from "lucide-react";
import { useState, type KeyboardEvent, type MouseEvent } from "react";
import type { CartItem, WineProduct } from "@/types";

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

function SelectedFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Grape;
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

export function SelectedWineCard({
  item,
  wine,
  onQuantityChange,
  onRemove,
}: {
  item: CartItem;
  wine?: WineProduct;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const isCatalogueCapture = wine?.image?.includes("catalogue-");
  const pairings = wine?.culinaryTags
    .filter((tag) => pairingLabel[tag])
    .slice(0, 3)
    .map((tag) => pairingLabel[tag]) ?? [];
  const pairingText = pairings.length ? pairings.join(" · ") : "accord à confirmer";
  const vintageText = wine?.vintage ? String(wine.vintage) : "à confirmer";

  function openDetailsFromCard(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    setFlipped(true);
  }

  function openDetailsFromKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setFlipped(true);
  }

  return (
    <article className={flipped ? "selection-wine-card wine-card-flip is-flipped" : "selection-wine-card wine-card-flip"}>
      <div className="wine-flip-shell">
        <div
          className="wine-face wine-face-front"
          role="button"
          tabIndex={0}
          onClick={openDetailsFromCard}
          onKeyDown={openDetailsFromKeyboard}
        >
          <div className="selection-wine-photo">
            {wine?.image ? (
              <div className={isCatalogueCapture ? `wine-source-grid focus-${wine.imageFocus ?? "center"}` : "wine-product-photo"}>
                <img src={wine.image} alt={`${item.name} — ${item.producer}`} />
              </div>
            ) : (
              <div className="wine-monogram" aria-hidden="true">{item.name.charAt(0)}</div>
            )}
            <button className="wine-info-button" type="button" onClick={() => setFlipped(true)} aria-label={`Voir la fiche de ${item.name}`}>
              <Info />
            </button>
          </div>

          <div className="selection-wine-content">
            <div className="wine-rec-topline">
              <span>{wine ? colorLabel[wine.color] : "Sélection"}</span>
              <strong>Validable</strong>
            </div>
            {item.serviceLabel && <span className="cart-service-label">{item.serviceLabel}</span>}
            <h3>{item.name}</h3>
            <p>{wine?.appellation ?? item.producer}</p>
            {item.pairingNote && <small>{item.pairingNote}</small>}

            <div className="selection-card-actions">
              <div className="quantity-control" aria-label={`Quantité pour ${item.name}`}>
                <button type="button" onClick={() => onQuantityChange(item.quantity - 1)} aria-label="Retirer une bouteille">
                  <Minus size={15} />
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => onQuantityChange(item.quantity + 1)} aria-label="Ajouter une bouteille">
                  <Plus size={15} />
                </button>
              </div>
              <button type="button" className="remove-button" onClick={onRemove} aria-label={`Retirer ${item.name}`}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="wine-face wine-face-back">
          <button className="wine-flip-close" type="button" onClick={() => setFlipped(false)} aria-label="Revenir à la sélection">
            <RotateCcw />
          </button>
          <span className="eyebrow">Sélection validable</span>
          <h3>{item.name}</h3>
          <p className="producer">{item.producer}</p>
          <p className="wine-back-description">{item.pairingNote ?? wine?.description ?? "Accord à confirmer par le caviste Vinaria."}</p>
          <div className="wine-back-facts">
            <SelectedFact icon={Grape} label="Cépage" value={wine?.grapes.slice(0, 2).join(", ") ?? "à confirmer"} />
            <SelectedFact icon={MapPin} label="Région" value={wine?.region ?? "cave Vinaria"} />
            <SelectedFact icon={Thermometer} label="Température" value={wine?.servingTemperature ?? "service conseillé"} />
            <SelectedFact icon={Utensils} label="Accords rapides" value={pairingText} />
            <SelectedFact icon={CalendarDays} label="Millésime" value={vintageText} />
          </div>
          {item.storytelling && <p className="selection-story">{item.storytelling}</p>}
          <strong className="cart-validation-label">stock à valider</strong>
        </div>
      </div>
    </article>
  );
}
