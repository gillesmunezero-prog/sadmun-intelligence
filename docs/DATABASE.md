# Modele de donnees - SADMUN Intelligence

Le schema complet et definitif se trouve dans `prisma/schema.prisma`. Ce document decrit la logique relationnelle en langage clair.

## Table centrale : Project

Chaque projet stocke : nom, description, budget, secteur, pays, province, ville, latitude/longitude, financeur (Organization), organisme d'execution (Organization), date de publication, date limite, etat (WATCHING, OPEN, CLOSING_SOON, CLOSED, AWARDED, CANCELLED), probabilite SADMUN (0-100), lien officiel, tags, et une source de veille d'origine.

## Chaine relationnelle principale

Project -> Funding -> Company -> DecisionMaker -> CRM -> Interaction / Email -> Meeting

- Un Project peut avoir plusieurs Funding (un ou plusieurs bailleurs).
- Une Company est reliee a un Project via ProjectCompanyMatch (score d'intelligence commerciale) et via CRM (suivi de la relation commerciale).
- Un DecisionMaker appartient a une Company et peut etre rattache a un Project via ProjectDecisionMaker (avec un ordre de prospection recommande).
- Une CRM (fiche de suivi commercial par entreprise) centralise les Interaction, et sert de point d'ancrage aux Email et Meeting.

## Tables de reference

- **Organization** : bailleurs, ONG, agences d'execution, gouvernements, multilateraux.
- **Consultant** et **ConsultantProject** : consultants individuels ou cabinets, relies aux projets sur lesquels ils interviennent.
- **ProcurementPlan** : plans de passation de marches publies par les organismes.
- **Source** et **WatchItem** : sources de veille et evenements detectes (nouveaux appels, financements, decideurs, recrutements, consultants, consortiums).

## Tables CRM et productivite

- **CRM** : un enregistrement par entreprise suivie (dernier contact, personne contactee, resultat, prochaine relance, documents envoyes, probabilite de partenariat).
- **Interaction** : historique detaille (appel, email, reunion, LinkedIn, note).
- **Task** : taches generees automatiquement (telephoner, envoyer email, relancer, preparer presentation, preparer devis, organiser reunion), avec statut et priorite.
- **Note**, **Email**, **Meeting**, **Document** : rattaches indifferemment a un Project, une Company ou un DecisionMaker.

## Utilisateurs et droits

La table **User** stocke le profil (nom, role ADMIN/MANAGER/ANALYST/VIEWER) ; l'authentification elle-meme est deleguee a Supabase Auth. Toutes les tables d'activite (Task, Note, Email, Interaction, Document) referencent l'utilisateur auteur pour la tracabilite.

## Index et contraintes recommandes

- Unicite sur (projectId, companyId) pour ProjectCompanyMatch afin d'eviter les doublons de score.
- Unicite sur (projectId, decisionMakerId) pour ProjectDecisionMaker.
- Index sur Project.status, Project.deadlineDate, Project.sector, Project.country pour les filtres du tableau de bord.
- Index sur DecisionMaker.companyId et CRM.companyId pour les jointures frequentes des fiches entreprise.
