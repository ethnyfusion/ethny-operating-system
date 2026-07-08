# Importer Ethny dans Canva

Guide de configuration Canva Pro pour Ethny Fusion / Ethny Nomad Cuisine.

## 1. Créer l'espace de travail

Dans Canva, créer un dossier principal :

```text
ETHNY
```

Puis recréer l'arborescence décrite dans `folder-map.md`.

## 2. Importer les logos

Dans Canva :

1. Aller dans `ETHNY/Brand Kit/Logos`.
2. Importer les fichiers SVG préparés dans :
   `ETHNY/Brand Kit/Logos/`
3. Ajouter les logos principaux au Kit de marque Canva.

Fichiers prioritaires :

- `ethny-logo-principal-cercle-brise.svg`
- `ethny-logo-blanc-fond-vert.svg`
- `ethny-logo-fonce-fond-clair.svg`
- `ethny-icone.svg`
- `ethny-badge-cercle-brise.svg`
- `ethny-wordmark-horizontal.svg`
- `ethny-wordmark-vertical.svg`
- `ethny-logo-monochrome-currentColor.svg`

Règles :

- ne jamais déformer le logo ;
- ne jamais ajouter d'ombre ;
- ne jamais fermer le cercle brisé ;
- ne jamais utiliser un logo généré par IA ;
- toujours garder une zone de respiration.

## 3. Ajouter les couleurs au Kit de marque

Créer la palette `Ethny Fusion - Charte 2026`.

Ajouter les HEX suivants :

| Nom Canva | HEX | Usage |
| --- | --- | --- |
| Vert principal / Foret profond | `#1C3B34` | Fonds premium, couleur héro |
| Vert foncé / Vert foret | `#285447` | Traits, accents, logo fond clair |
| Vert clair / Sauge | `#5E8D7A` | Respirations, détails secondaires |
| Blanc cassé / Creme | `#F2EBDC` | Fonds chauds, texte sur vert |
| Beige / Surface chaude | `#E7DDC8` | Variante douce, menus, fonds |
| Gris pierre | `#C9C5BB` | Filets, bordures, séparateurs |
| Noir doux / Anthracite | `#2A2A2A` | Texte dense, documents sobres |
| Blanc surface | `#FFFFFE` | Surface neutre |

Ne pas ajouter de rouge, orange, jaune vif, bleu promotionnel ou dégradé décoratif.

## 4. Configurer les typographies

Dans Canva Brand Kit, configurer :

- Titres : `Cormorant Garamond`
- Sous-titres : `Cormorant Garamond` ou `Jost Medium`
- Texte courant : `Jost`

Si une police n'est pas disponible dans Canva :

- alternative titre : `Cormorant`, `Libre Baskerville`, `Alegreya`
- alternative texte : `Jost`, `Alegreya Sans`, `Montserrat` uniquement en secours

Hiérarchie détaillée dans :

- `ETHNY/Brand Kit/Typographies/typography-guide.md`

## 5. Importer les pictogrammes

Importer uniquement les fichiers de :

```text
ETHNY/Pictogrammes/
```

Règles :

- utiliser en monochrome ;
- garder le trait fin ;
- ne pas ajouter d'effet ;
- ne pas mélanger avec des pictogrammes Canva génériques ;
- ne pas utiliser d'emoji.

## 6. Placer les ressources

| Type | Dossier Canva |
| --- | --- |
| Logos | `ETHNY/Logos` |
| Palette | `ETHNY/Couleurs` |
| Guides typo | `ETHNY/Typographies` |
| Pictogrammes officiels | `ETHNY/Pictogrammes` |
| Icônes techniques / favicons | `ETHNY/Icônes` |
| Textures | `ETHNY/Textures` |
| Motifs | `ETHNY/Motifs` |
| Cadres / séparateurs / boutons | dossiers dédiés |
| Photos | `ETHNY/Photos/[catégorie]` |
| Vidéos | `ETHNY/Vidéos/[catégorie]` |
| Modèles | `ETHNY/Templates ...` |

## 7. Transformer un design en modèle Canva

Pour chaque template :

1. Créer un design Canva au bon format.
2. Utiliser uniquement les assets officiels.
3. Nommer le fichier avec la convention `ethny-template-[canal]-[type]-[format]-v01`.
4. Remplacer les textes par des zones facilement éditables.
5. Ajouter une page `Instructions` si le template est complexe.
6. Cliquer sur `Partager`.
7. Choisir `Lien de modèle` ou `Utiliser comme modèle`.
8. Ranger dans le dossier template correspondant.

## 8. Partager avec l'équipe

Créer deux niveaux :

- `Can edit` pour les personnes qui produisent.
- `Can view/use template` pour les personnes qui ne doivent pas modifier les masters.

Règle :

Les modèles validés ne sont pas modifiés directement. On les duplique avant création.

## 9. Workflow de production en 5 minutes

1. Choisir le dossier du canal : Instagram, GBP, Menu, Recette, LinkedIn.
2. Dupliquer le modèle adapté.
3. Remplacer la photo.
4. Modifier le texte.
5. Vérifier contraste, logo, CTA et orthographe.
6. Exporter ou programmer.

## 10. Validation avant publication

- logo officiel uniquement ;
- couleurs officielles uniquement ;
- pictogrammes officiels uniquement ;
- pas de disponibilité inventée ;
- pas de prix final inventé ;
- pas de témoignage inventé ;
- pas de client identifiable sans accord ;
- lisibilité mobile validée.
