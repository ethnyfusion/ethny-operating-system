---
name: ethny-cycle
description: Cycle complet des agents commerciaux Ethny (tri de la boîte → prospection → coach d'amélioration), conçu pour la Routine lun · mer · ven. Usage — /ethny-cycle [jour forcé : lundi|mercredi|vendredi].
---

Cycle d'une Routine. Économe : chaque étape est sautée si elle n'a rien à faire. Suis `03_automation/agents/ARCHITECTURE.md` §4–§5.

1. **Jour** : prends le jour de la semaine en Europe/Brussels (ou celui passé en argument : $ARGUMENTS).

2. **Inbox** — lance le sous-agent `ethny-inbox-manager` (outil Agent, premier plan) :
   « Traite la boîte selon tes instructions. Période : depuis le dernier run inscrit dans runs.jsonl (défaut 3 jours). Date : <date>. Ne commite pas, je m'en charge. »

3. **Prospection** — seulement **lundi et mercredi** (pendant le rodage, voir `memory/metrics.md`), et seulement si le pipeline compte moins de 25 prospects en `brouillon_pret` non envoyés (sinon Reginald a déjà de quoi faire : saute et dis-le).
   Lance `ethny-lead-prospector` : « Session de prospection selon tes instructions, segment=mix, nombre=6. Date : <date>. Ne commite pas, je m'en charge. »

4. **Coach** — lance `ethny-agent-coach` : mode `complet` le **vendredi**, `léger` les autres jours. Saute le coach léger si l'inbox n'a rien traité et qu'aucun brouillon n'a été créé.

5. **Sauvegarde** : si le dépôt a changé, un seul commit `chore(agents): cycle <date>` (pipeline + `03_automation/agents/memory/`), puis `git push` sur la branche courante. En cas d'échec du push, dis-le clairement en tête du résumé : sans push, la mémoire du cycle est perdue.

6. **Résumé final** (c'est ce que Reginald lit sur son téléphone) — 10 lignes max :
   - 🔴 ce qu'il doit faire aujourd'hui (réponses urgentes, brouillons à relire, propositions P-NNN à valider) ;
   - 💰 nouveaux leads entrants / leads de prospection prêts ;
   - 📈 une ligne d'indicateurs du coach ;
   - rappel : rien n'a été envoyé.
