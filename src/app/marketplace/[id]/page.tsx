import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCourseById } from "@/lib/services/course.service";
import { COURSE_CATEGORIES } from "@/lib/constants";
import { notFound } from "next/navigation";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Badge variant="secondary" className="mb-4">
          {COURSE_CATEGORIES[course.category]}
        </Badge>
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-muted-foreground mb-6">
          Par {course.trainerName} &middot; {course.duration}
        </p>
        <p className="text-lg mb-8">{course.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">{course.price} &euro;</span>
          <Button size="lg">S&apos;inscrire</Button>
        </div>
      </div>
    </div>
  );
}
