import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string;
  trend: number;
  icon: LucideIcon;
}

export function KPICard({ title, value, trend, icon: Icon }: KPICardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-synext-light">
            <Icon className="h-5 w-5 text-synext-blue" />
          </div>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <p className="font-heading text-2xl font-bold text-synext-navy">{value}</p>
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trend > 0
                ? "text-green-600"
                : trend < 0
                  ? "text-red-500"
                  : "text-muted-foreground"
            }`}
          >
            {trend > 0 ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : trend < 0 ? (
              <TrendingDown className="h-3.5 w-3.5" />
            ) : (
              <Minus className="h-3.5 w-3.5" />
            )}
            <span>
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
