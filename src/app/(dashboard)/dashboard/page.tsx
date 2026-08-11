import type { DashboardStats } from "@/types";

/**
 * Tableau de bord principal. Les donnees affichees ici proviennent en
 * production de requetes Prisma agregees (voir docs/DATABASE.md pour le
 * detail des tables sources). Des valeurs de demonstration sont utilisees
 * ici afin que la page reste fonctionnelle avant le branchement complet
 * de la base de donnees.
 */
async function getDashboardStats(): Promise<DashboardStats> {
  // TODO: remplacer par de vraies requetes Prisma une fois la base
  // Supabase initialisee (voir docs/SETUP.md).
  return {
    openTendersCount: 0,
    decisionMakersCount: 0,
    prospectsCount: 0,
    followUpsDueCount: 0,
    newProjectsThisWeek: 0,
  };
}

const STAT_CARDS = [
  { key: "openTendersCount", label: "Appels d'offres ouverts" },
  { key: "decisionMakersCount", label: "Decideurs identifies" },
  { key: "prospectsCount", label: "Prospects en cours" },
  { key: "followUpsDueCount", label: "Relances a faire" },
  { key: "newProjectsThisWeek", label: "Nouveaux projets (7 jours)" },
] as const;

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STAT_CARDS.map((card) => (
          <div
            key={card.key}
            className="rounded-xl border border-gray-200 p-4 dark:border-gray-800"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
            <p className="mt-1 text-3xl font-bold">{stats[card.key]}</p>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
        <h2 className="mb-2 text-lg font-semibold">Actions prioritaires</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Aucune action prioritaire pour le moment. Les taches generees
          automatiquement (appel, email, relance, presentation, devis,
          reunion) apparaitront ici une fois les projets et entreprises
          charges en base.
        </p>
      </section>

      <section className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
        <h2 className="mb-2 text-lg font-semibold">Alertes de veille</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Les nouveaux appels, financements, decideurs, recrutements,
          consultants et consortiums detectes par le moteur de veille
          s'afficheront ici (voir docs/VEILLE_SOURCES.md).
        </p>
      </section>
    </div>
  );
}
