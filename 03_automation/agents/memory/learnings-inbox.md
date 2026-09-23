# Règles apprises — Inbox Manager

Lu au début de chaque run. Maintenu par `ethny-agent-coach` (max 25 règles actives).
Format : `- R-INB-NNN · statut · N obs · date — règle. [preuves]`
Seules les règles `active` s'appliquent ; les `candidate` attendent une 2e observation.

## Actives

- R-INB-001 · active · 5 obs · 2026-09-23 — Leads via plateformes (ChefMaison, StarOfService, chef.eu, Airbnb, Fetchef) : notifications no-reply, texte tronqué. Ne JAMAIS créer de brouillon Gmail (il irait au support). Libellé `Ethny/2-Lead` ou `1-Urgent`, statut pipeline `a_repondre_plateforme`, et dans le rapport : lien vers le fil + texte de réponse suggéré à coller sur la plateforme. [run 2026-09-23]
- R-INB-002 · active · 3 obs · 2026-09-23 — Répondre dans la langue du client (FR / NL / EN), pas en français par défaut. [Taste Institute EN, Gouwestrand NL]
- R-INB-003 · active · 1 obs (fait de config) · 2026-09-23 — La boîte reçoit sur ethnyfusion@gmail.com ET reginald@ethnyfusion.be (redirigée) ; Reginald envoie depuis les deux. Pour détecter un envoi : `in:sent to:<email>` couvre les deux, ne jamais filtrer sur une seule adresse `from:`. [run 2026-09-23]
- R-INB-004 · active · 1 obs · 2026-09-23 — Dépassement du plafond de fils : lire en entier les fils d'humains et business d'abord ; newsletters/pub classées sur l'extrait uniquement. [run 2026-09-23]

## Candidates

- R-INB-005 · candidate · 1 obs · 2026-09-23 — Un fil où Reginald a répondu mais a laissé une question du client sans réponse (ex. taux TVA) compte comme « attend une réponse » → Urgent si > 24 h. [Gouwestrand FACT-024]
- R-INB-006 · candidate · 1 obs · 2026-09-23 — Demandes StarOfService « cherche un wedding planner » : hors offre → `9-Bruit`, sauf si le texte mentionne repas / traiteur. [1a0a9d36391f998a]
- R-INB-007 · candidate · 1 obs · 2026-09-23 — Réservation plateforme avec événement < 14 j et messages client non lus → `1-Urgent` même si la réservation est confirmée. [1a0cd1785d45a09e]

## Retirées

_(aucune)_
