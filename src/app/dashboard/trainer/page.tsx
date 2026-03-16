import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTrainerKPIs } from "@/lib/services/dashboard.service";

export default async function TrainerDashboardPage() {
  const kpis = await getTrainerKPIs();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Tableau de bord formateur</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenus totaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {kpis.totalRevenue.toLocaleString("fr-FR")} &euro;
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Formations actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpis.activeCourses}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Apprenants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpis.totalStudents}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Note moyenne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpis.averageRating}/5</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
