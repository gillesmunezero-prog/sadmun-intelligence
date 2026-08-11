/**
 * Moteur d'intelligence commerciale - SADMUN Intelligence
 *
 * Ce module calcule, pour un projet donne, un score de correspondance (0-100)
 * pour chaque entreprise candidate, ainsi que la liste des raisons qui justifient
 * ce score. Le resultat est destine a etre persiste dans la table
 * ProjectCompanyMatch (voir prisma/schema.prisma) afin d'etre affiche
 * immediatement sur la fiche projet.
 */

export type ScoringProject = {
  id: string;
  sector: string | null;
  country: string | null;
  province: string | null;
  budget: number | null;
  tags: string[];
};

export type ScoringCompany = {
  id: string;
  name: string;
  sector: string | null;
  country: string | null;
  africaHistory: string | null;
  mozambiqueHistory: string | null;
  rating: number | null; // 1 a 5
  wonProjectsCount: number;
  wonSimilarSectorCount: number;
};

export type ScoreResult = {
  companyId: string;
  score: number; // 0 a 100
  reasons: string[];
};

// Ponderation des criteres. La somme des poids determine le score maximal (100).
const WEIGHTS = {
  sectorMatch: 30,
  mozambiquePresence: 25,
  africaPresence: 15,
  similarProjectsWon: 20,
  internalRating: 10,
};

/**
 * Calcule le score de correspondance entre un projet et une entreprise.
 * Chaque critere ajoute des points et une raison textuelle explicite,
 * afin que l'utilisateur comprenne immediatement pourquoi l'entreprise
 * est recommandee.
 */
export function scoreCompanyForProject(
  project: ScoringProject,
  company: ScoringCompany
): ScoreResult {
  let score = 0;
  const reasons: string[] = [];

  // 1. Correspondance sectorielle
  if (project.sector && company.sector && sameSector(project.sector, company.sector)) {
    score += WEIGHTS.sectorMatch;
    reasons.push(`Secteur d'activite en correspondance directe avec le projet (${company.sector}).`);
  }

  // 2. Presence et historique au Mozambique
  if (company.mozambiqueHistory && company.mozambiqueHistory.trim().length > 0) {
    score += WEIGHTS.mozambiquePresence;
    reasons.push("Historique documente de projets au Mozambique.");
  }

  // 3. Presence en Afrique (signal plus faible que la presence locale)
  if (company.africaHistory && company.africaHistory.trim().length > 0) {
    score += WEIGHTS.africaPresence;
    reasons.push("Presence etablie sur le continent africain.");
  }

  // 4. Projets similaires deja remportes
  if (company.wonSimilarSectorCount > 0) {
    const points = Math.min(WEIGHTS.similarProjectsWon, company.wonSimilarSectorCount * 7);
    score += points;
    reasons.push(
      `A remporte ${company.wonSimilarSectorCount} projet(s) similaire(s) dans le meme secteur.`
    );
  }

  // 5. Notation interne (avis SADMUN sur la fiabilite / qualite du partenaire)
  if (company.rating) {
    const points = Math.round((company.rating / 5) * WEIGHTS.internalRating);
    score += points;
    reasons.push(`Notation interne SADMUN de ${company.rating}/5.`);
  }

  return {
    companyId: company.id,
    score: Math.min(100, Math.round(score)),
    reasons,
  };
}

/**
 * Calcule et trie les scores pour une liste d'entreprises candidates,
 * du plus pertinent au moins pertinent. Utilise par la fiche projet pour
 * afficher les entreprises les plus susceptibles de repondre a un appel.
 */
export function rankCompaniesForProject(
  project: ScoringProject,
  companies: ScoringCompany[]
): ScoreResult[] {
  return companies
    .map((company) => scoreCompanyForProject(project, company))
    .sort((a, b) => b.score - a.score);
}

function sameSector(sectorA: string, sectorB: string): boolean {
  return sectorA.trim().toLowerCase() === sectorB.trim().toLowerCase();
}
