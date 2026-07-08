# Deploiement Vercel - Ethny Email Dashboard

Objectif : deployer le module interne `Ethny Email Dashboard` sur :

```text
https://ops.ethny.be/email
```

Architecture cible :

```text
GitHub ethny-operating-system
Vercel
ops.ethny.be
/email
Resend
```

Nom du projet Vercel recommande :

```text
ethny-email-dashboard
```

## 1. Push sur GitHub

Depuis le repo local :

```bash
git status
git add .
git commit -m "Prepare Ethny Email Dashboard for Vercel"
git push
```

Ne jamais ajouter `.env.local`. Il est ignore par `.gitignore`.

## 2. Importer le repo dans Vercel

Dans Vercel :

1. `Add New Project`
2. Importer le repo GitHub `ethny-operating-system`
3. Nom du projet : `ethny-email-dashboard`
4. Root Directory : `./` si le repo contient directement `package.json`, `app/`, `emails/` et `vercel.json`
5. Si Vercel affiche `package.json not found`, revenir et choisir le sous-dossier `ethny-operating-system`
6. Application Preset / Framework : `Next.js`
7. Build command : `npm run next:build`
8. Install command : `npm install`
9. Deploy

Le fichier `vercel.json` prepare deja :

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run next:build",
  "devCommand": "npm run next:dev",
  "installCommand": "npm install"
}
```

## 3. Variables d'environnement Vercel

Dans Vercel Project Settings > Environment Variables, ajouter :

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL="Ethny Nomad Cuisine <contact@ethny.be>"
RESEND_TEST_EMAIL=
RESEND_WEBHOOK_SECRET=
N8N_WEBHOOK_SECRET=
ADMIN_SECRET=
NEXT_PUBLIC_SITE_URL=https://ops.ethny.be
ETHNY_DISABLE_LOCAL_ADMIN_BYPASS=true
```

Regles :

- `RESEND_API_KEY` reste serveur uniquement.
- `ADMIN_SECRET` protege `/email`.
- `NEXT_PUBLIC_SITE_URL` est public, ne jamais y mettre un secret.
- `RESEND_FROM_EMAIL` doit utiliser le domaine verifie dans Resend.
- `ETHNY_DISABLE_LOCAL_ADMIN_BYPASS=true` ferme le bypass admin local en production.

Appliquer les variables au minimum a `Production`. Pour tester en preview, les ajouter aussi a `Preview`.

## 4. Configurer `ops.ethny.be`

Dans Vercel :

1. Ouvrir le projet.
2. Aller dans `Settings > Domains`.
3. Ajouter `ops.ethny.be`.
4. Suivre l'instruction DNS donnee par Vercel.

Cote DNS, creer l'entree demandee par Vercel, generalement :

```text
ops.ethny.be CNAME cname.vercel-dns.com
```

Attendre la propagation DNS et la validation Vercel.

## 5. Tester le dashboard

Ouvrir :

```text
https://ops.ethny.be/email
```

Entrer `ADMIN_SECRET`.

Verifier :

- liste des campagnes ;
- statut `draft` / `ready` ;
- sujet par defaut ;
- segment recommande ;
- preview dans l'iframe ;
- editeur HTML sur `/email/editor` ;
- variables dynamiques, nuances Ethny, blocs premium ;
- bouton `Envoyer test`.

L'envoi test utilise `RESEND_TEST_EMAIL`. Aucun envoi massif ni Broadcast Resend n'est implemente.

## 6. Tester l'envoi Resend depuis Vercel

Depuis `/email` :

1. Choisir une campagne.
2. Cliquer `Preview`.
3. Cliquer `Envoyer test`.
4. Verifier la reception dans Gmail.

Si le domaine Resend n'est pas encore `verified`, l'envoi peut echouer. Attendre la validation DNS Resend, puis relancer un test.

## 7. Verifier les logs

Dans Vercel :

1. Ouvrir le projet.
2. Aller dans `Logs`.
3. Filtrer les routes :
   - `/api/email/send-test-admin`
   - `/api/email/preview-html`
   - `/api/webhooks/resend`

Dans Resend :

1. Ouvrir `Emails`.
2. Verifier le message test.
3. Controler les statuts : delivered, opened, clicked, bounced, complained.

## 8. Webhooks Resend et n8n

Routes preparees :

```text
GET /email
GET /email/editor
POST /api/webhooks/resend
POST /api/webhooks/n8n/email-campaign
POST /api/email/send-html-test
```

Secrets associes :

```bash
RESEND_WEBHOOK_SECRET=
N8N_WEBHOOK_SECRET=
```

La route n8n limite l'action a un seul contact par requete. Aucun envoi groupe n'est autorise pour l'instant.

## 9. Evolutions futures

Le dashboard est pret pour ajouter plus tard :

- audiences Resend ;
- sauvegarde serveur des brouillons HTML ;
- synchronisation CRM Notion ;
- historique des tests ;
- validation humaine avant campagne ;
- import CSV nettoye ;
- segmentation avancee.
