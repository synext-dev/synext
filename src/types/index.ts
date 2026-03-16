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

export type SessionType = "ONSITE" | "REMOTE";

export type ActivityType = "ENROLLMENT" | "REVIEW" | "PAYMENT" | "COURSE_PUBLISHED" | "TRAINING_COMPLETED" | "TRAINER_HIRED";

export interface UpcomingSession {
  id: string;
  courseTitle: string;
  organizationName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: SessionType;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: string;
}

export interface MonthlyRevenuePoint {
  month: string;
  revenue: number;
  previousYear: number;
}

export interface TrainerDashboardKPIs {
  totalRevenue: number;
  activeCourses: number;
  totalStudents: number;
  averageRating: number;
  monthlyRevenue: number[];
  revenueTrend: number;
  studentsTrend: number;
  ratingTrend: number;
  coursesTrend: number;
  monthlyRevenueData: MonthlyRevenuePoint[];
  upcomingSessions: UpcomingSession[];
  recentActivity: ActivityItem[];
}

export interface MonthlySpendingPoint {
  month: string;
  spending: number;
  previousYear: number;
}

export interface UpcomingTraining {
  id: string;
  courseTitle: string;
  trainerName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: SessionType;
  employeeCount: number;
}

export interface OrganizationDashboardKPIs {
  totalSpent: number;
  activeTrainers: number;
  coursesCompleted: number;
  employeesTrained: number;
  monthlySpending: number[];
  spentTrend: number;
  trainersTrend: number;
  coursesTrend: number;
  employeesTrend: number;
  monthlySpendingData: MonthlySpendingPoint[];
  upcomingTrainings: UpcomingTraining[];
  recentActivity: ActivityItem[];
}

// --- Auth User ---
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
}
