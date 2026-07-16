# Vinaria — images bouteille manquantes

Source vérifiée : `Catalogue FA 2026.pdf`, 8 pages, tarif valable jusqu’au 30 juin 2026.

## État actuel

- Les références issues des captures “Vin rouge” utilisent déjà des visuels de cartes catalogue.
- Les références déjà présentes dans Vinaria utilisent leurs images existantes quand elles sont disponibles.
- Les nouvelles références importées depuis le PDF FA 2026 n’ont pas encore de photo bouteille individuelle exploitable.

## À compléter

114 références FA 2026 doivent recevoir une image bouteille détourée ou une capture produit propre :

- 32 blancs
- 64 rouges
- 4 rosés
- 3 doux
- 11 effervescents / bulles

La liste exhaustive des références concernées est dans :

`src/data/fa-2026-references.ts`

## Priorité image recommandée

1. Bulles / effervescents : nécessaires pour les repas de célébration et apéritifs.
2. Références rouges Prestige : Bordeaux, Bourgogne, Rhône, Italie.
3. Blancs gastronomiques : Bourgogne, Loire, Rhône.
4. Rosés et demi-bouteilles.

## Règle d’intégration

Pour chaque référence FA 2026, ajouter une propriété `image` quand le visuel est prêt :

```ts
image: "/wines/nom-du-vin.webp"
```

Si l’image provient d’une capture multi-cartes, ajouter aussi :

```ts
imageFocus: "left" | "center" | "right"
```

Tant que l’image manque, Vinaria garde la référence dans le moteur d’accord mais affiche une carte sans bouteille réelle.
