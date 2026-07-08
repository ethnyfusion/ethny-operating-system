# Statut import Canva - 3 juillet 2026

## Demande

Importer maintenant la structure Ethny dans Canva.

## Résultat

Import bloqué.

Le connecteur Canva a retourné l'erreur suivante lors de la recherche/création de dossier :

```text
Access token is revoked
```

## Deuxième tentative

Après reconnexion annoncée par l'utilisateur via :

```text
[@canva](plugin://canva@openai-curated-remote) ok go
```

Nouvelle tentative de recherche du dossier `ETHNY` dans Canva.

Résultat identique :

```text
Access token is revoked
```

Le connecteur Canva est visible dans Codex, mais l'autorisation Canva côté compte n'est pas encore rétablie pour les appels API.

## Troisième tentative

Demande utilisateur :

```text
impote dans canva
```

Nouvelle tentative de recherche du dossier `ETHNY` dans Canva.

Résultat identique :

```text
Access token is revoked
```

Conclusion : l'import reste bloqué par l'autorisation Canva, pas par le pack local.

## Quatrième tentative

Demande utilisateur :

```text
et mnt
```

Nouvelle tentative de recherche du dossier `ETHNY` dans Canva.

Résultat identique :

```text
Access token is revoked
```

L'autorisation Canva n'est toujours pas valide pour les appels du connecteur.

## Cinquième tentative - succès partiel

Demande utilisateur :

```text
ok go canva
```

Résultat :

- accès Canva rétabli ;
- dossier racine `ETHNY` créé ;
- arborescence Canva principale créée ;
- sous-dossiers `Brand Kit`, `Photos` et `Vidéos` créés ;
- vérification des dossiers effectuée.

Dossier Canva :

```text
https://www.canva.com/folder/FAHOXXTJMRw
```

Limite restante :

L'import direct d'un SVG local via le connecteur Canva a échoué avec :

```text
invalid_file
Downloaded file couldn't be imported because it was invalid.
```

Voir le détail dans :

`canva-import-result-2026-07-03.md`

## Impact

Impossible pour Codex de :

- rechercher le dossier `ETHNY` dans Canva ;
- créer l'arborescence Canva ;
- déplacer des designs ;
- importer des assets via Canva ;
- uploader des fichiers dans les dossiers Canva.

## Action nécessaire

Reconnecter Canva dans Codex / Apps, puis relancer la demande :

```text
importe dans Canva maintenant
```

## Ce qui est prêt localement

Le pack local reste prêt ici :

`ethny-operating-system/05_content_branding/canva-system/`

Il contient :

- structure `ETHNY` ;
- Brand Kit ;
- logos officiels ;
- pictogrammes officiels ;
- palette ;
- typographies ;
- manifestes ;
- guide d'import ;
- index des templates.

## Note

Aucun design Canva halluciné ou non conforme ne doit être utilisé comme solution de remplacement.
