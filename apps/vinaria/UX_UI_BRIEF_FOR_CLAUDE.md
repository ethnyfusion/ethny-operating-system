# Vinaria — Résumé UX/UI complet pour optimisation V1

## Contexte produit

Vinaria by Ethny est une application indépendante d’accords mets-vins. Elle ne doit pas ressembler à une marketplace ni à une boutique de vin classique. L’objectif est de proposer une expérience premium, curatée, rassurante et très simple, où Ethny garde la main sur la sélection, les accords, la validation caviste, les commandes et la livraison.

Vinaria doit servir deux publics sans les perdre :

1. les clients Ethny qui ont déjà choisi ou reçu un menu ;
2. les clients externes qui veulent un accord libre, parfois sur une demande très simple : un plat unique, un dessert, un apéritif, un dîner, un menu incomplet ou une idée encore floue.

Le parcours doit donc être capable de gérer une demande structurée, mais aussi une requête naturelle courte du type :

- “Je fais un magret de canard sauce miel.”
- “Quel vin pour un dessert chocolat-framboise ?”
- “J’ai un dîner végétarien pour 6 personnes.”
- “Je veux un accord pour un plat thaï épicé.”
- “J’ai un menu Ethny Fusion Signature.”

La philosophie V1 : moins de friction, moins de champs obligatoires, plus d’accompagnement, plus de confiance.

---

## État UX/UI actuel

### Structure générale

L’application est construite avec une navigation client simple :

- Accueil `/`
- Accord libre `/pairing`
- Accord menu Ethny `/menu-pairing`
- Cave / catalogue `/catalogue`
- Sélection `/cart`
- Demande / checkout `/checkout`
- Confirmation `/confirmation`
- Suivi `/tracking`

Une zone admin existe également :

- Produits
- Commandes
- Partenaires
- Livraisons
- Marges
- Réglages

L’interface client repose sur un univers premium : typographie élégante, couleurs sobres, vert profond, fond clair, touches bordeaux/or, cartes arrondies, ambiance “sommelier discret”.

### Navigation actuelle

La navigation principale expose :

- Menus
- Accord
- Cave
- Sélection

C’est clair, mais encore perfectible. Pour un client externe, “Menus” peut sembler réservé aux clients Ethny. Pour un client Ethny, “Accord” peut sembler trop générique.

Recommandation UX : rendre l’entrée plus orientée besoin :

- “J’ai un menu Ethny”
- “J’ai un plat ou une idée”
- “Voir la cave”
- “Ma sélection”

Cela évite au client de comprendre la structure interne de l’app.

### Accueil

L’accueil doit être une porte d’entrée très simple, avec deux choix majeurs :

1. “Accorder un menu Ethny”
2. “Créer un accord libre”

Le texte doit éviter de trop expliquer la mécanique. Vinaria doit se présenter comme un assistant sommelier premium, pas comme un configurateur administratif.

À privilégier :

- promesse claire ;
- caution Ethny + caviste ;
- validation humaine ;
- pas de paiement immédiat ;
- réponse sous 24 h.

### Parcours “menu Ethny”

Le parcours menu Ethny est aujourd’hui le plus structuré. Il propose :

1. choix d’un menu Ethny ;
2. nombre de convives ;
3. nombre de services ;
4. gamme / budget interne ;
5. détail par service ;
6. génération des accords ;
7. sélection des vins ;
8. demande finale.

Les cartes de menus sont visuelles et premium. Les menus Ethny sont adaptés à une logique de services. L’utilisateur peut ensuite préciser chaque service : protéine, cuisson, sauce, accompagnement, style, allergies, notes.

Point fort : c’est cohérent pour un client Ethny qui sait déjà qu’il a un menu.

Point faible : cela peut encore sembler long si le client veut juste confirmer un accord sur un menu déjà connu. Il faut prévoir un mode “menu déjà validé — je colle mon menu” ou “je choisis mon menu Ethny et je laisse Vinaria proposer”.

### Parcours “accord libre”

Le parcours accord libre reprend une logique similaire :

1. convives ;
2. services ;
3. type de repas ;
4. gamme ;
5. saisie guidée par service ;
6. génération des accords ;
7. sélection ;
8. demande.

Point fort : il permet des demandes complètes et bien structurées.

Point faible majeur : pour un client externe qui a seulement un plat unique, la notion de “services” et le formulaire détaillé peuvent créer de la friction.

Il faut ajouter un mode “requête simple” en entrée :

- un grand champ libre ;
- quelques boutons rapides ;
- génération immédiate d’un accord ;
- possibilité ensuite d’affiner si besoin.

Exemple :

“Décrivez votre plat ou votre moment”

Champ libre :

“Risotto aux champignons, dîner à deux, budget raisonnable”

Boutons rapides :

- Plat unique
- Dessert
- Apéritif
- Menu complet
- Vin rouge
- Vin blanc
- Surprise sommelier

Le moteur peut ensuite transformer cette requête en tags internes.

---

## Catalogue / cave

Le catalogue a été enrichi avec :

- références blanches ;
- références rouges ;
- références rosées ;
- vins doux / dessert ;
- effervescents ;
- références issues du catalogue FA 2026.

Les prix ne doivent pas être affichés côté client. Ils restent internes pour le calcul de marge, budget, validation caviste et administration.

La cave doit être perçue comme une sélection curatée, pas comme une boutique :

- moins de filtres techniques ;
- plus de découverte ;
- cartes uniformes ;
- bouteilles héro visuel ;
- informations très courtes ;
- bouton “sélectionner” ou “voir l’accord”.

### Cartes vins

Les cartes actuelles utilisent une logique de flip card :

- face avant : photo, nom, appellation, note courte, CTA ;
- face arrière : détails essentiels, cépage, région, couleur, température, accords rapides, intensité.

Objectif UX : garder la carte légère.

À éviter :

- trop de texte ;
- trop de pictogrammes ;
- plusieurs CTA concurrents ;
- prix affichés ;
- informations œnologiques trop poussées.

À privilégier :

- photo bouteille normalisée ;
- nom lisible ;
- appellation/région ;
- couleur ;
- 1 ou 2 tags d’accord ;
- CTA clair.

### Images bouteilles

Les bouteilles doivent être uniformes :

- fond blanc ou très clair ;
- bouteille visible entière ;
- jamais coupée ;
- taille cohérente ;
- marge identique ;
- fallback élégant quand l’image manque.

Un document `MISSING_WINE_IMAGES.md` liste les images manquantes ou à compléter.

---

## Résultat des accords

Après génération, l’app affiche une sélection par service :

- nom du service ;
- carte vin recommandée ;
- explication courte ;
- quantité conseillée ;
- option “autre proposition” limitée.

Bon principe : limiter les alternatives pour garder un ton curaté. Au-delà de deux alternatives, l’expérience doit proposer un accompagnement humain :

“Créons un accord personnalisé avec Ethny.”

À optimiser :

- rendre la sélection plus immédiatement compréhensible ;
- afficher clairement “Votre accord proposé” ;
- séparer “je valide cette sélection” de “je veux une alternative” ;
- éviter que le client ait l’impression de devoir faire tout le travail.

---

## Sélection / panier

La sélection fonctionne comme un panier, mais le vocabulaire doit rester premium.

À éviter :

- “panier” trop e-commerce ;
- prix détaillés ;
- logique marketplace ;
- impression d’achat immédiat.

À privilégier :

- “Votre sélection”
- “Demande d’accord”
- “Validation caviste sous 24 h”
- “Paiement uniquement après confirmation”

La sélection doit contenir :

- vins choisis ;
- quantité conseillée ;
- service associé ;
- note d’accord ;
- statut “à valider”.

---

## Checkout / demande finale

Le checkout n’est pas un paiement. C’est l’envoi d’une demande.

Champs nécessaires :

- prénom ;
- nom ;
- email ;
- téléphone ;
- date souhaitée ;
- créneau souhaité ;
- ville ;
- adresse ;
- informations complémentaires ;
- consentement CGV/confidentialité ;
- confirmation 18+ ;
- consentement marketing séparé.

À améliorer :

- réduire l’impression de formulaire administratif ;
- grouper les champs en sections humaines :
  - “Vos coordonnées”
  - “Le moment de dégustation”
  - “Livraison ou remise”
  - “Derniers détails”
- rappeler clairement : “aucun paiement maintenant”.

---

## Problème UX principal à résoudre

Aujourd’hui, Vinaria est robuste pour un menu complet, mais le parcours peut être trop structuré pour une demande simple.

Le risque : un client externe arrive avec une intention simple et se retrouve devant un flow de services, convives, type de repas, budget, détails par service. Cela peut le faire hésiter ou abandonner.

La V1 doit donc proposer deux niveaux de saisie :

### Niveau 1 — Requête rapide

Pour la majorité des clients :

“Décrivez votre plat, votre menu ou votre moment.”

Un grand champ libre + 3 à 5 boutons d’aide.

Exemples de boutons :

- Plat unique
- Dessert
- Apéritif
- Menu complet
- Je veux être guidé

Résultat : Vinaria propose 2 à 4 accords, avec quantité et justification courte.

### Niveau 2 — Saisie guidée

Pour les menus Ethny, événements ou demandes premium :

- convives ;
- nombre de services ;
- type de repas ;
- préférences ;
- contraintes ;
- date ;
- adresse.

Ce mode reste nécessaire, mais il doit apparaître comme une option d’affinage, pas comme un passage obligatoire pour tous.

---

## Recommandation de parcours cible

### Accueil

Deux cartes principales :

1. “J’ai un menu Ethny”
   - CTA : “Créer l’accord de mon menu”
   - Pour clients Ethny existants

2. “J’ai un plat ou une idée”
   - CTA : “Trouver mon accord”
   - Pour clients externes ou demandes simples

Un troisième lien discret :

- “Explorer la cave”

### Accord libre simplifié

Écran 1 :

- grand champ libre ;
- boutons rapides ;
- nombre de convives optionnel ;
- couleur préférée optionnelle ;
- bouton “Proposer un accord”.

Écran 2 :

- résultats immédiats ;
- 2 à 4 recommandations ;
- bouton “Valider cette sélection” ;
- bouton secondaire “Affiner ma demande”.

Écran 3 :

- coordonnées ;
- date souhaitée ;
- livraison ;
- consentements ;
- envoi de demande.

### Menu Ethny

Écran 1 :

- choisir un menu Ethny existant ;
- ou coller un menu ;
- convives ;
- formule interne.

Écran 2 :

- aperçu des services ;
- possibilité de modifier uniquement les points importants.

Écran 3 :

- accords générés par service ;
- validation sélection ;
- demande finale.

---

## Recommandations UI

### Ton visuel

Vinaria doit évoquer :

- Apple : simplicité, espace, précision ;
- Airbnb : parcours fluide et rassurant ;
- Vivino premium : bouteille au centre, découverte rapide ;
- Ethny : chaleur, raffinement, cuisine nomade.

### À réduire

- textes longs ;
- champs obligatoires ;
- répétitions de CTA ;
- détails techniques visibles trop tôt ;
- impression de back-office.

### À renforcer

- respiration ;
- hiérarchie claire ;
- onboarding très simple ;
- cartes uniformes ;
- microcopies rassurantes ;
- validation humaine ;
- absence de paiement immédiat.

### Microcopies recommandées

- “Décrivez votre plat, Vinaria s’occupe du reste.”
- “Une sélection proposée, puis validée par notre caviste.”
- “Aucun paiement maintenant.”
- “Votre demande est confirmée sous 24 h.”
- “Besoin d’un accord plus précis ? Ethny reprend la main.”

---

## Optimisations fonctionnelles à envisager

### 1. Ajouter un mode “accord express”

Entrée libre en langage naturel :

- plat unique ;
- dessert ;
- apéritif ;
- menu simple ;
- envie de couleur ;
- budget implicite.

Le moteur doit générer automatiquement :

- tags culinaires ;
- type de repas ;
- couleur probable ;
- niveau de confiance ;
- quantité recommandée.

### 2. Ajouter un choix “Je ne sais pas”

Pour éviter de bloquer :

- couleur : “surprenez-moi”
- budget : “équilibré”
- style : “je ne sais pas”
- nombre de services : “plat unique”

### 3. Réduire le flow libre par défaut

Ne pas commencer l’accord libre par un formulaire complet. Commencer par une intention.

### 4. Mieux distinguer client Ethny et client externe

Client Ethny :

- menu connu ;
- parcours structuré ;
- accord par service.

Client externe :

- requête libre ;
- parcours express ;
- affinement optionnel.

### 5. Introduire un écran de transition rassurant

Après génération :

“Voici une première sélection Vinaria. Elle sera validée par notre caviste avant confirmation.”

### 6. Ne jamais afficher les prix côté client

Le prix reste un outil interne. Côté client, parler de :

- sélection ;
- gamme ;
- demande ;
- validation.

### 7. Garder les alternatives limitées

2 alternatives maximum. Après cela :

“Votre demande mérite un accord personnalisé.”

---

## Prompt à donner à Claude

Tu es UX/UI designer senior et product designer pour Vinaria by Ethny, une application premium d’accords mets-vins.

Analyse le parcours utilisateur actuel et propose les optimisations nécessaires pour rendre l’expérience la plus simple possible.

Contexte :

- Vinaria n’est pas une marketplace.
- Vinaria est une expérience curatée par Ethny.
- Les prix ne doivent pas être affichés côté client.
- La validation caviste intervient avant paiement.
- L’utilisateur peut être un client Ethny avec un menu déjà choisi, ou un client externe avec une simple demande libre.

Objectif principal :

Simplifier le parcours pour permettre deux usages :

1. accord complet sur menu Ethny ;
2. accord express depuis une requête simple du client, par exemple un plat unique, un dessert, un apéritif ou une phrase libre.

À analyser :

- clarté de l’accueil ;
- navigation ;
- choix entre client Ethny et client externe ;
- friction dans le formulaire d’accord libre ;
- lisibilité des cartes vins ;
- hiérarchie visuelle ;
- vocabulaire utilisé ;
- checkout sans paiement ;
- mobile-first ;
- confiance et réassurance.

Propose :

- un parcours cible très simple ;
- une architecture d’écrans ;
- les microcopies principales ;
- les composants à modifier ;
- les champs à rendre optionnels ;
- les champs à supprimer ou déplacer ;
- les priorités MVP ;
- les risques UX ;
- une version idéale du flow “accord express”.

Le design doit rester premium, sobre, mobile-first, cohérent avec Ethny, dans un esprit Apple × Airbnb × Vivino Premium.

