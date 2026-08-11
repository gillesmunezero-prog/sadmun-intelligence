/**
 * Types partages cote application (complementaires aux types generes par
 * Prisma). Regroupent principalement les DTO utilises entre les Server
 * Components, les Route Handlers et les composants client.
 */

export type UserRole = "ADMIN" | "MANAGER" | "ANALYST" | "VIEWER";

export type ProjectStatus =
  | "WATCHING"
  | "OPEN"
  | "CLOSING_SOON"
  | "CLOSED"
  | "AWARDED"
  | "CANCELLED";

export type ProjectSummary = {
  id: string;
  name: string;
  sector: string | null;
  country: string | null;
  province: string | null;
  city: string | null;
  budget: number | null;
  currency: string | null;
  status: ProjectStatus;
  sadmunProbability: number;
  deadlineDate: string | null;
  funderName: string | null;
  tags: string[];
};

export type CompanyMatch = {
  companyId: string;
  companyName: string;
  score: number;
  reasons: string[];
};

export type DecisionMakerSummary = {
  id: string;
  fullName: string;
  position: string;
  companyName: string;
  linkedin: string | null;
  email: string | null;
  phone: string | null;
  influenceScore: number | null;
  contactOrder: number | null;
};

export type DashboardStats = {
  openTendersCount: number;
  decisionMakersCount: number;
  prospectsCount: number;
  followUpsDueCount: number;
  newProjectsThisWeek: number;
};

export type ProspectionTaskType =
  | "CALL"
  | "EMAIL"
  | "FOLLOW_UP"
  | "PRESENTATION"
  | "QUOTE"
  | "MEETING"
  | "OTHER";
