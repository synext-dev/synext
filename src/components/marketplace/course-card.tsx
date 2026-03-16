import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COURSE_CATEGORIES } from "@/lib/constants";
import type { Course } from "@/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/marketplace/${course.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            {COURSE_CATEGORIES[course.category]}
          </Badge>
          <CardTitle className="mt-2">{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {course.trainerName} &middot; {course.duration}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-lg font-bold">{course.price} &euro;</span>
          <span className="text-sm text-muted-foreground">
            {course.enrollmentCount} inscrits
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
