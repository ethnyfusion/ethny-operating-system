# Flow business Vinaria

## 1. Découverte et accord

Le client arrive par l’un des deux parcours :

1. **Client Ethny** : il choisit le menu déjà commandé. Les plats et tags culinaires sont préremplis.
2. **Client externe** : il décrit librement son plat ou son menu.

Vinaria ajoute le nombre d’invités, le moment, le budget, les préférences et la couleur souhaitée. Le moteur classe uniquement les vins disponibles dans le catalogue Ethny et retourne 2 à 4 propositions avec une explication, une quantité et une estimation.

## 2. Panier et demande

Le client ajuste les bouteilles, fournit uniquement les données nécessaires à la livraison, confirme sa majorité, les CGV et la confidentialité. Le consentement marketing reste facultatif.

La V1 crée une **demande de commande**. La disponibilité et le paiement doivent être confirmés avant engagement définitif.

## 3. Exploitation Ethny

Séquence opérationnelle :

`created → confirmed → sent_to_partner → partner_confirmed → preparing → ready_for_pickup → delivery_requested → in_transit → delivered`

Les branches `cancelled` et `issue` sont disponibles à tout moment. Ethny :

- vérifie prix, disponibilité et marge ;
- envoie le bon de préparation au caviste ;
- reçoit sa confirmation ;
- choisit le provider de livraison ;
- informe le client aux étapes utiles ;
- garde l’historique des statuts.

Documents générables :

- bon de commande interne ;
- bon de préparation caviste ;
- bon de livraison.

## 4. Livraison

La logique commande dépend de l’interface `DeliveryProvider`, jamais d’un transporteur concret.

- `ManualDeliveryProvider` : fonctionnel, génère adresses, contact et checklist ;
- `BpostProvider`, `PostNLProvider`, `DPDProvider` : placeholders explicites.

## 5. Emails

Les templates couvrent la confirmation client, la notification Ethny, la préparation caviste, le bon de livraison, la commande prête et le problème de disponibilité. Leur envoi sera branché côté serveur ; aucune clé email n’est nécessaire au build.

## 6. Limites à lever avant production

- persistance PostgreSQL et migrations ;
- authentification SSO/RBAC de l’administration ;
- validation serveur des formulaires et rate limiting ;
- envoi transactionnel des emails ;
- paiement hébergé chez un PSP certifié ;
- adresses, prix de revient, stock et coordonnées réels ;
- pages légales validées ;
- tests du parcours complet et procédure de support.
