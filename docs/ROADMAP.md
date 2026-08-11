# Feuille de route - SADMUN Intelligence

## Phase 1 - Fondations (en cours)

- Schema de donnees complet (Prisma / PostgreSQL / Supabase).
- Authentification (connexion, inscription, mot de passe oublie, profil, roles).
- Structure Next.js modulaire (pages, composants, lib).
- CRUD de base pour Project, Company, DecisionMaker, Organization.

## Phase 2 - Intelligence commerciale

- Moteur de scoring ProjectCompanyMatch (ponderation sectorielle, historique, presence locale).
- Generateur d'emails de prospection contextualises.
- Fiches projet enrichies : entreprises probables, decideurs a contacter, ordre de prospection, plan d'action.

## Phase 3 - CRM et productivite

- Pipeline commercial (vue kanban par statut de relation).
- Generation automatique de taches (appel, email, relance, presentation, devis, reunion).
- Calendrier des relances et reunions.

## Phase 4 - Assistant IA

- Questions en langage naturel sur les projets, decideurs et priorites.
- Redaction automatique d'emails et de comptes-rendus de reunion.
- Analyse de documents (DAO, cahiers des charges) pour en extraire les besoins logistiques et locaux.

## Phase 5 - Veille automatisee

- Connecteurs vers les bailleurs et plateformes citees dans docs/VEILLE_SOURCES.md.
- Detection des nouveaux appels, financements, decideurs, recrutements, consultants et consortiums.
- Alertes et flux d'activite dans le tableau de bord.

## Phase 6 - Cartographie et extension multi-pays

- Cartographie interactive bailleur -> projet -> entreprise -> decideurs -> consultants -> CRM.
- Generalisation du modele de donnees a d'autres pays d'Afrique australe.
- Gestion fine des droits multi-utilisateurs et multi-organisations.
