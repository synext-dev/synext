import { getTrainerAvailability } from "@/lib/services/dashboard.service";
import { DisponibilitePanel } from "@/components/dashboard/disponibilite-panel";

export default async function DisponibilitePage() {
  const availability = await getTrainerAvailability();
  return <DisponibilitePanel availability={availability} />;
}
