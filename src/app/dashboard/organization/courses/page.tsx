import { OrgCoursesList } from "@/components/dashboard/org-courses-list";
import { getCourses } from "@/lib/services/course.service";

export default async function OrgCoursesPage() {
  const courses = await getCourses();

  return <OrgCoursesList courses={courses} />;
}
