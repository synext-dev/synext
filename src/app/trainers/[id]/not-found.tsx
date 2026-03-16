import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TrainerNotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Formateur introuvable</h1>
        <p className="text-muted-foreground">
          Ce formateur n&apos;existe pas ou a été supprimé.
        </p>
        <Link href="/trainers">
          <Button variant="secondary">Retour à l&apos;annuaire</Button>
        </Link>
      </div>
    </div>
  );
}
