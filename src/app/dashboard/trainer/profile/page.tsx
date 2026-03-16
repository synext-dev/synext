import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTrainerById } from "@/lib/services/trainer.service";

export default async function TrainerProfilePage() {
  // Phase 2: get trainer from session user id
  const trainer = await getTrainerById("t1");

  if (!trainer) {
    return <p className="text-muted-foreground">Profil non trouvé.</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Mon profil</h1>

      <Card>
        <CardHeader>
          <CardTitle>{trainer.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Ville</p>
            <p>{trainer.city}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Tarif horaire
            </p>
            <p>{trainer.hourlyRate} &euro;/h</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Spécialités
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {trainer.specialties.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Bio</p>
            <p>{trainer.bio}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Note</p>
            <p>
              {trainer.rating}/5 ({trainer.reviewCount} avis)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
