import { CourseCard } from "@/components/marketplace/course-card";
import { getCourses } from "@/lib/services/course.service";

export default async function MarketplacePage() {
  const courses = await getCourses();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Catalogue de formations</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
