"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type {
  TrainerAvailability,
  AvailabilityStatus,
  WeeklyScheduleSlot,
} from "@/types";

interface DisponibilitePanelProps {
  availability: TrainerAvailability;
}

const STATUS_CONFIG: Record<
  AvailabilityStatus,
  { label: string; dot: string; cell: string }
> = {
  available: {
    label: "Disponible",
    dot: "bg-green-500",
    cell: "bg-green-100 text-green-700 font-semibold",
  },
  unavailable: {
    label: "Indisponible",
    dot: "bg-red-500",
    cell: "bg-red-100 text-red-600 font-semibold",
  },
  tentative: {
    label: "Sous réserve",
    dot: "bg-amber-400",
    cell: "bg-amber-100 text-amber-700 font-semibold",
  },
  on_mission: {
    label: "En mission",
    dot: "bg-synext-blue",
    cell: "bg-synext-light text-synext-navy font-semibold",
  },
};

const DAY_NAMES = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const DAY_NAMES_FULL = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
const MONTHS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function toISO(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function DisponibilitePanel({ availability }: DisponibilitePanelProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  // Slots overrides (user can click to change)
  const [slots, setSlots] = useState<
    Record<string, AvailabilityStatus>
  >(() => {
    const map: Record<string, AvailabilityStatus> = {};
    for (const s of availability.slots) {
      map[s.date] = s.status;
    }
    return map;
  });

  const [popoverDate, setPopoverDate] = useState<string | null>(null);

  // Weekly schedule state
  const [schedule, setSchedule] = useState<WeeklyScheduleSlot[]>(
    availability.weeklySchedule
  );

  // Preferences state
  const [prefs, setPrefs] = useState(availability.preferences);

  // Calendar cells
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Start week on Monday: shift so Mon=0
    const startOffset = (firstDay + 6) % 7;
    const cells: { day: number | null; iso: string | null }[] = [];
    for (let i = 0; i < startOffset; i++) cells.push({ day: null, iso: null });
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, iso: toISO(currentYear, currentMonth, d) });
    }
    while (cells.length % 7 !== 0) cells.push({ day: null, iso: null });
    return cells;
  }, [currentYear, currentMonth]);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setPopoverDate(null);
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setPopoverDate(null);
  }

  function getDayStatus(iso: string): AvailabilityStatus | null {
    if (slots[iso]) return slots[iso];
    // Check weekly schedule
    const date = new Date(iso + "T00:00:00");
    const dow = date.getDay();
    const hasSlot = schedule.some((s) => s.dayOfWeek === dow);
    if (hasSlot) return "available";
    return null;
  }

  function setDayStatus(iso: string, status: AvailabilityStatus) {
    setSlots((prev) => ({ ...prev, [iso]: status }));
    setPopoverDate(null);
  }

  function addScheduleSlot() {
    setSchedule((prev) => [
      ...prev,
      {
        id: `ws-${Date.now()}`,
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "17:00",
      },
    ]);
  }

  function removeScheduleSlot(id: string) {
    setSchedule((prev) => prev.filter((s) => s.id !== id));
  }

  function updateScheduleSlot(
    id: string,
    field: keyof WeeklyScheduleSlot,
    value: string | number
  ) {
    setSchedule((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  function toggleInterventionType(type: "ONSITE" | "REMOTE" | "HYBRID") {
    setPrefs((prev) => {
      const types = prev.interventionTypes.includes(type)
        ? prev.interventionTypes.filter((t) => t !== type)
        : [...prev.interventionTypes, type];
      return { ...prev, interventionTypes: types };
    });
  }

  function savePreferences() {
    toast.success("Préférences mises à jour (mock)");
  }

  const INTERVENTION_LABELS: Record<string, string> = {
    ONSITE: "Présentiel",
    REMOTE: "Distanciel",
    HYBRID: "Hybride",
  };

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-bold text-synext-navy">
        Mes disponibilités
      </h1>

      {/* ── Calendrier ───────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 rounded-full bg-synext-blue" />
          <h2 className="font-heading text-lg font-semibold text-synext-navy">
            Calendrier
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-heading font-semibold text-synext-navy">
              {MONTHS_FR[currentMonth]} {currentYear}
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            {/* Grid */}
            <div className="flex-1">
              {/* Day headers (Mon → Sun) */}
              <div className="grid grid-cols-7 mb-1">
                {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-medium text-muted-foreground py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((cell, i) => {
                  if (!cell.day || !cell.iso) {
                    return <div key={i} />;
                  }
                  const status = getDayStatus(cell.iso);
                  const cfg = status ? STATUS_CONFIG[status] : null;
                  const isToday =
                    cell.iso === toISO(today.getFullYear(), today.getMonth(), today.getDate());
                  const isOpen = popoverDate === cell.iso;

                  return (
                    <div key={cell.iso} className="relative">
                      <button
                        onClick={() =>
                          setPopoverDate(isOpen ? null : cell.iso)
                        }
                        className={`w-full aspect-square rounded-lg text-sm flex items-center justify-center transition-colors border ${
                          cfg
                            ? `${cfg.cell} border-transparent`
                            : "hover:bg-muted border-transparent"
                        } ${isToday && !cfg ? "border-synext-blue text-synext-blue font-semibold" : ""}`}
                      >
                        {cell.day}
                      </button>

                      {/* Popover */}
                      {isOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50 bg-white border rounded-xl shadow-lg p-2 w-40">
                          {(
                            Object.entries(STATUS_CONFIG) as [
                              AvailabilityStatus,
                              (typeof STATUS_CONFIG)[AvailabilityStatus],
                            ][]
                          ).map(([status, cfg]) => (
                            <button
                              key={status}
                              onClick={() => setDayStatus(cell.iso!, status)}
                              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted text-sm text-left"
                            >
                              <span
                                className={`h-2.5 w-2.5 rounded-full shrink-0 ${cfg.dot}`}
                              />
                              {cfg.label}
                            </button>
                          ))}
                          <button
                            onClick={() => {
                              setSlots((prev) => {
                                const next = { ...prev };
                                delete next[cell.iso!];
                                return next;
                              });
                              setPopoverDate(null);
                            }}
                            className="w-full px-2 py-1.5 rounded-lg hover:bg-muted text-xs text-muted-foreground text-left mt-1 border-t"
                          >
                            Effacer
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Légende */}
            <div className="flex flex-col gap-2 justify-start pt-8 min-w-[130px]">
              {(Object.entries(STATUS_CONFIG) as [AvailabilityStatus, typeof STATUS_CONFIG[AvailabilityStatus]][]).map(
                ([, cfg]) => (
                  <div key={cfg.label} className="flex items-center gap-2 text-sm">
                    <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${cfg.dot}`} />
                    <span className="text-muted-foreground">{cfg.label}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Plages récurrentes ───────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 rounded-full bg-synext-blue" />
          <h2 className="font-heading text-lg font-semibold text-synext-navy">
            Plages horaires récurrentes
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-3">
          {schedule.map((slot) => (
            <div key={slot.id} className="flex items-center gap-3 flex-wrap">
              <select
                className="rounded-lg border px-3 py-2 text-sm bg-background"
                value={slot.dayOfWeek}
                onChange={(e) =>
                  updateScheduleSlot(slot.id, "dayOfWeek", Number(e.target.value))
                }
              >
                {DAY_NAMES_FULL.map((name, i) => (
                  <option key={i} value={i}>
                    {name}
                  </option>
                ))}
              </select>

              <input
                type="time"
                className="rounded-lg border px-3 py-2 text-sm bg-background"
                value={slot.startTime}
                onChange={(e) =>
                  updateScheduleSlot(slot.id, "startTime", e.target.value)
                }
              />
              <span className="text-muted-foreground text-sm">→</span>
              <input
                type="time"
                className="rounded-lg border px-3 py-2 text-sm bg-background"
                value={slot.endTime}
                onChange={(e) =>
                  updateScheduleSlot(slot.id, "endTime", e.target.value)
                }
              />

              <button
                onClick={() => removeScheduleSlot(slot.id)}
                className="ml-auto text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            className="rounded-full mt-2"
            onClick={addScheduleSlot}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Ajouter une plage
          </Button>
        </div>
      </section>

      {/* ── Préférences ──────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 rounded-full bg-synext-blue" />
          <h2 className="font-heading text-lg font-semibold text-synext-navy">
            Préférences d&apos;intervention
          </h2>
        </div>

        <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-5">
          {/* Types */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Type d&apos;intervention
            </label>
            <div className="flex gap-3 flex-wrap">
              {(["ONSITE", "REMOTE", "HYBRID"] as const).map((type) => {
                const active = prefs.interventionTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggleInterventionType(type)}
                    className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
                      active
                        ? "bg-synext-navy text-white border-synext-navy"
                        : "bg-white text-muted-foreground border-border hover:border-synext-navy"
                    }`}
                  >
                    {INTERVENTION_LABELS[type]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rayon */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Rayon géographique
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={500}
                className="rounded-lg border px-3 py-2 text-sm bg-background w-24"
                value={prefs.maxRadiusKm ?? ""}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, maxRadiusKm: Number(e.target.value) }))
                }
              />
              <span className="text-sm text-muted-foreground">km</span>
            </div>
          </div>

          {/* Durée mission */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Durée de mission
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">min</span>
              <input
                type="number"
                min={1}
                className="rounded-lg border px-3 py-2 text-sm bg-background w-20"
                value={prefs.minMissionDays ?? ""}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, minMissionDays: Number(e.target.value) }))
                }
              />
              <span className="text-sm text-muted-foreground">jours — max</span>
              <input
                type="number"
                min={1}
                className="rounded-lg border px-3 py-2 text-sm bg-background w-20"
                value={prefs.maxMissionDays ?? ""}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, maxMissionDays: Number(e.target.value) }))
                }
              />
              <span className="text-sm text-muted-foreground">jours</span>
            </div>
          </div>

          {/* Disponible à partir de */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Disponible à partir du
            </label>
            <input
              type="date"
              className="rounded-lg border px-3 py-2 text-sm bg-background"
              value={prefs.availableFrom ?? ""}
              onChange={(e) =>
                setPrefs((p) => ({ ...p, availableFrom: e.target.value }))
              }
            />
          </div>

          <div className="pt-2">
            <Button
              className="rounded-full bg-synext-navy text-white hover:bg-synext-blue"
              onClick={savePreferences}
            >
              Enregistrer les préférences
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
