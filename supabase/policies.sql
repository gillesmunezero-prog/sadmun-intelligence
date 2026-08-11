-- Politiques de securite (Row Level Security) - SADMUN Intelligence
-- A executer dans l'editeur SQL de Supabase apres la creation des tables
-- via Prisma (npx prisma db push).
--
-- Principe general : tout utilisateur authentifie peut lire les donnees
-- metier (projets, entreprises, decideurs...), mais seules les ecritures
-- sur ses propres enregistrements CRM/taches/notes sont autorisees sans
-- role eleve. Les roles ADMIN et MANAGER disposent de droits etendus.

-- Activation de RLS sur les tables sensibles
alter table users enable row level security;
alter table crm_records enable row level security;
alter table tasks enable row level security;
alter table notes enable row level security;
alter table emails enable row level security;

-- Lecture des projets, entreprises et decideurs : ouverte a tout utilisateur
-- authentifie (donnees d'intelligence commerciale partagees par l'equipe).
alter table projects enable row level security;
create policy "Lecture projets pour utilisateurs authentifies"
  on projects for select
  using (auth.role() = 'authenticated');

alter table companies enable row level security;
create policy "Lecture entreprises pour utilisateurs authentifies"
  on companies for select
  using (auth.role() = 'authenticated');

alter table decision_makers enable row level security;
create policy "Lecture decideurs pour utilisateurs authentifies"
  on decision_makers for select
  using (auth.role() = 'authenticated');

-- Un utilisateur ne peut modifier que ses propres taches et notes,
-- sauf s'il a le role ADMIN ou MANAGER (verifie via la table users).
create policy "Modification de ses propres taches"
  on tasks for update
  using (
    assigned_to_id = auth.uid()
    or exists (
      select 1 from users
      where users.id = auth.uid()
        and users.role in ('ADMIN', 'MANAGER')
    )
  );

create policy "Creation de taches par utilisateurs authentifies"
  on tasks for insert
  with check (auth.role() = 'authenticated');

create policy "Lecture de ses propres notes ou notes d'equipe"
  on notes for select
  using (auth.role() = 'authenticated');

-- Les enregistrements CRM restent visibles par toute l'equipe (visibilite
-- partagee necessaire au pilotage commercial collectif), mais seul le
-- proprietaire (owner_id) ou un ADMIN/MANAGER peut les modifier.
create policy "Lecture CRM par equipe"
  on crm_records for select
  using (auth.role() = 'authenticated');

create policy "Modification CRM par proprietaire ou role eleve"
  on crm_records for update
  using (
    owner_id = auth.uid()
    or exists (
      select 1 from users
      where users.id = auth.uid()
        and users.role in ('ADMIN', 'MANAGER')
    )
  );
