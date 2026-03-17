import { getAvailableAnnonces } from "@/lib/services/dashboard.service";
import { AnnonceList } from "@/components/dashboard/annonce-list";

export default async function AnnoncePage() {
  const annonces = await getAvailableAnnonces();
  return <AnnonceList annonces={annonces} />;
}
