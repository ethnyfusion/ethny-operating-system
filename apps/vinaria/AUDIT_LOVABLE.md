# Audit de la V1 Lovable

Source auditée : `code github/vinaria-pairing-hub-main`.

## Structure existante

La V1 est une SPA Vite + React 18 + React Router. Elle contient :

- accueil ;
- liste et détail des menus saisonniers ;
- accord libre ;
- résultats d’accord ;
- catalogue « La Cave » ;
- panier ;
- checkout simulé ;
- succès de commande.

Les composants réutilisables les plus utiles sont le header/footer, la carte vin, les cartes de plats et les sections de l’accueil. Une bibliothèque shadcn/Radix très large est présente, mais seule une fraction est utilisée.

## Logique et données

### Catalogue

`useWines` lit Supabase côté client, filtre type, région, prix et recherche, puis expose les types et régions. Le modèle `Wine` contient déjà prix HTVA/TVAC, stock, tags de style et d’accord, notes et exclusivité.

### Menus

Deux sources coexistent : tables Supabase (`menus`, `dishes`) et un grand fichier local `src/data/menus.ts`. Cette duplication risque des divergences.

### Panier

Le panier Zustand persiste dans `localStorage`. L’ajout, la suppression, la quantité et le sous-total sont corrects pour une démonstration, mais il n’y a ni version de schéma, ni validation des prix côté serveur.

### Moteur d’accord

Une Edge Function Supabase envoie tout le catalogue au gateway IA Lovable, demande un JSON puis lui fait confiance. Points faibles :

- dépendance à `LOVABLE_API_KEY` et à un modèle preview ;
- résultat non déterministe et parsing JSON fragile ;
- budget, préférences, couleur et type de repas absents ;
- calcul de quantité ambigu lorsqu’un vin est recommandé par plat ;
- aucun garde-fou serveur sur les IDs/prix retournés ;
- CORS ouvert à toutes les origines.

### Checkout

Le formulaire collecte contact et adresse, calcule un tarif BE/NL puis simule 1,5 seconde avant de vider le panier. Il ne crée aucune commande, n’envoie aucun email et ne gère ni consentement ni statut.

### Base Supabase

Le schéma initial est riche (rôles, profils, vins, menus, plats, clients, commandes), avec RLS. Il est cependant plus large que le besoin immédiat et ses statuts ne correspondent pas au flow opérationnel demandé.

## Styles

À conserver :

- fond champagne, bordeaux profond et accent or ;
- association serif éditoriale + sans-serif ;
- ton premium, calme et gastronomique ;
- logique mobile-first et cartes de vins.

À corriger :

- nombreuses classes et composants UI inutilisés ;
- dépendance à Google Fonts distante ;
- identité encore générique « wine marketplace » ;
- chiffres marketing non sourcés (« 200+ vins ») ;
- liens vers pages inexistantes.

## Dépendances

La V1 embarque plus de 35 dépendances runtime : Radix, TanStack Query, Supabase, Zustand, Recharts, React Hook Form, Zod, carrousel, date picker, etc. Cela dépasse les besoins du MVP.

La nouvelle app conserve seulement Next.js, React et Lucide. Les fonctions métier restent en TypeScript pur, donc testables et remplaçables.

## Décision de migration

### Conservé ou adapté

- direction artistique ivoire/bordeaux/or ;
- deux entrées menu Ethny / accord libre ;
- filtres catalogue ;
- panier persistant ;
- tags culinaires et de style ;
- principe de quantité par nombre de convives.

### Réécrit

- routing vers Next.js App Router ;
- modèles métier unifiés ;
- moteur d’accord déterministe ;
- flow commande et statuts ;
- abstractions partenaires/livraison ;
- checkout avec consentements ;
- templates emails et documents ;
- administration ;
- configuration, sécurité et documentation.

### Non repris

- gateway IA Lovable ;
- initialisation Supabase côté client ;
- bibliothèque UI intégrale ;
- doublons de menus ;
- checkout simulé sans objet commande ;
- promesse de marketplace ou chiffres non vérifiés.
