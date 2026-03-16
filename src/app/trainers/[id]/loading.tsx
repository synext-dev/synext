import { Skeleton } from "@/components/ui/skeleton";

export default function TrainerDetailLoading() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
        <Skeleton className="h-9 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}
