"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
        <p className="text-muted-foreground">{error.message}</p>
        <Button onClick={reset}>Réessayer</Button>
      </div>
    </div>
  );
}
