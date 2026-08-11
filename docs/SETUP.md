# Guide d'installation - SADMUN Intelligence

## Prerequis

- Node.js 18 ou plus recent
- Un projet Supabase (PostgreSQL, Auth, Storage)
- Un compte Vercel (deploiement recommande) ou GitHub Pages pour les pages statiques publiques

## 1. Cloner le depot

```bash
git clone https://github.com/<votre-compte>/sadmun-intelligence.git
cd sadmun-intelligence
```

## 2. Installer les dependances

```bash
npm install
```

## 3. Configurer les variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner :

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
DIRECT_URL=
OPENAI_API_KEY=
```

Ne jamais committer ce fichier : il est deja present dans `.gitignore`.

## 4. Initialiser la base de donnees

```bash
npx prisma generate
npx prisma db push
```

Appliquer ensuite les politiques de securite (RLS) fournies dans `supabase/policies.sql` via l'editeur SQL de Supabase.

## 5. Lancer l'application en developpement

```bash
npm run dev
```

L'application est disponible sur http://localhost:3000

## 6. Build de production

```bash
npm run build
npm start
```

## 7. Deploiement

### Vercel (recommande, application complete avec API routes)

1. Importer le depot GitHub dans Vercel.
2. Renseigner les variables d'environnement dans les parametres du projet Vercel.
3. Deployer.

### GitHub Pages (uniquement pour une version statique de vitrine)

GitHub Pages ne supporte pas les Route Handlers Next.js (API) ni le rendu serveur. Il est possible d'exporter une version statique (`next export`) pour une page de presentation publique, mais les fonctionnalites CRM, IA et veille necessitent un hebergement supportant Node.js (Vercel ou equivalent).

## Comptes utilisateurs

Aucun compte n'est cree automatiquement. Chaque utilisateur doit s'inscrire via la page /register puis etre valide par un administrateur depuis la page /admin (attribution du role ADMIN, MANAGER, ANALYST ou VIEWER).
