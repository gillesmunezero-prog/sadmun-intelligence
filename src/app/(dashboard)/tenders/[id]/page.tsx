import { CompanyMatchList } from "@/components/tenders/CompanyMatchList";
import { generateProspectionEmail } from "@/lib/email/generateProspectionEmail";
import type { CompanyMatch, DecisionMakerSummary } from "@/types";

/**
 * Fiche appel d'offres - page centrale de l'application.
 *
 * Objectif produit : a l'ouverture de cette page, l'utilisateur doit savoir
 * immediatement qui contacter, pourquoi, dans quel ordre, avec quel message,
 * quelles entreprises vont probablement repondre, et quel plan d'action
 * suivre. Toutes les sections ci-dessous repondent a un point precis du
 * cahier des charges fonctionnel.
 */

type TenderPageProps = {
  params: { id: string };
};

// Donnees de demonstration en attendant le branchement complet a Prisma/Supabase.
// Chaque champ correspond a une colonne des tables Project / Tender / Funding.
async function getTenderDetail(tenderId: string) {
  return {
    id: tenderId,
    projectName: "Rehabilitation du reseau d'eau potable de Nampula",
    summary:
      "Rehabilitation et extension du reseau d'adduction d'eau potable, incluant forages, canalisations et branchements domiciliaires.",
    budget: "45 000 000 USD",
    funderName: "Banque africaine de developpement (BAD)",
    executingAgency: "FIPAG",
    publicationDate: "2026-06-01",
    deadlineDate: "2026-09-15",
    officialUrl: "https://example.org/dao/nampula-water",
  };
}

async function getCompanyMatches(tenderId: string): Promise<CompanyMatch[]> {
  // TODO: remplacer par rankCompaniesForProject() applique aux entreprises
  // reellement enregistrees en base (voir src/lib/scoring/companyScore.ts).
  return [
    {
      companyId: "egis",
      companyName: "Egis",
      score: 95,
      reasons: [
        "A remporte plusieurs projets similaires.",
        "Presence Afrique etablie.",
        "Expertise technique adaptee au secteur eau.",
      ],
    },
    {
      companyId: "artelia",
      companyName: "Artelia",
      score: 78,
      reasons: ["Historique documente au Mozambique.", "Notation interne SADMUN de 4/5."],
    },
  ];
}

async function getDecisionMakers(tenderId: string): Promise<DecisionMakerSummary[]> {
  // TODO: remplacer par une requete sur ProjectDecisionMaker triee par contactOrder.
  return [
    {
      id: "dm-1",
      fullName: "A definir",
      position: "Country Director",
      companyName: "Egis",
      linkedin: null,
      email: null,
      phone: null,
      influenceScore: 5,
      contactOrder: 1,
    },
    {
      id: "dm-2",
      fullName: "A definir",
      position: "Bid Manager",
      companyName: "Egis",
      linkedin: null,
      email: null,
      phone: null,
      influenceScore: 3,
      contactOrder: 2,
    },
  ];
}

export default async function TenderPage({ params }: TenderPageProps) {
  const tender = await getTenderDetail(params.id);
  const matches = await getCompanyMatches(params.id);
  const decisionMakers = await getDecisionMakers(params.id);

  const suggestedEmail = generateProspectionEmail({
    projectName: tender.projectName,
    funderName: tender.funderName,
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <header>
        <h1 className="text-2xl font-bold">{tender.projectName}</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{tender.summary}</p>
      </header>

      {/* Informations cles : budget, planning, financeur, organisme */}
      <section className="grid grid-cols-2 gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-800 sm:grid-cols-4">
        <Info label="Budget" value={tender.budget} />
        <Info label="Financeur" value={tender.funderName} />
        <Info label="Organisme d'execution" value={tender.executingAgency} />
        <Info label="Date limite" value={tender.deadlineDate} />
      </section>

      {/* Intelligence commerciale : entreprises susceptibles de repondre */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          Entreprises susceptibles de repondre
        </h2>
        <CompanyMatchList matches={matches} />
      </section>

      {/* Decideurs a contacter, avec ordre de prospection */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Decideurs a contacter</h2>
        <ol className="flex flex-col gap-2">
          {decisionMakers
            .sort((a, b) => (a.contactOrder ?? 99) - (b.contactOrder ?? 99))
            .map((dm) => (
              <li
                key={dm.id}
                className="rounded-xl border border-gray-200 p-3 dark:border-gray-800"
              >
                <span className="font-semibold">
                  #{dm.contactOrder} - {dm.position}
                </span>{" "}
                chez {dm.companyName}
              </li>
            ))}
        </ol>
      </section>

      {/* Message de prospection genere automatiquement */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Message de prospection suggere</h2>
        <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
          <p className="mb-2 font-semibold">{suggestedEmail.subject}</p>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
            {suggestedEmail.body}
          </pre>
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
