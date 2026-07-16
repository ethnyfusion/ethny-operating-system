# Vinaria by Ethny

Application indépendante d’accords mets-vins. Vinaria n’est pas une marketplace : Ethny maîtrise le catalogue, le prix client, les accords, la marge, les partenaires et la livraison.

## Démarrage

Prérequis : Node.js 20.9 ou supérieur.

```bash
cd apps/vinaria
cp .env.example .env.local
npm install
npm run dev
```

Contrôles :

```bash
npm run typecheck
npm test
npm run lint
npm run build
```

## Architecture

- `src/app` : routes Next.js App Router, client et administration ;
- `src/components` : interface, formulaires, panier et suivi ;
- `src/types` : contrat métier central ;
- `src/data` : catalogue, menus et données de démonstration ;
- `src/lib` : moteur d’accord, prix et création de commande ;
- `src/services` : documents, livraison, logs et droits RGPD ;
- `src/emails` : six templates sans dépendance à un expéditeur ;
- `src/config` : configuration métier et lecture paresseuse des variables.

Le MVP utilise le navigateur pour démontrer panier, création de commande et suivi. Il ne prétend pas assurer une persistance de production. L’étape suivante est d’implémenter un repository serveur (PostgreSQL conseillé) derrière les mêmes types, puis d’envoyer les emails via un prestataire.

## Sécurité et RGPD

- En production, `/admin/*` est refusé si `VINARIA_ADMIN_ACCESS_TOKEN` n’est pas configuré ou si le cookie HTTP-only `vinaria_admin` ne correspond pas. Remplacer ce mécanisme initial par le SSO Ethny dès que disponible.
- La vérification est effectuée dans le layout serveur, pas uniquement dans une redirection intermédiaire.
- Âge, CGV et confidentialité sont obligatoires au checkout. Le marketing est séparé et facultatif.
- Aucune donnée de carte n’est collectée ni stockée.
- `logger.ts` n’accepte qu’une liste blanche de métadonnées non sensibles.
- `customer-data.ts` définit les opérations futures d’export, anonymisation et suppression.
- Ne jamais préfixer un secret par `NEXT_PUBLIC_`.
- Les données de démonstration doivent être remplacées avant toute mise en production.

## Déploiement

### Vercel preview

Créer un projet Vercel avec `apps/vinaria` comme Root Directory, framework Next.js, puis renseigner les variables de `.env.example`. Chaque pull request pourra produire une preview.

### Scalingo final

Déployer `apps/vinaria` comme racine applicative. Le `Procfile` lance le serveur standalone sur `$PORT`. Configurer Node 20+, les variables d’environnement, le domaine, les health checks et une base PostgreSQL avant ouverture commerciale.

Le build `output: "standalone"` évite de dépendre de Vercel au runtime. Tester le parcours complet sur un environnement Scalingo de staging avant promotion.

## Décisions MVP

- Moteur déterministe et explicable avant toute couche IA ;
- recommandation exclusivement dans le catalogue Ethny ;
- livraison manuelle fonctionnelle, transporteurs en placeholders ;
- paiement manuel sans stockage de carte ;
- back-office lisible, sans ERP prématuré ;
- français en V1, modèles prêts pour ajouter NL/EN.

Voir [BUSINESS_FLOW.md](./BUSINESS_FLOW.md) et [AUDIT_LOVABLE.md](./AUDIT_LOVABLE.md).
