/**
 * Generateur d'emails de prospection - SADMUN Intelligence
 *
 * Produit un email contextualise a partir d'un projet, d'un bailleur et
 * d'un decideur cible. Le resultat est un brouillon (statut DRAFT dans la
 * table Email) que l'utilisateur peut relire et ajuster avant envoi.
 */

export type ProspectionEmailInput = {
  projectName: string;
  funderName?: string | null;
  recipientName?: string | null;
  recipientPosition?: string | null;
  companyName?: string | null;
  senderName?: string | null;
};

export type GeneratedEmail = {
  subject: string;
  body: string;
};

const SADMUN_SERVICES = [
  "logistique",
  "administration",
  "community engagement",
  "permitting",
  "recrutement local",
  "hebergement",
  "vehicules",
  "traduction",
];

/**
 * Genere un email de prospection pret a etre envoye ou ajuste.
 * Le message reste volontairement court et actionnable : il presente
 * le projet suivi, les services SADMUN pertinents, et propose un echange.
 */
export function generateProspectionEmail(input: ProspectionEmailInput): GeneratedEmail {
  const greeting = input.recipientName ? `Bonjour ${input.recipientName},` : "Bonjour,";

  const funderLine = input.funderName
    ? ` financee par ${input.funderName}`
    : "";

  const positionLine = input.recipientPosition
    ? ` en votre qualite de ${input.recipientPosition}`
    : "";

  const companyLine = input.companyName
    ? ` chez ${input.companyName}`
    : "";

  const body = [
    greeting,
    "",
    `Nous suivons actuellement le projet ${input.projectName}${funderLine}.`,
    "",
    "Notre societe SADMUN est implantee au Mozambique et accompagne les entreprises internationales sur :",
    "",
    ...SADMUN_SERVICES.map((service) => `- ${service}`),
    "",
    `Nous souhaiterions echanger avec vous${positionLine}${companyLine} au sujet de ce projet et des besoins locaux associes.`,
    "",
    "Restant a votre disposition pour convenir d'un creneau,",
    "",
    input.senderName ?? "L'equipe SADMUN Intelligence",
  ].join("\n");

  const subject = `SADMUN - Accompagnement local pour le projet ${input.projectName}`;

  return { subject, body };
}
