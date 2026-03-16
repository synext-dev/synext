import { CoursesList } from "@/components/dashboard/courses-list";
import { getCourses } from "@/lib/services/course.service";

export default async function TrainerCoursesPage() {
  const courses = await getCourses();

  return <CoursesList courses={courses} />;
}
