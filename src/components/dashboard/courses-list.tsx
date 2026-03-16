"use client";

import { useState } from "react";
import { Search, Clock, Users, MoreVertical, Plus } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface CoursesListProps {
  courses: Course[];
}

export function CoursesList({ courses }: CoursesListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filterCourses = (status: "all" | "PUBLISHED" | "DRAFT") => {
    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || course.category === category;
      const matchesStatus = status === "all" || course.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const allFiltered = filterCourses("all");
  const publishedFiltered = filterCourses("PUBLISHED");
  const draftFiltered = filterCourses("DRAFT");

  const handleCreate = () => {
    setDialogOpen(false);
    toast.success("Formation créée (mock)");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-synext-navy">
          Mes formations
        </h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-2 h-4 w-4" />
            Créer une formation
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle formation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Titre</Label>
                <Input placeholder="Ex: React Avancé" />
              </div>
              <div>
                <Label>Catégorie</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(COURSE_CATEGORIES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Prix (&euro;)</Label>
                <Input type="number" placeholder="890" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Décrivez votre formation..." rows={3} />
              </div>
              <Button onClick={handleCreate} className="w-full">
                Enregistrer
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
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue={0}>
        <TabsList>
          <TabsTrigger value={0}>Toutes ({allFiltered.length})</TabsTrigger>
          <TabsTrigger value={1}>
            Publiées ({publishedFiltered.length})
          </TabsTrigger>
          <TabsTrigger value={2}>
            Brouillons ({draftFiltered.length})
          </TabsTrigger>
        </TabsList>

        {([allFiltered, publishedFiltered, draftFiltered] as const).map(
          (filtered, index) => (
            <TabsContent key={index} value={index}>
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  Aucune formation trouvée.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((course) => (
                    <CourseCard key={course.id} course={course} />
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

function CourseCard({ course }: { course: Course }) {
  return (
    <Card
      className={`border-l-4 ${CATEGORY_COLORS[course.category] ?? "border-l-gray-300"}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {COURSE_CATEGORIES[course.category as CourseCategory] ??
              course.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Badge
              variant={course.status === "PUBLISHED" ? "default" : "secondary"}
              className="text-xs"
            >
              {course.status === "PUBLISHED" ? "Publiée" : "Brouillon"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="rounded-md p-1 text-muted-foreground hover:bg-muted" />
                }
              >
                <MoreVertical className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toast.info("Modifier (mock)")}>
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Dupliqué (mock)")}>
                  Dupliquer
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.info("Archivé (mock)")}
                  className="text-destructive"
                >
                  Archiver
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardTitle className="font-heading text-lg leading-tight">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {course.description}
        </p>
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
              {course.enrollmentCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
