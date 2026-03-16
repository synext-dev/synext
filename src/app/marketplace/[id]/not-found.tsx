import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CourseNotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Formation introuvable</h1>
        <p className="text-muted-foreground">
          Cette formation n&apos;existe pas ou a été supprimée.
        </p>
        <Link href="/marketplace">
          <Button variant="secondary">Retour au catalogue</Button>
        </Link>
      </div>
    </div>
  );
}
