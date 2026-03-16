import { TrainerProfileForm } from "@/components/dashboard/trainer-profile-form";
import { getTrainerById } from "@/lib/services/trainer.service";

export default async function TrainerProfilePage() {
  // Phase 2: get trainer from session user id
  const trainer = await getTrainerById("t1");

  if (!trainer) {
    return <p className="text-muted-foreground">Profil non trouvé.</p>;
  }

  return <TrainerProfileForm trainer={trainer} />;
}
