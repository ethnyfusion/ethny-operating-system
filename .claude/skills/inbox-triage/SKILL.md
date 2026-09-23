---
name: inbox-triage
description: Trie la boîte Gmail Ethny, détecte leads et opportunités, prépare brouillons et relances de prospection. Usage — /inbox-triage [période, ex. "7 jours"].
---

Lance le sous-agent `ethny-inbox-manager` avec l'outil Agent (`subagent_type: "ethny-inbox-manager"`, `run_in_background: false`).

Prompt à lui passer : « Traite la boîte Gmail Ethny selon tes instructions. Période : $ARGUMENTS (défaut : 3 derniers jours). Date du jour : <date du jour>. »

Quand il a fini, restitue son rapport tel quel à l'utilisateur (c'est la seule chose qu'il verra), puis propose en une ligne : lancer `/prospect-leads` si le pipeline a moins de 5 prospects actifs.
