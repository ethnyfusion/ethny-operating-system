# Taxonomie des libellés Gmail

Créés automatiquement par `ethny-inbox-manager` s'ils n'existent pas. Préfixe `Ethny/` pour les regrouper.
Les numéros forcent l'ordre d'affichage dans Gmail.

| Libellé | Contenu | Action de l'agent |
| --- | --- | --- |
| `Ethny/1-Urgent` | Client ou lead qui attend une réponse depuis > 24 h, date d'événement < 14 j | Brouillon de réponse + signalé en tête du rapport |
| `Ethny/2-Lead` | Nouvelle demande (devis, dispo, info prestation) | Brouillon de qualification + ajout au pipeline |
| `Ethny/3-Opportunite` | Partenariat, appel d'offres, collaboration, presse, recommandation | Résumé + prochaine action proposée |
| `Ethny/4-Client-en-cours` | Échanges avec client confirmé (menu, logistique, facture) | Résumé si question ouverte |
| `Ethny/5-Prospection` | Réponses aux emails de prospection sortants | Mise à jour du statut pipeline + brouillon |
| `Ethny/6-Fournisseurs` | Fournisseurs, livraisons, commandes | Rien, sauf problème |
| `Ethny/7-Admin-Finance` | Factures, banque, TVA, assurances, administrations | Signalé si échéance |
| `Ethny/8-Newsletters` | Newsletters, outils, notifications SaaS | Rien |
| `Ethny/9-Bruit` | Pub, sollicitations non pertinentes | Rien (jamais supprimé) |
| `Ethny/Brouillon-pret` | Fils pour lesquels un brouillon attend la relecture de Reginald | Retirer après envoi |

Règles : l'agent ne supprime, n'archive et ne marque jamais en spam. Il ne fait qu'ajouter des libellés et créer des brouillons.
