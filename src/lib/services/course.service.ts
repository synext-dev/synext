import { courses } from "@/lib/mock-data";
import type { Course } from "@/types";

export async function getCourses(): Promise<Course[]> {
  return courses;
}

export async function getCourseById(id: string): Promise<Course | null> {
  return courses.find((c) => c.id === id) ?? null;
}
