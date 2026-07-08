# Ethny Email Dashboard

Dashboard interne pour Ethny Nomad Cuisine :

- campagnes React Email ;
- preview navigateur ;
- editeur HTML avec blocs premium ;
- variables dynamiques CRM/n8n ;
- tests Resend individuels ;
- webhooks Resend et n8n prepares ;
- deploiement Vercel sur `ops.ethny.be`.

## Local

```bash
npm install
npm run email:check-env
npm run next:dev
```

Routes locales :

```text
http://localhost:3000/email
http://localhost:3000/email/editor
```

## Vercel

Projet recommande :

```text
ethny-email-dashboard
```

Build :

```bash
npm run next:build
```

Variables serveur a ajouter dans Vercel :

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

Documentation complete :

- `docs/vercel-email-dashboard-deploy.md`
- `docs/email-html-editor.md`
- `docs/resend-local-test.md`
- `docs/github-publish.md`
