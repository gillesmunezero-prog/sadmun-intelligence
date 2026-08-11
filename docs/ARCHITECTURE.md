# Architecture technique - SADMUN Intelligence

## Vue d'ensemble

SADMUN Intelligence est une application web full-stack construite autour de trois couches :

1. **Couche de donnees** : PostgreSQL heberge sur Supabase, modelise via Prisma (voir prisma/schema.prisma).
2. **Couche applicative** : Next.js 14 (App Router) en TypeScript, avec des Server Components pour la lecture de donnees et des Route Handlers (src/app/api) pour les actions (generation d'email, scoring, assistant IA, veille).
3. **Couche presentation** : React + TailwindCSS, composants reutilisables, mode sombre natif via classes Tailwind dark:.

## Modules fonctionnels

- **Veille (Sourcing)** : jobs planifies (cron Vercel ou Supabase Edge Functions) qui interrogent les sources listees dans docs/VEILLE_SOURCES.md et alimentent la table WatchItem.
- **Intelligence commerciale (Scoring)** : src/lib/scoring calcule, pour chaque projet, un score de correspondance par entreprise (table ProjectCompanyMatch) a partir de criteres ponderes (historique Afrique/Mozambique, secteur, projets similaires remportes, presence locale).
- **CRM** : suit les entreprises, decideurs, interactions, taches, notes, emails et reunions, tous relies au projet d'origine.
- **Generateur d'emails** : src/lib/email produit des messages de prospection contextualises (projet, bailleur, entreprise, decideur).
- **Assistant IA** : src/lib/ai expose des fonctions de haut niveau (priorisation de projets, ordre de prospection, redaction d'email, analyse de DAO) consommees par la page /ai-assistant et par les fiches projet.
- **Cartographie** : composant client (Leaflet ou MapLibre) affichant les projets geolocalises et leurs relations (bailleur -> projet -> entreprise -> decideurs).

## Flux relationnel central

`Project -> Funding -> Company -> DecisionMaker -> CRM -> Email -> Meeting`

Ce flux est le fil conducteur de toute l'interface : chaque fiche projet doit permettre de descendre ce flux en quelques clics, sans jamais quitter le contexte du projet.

## Authentification et droits

L'authentification est geree par Supabase Auth (email/mot de passe, lien magique, reinitialisation de mot de passe). La table User (Prisma) stocke le profil metier et le role (ADMIN, MANAGER, ANALYST, VIEWER). Les Row Level Security (RLS) policies (voir supabase/policies.sql) appliquent les droits au niveau base de donnees en complement des controles cote application.

## Organisation du code

```
src/app/(auth)/            pages de connexion, inscription, mot de passe oublie
src/app/(dashboard)/       toutes les pages protegees (dashboard, projets, CRM, etc.)
src/app/api/               route handlers (scoring, emails, assistant IA, veille)
src/components/layout/     Sidebar, Topbar, structure generale
src/components/ui/         composants generiques (cartes, tableaux, badges)
src/components/tenders/    composants specifiques aux appels d'offres
src/lib/                   logique metier partagee (scoring, email, ia, supabase)
src/types/                 types TypeScript partages
```

## Performance et scalabilite

- Pagination systematique des listes (projets, entreprises, decideurs) pour supporter plusieurs milliers d'enregistrements.
- Index PostgreSQL sur les cles etrangeres et les champs de recherche frequents (secteur, pays, statut, date limite).
- Cache des resultats de scoring (table ProjectCompanyMatch) recalcule de facon asynchrone plutot qu'a chaque affichage.
- Architecture multi-tenant prete pour une extension a d'autres pays (champ country present sur Project, Organization, DecisionMaker, Consultant).
