// --- User Roles ---
export type UserRole = "TRAINER" | "ORGANIZATION" | "ADMIN";

export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type CourseCategory =
  | "DEVELOPMENT"
  | "DESIGN"
  | "MARKETING"
  | "MANAGEMENT"
  | "DATA"
  | "DEVOPS";

// --- Domain Models ---
export interface Trainer {
  id: string;
  name: string;
  bio: string;
  specialties: string[];
  city: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: CourseCategory;
  status: CourseStatus;
  trainerId: string;
  trainerName: string;
  enrollmentCount: number;
  image: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  logo: string;
  city: string;
  employeeCount: number;
}

export interface TrainerDashboardKPIs {
  totalRevenue: number;
  activeCourses: number;
  totalStudents: number;
  averageRating: number;
  monthlyRevenue: number[];
}

export interface OrganizationDashboardKPIs {
  totalSpent: number;
  activeTrainers: number;
  coursesCompleted: number;
  employeesTrained: number;
  monthlySpending: number[];
}

// --- Auth User ---
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
}
