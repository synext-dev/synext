"use client";

import { useState } from "react";
import { Search, MapPin, Star, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Trainer } from "@/types";

const ALL_SPECIALTIES = [
  "React", "Node.js", "TypeScript", "AWS", "Python", "Machine Learning",
  "TensorFlow", "SQL", "Figma", "UX Research", "Design System",
  "Docker", "Kubernetes", "CI/CD", "SEO", "Scrum", "Management Agile",
] as const;

// Mock: trainers hired by the org
const HIRED_TRAINER_IDS = new Set(["t1", "t2", "t4"]);

interface OrgTrainersListProps {
  trainers: Trainer[];
}

export function OrgTrainersList({ trainers }: OrgTrainersListProps) {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState<string>("all");

  const filterTrainers = (tab: "all" | "hired" | "available") => {
    return trainers.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchesSpecialty = specialty === "all" || t.specialties.includes(specialty);
      const matchesTab =
        tab === "all" ||
        (tab === "hired" && HIRED_TRAINER_IDS.has(t.id)) ||
        (tab === "available" && !HIRED_TRAINER_IDS.has(t.id));
      return matchesSearch && matchesSpecialty && matchesTab;
    });
  };

  const allFiltered = filterTrainers("all");
  const hiredFiltered = filterTrainers("hired");
  const availableFiltered = filterTrainers("available");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-synext-navy">
          Formateurs
        </h1>
        <p className="mt-1 text-muted-foreground">
          Recherchez et contactez des formateurs qualifiés.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un formateur..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={specialty} onValueChange={(v) => setSpecialty(v ?? "all")}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Spécialité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les spécialités</SelectItem>
            {ALL_SPECIALTIES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue={0}>
        <TabsList>
          <TabsTrigger value={0}>Tous ({allFiltered.length})</TabsTrigger>
          <TabsTrigger value={1}>Mes formateurs ({hiredFiltered.length})</TabsTrigger>
          <TabsTrigger value={2}>Disponibles ({availableFiltered.length})</TabsTrigger>
        </TabsList>

        {([allFiltered, hiredFiltered, availableFiltered] as const).map(
          (filtered, index) => (
            <TabsContent key={index} value={index}>
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  Aucun formateur trouvé.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((trainer) => (
                    <OrgTrainerCard
                      key={trainer.id}
                      trainer={trainer}
                      isHired={HIRED_TRAINER_IDS.has(trainer.id)}
                    />
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

function OrgTrainerCard({ trainer, isHired }: { trainer: Trainer; isHired: boolean }) {
  const initials = trainer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-synext-light text-sm font-semibold text-synext-navy">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="font-heading text-base">{trainer.name}</CardTitle>
              {isHired && (
                <Badge className="bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0">
                  Recruté
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {trainer.city}
              <span>·</span>
              <Star className="h-3 w-3 text-amber-500" />
              {trainer.rating}/5 ({trainer.reviewCount} avis)
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {trainer.specialties.map((s) => (
            <Badge key={s} variant="secondary" className="text-xs">
              {s}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-semibold text-synext-navy">
            {trainer.hourlyRate} &euro;/h
          </span>
          <Button
            size="sm"
            variant={isHired ? "outline" : "default"}
            onClick={() =>
              toast.success(
                isHired
                  ? `Message envoyé à ${trainer.name} (mock)`
                  : `Demande envoyée à ${trainer.name} (mock)`
              )
            }
          >
            <MessageCircle className="mr-1 h-3.5 w-3.5" />
            {isHired ? "Contacter" : "Recruter"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
