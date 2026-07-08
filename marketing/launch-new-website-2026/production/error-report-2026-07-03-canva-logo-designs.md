# Rapport d'erreur - Designs Canva logo

Date : 3 juillet 2026  
Sujet : génération de 5 designs Canva pour présenter le logo Ethny  
Statut : erreur confirmée, designs à ne pas publier

## Résumé

La série de 5 designs Canva créée pour présenter le logo ne respecte pas suffisamment la charte graphique Ethny.

L'erreur principale : les designs ont été générés par Canva à partir d'un prompt descriptif au lieu d'être construits avec les assets officiels de la charte graphique.

Résultat : Canva a interprété l'identité au lieu de l'appliquer.

## Impact

Ces designs ne doivent pas être publiés.

Risques :

- dilution de l'identité premium ;
- pictogrammes inventés ou non conformes ;
- cercle brisé approximatif ;
- logo ou signe central non officiel ;
- rendu potentiellement trop générique ;
- confusion entre une direction graphique et une exécution validée.

## Erreurs identifiées

### 1. Utilisation d'assets inventés

Canva a généré des formes et pictogrammes à partir d'une description.

Or la charte impose :

- pictogrammes linéaires officiels ;
- trait fin ;
- monochrome via la couleur courante ;
- aucun pictogramme inventé hors famille graphique ;
- pas d'emoji ;
- pas de symbole improvisé.

### 2. Cercle brisé non maîtrisé

Le cercle brisé fait partie de l'ADN visuel Ethny. Il ne peut pas être approximé.

Les fichiers officiels à utiliser sont :

- `ethny/branding/logo/logo-cercle-brise.svg`
- `ethny/branding/logo/logo-cercle-brise-fond-clair.svg`
- `ethny/branding/logo/logo-cercle-brise-fond-fonce.svg`
- `ethny/branding/logo/favicon-cercle-brise.svg`

### 3. Logo non remplacé par le SVG officiel

La demande concernait la présentation du logo. La production devait donc utiliser directement le logo officiel.

Erreur : génération d'un signe central inspiré, au lieu d'importer ou placer le SVG officiel.

### 4. Validation visuelle insuffisante

Les designs ont été passés en production Canva sans contrôle strict contre la charte.

Contrôles qui auraient dû être faits avant validation :

- présence du logo officiel ;
- respect exact des couleurs ;
- absence de pictogrammes inventés ;
- cercle brisé conforme ;
- typographies alignées avec Cormorant Garamond / Jost ou équivalents proches ;
- contraste mobile ;
- sobriété premium.

### 5. Formulation trop permissive

La mention "inspirée de la charte" n'était pas assez stricte.

Pour Ethny, il faut distinguer :

- exploration créative : possible, mais non publiable ;
- production officielle : assets exacts, règles exactes, validation humaine.

## Règles de charte à réappliquer

Palette officielle :

- Foret profond : `#1C3B34`
- Vert foret : `#285447`
- Sauge : `#5E8D7A`
- Creme : `#F2EBDC`
- Pierre : `#C9C5BB`
- Anthracite : `#2A2A2A`
- Blanc surface : `#FFFFFE`

Logo :

- conserver une zone de respiration autour du logo ;
- ne pas déformer, incliner, ombrer ou entourer le logo ;
- ne pas ajouter de couleur vive ou effet brillant ;
- utiliser la version claire sur fond foret ;
- utiliser la version foncée sur fond clair.

Iconographie :

- utiliser uniquement les pictogrammes de charte ;
- trait fin ;
- monochrome ;
- aucune invention ;
- aucun pictogramme décoratif hors famille.

## Protocole correct pour refaire la série

### Étape 1 - Préparer les assets officiels

Créer un dossier de travail avec les fichiers suivants :

- logo principal : `ethny/branding/logo/logo-cercle-brise.svg`
- logo fond foncé : `ethny/branding/logo/logo-cercle-brise-fond-fonce.svg`
- logo fond clair : `ethny/branding/logo/logo-cercle-brise-fond-clair.svg`
- icône social : `ethny/branding/icons/usage-social.svg`
- icône fond clair : `ethny/branding/icons/usage-fond-clair.svg`
- icône fond foncé : `ethny/branding/icons/usage-fond-fonce.svg`
- icône clearspace : `ethny/branding/icons/usage-clearspace.svg`
- icône print : `ethny/branding/icons/usage-print.svg`

### Étape 2 - Créer les visuels avec les assets réels

Ne pas demander à Canva d'inventer un logo ou des pictogrammes.

Méthode correcte :

1. importer les SVG officiels dans Canva ;
2. placer le logo officiel au centre ;
3. utiliser les pictogrammes officiels en détails secondaires ;
4. appliquer les couleurs exactes ;
5. limiter le texte ;
6. valider mobile et contraste.

### Étape 3 - Produire 5 designs conformes

Directions autorisées :

1. Logo complet sur fond vert profond.
2. Cercle brisé seul en teaser.
3. Logo + grille de pictogrammes officiels.
4. Version fond crème avec logo foncé.
5. Version story verticale "Nouvelle identité, même exigence".

### Étape 4 - Validation humaine

Avant publication :

- vérifier chaque visuel contre la charte ;
- refuser tout pictogramme inventé ;
- vérifier que le cercle reste brisé ;
- vérifier que le logo n'est pas altéré ;
- valider le post final avec Chef Reginald.

## Décision

Les 5 designs Canva générés précédemment sont classés comme :

> Exploration non conforme - ne pas publier.

Ils peuvent servir uniquement de brouillon d'intention, pas de support de communication officiel.

## Correction recommandée

Refaire la série avec les SVG officiels depuis le repository, puis seulement après validation, créer les versions Canva finales.
