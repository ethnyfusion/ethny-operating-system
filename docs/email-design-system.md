# Email Design System Ethny

Ce systeme email prepare les templates Ethny Nomad Cuisine pour React Email et une future connexion Resend, sans cle API ni envoi automatique.

## Sources de marque reutilisees

- Charte : `05_content_branding/brand-system/charte-graphique-finale-2026.md`
- Pack officiel : `05_content_branding/canva-upload-svg-pack/`
- Site de reference : `../ethny-fusion-v2/src/styles/tokens.css`
- Assets web : `../ethny-fusion-v2/public/logo`, `../ethny-fusion-v2/public/brand-kit-canva`, `../ethny-fusion-v2/public/media/photos`

## Tokens

Les tokens email sont dans `emails/tokens/`.

- Couleurs : foret profond `#1C3B34`, vert foret `#285447`, sauge `#5E8D7A`, creme `#F2EBDC`, pierre `#C9C5BB`, anthracite `#2A2A2A`, blanc surface `#FFFFFE`.
- Typographies : `Cormorant Garamond` pour titres/citations, `Jost` pour corps/boutons.
- Formes : boutons `10px`, cartes `14px`, bordures hairline pierre.
- Assets : `email-brand.ts` centralise logos, pictos et photos.

Avant un envoi reel, remplacer `emailBrand.assetBaseUrl` par le domaine public definitif qui sert les assets. Les clients email exigent des URLs absolues.

## Composants

Les composants sont dans `emails/components/`.

- `EmailHeader` et `EmailFooter` : structure de marque, logo officiel et desinscription.
- `EthnyHero` : image, titre serif, texte court, CTA optionnel.
- `EthnyButton` : variantes primary, light et outline.
- `EthnySection`, `EthnyDivider`, `EthnyCTA` : structure et respiration.
- `EthnyServiceCard`, `EthnyMenuBlock`, `EthnyQuoteBlock`, `EthnyTestimonialBlock`, `EthnyImageBlock`, `EthnySignature` : blocs de contenu reutilisables.

## Layouts

Les layouts sont dans `emails/layouts/`.

- `EthnyMarketingLayout` : header vert profond pour campagnes.
- `EthnyNewsletterLayout` : header clair pour storytelling et contenu.
- `EthnyTransactionalLayout` : suivi client, avis, relance devis.
- `EthnyEmailLayout` : base commune React Email.

## Lancer la preview locale

Depuis la racine du projet `ethny-email-dashboard` :

```bash
npm install
npm run dev
```

La preview React locale ouvre le dashboard Ethny sur `http://localhost:3002`.

Ce dashboard :

- liste tous les templates ;
- affiche un apercu desktop ou mobile ;
- remplace les variables `{{...}}` par des donnees exemple ;
- sert les logos, pictos, photos et polices depuis `public/email-assets`.

## Preview React Email native

Depuis la racine du projet `ethny-email-dashboard` :

```bash
npm run email:dev
```

La preview React Email native ouvre les templates sur `http://localhost:3001`.

## Verifier

```bash
npm run typecheck
npm run build
npm run email:build
```

## Regles d'usage

- Ne jamais envoyer automatiquement un email depuis ce systeme.
- Resend est prepare via les routes Next.js, mais aucune campagne massive n'est activee.
- Ne jamais ajouter de cle API dans le repo.
- Distinguer estimation, proposition et devis confirme.
- Garder les CTA premium : `Demander une proposition`, `Verifier la disponibilite`, `Recevoir un devis personnalise`, `Demander un devis`.
- Eviter tout vocabulaire low-cost ou pression commerciale.

## Integration Resend

Voir `docs/resend-setup.md` et `docs/email-campaign-workflow.md`.

Routes preparees :

- `POST /api/email/send-test`
- `POST /api/email/send-campaign-preview`
- `POST /api/webhooks/resend`
- `POST /api/webhooks/n8n/email-campaign`
