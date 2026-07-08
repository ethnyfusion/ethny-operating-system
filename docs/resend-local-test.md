# Test local Resend

Objectif : envoyer un email test individuel avec la campagne `new-website-announcement`, sans curl et sans exposer la cle API.

## 1. Creer `.env.local`

Si `.env.local` n'existe pas :

```bash
cd ethny-operating-system
cp .env.example .env.local
```

Remplir ensuite :

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL="Ethny Nomad Cuisine <contact@ethny.be>"
RESEND_TEST_EMAIL=ton-email@gmail.com
ADMIN_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ETHNY_DISABLE_LOCAL_ADMIN_BYPASS=false
```

Ne jamais committer `.env.local`. Le fichier est ignore par `.gitignore`.

## 2. Verifier les variables

Verifier d'abord que Node est disponible :

```bash
node -v
npm -v
```

Le projet vise Node `20.20.2` ou plus recent. Si `node` ou `npm` n'est pas trouve en local, installer Node 20 avec `nvm` puis relancer :

```bash
nvm install
nvm use
```

Dans l'environnement Codex local, le fallback qui fonctionne est le Node integre a l'app :

```bash
PATH="/Applications/Codex.app/Contents/Resources/cua_node/bin:$PATH" npm -v
```

Si le dashboard `/email` affiche `Secret admin invalide`, reinitialiser le code admin local :

```bash
npm run admin:secret:setup
```

La commande met a jour `ADMIN_SECRET` dans `.env.local` sans afficher le secret. Redemarrer ensuite `npm run next:dev` avant de se reconnecter.

```bash
npm run email:check-env
```

Le script verifie :

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TEST_EMAIL`
- `ADMIN_SECRET`
- `NEXT_PUBLIC_SITE_URL`

Il ne montre jamais la cle API.

## 3. Lancer Next

Terminal 1 :

```bash
npm run next:dev
```

L'API d'envoi doit etre disponible sur :

```text
http://localhost:3000
```

La preview templates reste disponible separement sur :

```text
http://localhost:3002
```

## 4. Envoyer le test

Terminal 2 :

```bash
npm run email:send-test
```

Le script :

- lit `.env.local` ;
- utilise `RESEND_TEST_EMAIL` comme destinataire ;
- transmet `ADMIN_SECRET` en header serveur ;
- appelle `POST /api/email/send-test` ;
- envoie la campagne `new-website-announcement` ;
- n'affiche jamais `RESEND_API_KEY`.

## Domaine Resend

Si le domaine Resend n'est pas encore `verified`, l'envoi peut echouer. Dans ce cas, attendre la validation DNS Resend, puis relancer :

```bash
npm run email:send-test
```

## Aucune campagne massive

Ce test envoie un seul email a `RESEND_TEST_EMAIL`. Aucun Broadcast Resend ni envoi massif n'est cree.
