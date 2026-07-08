# Pack SVG Canva - Ethny Fusion

Ce dossier est le pack prêt à uploader dans Canva.

Objectif : fournir tous les éléments graphiques de la charte en `.svg`, avec un nommage simple et des dossiers faciles à reproduire dans Canva.

## Règle importante

Les logos, pictogrammes et motifs actifs viennent directement du Design System officiel :

- `Ethny Nomad Cuisine Design System/assets/logo/`
- `Ethny Nomad Cuisine Design System/components/icons/Icon.jsx`
- `Ethny Nomad Cuisine Design System/components/core/Badge.jsx`
- `Ethny Nomad Cuisine Design System/components/core/Button.jsx`
- `Ethny Nomad Cuisine Design System/components/core/Card.jsx`
- `Ethny Nomad Cuisine Design System/components/core/SectionHeading.jsx`
- `Ethny Nomad Cuisine Design System/components/feedback/Testimonial.jsx`
- `Ethny Nomad Cuisine Design System/components/forms/form-fields.card.html`
- `Ethny Nomad Cuisine Design System/guidelines/brand/pictogram-motifs.card.html`
- `Ethny Nomad Cuisine Design System/guidelines/brand/signature-line.card.html`
- `Ethny Nomad Cuisine Design System/ui_kits/website/Motifs.jsx`
- `Ethny Nomad Cuisine Design System/ui_kits/website/Textures.jsx`

Les anciens éléments générés à la main ont été sortis du pack actif et déplacés dans :

`canva-upload-svg-pack-rejected-generated/`

Ils ne doivent pas être uploadés dans Canva comme éléments de marque.

## Arborescence

```text
canva-upload-svg-pack/
├── 00_documentation
├── 01_logos
├── 02_pictogrammes
├── 03_icones
├── 04_couleurs
├── 05_typographies
├── 06_textures
├── 07_motifs
├── 08_separateurs
├── 09_cadres
├── 10_badges
├── 11_boutons
├── 12_arriere-plans
├── 13_mockups
└── 14_archives
```

## Ordre d'import conseillé dans Canva

1. `01_logos`
2. `02_pictogrammes`
3. `03_icones`
4. `04_couleurs`
5. `05_typographies`
6. `06_textures`
7. `07_motifs`
8. `08_separateurs`
9. `09_cadres`
10. `10_badges`
11. `11_boutons`
12. `12_arriere-plans`
13. `13_mockups`

Le dossier `14_archives` est volontairement non actif : il sert uniquement a conserver des notes ou anciennes versions validees. Ne pas l'uploader dans Canva comme bibliotheque d'assets.

## Palette utilisée

- Foret profond : `#1C3B34`
- Vert foret : `#285447`
- Sauge : `#5E8D7A`
- Creme : `#F2EBDC`
- Beige : `#E7DDC8`
- Pierre : `#C9C5BB`
- Anthracite : `#2A2A2A`
- Blanc surface : `#FFFFFE`

## Vérification avant usage

Avant d'utiliser un asset dans un modèle Canva :

- vérifier que le logo n'est pas déformé ;
- vérifier que le cercle reste brisé ;
- vérifier que les pictogrammes restent monochromes ;
- ne pas mélanger avec des icônes Canva génériques ;
- garder le vert profond comme couleur héro.

## Manifestes

- `official-design-system-manifest.csv` : assets extraits des sources officielles.
- `all-svg-manifest.csv` : inventaire global du dossier actif.
- `completeness-report.md` : controle des dossiers completes et sources utilisees.
