# Architecture — agents Ethny auto-améliorants

Objectif : des agents qui **apprennent de leurs erreurs** à partir de signaux réels (ce que Reginald envoie, corrige, ignore), sans exploser les crédits, et sans jamais perdre les garde-fous (aucun envoi automatique).

## 1. Vue d'ensemble

```
            ┌──────────────── Cycle Ethny (lun · mer · ven, 07:30) ────────────────┐
            │                                                                       │
 Gmail ───► │ 1. Inbox Manager ──► libellés + brouillons + pipeline + run log       │
            │ 2. Lead Prospector (lun, mer) ──► 10 brouillons + pipeline + run log   │
            │ 3. Coach ──► mesure → diagnostique → améliore (learnings / proposals) │
            └───────────────────────────────────────────────────────────────────────┘
                          ▲                                   │
                          │   règles apprises (learnings-*.md)│
                          └───────────────────────────────────┘
 Reginald : relit, corrige, envoie ─► ces actions SONT le signal d'apprentissage
```

Trois agents, une mémoire fichier dans `03_automation/agents/memory/` :

| Fichier | Rôle | Écrit par |
| --- | --- | --- |
| `runs.jsonl` | 1 ligne par exécution : compteurs, hésitations, erreurs d'outils | Inbox, Prospector |
| `drafts.jsonl` | Copie de chaque brouillon créé (pour comparer avec ce qui est réellement envoyé) | Inbox, Prospector |
| `learnings-inbox.md` / `learnings-prospector.md` | Règles apprises, courtes, lues au démarrage de chaque run | Coach |
| `metrics.md` | Tableau de bord hebdo des indicateurs | Coach |
| `proposals.md` | Changements « lourds » en attente de validation de Reginald | Coach |
| `changelog.md` | Historique de chaque changement appliqué + raison + résultat | Coach |
| `feedback.md` | Remarques libres de Reginald (« trop formel », « ce lieu est un concurrent ») | Reginald |

## 2. La boucle : apprendre → erreur → améliorer → automatiser

### Étape A — Agir et tout journaliser
Chaque run d'Inbox/Prospector se termine par :
- une ligne dans `runs.jsonl` (voir schéma §6) ;
- une ligne par brouillon dans `drafts.jsonl` (id, fil, type, segment, variante, texte).

### Étape B — Collecter les signaux (sans LLM coûteux)
Le Coach mesure **ce que Reginald a fait** des productions des agents. Ce sont des signaux gratuits et honnêtes :

| Signal | Comment on le détecte | Ce que ça dit |
| --- | --- | --- |
| Brouillon envoyé **tel quel** (similarité ≥ 90 %) | message dans `in:sent` du même fil vs `drafts.jsonl` | ✅ bonne rédaction |
| Brouillon envoyé **modifié** | même comparaison, 40–90 % | ⚠️ le diff = une leçon de style/contenu |
| Brouillon **jamais envoyé** après 5 jours / supprimé | brouillon absent de `in:sent` et des brouillons | ❌ lead mal jugé ou texte hors sujet |
| **Libellé corrigé** | fil libellé `Ethny/X` par l'agent qui porte maintenant `Ethny/Y` | ❌ erreur de classement |
| Libellé `Ethny/Erreur-agent` posé par Reginald | recherche `label:Ethny/Erreur-agent` | ❌ erreur signalée explicitement |
| Taux de réponse prospects par segment / variante | `pipeline.csv` | 📈 quels segments et angles convertissent |
| Hésitations / erreurs d'outils | `runs.jsonl` | 🔧 instructions floues ou cassées |
| `feedback.md` | lecture | 🗣️ consigne directe (prioritaire) |

### Étape C — Diagnostiquer
Le Coach transforme les signaux en **règles candidates**, courtes et vérifiables, par ex. :
- « Les demandes via le formulaire Google Sheets → toujours `Ethny/2-Lead`, même sans mot "devis". » (3 corrections de libellé)
- « Reginald retire systématiquement "N'hésitez pas" → ne jamais l'écrire. » (4 diffs)
- « Segment `entreprise` : 0 réponse sur 14 envois → baisser la priorité, tester l'angle "réception clients" plutôt que "team building". »

### Étape D — Améliorer, selon trois niveaux de risque

| Niveau | Quoi | Qui décide |
| --- | --- | --- |
| **1 — Auto** | Ajouter / renforcer / retirer une règle dans `learnings-*.md` ; ajuster la liste de requêtes de recherche ; réordonner la priorité des segments | Coach, directement |
| **2 — Proposé** | Modifier playbook, modèles d'emails, grille de score, prompts des agents | Coach écrit dans `proposals.md`, Reginald valide (« ok P-003 ») |
| **Interdit** | Toucher aux garde-fous : outils d'envoi, `disallowedTools`, règles RGPD, « jamais d'envoi » | Personne en automatique |

Cycle de vie d'une règle (évite l'accumulation de bruit) :
1. `candidate` — 1 observation ; pas encore appliquée.
2. `active` — ≥ 2 observations concordantes ; lue par l'agent.
3. `retirée` — contredite par un signal, ou aucune occurrence en 3 semaines.
Plafond : **25 règles actives par agent** (garde le contexte court = moins de crédits). Au-delà, le Coach fusionne ou retire les plus faibles.

### Étape E — Vérifier que ça améliore vraiment
Chaque changement appliqué est noté dans `changelog.md` avec l'indicateur visé et sa valeur avant. Au run de revue suivant, le Coach compare :
- indicateur meilleur ou stable → le changement reste ;
- indicateur pire sur ≥ 2 revues → **retour arrière** automatique (niveau 1) ou proposition de retour (niveau 2).

Pour la prospection, les modèles tournent en **A/B** (variante `A`/`B` notée dans `drafts.jsonl`). Honnêteté statistique : avec ~20 envois/semaine, un taux de réponse n'est lisible qu'après ~30 envois par variante. Avant ça, le Coach s'appuie surtout sur le taux d'édition des brouillons (disponible dès la première semaine).

## 3. Indicateurs suivis (`metrics.md`)

| Indicateur | Cible | Source |
| --- | --- | --- |
| Brouillons envoyés sans modification | ≥ 60 % à S4 | drafts vs sent |
| Brouillons abandonnés | ≤ 20 % | drafts vs sent |
| Précision du classement (1 − corrections / fils libellés) | ≥ 95 % | libellés |
| Leads entrants manqués (signalés par Reginald) | 0 | `Ethny/Erreur-agent`, feedback |
| Taux de réponse prospection | ≥ 10 % | pipeline |
| Leads prospection ultra-qualifiés livrés (score ≥ 60, email vérifié) | 10/10 | runs |
| Coût : fils lus + pages scrapées par run | en baisse | runs |

## 4. Maîtrise des crédits

| Levier | Règle |
| --- | --- |
| Fréquence | **1 seule Routine**, 3×/semaine (lun · mer · ven), une session pour les 3 agents |
| Modèle | `sonnet` pour les 3 agents (qualité suffisante, beaucoup moins cher que le modèle le plus grand) |
| Inbox | Max 40 fils/run ; lecture des extraits (`search_threads`) d'abord, `get_thread` seulement pour les fils non-bruit ; fils déjà libellés ignorés |
| Prospector | Lun + mer seulement ; max 25 candidats, max 3 pages scrapées par candidat ; recherche stoppée dès 10 leads ≥ 60 |
| Coach | Mode **léger** lun/mer (compteurs + libellés corrigés, ~aucun raisonnement) ; mode **complet** le vendredi seulement ; max 15 brouillons comparés |
| Mémoire | Règles plafonnées à 25/agent ; `runs.jsonl` résumé et purgé au-delà de 8 semaines |
| Arrêt | Si rien de nouveau dans la boîte et pipeline vide de relances → run court, pas de Coach |

## 5. Calendrier d'optimisation

| Phase | Durée | Rythme |
| --- | --- | --- |
| **Rodage** | Semaines 1–4 (12 cycles) | lun · mer · ven : Inbox + Prospector (lun, mer) + Coach (léger / complet ven) |
| **Croisière** | À partir de S5, si objectifs S4 atteints | Inbox lun · mer · ven, Prospector lun, Coach complet 1×/semaine (ven) |
| **Rodage prolongé** | Si objectifs non atteints à S4 | 2 semaines de plus, puis réévaluation avec Reginald |

Le Coach écrit dans `metrics.md`, à la fin de S4, la recommandation de passage en croisière ; Reginald valide et la Routine est ajustée.

## 6. Schémas

`runs.jsonl` (une ligne JSON par run) :

```json
{"ts":"2026-09-23T07:30:00+02:00","agent":"inbox","threads_seen":34,"threads_read":12,"by_label":{"2-Lead":2,"9-Bruit":14},"drafts":3,"uncertain":[{"thread_id":"…","hesitation":"Lead vs Opportunité : lieu qui propose un partenariat"}],"tool_errors":[],"rules_applied":["R-INB-004"],"notes":"…"}
```

`drafts.jsonl` (une ligne par brouillon) :

```json
{"ts":"2026-09-23","agent":"prospector","draft_id":"r-…","thread_id":"…","kind":"prospection","segment":"gites","variant":"A","lead_id":"L-20260923-01","subject":"…","body":"…"}
```

Règle dans `learnings-*.md` :

```
- R-INB-004 · active · 3 obs · 2026-09-26 — Les notifications "Nouvelle réponse Google Forms" sont des leads : ouvrir le fil et extraire les champs. [preuves : fils …, …]
```

## 7. Dépendances

- Les Routines démarrent une session neuve depuis GitHub : **le code et la mémoire doivent être poussés** sur le dépôt, et la session doit avoir l'accès en écriture pour sauvegarder la mémoire après chaque cycle.
- Connecteurs autorisés pour la Routine : Gmail (+ Firecrawl pour la prospection).
