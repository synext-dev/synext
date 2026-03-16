import { OrgTrainersList } from "@/components/dashboard/org-trainers-list";
import { getTrainers } from "@/lib/services/trainer.service";

export default async function OrgTrainersPage() {
  const trainers = await getTrainers();

  return <OrgTrainersList trainers={trainers} />;
}
