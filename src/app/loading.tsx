import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 w-full max-w-md">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}
