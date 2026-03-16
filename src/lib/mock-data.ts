import type {
  Trainer,
  Course,
  Organization,
  TrainerDashboardKPIs,
  OrganizationDashboardKPIs,
} from "@/types";

export const trainers: Trainer[] = [
  {
    id: "t1",
    name: "Sophie Martin",
    bio: "Développeuse senior fullstack avec 12 ans d'expérience. Spécialisée React, Node.js et architecture cloud.",
    specialties: ["React", "Node.js", "TypeScript", "AWS"],
    city: "Paris",
    hourlyRate: 120,
    rating: 4.9,
    reviewCount: 87,
    avatar: "/placeholder-avatar.png",
  },
  {
    id: "t2",
    name: "Marc Dubois",
    bio: "Expert data science et machine learning. Ancien lead data chez un grand groupe bancaire.",
    specialties: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    city: "Lyon",
    hourlyRate: 135,
    rating: 4.8,
    reviewCount: 64,
    avatar: "/placeholder-avatar.png",
  },
  {
    id: "t3",
    name: "Amina Benali",
    bio: "UX/UI Designer passionnée par l'accessibilité et le design system. 8 ans d'expérience en agence et freelance.",
    specialties: ["Figma", "UX Research", "Design System", "Accessibilité"],
    city: "Bordeaux",
    hourlyRate: 95,
    rating: 4.7,
    reviewCount: 52,
    avatar: "/placeholder-avatar.png",
  },
  {
    id: "t4",
    name: "Thomas Leroy",
    bio: "DevOps engineer et formateur certifié Kubernetes. Accompagne les équipes dans leur transition cloud native.",
    specialties: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    city: "Nantes",
    hourlyRate: 140,
    rating: 4.9,
    reviewCount: 41,
    avatar: "/placeholder-avatar.png",
  },
  {
    id: "t5",
    name: "Claire Fontaine",
    bio: "Consultante marketing digital spécialisée en growth hacking et SEO technique.",
    specialties: ["SEO", "Google Ads", "Analytics", "Growth Hacking"],
    city: "Toulouse",
    hourlyRate: 85,
    rating: 4.6,
    reviewCount: 73,
    avatar: "/placeholder-avatar.png",
  },
  {
    id: "t6",
    name: "Julien Moreau",
    bio: "Coach agile et formateur en management. Certifié SAFe et Scrum Master. Accompagne les transformations organisationnelles.",
    specialties: ["Scrum", "SAFe", "Management Agile", "Leadership"],
    city: "Lille",
    hourlyRate: 110,
    rating: 4.8,
    reviewCount: 96,
    avatar: "/placeholder-avatar.png",
  },
];

export const courses: Course[] = [
  {
    id: "c1",
    title: "React Avancé — Patterns et Performance",
    description:
      "Maîtrisez les patterns avancés de React : hooks personnalisés, render props, compound components et optimisation des performances.",
    price: 890,
    duration: "3 jours",
    category: "DEVELOPMENT",
    status: "PUBLISHED",
    trainerId: "t1",
    trainerName: "Sophie Martin",
    enrollmentCount: 124,
    image: "/placeholder-course.png",
  },
  {
    id: "c2",
    title: "Machine Learning pour les entreprises",
    description:
      "Introduction pratique au ML pour décideurs et développeurs. De la donnée au modèle déployé en production.",
    price: 1200,
    duration: "5 jours",
    category: "DATA",
    status: "PUBLISHED",
    trainerId: "t2",
    trainerName: "Marc Dubois",
    enrollmentCount: 89,
    image: "/placeholder-course.png",
  },
  {
    id: "c3",
    title: "Design System — Créer et maintenir",
    description:
      "Apprenez à concevoir, documenter et faire vivre un design system pérenne avec Figma et Storybook.",
    price: 650,
    duration: "2 jours",
    category: "DESIGN",
    status: "PUBLISHED",
    trainerId: "t3",
    trainerName: "Amina Benali",
    enrollmentCount: 67,
    image: "/placeholder-course.png",
  },
  {
    id: "c4",
    title: "Kubernetes en production",
    description:
      "Déployer, monitorer et scaler vos applications sur Kubernetes. Inclut Helm, Istio et observabilité.",
    price: 1500,
    duration: "4 jours",
    category: "DEVOPS",
    status: "PUBLISHED",
    trainerId: "t4",
    trainerName: "Thomas Leroy",
    enrollmentCount: 45,
    image: "/placeholder-course.png",
  },
  {
    id: "c5",
    title: "SEO technique pour développeurs",
    description:
      "Comprendre et implémenter le SEO technique : performance web, données structurées, Core Web Vitals.",
    price: 490,
    duration: "2 jours",
    category: "MARKETING",
    status: "PUBLISHED",
    trainerId: "t5",
    trainerName: "Claire Fontaine",
    enrollmentCount: 156,
    image: "/placeholder-course.png",
  },
  {
    id: "c6",
    title: "Leadership agile pour managers",
    description:
      "Transformez votre management avec les principes agiles. Facilitation, feedback, et organisation apprenante.",
    price: 780,
    duration: "3 jours",
    category: "MANAGEMENT",
    status: "PUBLISHED",
    trainerId: "t6",
    trainerName: "Julien Moreau",
    enrollmentCount: 203,
    image: "/placeholder-course.png",
  },
];

export const organizations: Organization[] = [
  {
    id: "o1",
    name: "TechCorp Formation",
    description:
      "Organisme de formation spécialisé dans les métiers du numérique. Certifié Qualiopi.",
    logo: "/placeholder-logo.png",
    city: "Paris",
    employeeCount: 45,
  },
  {
    id: "o2",
    name: "FormaPro Institute",
    description:
      "Centre de formation continue pour les entreprises. Plus de 200 formations au catalogue.",
    logo: "/placeholder-logo.png",
    city: "Lyon",
    employeeCount: 120,
  },
  {
    id: "o3",
    name: "Digital Academy",
    description:
      "Accélérateur de compétences digitales pour les équipes en transformation.",
    logo: "/placeholder-logo.png",
    city: "Bordeaux",
    employeeCount: 30,
  },
];

export const trainerDashboardKPIs: TrainerDashboardKPIs = {
  totalRevenue: 47250,
  activeCourses: 4,
  totalStudents: 312,
  averageRating: 4.8,
  monthlyRevenue: [3200, 4100, 3800, 5200, 4900, 5100, 4800, 5600, 4200, 3900, 5100, 4350],
};

export const organizationDashboardKPIs: OrganizationDashboardKPIs = {
  totalSpent: 128400,
  activeTrainers: 12,
  coursesCompleted: 34,
  employeesTrained: 186,
  monthlySpending: [8500, 12000, 9800, 11200, 10500, 14200, 13100, 9800, 11500, 12800, 10200, 14800],
};
