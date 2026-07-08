# Workflow d'automatisation simple

Objectif : automatiser l'organisation de la production et de la validation, sans publier automatiquement et sans complexité inutile.

Flux recommandé :

`Notion -> Canva -> Metricool -> Instagram / Facebook / LinkedIn / Google Business Profile -> Vercel Analytics / Google Analytics`

## Principe

Notion reste la source de vérité. Canva sert à produire les assets. Metricool sert à programmer ou préparer les publications. Les plateformes reçoivent uniquement les contenus validés. Les performances reviennent ensuite dans Notion.

Aucune publication automatique ne doit partir sans validation humaine.

## Structure de base de données Notion

Créer une base nommée :

`Campagne lancement nouveau site 2026`

Vues recommandées :

- Calendrier : par date de publication.
- Kanban production : par statut.
- Instagram priorité : filtre plateforme contient Instagram.
- À valider : filtre statut = À valider.
- Publié : filtre statut = Publié.
- Performance : tri par engagement ou trafic.

## Champs nécessaires

- titre ;
- plateforme ;
- format ;
- date de publication ;
- phase de campagne ;
- objectif ;
- visuel Canva ;
- texte ;
- CTA ;
- statut ;
- lien publié ;
- performance ;
- notes.

Le détail complet est dans `notion-database-schema.md`.

## Statuts de production

1. Idée
2. Brief visuel
3. Visuel à créer
4. Texte à relire
5. À valider
6. Validé
7. Programmé
8. Publié
9. Performance à analyser
10. Archivé

## Workflow opérationnel

### Étape 1 - Préparation Notion

Importer les 21 lignes du calendrier dans Notion.

Pour chaque contenu :

- renseigner la date relative ;
- choisir la plateforme principale ;
- copier le texte court ;
- ajouter le CTA ;
- renseigner l'asset Canva à créer ;
- mettre le statut `Brief visuel`.

### Étape 2 - Production Canva

Créer les templates avant les posts individuels.

Ordre recommandé :

1. template carrousel teasing ;
2. template story teasing ;
3. template reel cover ;
4. template carrousel service ;
5. template Google Business Profile.

Pour chaque post :

- dupliquer le template ;
- intégrer la photo, texture ou capture ;
- vérifier contraste et lisibilité ;
- exporter au bon format ;
- coller le lien Canva dans Notion ;
- passer le statut à `Texte à relire`.

### Étape 3 - Validation

Validation humaine obligatoire avant programmation.

Checklist de validation :

- le texte ne promet pas de disponibilité ;
- le texte ne donne pas de prix final ;
- l'image respecte le vert profond, les pictogrammes et le contraste ;
- aucun client identifiable sans accord ;
- le CTA est clair ;
- le post ne révèle pas le site avant Jour J ;
- le lien du site est correct après lancement.

Quand tout est correct, passer le statut à `Validé`.

### Étape 4 - Programmation Metricool

Copier les contenus validés dans Metricool.

Règles :

- Instagram prioritaire ;
- stories à publier manuellement si stickers ou compte à rebours ;
- Facebook peut reprendre les posts Instagram les plus accessibles ;
- LinkedIn uniquement pour corporate, nouveau site et clarté business ;
- Google Business Profile 1 à 2 posts pendant la campagne, puis rythme hebdomadaire.

Après programmation, passer le statut à `Programmé`.

### Étape 5 - Publication

Le jour de publication :

- vérifier le visuel ;
- vérifier le texte ;
- vérifier le lien ;
- publier ou confirmer la publication programmée ;
- coller le lien publié dans Notion ;
- passer le statut à `Publié`.

### Étape 6 - Suivi des performances

À J+2 et J+7 après chaque publication importante :

- noter les vues ;
- noter les likes, commentaires, partages, sauvegardes ;
- noter les clics lien si disponibles ;
- noter les visites site via Vercel Analytics / Google Analytics ;
- noter les demandes reçues ;
- ajouter une conclusion courte dans `performance`.

## Fréquence de publication

Phase teasing J-7 à J-1 :

- 1 contenu visible par jour sur Instagram ;
- stories complémentaires si possible ;
- ne pas tout révéler avant Jour J.

Jour J :

- 1 reel ou carrousel Instagram ;
- 1 story lien ;
- 1 post Facebook ;
- 1 post LinkedIn ;
- 1 post Google Business Profile.

J+1 à J+13 :

- 4 à 5 posts Instagram par semaine ;
- 1 post Google Business Profile par semaine ;
- 1 post LinkedIn orienté corporate ;
- stories entre les posts pour relayer les services.

## Automatisation légère recommandée

Sans connecter d'API et sans publier automatiquement :

- utiliser Notion comme tableau de production ;
- utiliser les templates Canva pour produire plus vite ;
- utiliser le CSV `metricool-schedule.csv` comme base de copie ;
- utiliser Metricool pour visualiser le planning ;
- utiliser une checklist Notion avant chaque publication ;
- reporter les performances manuellement une fois par semaine.

Automatisation à éviter pour l'instant :

- publication automatique sans validation ;
- génération automatique de textes non relus ;
- connexion directe Notion vers réseaux sociaux ;
- synchronisation complexe avec trop de statuts ;
- intégration API tant que le process manuel n'est pas stable.

## Indicateurs à suivre

- vues reels ;
- taux de sauvegarde Instagram ;
- réponses en stories ;
- clics vers le site ;
- visites des pages services ;
- demandes de proposition ;
- appels ou messages directs ;
- performances GBP ;
- posts qui génèrent le plus de conversations.

## Routine hebdomadaire après campagne

Chaque lundi :

- regarder les performances de la semaine ;
- choisir 1 angle gagnant à répéter ;
- planifier 1 post GBP ;
- planifier 2 posts Instagram ;
- préparer 3 stories ;
- mettre à jour Notion.
