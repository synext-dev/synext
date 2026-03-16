"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Erreur du tableau de bord</h1>
        <p className="text-muted-foreground">{error.message}</p>
        <Button onClick={reset}>Réessayer</Button>
      </div>
    </div>
  );
}
