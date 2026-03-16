import { CourseCard } from "@/components/marketplace/course-card";
import { getCourses } from "@/lib/services/course.service";

export default async function OrgCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Formations</h1>
      <p className="text-muted-foreground">
        Explorez les formations disponibles pour vos équipes.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
