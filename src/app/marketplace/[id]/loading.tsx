import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailLoading() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
