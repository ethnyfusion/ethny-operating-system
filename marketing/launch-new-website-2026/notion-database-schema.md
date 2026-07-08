# Schéma Notion - Campagne lancement nouveau site 2026

Base de données recommandée :

`Campagne lancement nouveau site 2026`

## Colonnes

| Colonne | Type Notion | Options / format | Utilisation |
| --- | --- | --- | --- |
| titre | Title | Texte court | Nom interne du contenu |
| plateforme | Multi-select | Instagram, Instagram Story, Facebook, LinkedIn, Google Business Profile, Email | Canal de publication |
| format | Select | Carrousel, Reel, Story, Post carré, Post GBP, Post LinkedIn, Email | Format de contenu |
| date de publication | Date | Date réelle quand le Jour J est validé | Planification |
| date relative | Select | J-7 à J+13 | Repère campagne |
| phase de campagne | Select | Teasing, Reveal, Conversion, Preuve sociale, SEO local, Réactivation | Intention de la période |
| objectif | Select | Attention, Notoriété, Clic site, Demande, Réactivation, Preuve sociale | Rôle business |
| visuel Canva | URL | Lien Canva | Accès au design |
| asset à créer | Text | Nom du fichier ou template | Production visuelle |
| texte | Text | Caption complète | Texte prêt à publier |
| CTA | Select | Découvrir le site, Demander une proposition, Vérifier la disponibilité, Recevoir un devis personnalisé, Envoyer une demande, Voir les services | Appel à l'action |
| statut | Status | Idée, Brief visuel, Visuel à créer, Texte à relire, À valider, Validé, Programmé, Publié, Performance à analyser, Archivé | Suivi production |
| lien publié | URL | URL du post | Archivage |
| performance | Text | Résultats et conclusion | Analyse |
| notes | Text | Contraintes, validation, source avis, détails | Mémoire de travail |

## Statuts recommandés

| Statut | Définition | Responsable |
| --- | --- | --- |
| Idée | Sujet identifié, pas encore préparé | Marketing |
| Brief visuel | Angle et format définis | Marketing |
| Visuel à créer | Prêt pour Canva | Production |
| Texte à relire | Caption écrite, à contrôler | Chef / validation humaine |
| À valider | Visuel et texte prêts | Chef / validation humaine |
| Validé | Autorisé à programmer | Chef / marketing |
| Programmé | Planifié dans Metricool | Marketing |
| Publié | Visible en ligne | Marketing |
| Performance à analyser | Résultats à saisir | Marketing |
| Archivé | Terminé et documenté | Marketing |

## Vues utiles

### Calendrier général

- Vue calendrier sur `date de publication`.
- Filtre : statut n'est pas Archivé.

### Production Instagram

- Filtre : plateforme contient Instagram.
- Tri : date de publication croissante.

### À valider

- Filtre : statut est À valider.
- Tri : date de publication croissante.

### Programmé

- Filtre : statut est Programmé.
- Utile pour vérifier les posts avant diffusion.

### Performance

- Filtre : statut est Performance à analyser ou Publié.
- Tri : date de publication décroissante.

## Modèle de fiche Notion

Créer un template Notion nommé :

`Post campagne - Nouveau site`

Contenu du template :

```markdown
## Angle

## Message clé

## Texte final

## Visuel

## Checklist validation

- [ ] Pas de disponibilité promise
- [ ] Pas de tarif final inventé
- [ ] Pas d'avis client sans source
- [ ] Pas de visage client sans accord
- [ ] Contraste validé sur mobile
- [ ] CTA clair
- [ ] Lien du site vérifié

## Résultat après publication

- Vues :
- Interactions :
- Clics :
- Demandes reçues :
- Note :
```

## Règle de validation

Aucun contenu ne passe en `Programmé` sans statut `Validé`.

Aucun contenu ne passe en `Publié` sans lien publié ou note indiquant que le lien n'est pas disponible.

## Import initial

Importer ou recopier les lignes de `metricool-schedule.csv`, puis compléter :

- date de publication réelle ;
- lien Canva ;
- texte final ;
- validation ;
- performances.
