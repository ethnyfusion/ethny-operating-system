"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { wines } from "@/data/wines";
import type { WineColor } from "@/types";
import { WineCard } from "./wine-card";

const colorFilters = [
  ["all", "Tous"],
  ["white", "Blancs"],
  ["red", "Rouges"],
  ["sparkling", "Bulles"],
  ["dessert", "Doux"],
] as const satisfies readonly [WineColor | "all", string][];

export function CatalogueClient() {
  const [query, setQuery] = useState("");
  const [color, setColor] = useState<WineColor | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return wines.filter(
      (wine) =>
        (color === "all" || wine.color === color) &&
        [wine.name, wine.producer, wine.region, ...wine.grapes]
          .join(" ")
          .toLowerCase()
          .includes(needle),
    );
  }, [color, query]);

  return (
    <>
      <div className="catalogue-tools">
        <label className="search-field">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Vin, domaine, région…"
          />
        </label>
        <div className="catalogue-filter-chips" aria-label="Filtrer par couleur">
          {colorFilters.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={color === value ? "active" : undefined}
              onClick={() => setColor(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="result-count">{filtered.length} références · sélection caviste Vinaria</p>
      <div className="wine-grid">
        {filtered.map((wine) => (
          <WineCard key={wine.id} wine={wine} />
        ))}
      </div>
    </>
  );
}
