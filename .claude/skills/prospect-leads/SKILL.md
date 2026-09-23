---
name: prospect-leads
description: Session de prospection Ethny — trouve 5-6 leads B2B qualifiés et prépare les emails en brouillons Gmail. Usage — /prospect-leads [segment] [zone] [nombre], ex. "/prospect-leads gîtes Ardennes 6".
---

Lance le sous-agent `ethny-lead-prospector` avec l'outil Agent (`subagent_type: "ethny-lead-prospector"`, `run_in_background: false`).

Prompt à lui passer : « Lance une session de prospection selon tes instructions. Paramètres : $ARGUMENTS (défauts : segment=mix, zone=Wallonie+Bruxelles, nombre=6, brouillons=oui). Date du jour : <date du jour>. »

Quand il a fini, restitue son rapport tel quel à l'utilisateur, en rappelant qu'aucun email n'est parti : les brouillons attendent sa relecture dans Gmail.
