"use client";

import { useState } from "react";
import { Search, Clock, Users, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { COURSE_CATEGORIES } from "@/lib/constants";
import type { Course, CourseCategory } from "@/types";

const CATEGORY_COLORS: Record<string, string> = {
  DEVELOPMENT: "border-l-blue-500",
  DESIGN: "border-l-pink-500",
  MARKETING: "border-l-orange-500",
  MANAGEMENT: "border-l-emerald-500",
  DATA: "border-l-purple-500",
  DEVOPS: "border-l-cyan-500",
};

// Mock: org progress for each course
const COURSE_PROGRESS: Record<string, { enrolled: number; total: number; status: "ongoing" | "completed" }> = {
  c1: { enrolled: 8, total: 12, status: "ongoing" },
  c2: { enrolled: 12, total: 12, status: "completed" },
  c3: { enrolled: 6, total: 8, status: "completed" },
  c4: { enrolled: 3, total: 6, status: "ongoing" },
  c5: { enrolled: 10, total: 10, status: "completed" },
  c6: { enrolled: 15, total: 20, status: "ongoing" },
};

interface OrgCoursesListProps {
  courses: Course[];
}

export function OrgCoursesList({ courses }: OrgCoursesListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const publishedCourses = courses.filter((c) => c.status === "PUBLISHED");

  const filterCourses = (tab: "all" | "ongoing" | "completed") => {
    return publishedCourses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || course.category === category;
      const progress = COURSE_PROGRESS[course.id];
      const matchesTab =
        tab === "all" ||
        (tab === "ongoing" && progress?.status === "ongoing") ||
        (tab === "completed" && progress?.status === "completed");
      return matchesSearch && matchesCategory && matchesTab;
    });
  };

  const allFiltered = filterCourses("all");
  const ongoingFiltered = filterCourses("ongoing");
  const completedFiltered = filterCourses("completed");

  const handleOrder = () => {
    setDialogOpen(false);
    toast.success("Demande de formation envoyée (mock)");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-synext-navy">
            Formations
          </h1>
          <p className="mt-1 text-muted-foreground">
            Explorez les formations disponibles pour vos équipes.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button />}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Commander une formation
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Commander une formation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Formation souhaitée</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une formation" />
                  </SelectTrigger>
                  <SelectContent>
                    {publishedCourses.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Nombre d'employés</Label>
                <Input type="number" placeholder="10" />
              </div>
              <div>
                <Label>Date souhaitée</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Commentaire</Label>
                <Textarea placeholder="Précisions sur vos besoins..." rows={3} />
              </div>
              <Button onClick={handleOrder} className="w-full">
                Envoyer la demande
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher une formation..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            {Object.entries(COURSE_CATEGORIES).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue={0}>
        <TabsList>
          <TabsTrigger value={0}>Toutes ({allFiltered.length})</TabsTrigger>
          <TabsTrigger value={1}>En cours ({ongoingFiltered.length})</TabsTrigger>
          <TabsTrigger value={2}>Terminées ({completedFiltered.length})</TabsTrigger>
        </TabsList>

        {([allFiltered, ongoingFiltered, completedFiltered] as const).map(
          (filtered, index) => (
            <TabsContent key={index} value={index}>
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  Aucune formation trouvée.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((course) => (
                    <OrgCourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </TabsContent>
          )
        )}
      </Tabs>
    </div>
  );
}

function OrgCourseCard({ course }: { course: Course }) {
  const progress = COURSE_PROGRESS[course.id];
  const percentage = progress ? Math.round((progress.enrolled / progress.total) * 100) : 0;

  return (
    <Card className={`border-l-4 ${CATEGORY_COLORS[course.category] ?? "border-l-gray-300"}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {COURSE_CATEGORIES[course.category as CourseCategory] ?? course.category}
          </Badge>
          {progress && (
            <Badge
              className={
                progress.status === "completed"
                  ? "bg-emerald-50 text-emerald-700 text-xs"
                  : "bg-blue-50 text-blue-700 text-xs"
              }
            >
              {progress.status === "completed" ? "Terminée" : "En cours"}
            </Badge>
          )}
        </div>
        <CardTitle className="font-heading text-lg leading-tight">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>

        {progress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>{progress.enrolled}/{progress.total} employés formés</span>
              <span>{percentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className={`h-2 rounded-full transition-all ${
                  progress.status === "completed" ? "bg-emerald-500" : "bg-synext-blue"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-lg font-semibold text-synext-navy">
            {course.price} &euro;
          </span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {course.trainerName}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
