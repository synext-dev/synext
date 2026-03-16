import { Euro, UserCheck, GraduationCap, Users, MapPin, Monitor, CreditCard, CheckCircle, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/dashboard/kpi-card";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { getOrgKPIs } from "@/lib/services/dashboard.service";
import type { ActivityType } from "@/types";

const ACTIVITY_ICONS: Record<string, typeof CheckCircle> = {
  ENROLLMENT: Users,
  REVIEW: CheckCircle,
  PAYMENT: CreditCard,
  COURSE_PUBLISHED: CheckCircle,
  TRAINING_COMPLETED: GraduationCap,
  TRAINER_HIRED: UserPlus,
};

const ACTIVITY_COLORS: Record<string, string> = {
  ENROLLMENT: "bg-blue-50 text-blue-600",
  REVIEW: "bg-amber-50 text-amber-600",
  PAYMENT: "bg-green-50 text-green-600",
  COURSE_PUBLISHED: "bg-purple-50 text-purple-600",
  TRAINING_COMPLETED: "bg-emerald-50 text-emerald-600",
  TRAINER_HIRED: "bg-indigo-50 text-indigo-600",
};

function formatRelativeDate(timestamp: string): string {
  const now = new Date("2026-03-16T18:00:00");
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffH < 1) return "À l'instant";
  if (diffH < 24) return `Il y a ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "Hier";
  return `Il y a ${diffD} jours`;
}

function formatSessionDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default async function OrganizationDashboardPage() {
  const kpis = await getOrgKPIs();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-synext-navy">
          Tableau de bord
        </h1>
        <p className="mt-1 text-muted-foreground">Bienvenue, TechCorp Formation</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          icon={Euro}
          title="Budget total"
          value={`${kpis.totalSpent.toLocaleString("fr-FR")} \u20AC`}
          trend={kpis.spentTrend}
        />
        <KPICard
          icon={UserCheck}
          title="Formateurs actifs"
          value={String(kpis.activeTrainers)}
          trend={kpis.trainersTrend}
        />
        <KPICard
          icon={GraduationCap}
          title="Formations terminées"
          value={String(kpis.coursesCompleted)}
          trend={kpis.coursesTrend}
        />
        <KPICard
          icon={Users}
          title="Employés formés"
          value={String(kpis.employeesTrained)}
          trend={kpis.employeesTrend}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <SpendingChart data={kpis.monthlySpendingData} />
        </div>
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-heading text-base">Prochaines formations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {kpis.upcomingTrainings.map((training) => (
                <div
                  key={training.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-synext-light">
                    {training.type === "REMOTE" ? (
                      <Monitor className="h-4 w-4 text-synext-blue" />
                    ) : (
                      <MapPin className="h-4 w-4 text-synext-blue" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {training.courseTitle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {training.trainerName} · {training.employeeCount} employés
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatSessionDate(training.date)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {training.startTime} - {training.endTime}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {training.type === "REMOTE" ? "En ligne" : training.location}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-base">Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {kpis.recentActivity.map((activity) => {
              const Icon = ACTIVITY_ICONS[activity.type] ?? CheckCircle;
              const colorClass = ACTIVITY_COLORS[activity.type] ?? "bg-gray-50 text-gray-600";
              return (
                <div key={activity.id} className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colorClass}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="flex-1 text-sm">{activity.message}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatRelativeDate(activity.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
