import { getTrainerAccountSettings } from "@/lib/services/dashboard.service";
import { AccesPanel } from "@/components/dashboard/acces-panel";

export default async function AccesPage() {
  const settings = await getTrainerAccountSettings();
  return <AccesPanel settings={settings} />;
}
