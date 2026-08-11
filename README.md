# SADMUN Intelligence

**La plateforme de reference en intelligence economique et commerciale sur le Mozambique.**

SADMUN Intelligence ne se contente pas d'agreger des appels d'offres : elle transforme chaque appel d'offres, chaque financement et chaque projet en une opportunite commerciale exploitable immediatement. A l'ouverture d'une fiche projet, l'utilisateur sait qui contacter, pourquoi, dans quel ordre, avec quel message, quelles entreprises vont probablement repondre, quelles ONG sont concernees, quels bailleurs financent et quels consultants interviennent.

## Documentation

- [Architecture technique](docs/ARCHITECTURE.md)
- [Modele de donnees](docs/DATABASE.md)
- [Guide d'installation](docs/SETUP.md)
- [Sources de veille](docs/VEILLE_SOURCES.md)
- [Feuille de route](docs/ROADMAP.md)

## Stack technique

- Next.js 14 (App Router) + React 18 + TypeScript
- TailwindCSS (design system + dark mode)
- Supabase (PostgreSQL, Auth, Storage, Realtime)
- Prisma ORM
- Deploiement cible : Vercel (recommande) ou export statique pour GitHub Pages pour les parties publiques

## Fonctionnalites principales

1. Base de connaissance des appels d'offres et projets au Mozambique, avec bailleurs, organismes d'execution et documents.
2. Moteur de scoring d'intelligence commerciale : pour chaque projet, la plateforme calcule automatiquement quelles entreprises sont susceptibles de repondre, avec un score et une justification.
3. CRM integre relie aux entreprises, decideurs, interactions, taches, notes, emails et reunions.
4. Generateur d'emails de prospection contextualises par projet et par entreprise.
5. Assistant IA capable de repondre a des questions strategiques (priorisation des projets, ordre de prospection, redaction d'emails, analyse de DAO).
6. Cartographie interactive reliant bailleurs, projets, entreprises, decideurs et consultants.
7. Moteur de veille connecte aux principales sources (bailleurs internationaux, ONG, grands groupes presents au Mozambique).

## Structure du depot

```
prisma/            Schema de base de donnees (Prisma + PostgreSQL/Supabase)
docs/               Documentation technique et fonctionnelle
src/app/            Pages Next.js (App Router)
src/components/     Composants React reutilisables
src/lib/            Logique metier (scoring, emails, IA, supabase)
src/types/          Types TypeScript partages
supabase/           Politiques de securite (RLS) et migrations
```

## Demarrage rapide

Voir le [guide d'installation complet](docs/SETUP.md). En resume :

```bash
npm install
cp .env.example .env.local
npx prisma generate
npx prisma db push
npm run dev
```

## Licence et perimetre

Ce depot constitue le socle d'architecture et de scaffolding professionnel du projet SADMUN Intelligence. Il est concu pour etre etendu iterativement : ajout des integrations de veille automatisee, enrichissement du moteur IA, et deploiement multi-pays au-dela du Mozambique.
