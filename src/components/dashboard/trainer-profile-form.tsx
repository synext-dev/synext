"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { Trainer } from "@/types";

interface TrainerProfileFormProps {
  trainer: Trainer;
}

export function TrainerProfileForm({ trainer }: TrainerProfileFormProps) {
  const [specialties, setSpecialties] = useState(trainer.specialties);
  const [newSpecialty, setNewSpecialty] = useState("");

  const initials = trainer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const addSpecialty = () => {
    const trimmed = newSpecialty.trim();
    if (trimmed && !specialties.includes(trimmed)) {
      setSpecialties([...specialties, trimmed]);
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (s: string) => {
    setSpecialties(specialties.filter((sp) => sp !== s));
  };

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-bold text-synext-navy">
        Mon profil
      </h1>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-synext-light text-2xl font-semibold text-synext-navy">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-heading text-2xl font-bold text-synext-navy">
                {trainer.name}
              </h2>
              <p className="text-muted-foreground">{trainer.city}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100">
                  {trainer.rating}/5 ★
                </Badge>
                <Badge variant="secondary">{trainer.reviewCount} avis</Badge>
                <Badge variant="secondary">{trainer.hourlyRate} &euro;/h</Badge>
              </div>
            </div>
            <Button variant="outline">Modifier la photo</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="font-heading text-2xl font-bold text-synext-navy">47 250 &euro;</p>
            <p className="text-sm text-muted-foreground">Revenus totaux</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="font-heading text-2xl font-bold text-synext-navy">4</p>
            <p className="text-sm text-muted-foreground">Formations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="font-heading text-2xl font-bold text-synext-navy">312</p>
            <p className="text-sm text-muted-foreground">Apprenants</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="font-heading text-2xl font-bold text-synext-navy">12 ans</p>
            <p className="text-sm text-muted-foreground">Expérience</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={0}>
        <TabsList>
          <TabsTrigger value={0}>Informations générales</TabsTrigger>
          <TabsTrigger value={1}>Spécialités</TabsTrigger>
        </TabsList>

        <TabsContent value={0}>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nom complet</Label>
                  <Input defaultValue={trainer.name} />
                </div>
                <div className="space-y-2">
                  <Label>Ville</Label>
                  <Input defaultValue={trainer.city} />
                </div>
                <div className="space-y-2">
                  <Label>Tarif horaire (&euro;)</Label>
                  <Input type="number" defaultValue={trainer.hourlyRate} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    defaultValue="sophie.martin@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea defaultValue={trainer.bio} rows={4} />
              </div>
              <Button
                onClick={() => toast.success("Profil mis à jour (mock)")}
              >
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={1}>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="gap-1 pr-1 text-sm"
                  >
                    {s}
                    <button
                      onClick={() => removeSpecialty(s)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Ajouter une spécialité..."
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSpecialty();
                    }
                  }}
                  className="max-w-xs"
                />
                <Button variant="outline" size="sm" onClick={addSpecialty}>
                  <Plus className="mr-1 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
              <Button
                onClick={() => toast.success("Spécialités mises à jour (mock)")}
              >
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
