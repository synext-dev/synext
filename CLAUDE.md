# Synext — Contexte projet pour Claude Code

## Description
Plateforme B2B de formation professionnelle avec deux axes :
1. Matchmaking formateurs / organismes de formation
2. Marketplace de vente de formations

## Stack
- Next.js 16 App Router, TypeScript strict
- Tailwind CSS v4 + shadcn/ui
- Prisma + PostgreSQL
- NextAuth.js v5
- Stripe Connect

## Phase actuelle : Phase 1 — UI avec mock data
**NE PAS** implémenter de logique backend. Toutes les données viennent de `src/lib/mock-data.ts`.

## Rôles utilisateurs
- `TRAINER` : formateur indépendant
- `ORGANIZATION` : organisme de formation
- `ADMIN` : administrateur plateforme

## Conventions de code
- Composants : PascalCase, un composant par fichier
- Hooks : camelCase préfixé `use`
- Types dans `src/types/index.ts`
- Mock data dans `src/lib/mock-data.ts`
- Imports avec alias `@/`
- Pas de `any` TypeScript

## Pages principales
- `/` — Landing page marketing
- `/trainers` — Annuaire des formateurs
- `/marketplace` — Catalogue de formations
- `/dashboard/trainer` — Dashboard formateur
- `/dashboard/organization` — Dashboard organisme
- `/login` & `/register` — Auth

## Modèle économique
- Abonnements organismes (MRR)
- Commission sur ventes marketplace (Stripe Connect)
