export const APP_NAME = "Synext";

export const NAV_LINKS = [
  { label: "Organisme Formation", href: "#organisme" },
  { label: "Formateur", href: "#formateur" },
  { label: "Fonctionnalité", href: "#fonctionnalite" },
  { label: "Ressource", href: "#ressource" },
] as const;

export const DASHBOARD_NAV = {
  TRAINER: [
    { label: "Tableau de bord", href: "/dashboard/trainer" },
    { label: "Mes formations", href: "/dashboard/trainer/courses" },
    { label: "Mon profil", href: "/dashboard/trainer/profile" },
  ],
  ORGANIZATION: [
    { label: "Tableau de bord", href: "/dashboard/organization" },
    { label: "Formateurs", href: "/dashboard/organization/trainers" },
    { label: "Formations", href: "/dashboard/organization/courses" },
  ],
} as const;

export const TRAINING_DOMAINS = [
  "Logistique",
  "Digital",
  "Publicité",
  "Marketing",
  "Finance",
  "IA",
  "Ressource Humaine",
  "Immobilier",
  "Commerce",
] as const;

export const FAQ_ITEMS = [
  {
    question: "Comment fonctionne la facturation ?",
    answer:
      "Synext propose un abonnement mensuel pour les organismes de formation. Les formateurs bénéficient d'un accès gratuit à la plateforme pour créer leur profil et être référencés.",
  },
  {
    question: "Prenez-vous une commission ?",
    answer:
      "Une commission est prélevée uniquement sur les ventes réalisées via la marketplace. La mise en relation directe entre formateurs et organismes est incluse dans l'abonnement.",
  },
  {
    question: "Certification des formateurs ?",
    answer:
      "Chaque formateur passe par un processus de vérification de ses qualifications, certifications et expériences avant d'être référencé sur la plateforme.",
  },
  {
    question: "Quelles sont les fonctionnalités ?",
    answer:
      "Dashboard de suivi, recherche avancée par spécialité, messagerie directe, gestion des disponibilités, et bien plus encore.",
  },
  {
    question: "Qu'est-ce qu'un organisme ?",
    answer:
      "Un organisme de formation est une structure (école supérieure, centre de formation, plateforme digitale) qui recherche des formateurs pour animer ses programmes.",
  },
  {
    question: "Est-ce payant pour un formateur ?",
    answer:
      "Non, l'inscription et le référencement sont entièrement gratuits pour les formateurs. Synext se rémunère via les abonnements organismes et les commissions marketplace.",
  },
] as const;

export const COURSE_CATEGORIES = {
  DEVELOPMENT: "Développement",
  DESIGN: "Design",
  MARKETING: "Marketing",
  MANAGEMENT: "Management",
  DATA: "Data & IA",
  DEVOPS: "DevOps",
} as const;
