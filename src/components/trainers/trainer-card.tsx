import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Trainer } from "@/types";

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <Link href={`/trainers/${trainer.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{trainer.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {trainer.city} &middot; {trainer.hourlyRate} &euro;/h
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1 mb-3">
            {trainer.specialties.slice(0, 3).map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {trainer.rating}/5 ({trainer.reviewCount} avis)
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
