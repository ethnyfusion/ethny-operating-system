# Pipeline de leads

`pipeline.csv` est la mémoire commune des deux agents (entrants et prospection).
Une ligne = un prospect. Ne jamais supprimer une ligne : changer le `statut`.

## Colonnes clés

- `id` : `L-AAAAMMJJ-NN` (ex. `L-20260923-01`).
- `source` : `inbound` (reçu dans la boîte) ou `prospection` (trouvé par l'agent).
- `segment` : `gites`, `wedding_planner`, `lieu_reception`, `entreprise`, `conciergerie`, `cave`, `particulier`.
- `email_source_url` / `signal_source_url` : preuve publique de l'email et de l'accroche. Obligatoire pour la prospection.
- `score` : grille du `03_automation/agents/playbook-commercial.md`.

## Statuts

`a_qualifier` → `brouillon_pret` → `contacte_j0` → `relance_j4` → `relance_j10` → `repondu` → `rdv` → `devis_envoye` → `gagne` / `perdu`

Statuts d'arrêt : `ne_plus_contacter`, `email_a_verifier`, `ecarte`.

## Qui met à jour quoi

- `ethny-lead-prospector` ajoute les nouveaux prospects (`brouillon_pret`).
- Reginald passe en `contacte_j0` quand il envoie le brouillon (ou l'agent inbox le détecte dans les envoyés).
- `ethny-inbox-manager` détecte les réponses, passe en `repondu`, et prépare les relances J+4 / J+10.
