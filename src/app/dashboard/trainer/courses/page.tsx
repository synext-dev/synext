import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCourses } from "@/lib/services/course.service";
import { COURSE_CATEGORIES } from "@/lib/constants";
import type { CourseCategory } from "@/types";

export default async function TrainerCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Mes formations</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {COURSE_CATEGORIES[course.category as CourseCategory] ?? course.category}
                </Badge>
                <Badge
                  variant={
                    course.status === "PUBLISHED" ? "default" : "secondary"
                  }
                >
                  {course.status === "PUBLISHED" ? "Publiée" : "Brouillon"}
                </Badge>
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-semibold">{course.price} &euro;</span>
                <span className="text-sm text-muted-foreground">
                  {course.enrollmentCount} inscrits
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
