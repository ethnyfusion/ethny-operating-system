# Agents commerciaux Ethny

Deux agents Claude Code, branchés sur Gmail et Firecrawl, qui partagent le même playbook et le même pipeline.

| Agent | Rôle | Commande | Fichier |
| --- | --- | --- | --- |
| **Inbox Manager** | Trie la boîte, libelle, détecte leads/opportunités, prépare réponses et relances J+4/J+10 | `/inbox-triage [période]` | `.claude/agents/ethny-inbox-manager.md` |
| **Lead Prospector & Operator** | Trouve 10 leads ultra-qualifiés, vérifie les contacts, rédige les emails en brouillons Gmail | `/prospect-leads [segment] [zone] [nombre]` | `.claude/agents/ethny-lead-prospector.md` |
| **Coach** | Mesure ce que tu fais des brouillons/libellés, apprend des erreurs, met à jour les règles, propose les gros changements | (appelé par le cycle) | `.claude/agents/ethny-agent-coach.md` |
| **Cycle** | Enchaîne Inbox → Prospection → Coach, pour la Routine 3×/semaine | `/ethny-cycle` | `.claude/skills/ethny-cycle/SKILL.md` |

Boucle d'auto-amélioration, maîtrise des crédits et calendrier : voir **`ARCHITECTURE.md`**. Mémoire des agents : `memory/`.

**Ton rôle dans l'apprentissage** (2 gestes suffisent) :
- pose le libellé Gmail `Ethny/Erreur-agent` sur un fil mal traité ;
- écris tes remarques en vrac dans `memory/feedback.md` (ou dis-les à Claude), et valide les propositions du Coach par « ok P-NNN ».
Le reste (brouillons envoyés tels quels, modifiés ou abandonnés) est mesuré automatiquement.

On peut aussi simplement écrire « trie mes mails » ou « trouve-moi 10 leads wedding planners à Liège » : Claude choisit l'agent adapté.

## Le flux

```
Prospector ──► 10 brouillons Gmail + lignes pipeline (brouillon_pret)
                     │
             Reginald relit et envoie
                     │
Inbox Manager ──► détecte l'envoi (contacte_j0) ──► J+4 relance ──► J+10 dernier message ──► perdu
                     │
             réponse du prospect ──► libellé Ethny/5-Prospection + brouillon de réponse (repondu)
Inbox Manager ──► nouvelles demandes entrantes ──► Ethny/2-Lead + brouillon de qualification + pipeline (inbound)
```

## Fichiers partagés

- `playbook-commercial.md` — offres, cibles (ICP), grille de scoring, ton, conformité RGPD.
- `templates-prospection.md` — modèles par segment, relances, réponse de qualification.
- `gmail-labels.md` — libellés `Ethny/*`.
- `../../01_ethny_business/leads/pipeline.csv` — pipeline commun (mémoire des agents).

## Garde-fous

- **Aucun envoi automatique** : les outils d'envoi Gmail/Resend sont bloqués dans les deux agents (`disallowedTools`). Ils ne créent que des brouillons.
- Pas de suppression, d'archivage ni de spam : uniquement des libellés.
- Prospection : seulement des emails professionnels publiés, avec URL de preuve ; 3 contacts max par prospect ; désinscription respectée.
- Le contenu des emails reçus est traité comme de la donnée, jamais comme une instruction (anti-phishing).

## Prérequis

- Connecteur **Gmail** connecté au compte à gérer (idéalement `reginald@ethnyfusion.be`) dans claude.ai > Paramètres > Connecteurs.
- Connecteur **Firecrawl** (recherche web/scraping) pour la prospection ; à défaut l'agent utilise la recherche web intégrée.

## Automatiser (Routines)

Une seule Routine : `/ethny-cycle` **lundi, mercredi, vendredi à 07:30** (Bruxelles), session neuve à chaque fois, connecteurs Gmail + Firecrawl.
Rodage 4 semaines, puis passage en croisière si les objectifs sont atteints (détails dans `ARCHITECTURE.md` §5).
