# Resend Setup Ethny

Cette couche prepare les tests Resend pour les templates email Ethny. Elle ne lance aucune campagne massive.

## Installation

Depuis la racine du projet `ethny-email-dashboard` :

```bash
npm install
```

Dependances ajoutees :

- `resend`
- `@react-email/render`
- `next`

## Variables d'environnement

Creer un fichier `.env.local` local, jamais committe, avec :

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TEST_EMAIL=
RESEND_AUDIENCE_ID=
RESEND_WEBHOOK_SECRET=
N8N_WEBHOOK_SECRET=
ADMIN_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`RESEND_FROM_EMAIL` doit utiliser un domaine verifie dans Resend, par exemple :

```bash
RESEND_FROM_EMAIL="Ethny Nomad Cuisine <contact@ethny.be>"
```

Verifier la presence des variables sans afficher les secrets :

```bash
npm run email:check-env
```

## Creer et verifier le domaine Resend

1. Creer ou ouvrir le compte Resend.
2. Ajouter le domaine d'envoi.
3. Copier les entrees DNS demandees par Resend : SPF, DKIM, MX si requis.
4. Ajouter ces entrees chez le gestionnaire DNS.
5. Attendre la validation.
6. Tester d'abord vers `RESEND_TEST_EMAIL`.

Ne pas envoyer depuis un domaine non verifie en production.

## Lancer l'API Next locale

```bash
npm run next:dev
```

API locale :

```text
http://localhost:3000
```

La preview visuelle locale reste separee :

```bash
npm run dev
```

Preview :

```text
http://localhost:3002
```

## Envoyer un email test

```bash
curl -X POST http://localhost:3000/api/email/send-test \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: $ADMIN_SECRET" \
  -d '{
    "to": "ton-email@gmail.com",
    "campaignId": "new-website-announcement",
    "variables": {
      "firstName": "Reginald",
      "websiteLink": "https://ethny.be",
      "unsubscribeLink": "https://ethny.be/unsubscribe"
    }
  }'
```

La route valide l'adresse, rend le template React Email en HTML et texte, puis envoie via Resend avec `RESEND_FROM_EMAIL`.

## Generer une preview HTML sans envoyer

```bash
curl -X POST http://localhost:3000/api/email/send-campaign-preview \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: $ADMIN_SECRET" \
  -d '{
    "campaignId": "private-chef-experience",
    "variables": {
      "firstName": "Camille",
      "eventType": "diner prive"
    }
  }'
```

Cette route est utile pour navigateur, Postman, n8n ou futur dashboard admin.

## Tester dans Gmail

1. Envoyer un test a une adresse Gmail controlee.
2. Verifier le sujet, le preheader et le rendu mobile.
3. Verifier les images, les boutons et le footer.
4. Controler le dossier spam.
5. Verifier que le lien de desinscription est present pour les campagnes marketing.

## Resend Audience

Pour une audience plus tard :

1. Nettoyer les contacts opt-in.
2. Importer uniquement les contacts autorises.
3. Segmenter selon les tags CRM.
4. Utiliser `RESEND_AUDIENCE_ID`.
5. Garder une validation humaine avant tout envoi groupe.

Les envois massifs ne sont pas actives dans cette architecture.
