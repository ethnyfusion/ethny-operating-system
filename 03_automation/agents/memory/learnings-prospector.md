# Règles apprises — Lead Prospector

Lu au début de chaque run. Maintenu par `ethny-agent-coach` (max 25 règles actives).
Format : `- R-PRO-NNN · statut · N obs · date — règle. [preuves]`

## Requêtes et priorités

Ordre des segments pour le mode `mix` (le Coach le réordonne selon les résultats) :
1. gites
2. wedding_planner
3. lieu_reception
4. entreprise
5. conciergerie
6. cave

Rotation des variantes : alterner `A` (accroche = fait spécifique du prospect) et `B` (accroche = bénéfice pour leurs clients) d'un lead à l'autre ; noter la variante dans `drafts.jsonl`.

Requêtes qui ont bien marché : recherches ciblées par nom de lieu + « email contact » (ex. « Château Bayard / Domaine d'Achêne / … email+contact ») ; « wedding planner <ville> mariage intime/organisatrice » ; « château domaine location mariage Wallonie liste traiteurs recommandés » ; « caviste dégustation événement privé <ville> email contact ».
Requêtes à éviter (résultats hors cible) : « gîte de luxe Ardennes … piscine chef à domicile » (0 candidat utile) ; « salle de réception Namur sans cuisine liste traiteurs » (0) ; « team building cuisine entreprise Liège Bruxelles atelier » (0, résultats = concurrents/agences team building) ; « conciergerie privée Bruxelles chef à domicile clients » (0 sans scraping, emails non publiés en clair).
Domaines / entreprises écartés définitivement : _(à remplir)_

## Budget Firecrawl

- R-PRO-001 · active · 1 obs · 2026-09-23 — Firecrawl (recherche + scrape) épuise son crédit mensuel (1000) en ~9 appels ; WebFetch et curl sont bloqués par l'environnement (pas de repli possible). Budget : utiliser `firecrawl_search` seulement si `WebSearch` ne suffit pas, et réserver `firecrawl_scrape` à la page contact/mentions légales des candidats déjà pré-qualifiés (score suffisant, juste l'email à confirmer) — jamais pour explorer ou pré-qualifier. [run 2026-09-23, panne après ~9 appels]

## Actives

_(aucune pour l'instant)_

## Candidates

- R-PRO-002 · candidate · 1 obs · 2026-09-23 — Segment `entreprise`/team building : les recherches génériques (« team building cuisine entreprise ») remontent des agences concurrentes, pas des prospects → préférer des requêtes ciblées par nom d'entreprise/lieu plutôt que par thématique générique. [run 2026-09-23]
- R-PRO-003 · candidate · 1 obs · 2026-09-23 — Une adresse Gmail publiée officiellement dans les mentions légales d'un site (ex. La Cabane de Victor) compte comme email vérifié valable, à signaler comme telle dans le rapport (pas un motif d'exclusion). [run 2026-09-23]

## Retirées

_(aucune)_
