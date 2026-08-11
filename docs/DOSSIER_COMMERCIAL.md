# Le Dossier Commercial — coeur de SADMUN Intelligence

## Philosophie

SADMUN Intelligence n'est pas un agregateur d'appels d'offres. Chaque projet
suivi doit devenir un **Dossier Commercial** exploitable immediatement pour
la prospection. Avant de developper toute fonctionnalite, la question posee
est : "Cela aide-t-il Gilles a decrocher un contrat ?". Si non, elle n'est pas
prioritaire.

## Structure d'un Dossier Commercial

Chaque dossier (modele `CommercialDossier` lie a un `Project`) contient :

1. **Resume du projet** — issu de sources officielles (bailleur, budget, planning, bailleur, organisme d'execution).
2. **Analyse IA** — resume du DAO, analyse des risques, des besoins locaux, logistiques, administratifs, communautaires, environnementaux.
3. **Opportunites pour SADMUN** — pourquoi ce projet nous interesse, ce que nous pouvons vendre, ce que nous ne pouvons pas vendre, partenaires a rechercher, competences a acquerir.
4. **Entreprises cibles** — entreprises internationales, africaines, mozambicaines, bureaux d'etudes, consultants, ONG, consortiums susceptibles de repondre, avec un score de ciblage (0-100) justifie.
5. **Decideurs** — uniquement des personnes dont l'existence et les coordonnees sont verifiables via une source publique. Sinon : "A qualifier".
6. **Strategie de prospection** — qui contacter en premier, pourquoi, avec quel message, quel objectif, quand relancer.
7. **Message de prospection** — adapte au projet.
8. **Plan d'action** — aujourd'hui, cette semaine, ce mois, avant la cloture, apres attribution.
9. **CRM** — date, action, resultat, prochaine relance, probabilite de succes, commentaires.
10. **Historique** — projets similaires deja realises dans d'autres pays (Kenya, Tanzanie, Senegal, Cote d'Ivoire, etc.).
11. **Documents** — documents officiels lies au projet.
12. **Liens officiels** — URL vers la source primaire (banque de developpement, portail national, etc.).
13. **Sources utilisees** — liste de toutes les sources consultees.
14. **Niveau de confiance de chaque information.**

## Regle d'or sur les donnees relatives a des personnes physiques

> Je prefere une donnee manquante a une donnee erronee. — Gilles

Consequences concretes :

- Aucun nom, email, telephone ou biographie de decideur n'est invente.
- Toute information sur une personne physique doit provenir d'une source
  publique verifiable : site officiel de l'entreprise, communique de presse,
  organigramme public, profil LinkedIn public, registre public.
- Si l'information n'est pas publique ou n'est pas suffisamment fiable, le
  champ reste vide et le statut est `TO_VERIFY` ("A qualifier").
- Les scores de ciblage entreprise (0-100) sont des analyses deductives
  (secteur, presence regionale, historique de projets similaires) et sont
  toujours presentes comme telles, pas comme des certitudes.

## Systeme de tracabilite (metadonnees)

Chaque donnee sensible porte les champs suivants (voir `prisma/schema.prisma`) :

| Champ | Description |
|---|---|
| `sourceUrl` / `sourceName` | D'ou provient l'information |
| `dataCollectedAt` / `collectedAt` | Quand elle a ete collectee |
| `lastVerifiedAt` | Quand elle a ete verifiee pour la derniere fois |
| `confidenceLevel` | `HIGH` (Eleve) / `MEDIUM` (Moyen) / `LOW` (Faible) |
| `verificationStatus` / `status` | `VERIFIED` (Verifie) / `TO_VERIFY` (A verifier) / `OUTDATED` (Obsolete) |

## Sprint 1 — 10 dossiers commerciaux reels

Objectif : transformer 10 projets reels et actifs au Mozambique (source :
portail de projets de la Banque Mondiale, projects.worldbank.org) en 10
dossiers commerciaux complets, plutot que de creer des centaines de dossiers
vides. Voir le dossier `data/dossiers/`.

Les 10 projets retenus (tous actifs, donnees verifiees le 11/08/2026) :

1. P516379 — Mozambique Resilient Recovery and Urbanization for Jobs Project (US$166M)
2. P514199 — Jobs, Social Cohesion and Community Resilience in Northern Mozambique — Phase I (US$100M)
3. P512650 — Rural and Small Towns Water Security Project (US$150M)
4. P512418 — Accelerating Sustainable and Clean Energy Access Transformation in Mozambique (US$400M)
5. P510427 — Transport Corridors for Economic Resilience Mozambique SOP2 / TRACER (US$123.3M)
6. P510159 — Mozambique Northern Urban Development Project (US$100M)
7. P509890 — Urban Water Security Project (US$143M)
8. P511558 — Mozambique Health Emergency Preparedness, Response and Resilience Project (US$201M)
9. P500488 — Climate Resilient Roads for the North Project (US$125M)
10. P179797 — Green Energy Corridors Project (US$300M)

Chaque dossier precise, pour chaque information, sa source et son niveau de
confiance. Les sections "Entreprises cibles" et "Decideurs" sont construites
avec prudence : scores analytiques clairement identifies comme tels, et
"A qualifier" partout ou aucune source publique fiable n'a ete trouvee au
moment de la redaction.
