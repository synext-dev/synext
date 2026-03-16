import { trainers, courses } from "@/lib/mock-data";
import type { Trainer, Course } from "@/types";

// Phase 2: replace bodies with Prisma queries
// Function signatures stay identical

export async function getTrainers(): Promise<Trainer[]> {
  return trainers;
}

export async function getTrainerById(id: string): Promise<Trainer | null> {
  return trainers.find((t) => t.id === id) ?? null;
}

export async function getTrainerCourses(trainerId: string): Promise<Course[]> {
  return courses.filter((c) => c.trainerId === trainerId);
}
