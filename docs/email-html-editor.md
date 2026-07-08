# Editeur HTML Email Ethny

Route locale :

```text
http://localhost:3000/email/editor
```

## Objectif

L'editeur sert a modifier rapidement un email sans ouvrir les fichiers React.
Il est pense comme un atelier de brouillon :

- selection d'une campagne ;
- edition du sujet ;
- edition HTML ;
- preview live ;
- insertion de variables dynamiques ;
- insertion de blocs premium compatibles email ;
- insertion de nuances de la charte Ethny ;
- export / import JSON ;
- telechargement HTML ;
- envoi d'un test individuel via Resend.

## Elements disponibles

L'editeur expose :

- les variables dynamiques : `{{firstName}}`, `{{eventDate}}`, `{{quoteLink}}`, etc. ;
- les nuances de la charte email Ethny ;
- des blocs HTML premium : hero, storytelling, carte service, menu, citation, avis client, CTA et separateur.

Les blocs sont en HTML inline/table pour rester compatibles Gmail, Outlook et Apple Mail.

## Nuances Ethny

Les swatches de couleurs inserent le code hexadecimal dans le HTML au curseur.
Utilisation typique :

1. selectionner une propriete CSS dans le HTML, par exemple `background:`.
2. cliquer une nuance Ethny.
3. verifier la preview live.

Les tokens viennent de `emails/tokens/email-colors.ts`.

## Blocs premium

Chaque bloc est une section HTML complete, pensee pour email :

- Hero premium ;
- Storytelling ;
- Carte service ;
- Menu elegant ;
- Citation chef ;
- Avis client ;
- CTA premium ;
- Separateur.

Les blocs peuvent contenir des variables dynamiques comme `{{firstName}}`, `{{bookingLink}}`, `{{quoteLink}}`.

## Sauvegarde

Les modifications sont sauvegardees automatiquement dans le navigateur avec `localStorage`.

Important :

- ce n'est pas encore une base de donnees ;
- les brouillons restent sur la machine/le navigateur courant ;
- utiliser `Export JSON` pour conserver un brouillon ;
- utiliser `Import JSON` pour reprendre un brouillon.

## Envoi test

Le bouton `Envoyer test` appelle :

```text
POST /api/email/send-html-test
```

Cette route :

- n'expose jamais `RESEND_API_KEY` cote client ;
- envoie uniquement vers `RESEND_TEST_EMAIL` ;
- utilise le sujet et le HTML du brouillon courant ;
- refuse les brouillons trop courts ou trop lourds ;
- ne cree pas de Broadcast Resend ;
- reste protegee par `ADMIN_SECRET` hors bypass local.

## Workflow recommande

1. Choisir une campagne.
2. Modifier le sujet.
3. Inserer des variables et blocs premium.
4. Ajuster le HTML.
5. Verifier la preview live.
6. Cliquer `Envoyer test`.
7. Exporter le JSON si le brouillon doit etre garde.
8. Reporter ensuite les textes valides dans les templates React pour versionner proprement.

## Suite Vercel recommandee

Pour passer d'un atelier local a un vrai CMS email :

- ajouter une table `email_drafts` dans une base Vercel Postgres / Neon ;
- stocker `campaignId`, `subject`, `html`, `status`, `updatedAt`, `updatedBy` ;
- ajouter une route de sauvegarde serveur ;
- ajouter une validation humaine avant tout envoi reel ;
- garder Resend limite aux tests tant que les audiences ne sont pas connectees.
