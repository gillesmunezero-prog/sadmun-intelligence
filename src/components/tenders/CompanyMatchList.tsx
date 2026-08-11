import type { CompanyMatch } from "@/types";

type CompanyMatchListProps = {
  matches: CompanyMatch[];
};

/**
 * Affiche, sur la fiche projet, les entreprises les plus susceptibles de
 * repondre a l'appel d'offres, triees par score decroissant, avec les
 * raisons qui justifient chaque score (voir src/lib/scoring/companyScore.ts).
 */
export function CompanyMatchList({ matches }: CompanyMatchListProps) {
  if (matches.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Aucune entreprise correspondante identifiee pour le moment.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {matches.map((match) => (
        <li
          key={match.companyId}
          className="rounded-xl border border-gray-200 p-4 dark:border-gray-800"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">{match.companyName}</span>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-bold text-brand-900 dark:bg-brand-900/40 dark:text-brand-100">
              {match.score}%
            </span>
          </div>
          <ul className="mt-2 list-inside list-disc text-sm text-gray-600 dark:text-gray-400">
            {match.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
