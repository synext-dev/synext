"use client";

import { useState } from "react";
import {
  MapPin,
  GraduationCap,
  Building2,
  Car,
  Clock,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Annonce } from "@/types";

interface AnnonceListProps {
  annonces: Annonce[];
}

export function AnnonceList({ annonces }: AnnonceListProps) {
  const [filters, setFilters] = useState({
    departement: "",
    domaine: "",
    typeOrganisme: "",
    typeIntervention: "",
    duree: "",
  });

  const filtered = annonces.filter((a) => {
    if (filters.departement && a.departement !== filters.departement)
      return false;
    if (
      filters.domaine &&
      !a.domains?.some((d) =>
        d.toLowerCase().includes(filters.domaine.toLowerCase())
      )
    )
      return false;
    if (
      filters.typeOrganisme &&
      a.orgType !== filters.typeOrganisme
    )
      return false;
    if (
      filters.typeIntervention &&
      a.interventionType !== filters.typeIntervention
    )
      return false;
    return true;
  });

  const formatDate = (iso: string) => {
    const [year, month, day] = iso.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="font-heading text-3xl font-bold text-synext-navy">
        Travaillez avec votre{" "}
        <span className="text-synext-blue">futur partenaire</span>
      </h1>

      {/* Filter Bar */}
      <div className="flex items-center gap-1 bg-white rounded-2xl border px-4 py-2 shadow-sm flex-wrap">
        <FilterItem
          icon={<MapPin className="h-3.5 w-3.5" />}
          label="Département"
          value={filters.departement}
          onChange={(v) => setFilters((f) => ({ ...f, departement: v }))}
          options={["34", "69", "75", "92", "33"]}
        />
        <Divider />
        <FilterItem
          icon={<GraduationCap className="h-3.5 w-3.5" />}
          label="Domaine"
          value={filters.domaine}
          onChange={(v) => setFilters((f) => ({ ...f, domaine: v }))}
          options={[
            "Communication",
            "Cybersécurité",
            "Bureautique",
            "UX Design",
          ]}
        />
        <Divider />
        <FilterItem
          icon={<Building2 className="h-3.5 w-3.5" />}
          label="Type Organisme"
          value={filters.typeOrganisme}
          onChange={(v) => setFilters((f) => ({ ...f, typeOrganisme: v }))}
          options={[
            "École Supérieur",
            "Centre de Formation",
            "Organisme de Formation",
          ]}
        />
        <Divider />
        <FilterItem
          icon={<Car className="h-3.5 w-3.5" />}
          label="Type Intervention"
          value={filters.typeIntervention}
          onChange={(v) => setFilters((f) => ({ ...f, typeIntervention: v }))}
          options={["Présentiel", "Distanciel", "Hybride"]}
        />
        <Divider />
        <FilterItem
          icon={<Clock className="h-3.5 w-3.5" />}
          label="Durée Intervention"
          value={filters.duree}
          onChange={(v) => setFilters((f) => ({ ...f, duree: v }))}
          options={["< 40H", "40H-60H", "> 60H"]}
        />
        <div className="ml-auto">
          <Button
            size="sm"
            className="rounded-full bg-synext-navy text-white hover:bg-synext-blue px-5"
          >
            <Search className="h-3.5 w-3.5 mr-1.5" />
            Rechercher
          </Button>
        </div>
      </div>

      {/* Annonce Cards */}
      <div className="space-y-4">
        {filtered.map((annonce) => (
          <AnnonceCard key={annonce.id} annonce={annonce} formatDate={formatDate} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Aucune annonce ne correspond à vos critères.
          </p>
        )}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-border mx-1" />;
}

function FilterItem({
  icon,
  label,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative flex items-center gap-1.5 px-2 py-1">
      <span className="text-muted-foreground">{icon}</span>
      <select
        className="appearance-none bg-transparent text-sm text-muted-foreground cursor-pointer focus:outline-none pr-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function AnnonceCard({
  annonce,
  formatDate,
}: {
  annonce: Annonce;
  formatDate: (iso: string) => string;
}) {
  return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm">
      {/* Top row: logo + org info + title */}
      <div className="flex items-start gap-6 mb-5">
        {/* Logo */}
        <div className="h-24 w-24 shrink-0 rounded-full border-2 border-border flex items-center justify-center overflow-hidden bg-white">
          <div className="h-16 w-16 rounded-full bg-synext-light flex items-center justify-center">
            <span className="text-lg font-bold text-synext-navy">
              {annonce.organizationName.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Org name + type + dept */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-synext-navy">
              {annonce.organizationName}
            </span>
            {annonce.orgType && (
              <span className="text-sm text-muted-foreground">
                {annonce.orgType}
              </span>
            )}
            <Badge
              variant="secondary"
              className="text-xs rounded-full px-2"
            >
              {annonce.departement}
            </Badge>
          </div>

          {/* Title */}
          <h2 className="font-heading text-3xl font-bold text-synext-navy mb-4 leading-tight">
            {annonce.title}
          </h2>

          {/* Domain + level + intervention type badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {annonce.domains?.map((d) => (
              <Badge
                key={d}
                variant="secondary"
                className="rounded-full text-sm px-3 py-1"
              >
                {d}
              </Badge>
            ))}
            {annonce.level && (
              <Badge
                variant="outline"
                className="rounded-full text-sm px-3 py-1"
              >
                {annonce.level}
              </Badge>
            )}
            {annonce.interventionType && (
              <Badge
                variant="outline"
                className="rounded-full text-sm px-3 py-1"
              >
                {annonce.interventionType}
              </Badge>
            )}
          </div>

          {/* Date + duration + rate pills */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {annonce.dateStart && annonce.dateEnd && (
              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-1 font-medium">
                Du {formatDate(annonce.dateStart)} au{" "}
                {formatDate(annonce.dateEnd)}
              </span>
            )}
            {annonce.durationHours && (
              <span className="inline-flex items-center rounded-full bg-synext-light text-synext-navy text-sm px-4 py-1 font-medium">
                {annonce.durationHours}H00
              </span>
            )}
            {annonce.hourlyRate && (
              <span className="inline-flex items-center rounded-full bg-synext-light text-synext-navy text-sm px-4 py-1 font-medium">
                Tarif Horaire : {annonce.hourlyRate}€ HT
              </span>
            )}
          </div>

          {/* CTA */}
          <Button className="w-full rounded-xl bg-synext-navy text-white hover:bg-synext-blue font-semibold py-3 h-auto text-base">
            Découvrir l&apos;annonce
          </Button>
        </div>
      </div>
    </div>
  );
}
