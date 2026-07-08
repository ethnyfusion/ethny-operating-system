# Google Workspace Sync Status

Derniere verification : 2026-07-03 19:41 CEST

## Compte cible

- Email principal : `Reginald@ethnyfusion.be`
- Google Drive connecte : oui, compte `Reginald@ethnyfusion.be`
- Google Calendar connecte : oui, compte `Reginald@ethnyfusion.be`
- Site Ethny Fusion : email de contact mis a jour vers `Reginald@ethnyfusion.be`

## Workflow cible

Site Ethny Fusion
-> Google Form public integre
-> Google Sheets
-> notification Gmail vers la boite validee
-> lecture humaine
-> extraction du lead
-> brouillon de reponse
-> validation humaine
-> envoi manuel
-> suivi J+3 / J+7 si necessaire

## Points confirmes

- L'environnement Google Drive est connecte au compte Workspace cible.
- L'environnement Google Calendar est connecte au compte Workspace cible.
- Les references internes indiquent deja `reginald@ethnyfusion.be` comme boite Workspace confirmee.
- Aucun DNS, MX, secret ou mot de passe n'a ete modifie.

## Points a tester avant bascule complete

- Soumettre une demande test via le Google Form public.
- Verifier qu'une ligne est creee dans le Google Sheet lie.
- Verifier que la notification arrive bien dans Gmail `Reginald@ethnyfusion.be`.
- Confirmer que les notifications ne partent plus vers l'ancienne boite si ce n'est plus souhaite.

## Limites

- Le connecteur Gmail direct n'est pas disponible dans cette session.
- Aucun email automatique n'est envoye.
- Aucune automatisation active n'est creee sans validation humaine.
