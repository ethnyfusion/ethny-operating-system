# Bibliotheque de campagnes email

Les templates se trouvent dans `emails/campaigns/`. Ils utilisent les variables dynamiques suivantes :

`{{firstName}}`, `{{lastName}}`, `{{serviceInterest}}`, `{{eventDate}}`, `{{eventType}}`, `{{bookingLink}}`, `{{websiteLink}}`, `{{quoteLink}}`, `{{reviewLink}}`, `{{unsubscribeLink}}`.

## Campagnes disponibles

| Campaign ID API | Template | Usage | Objectif |
| --- | --- | --- | --- |
| `new-website-announcement` | `NewWebsiteAnnouncement.tsx` | Marketing | Annoncer le nouveau site et la navigation simplifiee. |
| `brand-story` | `BrandStoryEmail.tsx` | Newsletter | Raconter l'evolution de la marque et l'approche humaine. |
| `private-chef-experience` | `PrivateChefExperience.tsx` | Marketing | Presenter l'experience chef a domicile premium. |
| `event-catering` | `EventCateringEmail.tsx` | Marketing | Mettre en avant traiteur evenementiel, prive et corporate. |
| `cooking-classes` | `CookingClassesEmail.tsx` | Marketing | Presenter cours, ateliers prives et formations. |
| `chef-partners-announcement` | `ChefPartnersAnnouncement.tsx` | Marketing | Preparer une approche partenaires, lieux et gites. |
| `client-reactivation-1` | `ClientReactivationEmail1.tsx` | Reactivation | Reprendre contact sans pression. |
| `client-reactivation-2` | `ClientReactivationEmail2.tsx` | Reactivation | Proposer des formats d'experience. |
| `client-reactivation-3` | `ClientReactivationEmail3.tsx` | Reactivation | Dernier rappel cordial. |
| `review-request` | `ReviewRequestEmail.tsx` | Transactionnel | Demander un avis Google apres prestation. |
| `quote-follow-up` | `QuoteFollowUpEmail.tsx` | Commercial | Relancer une proposition envoyee. |
| `seasonal-menu` | `SeasonalMenuEmail.tsx` | Newsletter | Presenter une inspiration menu de saison. |
| `gift-card` | `GiftCardEmail.tsx` | Marketing | Presenter une experience Ethny a offrir. |
| `template-starter` | `TemplateStarter.tsx` | Template | Base locale pour creer une nouvelle campagne. |

## Preview locale React

Le dashboard local se lance depuis la racine du projet `ethny-email-dashboard` :

```bash
npm install
npm run dev
```

Il affiche les emails dans une iframe, avec choix desktop/mobile et variables de demonstration. Les assets sont locaux dans `public/email-assets`.

## Integration Resend

Les routes Next.js de test et preview sont preparees. Pour envoyer un test :

1. Verifier le domaine d'envoi dans Resend.
2. Ajouter `RESEND_API_KEY` et `RESEND_FROM_EMAIL` dans `.env.local`.
3. Lancer `npm run next:dev`.
4. Appeler `POST /api/email/send-test`.
5. Garder une validation humaine pour disponibilite, reservation et devis final.

Aucun envoi massif n'est implemente.

## Preparation CRM et n8n

Les templates acceptent deja les variables necessaires pour un futur CRM :

- contact : prenom, nom ;
- demande : service, type d'evenement, date ;
- actions : lien de reservation, site, devis, avis, desinscription.

Les workflows n8n peuvent appeler `POST /api/webhooks/n8n/email-campaign`, avec un secret et un seul contact par requete. Aucun envoi massif n'est active.
