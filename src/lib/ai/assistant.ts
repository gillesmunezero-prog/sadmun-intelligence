/**
 * Assistant IA - SADMUN Intelligence
 *
 * Ce module definit les intentions supportees par l'assistant et route
 * chaque question utilisateur vers la fonction metier appropriee. L'appel
 * effectif au modele de langage (LLM) est isole afin de pouvoir changer de
 * fournisseur (OpenAI, Anthropic, etc.) sans impacter le reste de l'application.
 */

export type AssistantIntent =
  | "RANK_PROJECTS"
  | "LOGISTICS_HEAVY_PROJECTS"
  | "WHO_TO_CONTACT"
  | "PROJECT_DECISION_MAKERS"
  | "PROSPECTION_ORDER"
  | "GENERATE_EMAIL"
  | "PREPARE_MEETING"
  | "SUMMARIZE_TENDER"
  | "ANALYZE_SPECIFICATIONS"
  | "DETECT_LOCAL_NEEDS"
  | "UNKNOWN";

// Expressions cles associees a chaque intention (version simple, deterministe,
// destinee a etre completee par un appel LLM pour les cas ambigus).
const INTENT_PATTERNS: Array<{ intent: AssistantIntent; keywords: string[] }> = [
  { intent: "RANK_PROJECTS", keywords: ["projets les plus interessants", "prioriser", "quels projets"] },
  { intent: "LOGISTICS_HEAVY_PROJECTS", keywords: ["beaucoup de logistique", "besoins logistiques"] },
  { intent: "WHO_TO_CONTACT", keywords: ["qui dois-je contacter", "qui contacter"] },
  { intent: "PROJECT_DECISION_MAKERS", keywords: ["decideurs travaillent", "quels decideurs"] },
  { intent: "PROSPECTION_ORDER", keywords: ["ordre de prospection", "meilleur ordre"] },
  { intent: "GENERATE_EMAIL", keywords: ["genere le mail", "redige un email", "genere l'email"] },
  { intent: "PREPARE_MEETING", keywords: ["prepare une reunion", "preparer la reunion"] },
  { intent: "SUMMARIZE_TENDER", keywords: ["resume le dao", "resume l'appel d'offres"] },
  { intent: "ANALYZE_SPECIFICATIONS", keywords: ["analyse le cahier des charges", "analyse les specifications"] },
  { intent: "DETECT_LOCAL_NEEDS", keywords: ["besoins locaux", "detecte les besoins"] },
];

/**
 * Determine l'intention la plus probable a partir d'une question posee en
 * langage naturel. Approche simple par mots-cles ; a remplacer/completer par
 * une classification via LLM pour les formulations plus libres.
 */
export function detectIntent(question: string): AssistantIntent {
  const normalized = question.trim().toLowerCase();

  for (const entry of INTENT_PATTERNS) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.intent;
    }
  }

  return "UNKNOWN";
}

export type AssistantContext = {
  projectId?: string;
  companyId?: string;
};

export type AssistantResponse = {
  intent: AssistantIntent;
  answer: string;
};

/**
 * Point d'entree principal de l'assistant. Detecte l'intention puis delegue
 * a la logique metier correspondante (scoring, CRM, generateur d'email...).
 * L'integration reelle avec les donnees Prisma et le LLM doit etre branchee
 * dans le Route Handler src/app/api/ai/route.ts.
 */
export async function askAssistant(
  question: string,
  context: AssistantContext = {}
): Promise<AssistantResponse> {
  const intent = detectIntent(question);

  switch (intent) {
    case "RANK_PROJECTS":
      return { intent, answer: "Analyse des projets par probabilite SADMUN et budget en cours." };
    case "LOGISTICS_HEAVY_PROJECTS":
      return { intent, answer: "Identification des projets avec forts besoins logistiques (tags, secteur, province)." };
    case "WHO_TO_CONTACT":
      return { intent, answer: "Recherche des decideurs prioritaires pour le projet selectionne." };
    case "PROJECT_DECISION_MAKERS":
      return { intent, answer: "Liste des decideurs lies au projet via ProjectDecisionMaker." };
    case "PROSPECTION_ORDER":
      return { intent, answer: "Calcul de l'ordre de prospection recommande (champ contactOrder)." };
    case "GENERATE_EMAIL":
      return { intent, answer: "Generation d'un brouillon d'email de prospection." };
    case "PREPARE_MEETING":
      return { intent, answer: "Preparation d'un ordre du jour de reunion a partir du contexte projet." };
    case "SUMMARIZE_TENDER":
      return { intent, answer: "Synthese du dossier d'appel d'offres (DAO) associe au projet." };
    case "ANALYZE_SPECIFICATIONS":
      return { intent, answer: "Analyse du cahier des charges pour en extraire les exigences cles." };
    case "DETECT_LOCAL_NEEDS":
      return { intent, answer: "Detection des besoins locaux (logistique, hebergement, recrutement, permitting)." };
    default:
      return {
        intent,
        answer: "Question non reconnue automatiquement : transmission au modele de langage pour une reponse libre.",
      };
  }
}
