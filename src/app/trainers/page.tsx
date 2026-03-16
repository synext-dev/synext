import { TrainerCard } from "@/components/trainers/trainer-card";
import { getTrainers } from "@/lib/services/trainer.service";

export default async function TrainersPage() {
  const trainers = await getTrainers();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Annuaire des formateurs</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>
    </div>
  );
}
