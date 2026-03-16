import { TrainerCard } from "@/components/trainers/trainer-card";
import { getTrainers } from "@/lib/services/trainer.service";

export default async function OrgTrainersPage() {
  const trainers = await getTrainers();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Formateurs</h1>
      <p className="text-muted-foreground">
        Recherchez et contactez des formateurs qualifiés.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} />
        ))}
      </div>
    </div>
  );
}
