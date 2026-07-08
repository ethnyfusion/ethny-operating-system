# Workflow Campagnes Email Ethny

## Vue d'ensemble

1. Modifier ou choisir un template dans `emails/campaigns`.
2. Verifier la preview visuelle locale sur `http://localhost:3002`.
3. Generer le HTML via `/api/email/send-campaign-preview`.
4. Envoyer un test individuel via `/api/email/send-test`.
5. Relire dans Gmail, Outlook et mobile.
6. Valider humainement la campagne.
7. Importer ou selectionner une audience propre.
8. Envoyer seulement apres validation.
9. Plus tard : connecter n8n et Resend Audience.

## Choisir une campagne

Le registre est dans `lib/email-campaigns.ts`.

Campagnes disponibles :

- `new-website-announcement`
- `brand-story`
- `private-chef-experience`
- `event-catering`
- `cooking-classes`
- `chef-partners-announcement`
- `client-reactivation-1`
- `client-reactivation-2`
- `client-reactivation-3`
- `review-request`
- `quote-follow-up`
- `seasonal-menu`
- `gift-card`

Chaque entree contient :

- sujet par defaut ;
- preview text ;
- template React Email ;
- segment recommande ;
- objectif business ;
- CTA principal ;
- statut.

## Modifier un template

Les templates sont dans `emails/campaigns`.

Regles :

- garder le ton premium, chaleureux et clair ;
- ne jamais promettre une disponibilite ;
- ne jamais confirmer une reservation ;
- ne jamais annoncer un prix final si des variables manquent ;
- utiliser les composants existants dans `emails/components` ;
- garder les tokens dans `emails/tokens`.

## Variables dynamiques

Le systeme de variables est dans `lib/email-variables.ts`.

Variables supportees :

- `firstName`
- `lastName`
- `serviceInterest`
- `eventDate`
- `eventType`
- `bookingLink`
- `websiteLink`
- `quoteLink`
- `reviewLink`
- `unsubscribeLink`

Dans les templates existants, elles apparaissent sous forme `{{firstName}}`, puis sont remplacees au rendu.

## Envoyer un test

```bash
curl -X POST http://localhost:3000/api/email/send-test \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: $ADMIN_SECRET" \
  -d '{
    "to": "ton-email@gmail.com",
    "campaignId": "new-website-announcement",
    "variables": {
      "firstName": "Reginald",
      "websiteLink": "https://ethny.be"
    }
  }'
```

Cette route sert uniquement aux tests individuels.

## Preview sans envoi

```bash
curl -X POST http://localhost:3000/api/email/send-campaign-preview \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: $ADMIN_SECRET" \
  -d '{
    "campaignId": "quote-follow-up",
    "variables": {
      "firstName": "Camille",
      "eventDate": "18 octobre 2026"
    }
  }'
```

La reponse contient `subject`, `previewText`, `html` et `text`.

## Segments

Les segments sont dans `lib/email-segments.ts`.

Segments prepares :

- `all-clients`
- `former-clients`
- `prospects`
- `private-chef`
- `event-catering`
- `cooking-classes`
- `wedding`
- `vip-clients`
- `newsletter`
- `quote-not-confirmed`

Sources possibles : Notion, CSV, Resend Audience, n8n.

## Webhook Resend

Route :

```text
POST /api/webhooks/resend
```

Events prepares :

- delivered ;
- opened ;
- clicked ;
- bounced ;
- complained.

Si `RESEND_WEBHOOK_SECRET` est defini, appeler la route avec :

```bash
Authorization: Bearer $RESEND_WEBHOOK_SECRET
```

ou :

```bash
x-resend-webhook-secret: $RESEND_WEBHOOK_SECRET
```

La route logge proprement les events et garde un point d'integration futur pour CRM ou n8n.

## n8n plus tard

Route :

```text
POST /api/webhooks/n8n/email-campaign
```

Elle exige `N8N_WEBHOOK_SECRET`.

Exemple dry-run :

```bash
curl -X POST http://localhost:3000/api/webhooks/n8n/email-campaign \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $N8N_WEBHOOK_SECRET" \
  -d '{
    "dryRun": true,
    "campaignId": "quote-follow-up",
    "contact": {
      "email": "client@example.com",
      "firstName": "Camille"
    },
    "variables": {
      "eventType": "diner prive"
    }
  }'
```

La route limite l'operation a un seul contact par requete. Aucun envoi massif n'est implemente.

## Contacts et RGPD

- Importer uniquement des contacts avec base legale claire.
- Garder la source du contact.
- Respecter les desinscriptions.
- Eviter les relances agressives.
- Conserver un lien `unsubscribeLink` dans les campagnes marketing.
- Ne pas envoyer a une audience non qualifiee.

## Futur dashboard admin

La structure permet d'ajouter plus tard :

- liste des campagnes ;
- preview HTML ;
- selection segment ;
- envoi test ;
- validation humaine ;
- journal des envois ;
- synchronisation Notion ou Resend Audience.
