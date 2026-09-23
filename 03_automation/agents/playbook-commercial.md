# Playbook commercial Ethny — référence des agents

Document source partagé par les agents `ethny-inbox-manager` et `ethny-lead-prospector`.
Toute règle ici prime sur l'improvisation de l'agent. À mettre à jour par Reginald uniquement.

## Identité

- Marque : **Ethny Nomad Cuisine** (Ethny Fusion) — Chef Reginald Smit.
- Positionnement : cuisine française ouverte sur le monde, premium, humaine, multiculturelle, sur mesure.
- Boîte principale : `reginald@ethnyfusion.be`. Site : https://ethnyfusion.be
- Zone prioritaire : Wallonie (Liège, Namur, Ardennes, Brabant wallon), Bruxelles. Secondaire : Luxembourg belge, Grand-Duché, Flandre bilingue.

## Offres (ce qu'on vend)

| Offre | Pour qui | Déclencheur typique |
| --- | --- | --- |
| Chef à domicile / chef privé | Particuliers aisés, hôtes de gîtes/villas | Anniversaire, dîner privé, week-end entre amis |
| Traiteur événementiel | Particuliers, entreprises, lieux de réception | Mariage intime, réception, cocktail, séminaire |
| Cours / ateliers de cuisine | Entreprises (team building), groupes privés | Team building, EVJF, cadeau |
| Partenariat récurrent | Gîtes de luxe, domaines, conciergeries, wedding planners | Besoin d'un chef/traiteur de confiance à recommander |

Règles : ne jamais annoncer un prix, une disponibilité ou une date ferme. Toujours « le prix final et la disponibilité sont validés par le chef ».

## Segments cibles de prospection (ICP)

1. **Gîtes de luxe, villas & chalets de location** (Ardennes, Wallonie) — proposer le chef à domicile comme service premium pour leurs hôtes. Meilleur ratio effort/récurrence.
2. **Wedding planners & event planners** (Bruxelles, Liège, Namur) — traiteur mariage intime / réceptions.
3. **Châteaux, domaines, salles de réception sans cuisine intégrée ou avec liste de traiteurs agréés** — entrer dans la liste.
4. **Entreprises 20–250 personnes** (RH, office manager, CEO de PME) — séminaires, team building cuisine, réceptions clients.
5. **Conciergeries privées, agences événementielles, hôtels boutique sans restaurant** — sous-traitance chef.
6. **Caves, vinothèques, domaines viticoles** — soirées accords mets-vins (lien Vinaria).

Exclusions : restaurants concurrents, grandes chaînes hôtelières avec restauration intégrée, particuliers trouvés via des données personnelles, toute cible hors Benelux sans demande explicite.

## Grille de scoring (sur 100)

| Critère | Points | Comment l'évaluer |
| --- | --- | --- |
| Adéquation segment | 0–25 | Segment 1–3 = 20–25 ; 4–6 = 10–20 |
| Zone géographique | 0–15 | Wallonie/Bruxelles = 15 ; Benelux proche = 8 ; loin = 0 |
| Signal d'achat récent | 0–20 | Événement annoncé, ouverture, nouvelle saison, recrutement, post récent (< 90 j) |
| Niveau premium / budget | 0–15 | Prix affichés, standing, clientèle visée |
| Décideur joignable | 0–15 | Nom + rôle + email pro publié sur une source vérifiable |
| Pas de partenaire exclusif visible | 0–10 | Aucun traiteur/chef exclusif affiché |

- **≥ 70** : lead chaud → brouillon d'email personnalisé immédiat.
- **50–69** : lead tiède → brouillon, priorité secondaire.
- **< 50** : ne pas contacter, garder en note.

## Ton des emails

- Français par défaut (néerlandais/anglais seulement si le site du prospect est uniquement dans cette langue).
- Vouvoiement. Chaleureux, précis, sans superlatifs creux (« exceptionnel », « unique », « révolutionnaire » interdits).
- Court : 90–140 mots pour un premier contact. Une seule question / un seul CTA.
- Toujours une accroche **spécifique et vérifiable** sur le prospect (citée avec l'URL source dans le pipeline).
- Signature :

```
Reginald Smit
Chef — Ethny Nomad Cuisine
reginald@ethnyfusion.be · ethnyfusion.be
```

- Ligne de désinscription en fin de premier contact : « Si ce n'est pas le bon moment ou la bonne personne, un simple mot suffit et je ne vous recontacterai pas. »

## Conformité (RGPD / B2B Belgique)

- Uniquement des **adresses professionnelles publiées publiquement** (site officiel, page contact, annuaire pro). Jamais d'adresse devinée (prenom.nom@) sans la marquer `email_a_verifier`.
- Pas de scraping de profils personnels, pas de données sensibles.
- Maximum 3 contacts par prospect (J0, J+4, J+10), puis arrêt.
- Toute demande de désinscription → statut `ne_plus_contacter` immédiatement.

## Règle d'or

**Aucun agent n'envoie d'email.** Les agents créent des **brouillons Gmail**. Reginald relit et envoie.
