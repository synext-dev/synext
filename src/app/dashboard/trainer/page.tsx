import { Euro, BookOpen, Users, Star, MapPin, Monitor, UserPlus, CreditCard, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { getTrainerKPIs } from "@/lib/services/dashboard.service";
import type { ActivityType } from "@/types";

const ACTIVITY_ICONS: Record<ActivityType, typeof Star> = {
  ENROLLMENT: UserPlus,
  REVIEW: Star,
  PAYMENT: CreditCard,
  COURSE_PUBLISHED: CheckCircle,
};

const ACTIVITY_COLORS: Record<ActivityType, string> = {
  ENROLLMENT: "bg-blue-50 text-blue-600",
  REVIEW: "bg-amber-50 text-amber-600",
  PAYMENT: "bg-green-50 text-green-600",
  COURSE_PUBLISHED: "bg-purple-50 text-purple-600",
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

export default async function TrainerDashboardPage() {
  const kpis = await getTrainerKPIs();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-synext-navy">
          Tableau de bord
        </h1>
        <p className="mt-1 text-muted-foreground">Bienvenue, Sophie</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          icon={Euro}
          title="Revenus totaux"
          value={`${kpis.totalRevenue.toLocaleString("fr-FR")} \u20AC`}
          trend={kpis.revenueTrend}
        />
        <KPICard
          icon={BookOpen}
          title="Formations actives"
          value={String(kpis.activeCourses)}
          trend={kpis.coursesTrend}
        />
        <KPICard
          icon={Users}
          title="Apprenants"
          value={String(kpis.totalStudents)}
          trend={kpis.studentsTrend}
        />
        <KPICard
          icon={Star}
          title="Note moyenne"
          value={`${kpis.averageRating}/5`}
          trend={kpis.ratingTrend}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueChart data={kpis.monthlyRevenueData} />
        </div>
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-heading text-base">Prochaines sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {kpis.upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-synext-light">
                    {session.type === "REMOTE" ? (
                      <Monitor className="h-4 w-4 text-synext-blue" />
                    ) : (
                      <MapPin className="h-4 w-4 text-synext-blue" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {session.courseTitle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.organizationName}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatSessionDate(session.date)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {session.startTime} - {session.endTime}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {session.type === "REMOTE" ? "En ligne" : session.location}
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
              const Icon = ACTIVITY_ICONS[activity.type];
              const colorClass = ACTIVITY_COLORS[activity.type];
              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-3"
                >
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
