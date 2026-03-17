import { Eye, MousePointer, Phone, FileText, BookmarkCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTrainerKPIs } from "@/lib/services/dashboard.service";

export default async function TrainerDashboardPage() {
  const kpis = await getTrainerKPIs();
  const { profileStats, annonces } = kpis;

  const candidated = annonces.filter((a) => a.status === "candidated");
  const saved = annonces.filter((a) => a.status === "saved");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-synext-navy">
          Bonjour{" "}
          <span className="text-synext-blue">Sophie</span>
        </h1>
      </div>

      {/* Indicateurs Performance */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 rounded-full bg-synext-blue" />
          <h2 className="font-heading text-lg font-semibold text-synext-navy">
            Indicateur Performance
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-foreground mb-2">
                Total Vue sur Profil
              </p>
              <p className="font-heading text-5xl font-bold text-synext-blue mb-2">
                {profileStats.profileViews}
              </p>
              <p className="text-xs text-muted-foreground">
                Nombre de fois où votre profil est apparu sur la page de recherche.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-foreground mb-2">
                Total Clic Sur Profil
              </p>
              <p className="font-heading text-5xl font-bold text-synext-blue mb-2">
                {profileStats.profileClicks}
              </p>
              <p className="text-xs text-muted-foreground">
                Nombre de fois où une entreprise a cliqué sur votre profil.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-foreground mb-2">
                Total Contact Sur Profil
              </p>
              <p className="font-heading text-5xl font-bold text-synext-blue mb-2">
                {profileStats.profileContacts}
              </p>
              <p className="text-xs text-muted-foreground">
                Nombre de fois où une entreprise vous a contacté depuis votre profil.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-foreground mb-2">
                Total Annonce Candidatée
              </p>
              <p className="font-heading text-5xl font-bold text-synext-blue mb-2">
                {profileStats.totalCandidatures}
              </p>
              <p className="text-xs text-muted-foreground">
                Nombre de fois où vous avez candidaté sur une annonce.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Suivi Candidature */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 rounded-full bg-synext-blue" />
          <h2 className="font-heading text-lg font-semibold text-synext-navy">
            Suivi Candidature
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Annonces candidatées */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-synext-blue" />
              <span className="text-sm font-semibold text-foreground">
                Annonce Candidatée
              </span>
            </div>
            <div className="space-y-3">
              {candidated.map((annonce) => (
                <AnnonceCard key={annonce.id} annonce={annonce} />
              ))}
            </div>
          </div>

          {/* Annonces enregistrées */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookmarkCheck className="h-4 w-4 text-synext-blue" />
              <span className="text-sm font-semibold text-foreground">
                Annonce Enregistrée
              </span>
            </div>
            <div className="space-y-3">
              {saved.map((annonce) => (
                <AnnonceCard key={annonce.id} annonce={annonce} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AnnonceCard({ annonce }: { annonce: { id: string; organizationName: string; title: string; specialty: string; departement: string } }) {
  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="h-8 w-8 shrink-0 rounded-md bg-synext-light flex items-center justify-center">
            <span className="text-xs font-bold text-synext-navy">
              {annonce.organizationName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <p className="text-sm font-medium leading-tight">{annonce.title}</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="text-xs rounded-full">
            {annonce.specialty}
          </Badge>
          <Badge variant="secondary" className="text-xs rounded-full">
            {annonce.departement}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="rounded-full text-xs">
            Voir
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs text-red-500 border-red-200 hover:bg-red-50"
          >
            Retirer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
