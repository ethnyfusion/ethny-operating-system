# Reglages Import Vercel

Sur l'ecran `New Project` de Vercel :

```text
Project Name: ethny-email-dashboard
Framework Preset: Next.js
Root Directory: ./
Install Command: npm install
Build Command: npm run next:build
Output Directory: laisser vide
```

Si Vercel affiche `package.json not found`, cela signifie que le repo GitHub contient ce projet dans un sous-dossier. Dans ce cas seulement :

```text
Root Directory: ethny-operating-system
```

## Variables Vercel

Ajouter dans `Settings > Environment Variables` :

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

Ne jamais mettre de secret dans une variable `NEXT_PUBLIC_*`.

## Routes attendues apres deploy

```text
/
/email
/email/editor
/api/email/send-test
/api/email/send-html-test
/api/webhooks/resend
/api/webhooks/n8n/email-campaign
```

## Domaine

Ajouter ensuite :

```text
ops.ethny.be
```

DNS generalement demande :

```text
ops.ethny.be CNAME cname.vercel-dns.com
```
