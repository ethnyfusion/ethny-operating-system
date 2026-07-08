# Publier sur GitHub

Ce dossier local n'est pas lui-meme un checkout GitHub. Pour envoyer le code vers :

```text
ethnyfusion/ethny-operating-system
```

utiliser le script :

```bash
cd "/Users/reginaldsmit/Desktop/Codex ( Open ai ) /ethny-ai-ops/ethny-operating-system"
bash scripts/publish-to-github.sh
```

Ou double-cliquer :

```text
PUBLISH-GITHUB-THEN-VERCEL.command
```

Le script :

- clone le repo GitHub dans `.github-sync/` ;
- copie le projet local ;
- exclut les secrets et fichiers locaux ;
- commit sur `main` ;
- pousse vers GitHub.

Fichiers exclus :

- `.env`, `.env.*`, sauf `.env.example` ;
- `ADMIN_SECRET.local.txt` ;
- `admin-login-local.html` ;
- `.admin-secret.local` ;
- `node_modules` ;
- `.next` ;
- `dist` ;
- `.react-email`.

Si Git demande une authentification, se connecter avec GitHub dans le Terminal Mac puis relancer le script.

Apres le push, retourner dans Vercel et cliquer `Redeploy` ou finaliser l'import du projet `ethny-email-dashboard`.
