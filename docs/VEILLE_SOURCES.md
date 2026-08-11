# Sources de veille - SADMUN Intelligence

Ce document liste les categories de sources que le moteur de veille (table Source / WatchItem) doit pouvoir suivre. Chaque source est enregistree en base avec son URL, son type d'organisation et la date de dernier controle.

## Bailleurs et institutions multilaterales

- Banque mondiale (World Bank)
- Banque africaine de developpement (BAD / AfDB)
- UNGM (United Nations Global Marketplace)
- Agence Francaise de Developpement (AFD)
- Union Europeenne - EU Funding & Tenders
- PNUD (UNDP)
- UNICEF
- FAO
- UNOPS
- USAID
- KfW
- GIZ

## ONG

- WWF

## Organismes mozambicains

- FIPAG (Fundo de Investimento e Patrimonio do Abastecimento de Agua)
- EDM (Electricidade de Mocambique)

## Grands groupes et entreprises internationales presentes au Mozambique

- Mota-Engil
- Egis
- Artelia
- SUEZ
- Vinci
- NGE
- Colas
- Bouygues
- Conduril
- TotalEnergies
- Eni
- ExxonMobil

## Types d'evenements detectes (WatchItem)

- NEW_TENDER : nouvel appel d'offres publie
- NEW_FUNDING : nouveau financement annonce
- NEW_DECISION_MAKER : nouveau decideur identifie chez une entreprise ou un bailleur
- NEW_HIRE : nouveau recrutement strategique
- NEW_CONSULTANT : nouveau consultant ou cabinet mandate
- NEW_CONSORTIUM : nouveau consortium forme pour repondre a un appel

## Bonnes pratiques d'integration

Chaque connecteur de veille doit respecter les conditions d'utilisation du site source, s'authentifier lorsque necessaire via une cle API officielle, et journaliser la date de derniere verification (Source.lastCheckedAt) afin d'eviter les requetes redondantes.
