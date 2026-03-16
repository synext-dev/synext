import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrgKPIs } from "@/lib/services/dashboard.service";

export default async function OrganizationDashboardPage() {
  const kpis = await getOrgKPIs();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Tableau de bord organisme</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Budget total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {kpis.totalSpent.toLocaleString("fr-FR")} &euro;
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Formateurs actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpis.activeTrainers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Formations terminées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpis.coursesCompleted}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Employés formés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpis.employeesTrained}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
