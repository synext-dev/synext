"use client";

import { useState } from "react";
import {
  Monitor,
  Smartphone,
  Shield,
  Eye,
  Bell,
  CreditCard,
  Trash2,
  Download,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { TrainerAccountSettings, ActiveSession } from "@/types";

interface AccesPanelProps {
  settings: TrainerAccountSettings;
}

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="w-1 h-6 rounded-full bg-synext-blue" />
      <span className="text-muted-foreground">{icon}</span>
      <h2 className="font-heading text-lg font-semibold text-synext-navy">
        {title}
      </h2>
    </div>
  );
}

function TogglePill({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex rounded-full border overflow-hidden text-sm">
      <button
        onClick={() => onChange(true)}
        className={`px-4 py-1.5 transition-colors ${
          value ? "bg-synext-navy text-white" : "text-muted-foreground hover:bg-muted"
        }`}
      >
        Oui
      </button>
      <button
        onClick={() => onChange(false)}
        className={`px-4 py-1.5 transition-colors ${
          !value ? "bg-synext-navy text-white" : "text-muted-foreground hover:bg-muted"
        }`}
      >
        Non
      </button>
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function formatLastSeen(iso: string) {
  const date = new Date(iso);
  const now = new Date("2026-03-17T21:00:00");
  const diffH = Math.floor((now.getTime() - date.getTime()) / 3600000);
  if (diffH < 1) return "À l'instant";
  if (diffH < 24) return `Il y a ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  return `Il y a ${diffD} jour${diffD > 1 ? "s" : ""}`;
}

export function AccesPanel({ settings }: AccesPanelProps) {
  // Sécurité
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [sessions, setSessions] = useState<ActiveSession[]>(
    settings.activeSessions
  );

  // Visibilité
  const [profilePublic, setProfilePublic] = useState(settings.profilePublic);
  const [showHourlyRate, setShowHourlyRate] = useState(settings.showHourlyRate);
  const [contactRestriction, setContactRestriction] = useState(
    settings.contactRestriction
  );

  // Notifications
  const [notif, setNotif] = useState(settings.notifications);

  // Suppression compte
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function handlePasswordChange() {
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    toast.success("Mot de passe mis à jour (mock)");
    setPasswords({ current: "", next: "", confirm: "" });
  }

  function handleDisconnectSession(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success("Session déconnectée (mock)");
  }

  function handleSaveVisibility() {
    toast.success("Visibilité enregistrée (mock)");
  }

  function handleSaveNotifications() {
    toast.success("Notifications enregistrées (mock)");
  }

  function handleDeleteAccount() {
    setDeleteDialogOpen(false);
    toast.error("Suppression annulée — fonctionnalité non disponible en mode démo");
  }

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-bold text-synext-navy">
        Accès &amp; Sécurité
      </h1>

      {/* ── Section 1 : Sécurité ─────────────────────────── */}
      <section>
        <SectionHeader
          icon={<Shield className="h-4 w-4" />}
          title="Sécurité du compte"
        />

        <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-6">
          {/* Mot de passe */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">
              Modifier le mot de passe
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Mot de passe actuel
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, current: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Nouveau mot de passe
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.next}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, next: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Confirmer
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, confirm: e.target.value }))
                  }
                />
              </div>
            </div>
            <Button
              size="sm"
              className="mt-3 rounded-full bg-synext-navy text-white hover:bg-synext-blue"
              onClick={handlePasswordChange}
            >
              Modifier le mot de passe
            </Button>
          </div>

          <Separator />

          {/* 2FA */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Authentification à deux facteurs (2FA)
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Ajoutez une couche de sécurité supplémentaire à votre compte.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Badge
                variant="secondary"
                className="text-xs rounded-full bg-red-50 text-red-600"
              >
                Non activé
              </Badge>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() =>
                  toast.info("2FA disponible dans une prochaine version")
                }
              >
                Activer
              </Button>
            </div>
          </div>

          <Separator />

          {/* Sessions */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">
              Sessions actives
            </p>
            <div className="space-y-2">
              {sessions.map((session) => {
                const isDesktop = session.device.toLowerCase().includes("mac") ||
                  session.device.toLowerCase().includes("windows") ||
                  session.device.toLowerCase().includes("linux");
                return (
                  <div
                    key={session.id}
                    className="flex items-center gap-3 rounded-xl border px-4 py-3"
                  >
                    <div className="text-muted-foreground">
                      {isDesktop ? (
                        <Monitor className="h-4 w-4" />
                      ) : (
                        <Smartphone className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {session.device}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.location} · {formatLastSeen(session.lastSeen)}
                      </p>
                    </div>
                    {session.current ? (
                      <Badge className="rounded-full bg-synext-light text-synext-navy text-xs">
                        Session actuelle
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full text-xs text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => handleDisconnectSession(session.id)}
                      >
                        Déconnecter
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2 : Visibilité ───────────────────────── */}
      <section>
        <SectionHeader
          icon={<Eye className="h-4 w-4" />}
          title="Visibilité du profil"
        />

        <div className="bg-white rounded-2xl border p-6 shadow-sm divide-y">
          <SettingRow
            label="Profil public"
            description="Votre profil apparaît dans les résultats de recherche des organismes."
          >
            <TogglePill value={profilePublic} onChange={setProfilePublic} />
          </SettingRow>

          <SettingRow
            label="Afficher le tarif horaire"
            description="Les organismes peuvent voir votre tarif directement sur votre profil."
          >
            <TogglePill value={showHourlyRate} onChange={setShowHourlyRate} />
          </SettingRow>

          <SettingRow label="Qui peut me contacter">
            <div className="flex rounded-full border overflow-hidden text-sm">
              <button
                onClick={() => setContactRestriction("all")}
                className={`px-3 py-1.5 transition-colors ${
                  contactRestriction === "all"
                    ? "bg-synext-navy text-white"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setContactRestriction("verified_only")}
                className={`px-3 py-1.5 transition-colors ${
                  contactRestriction === "verified_only"
                    ? "bg-synext-navy text-white"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Vérifiés uniquement
              </button>
            </div>
          </SettingRow>

          <div className="pt-4">
            <Button
              size="sm"
              className="rounded-full bg-synext-navy text-white hover:bg-synext-blue"
              onClick={handleSaveVisibility}
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </section>

      {/* ── Section 3 : Notifications ────────────────────── */}
      <section>
        <SectionHeader
          icon={<Bell className="h-4 w-4" />}
          title="Notifications"
        />

        <div className="bg-white rounded-2xl border p-6 shadow-sm divide-y">
          <SettingRow
            label="Nouvelle annonce"
            description="Soyez alerté quand une annonce correspond à votre profil."
          >
            <TogglePill
              value={notif.newAnnonce}
              onChange={(v) => setNotif((n) => ({ ...n, newAnnonce: v }))}
            />
          </SettingRow>

          <SettingRow
            label="Nouveau message"
            description="Recevez une notification pour chaque nouveau message."
          >
            <TogglePill
              value={notif.newMessage}
              onChange={(v) => setNotif((n) => ({ ...n, newMessage: v }))}
            />
          </SettingRow>

          <SettingRow
            label="Nouvelle candidature confirmée"
            description="Soyez notifié quand un organisme accepte votre candidature."
          >
            <TogglePill
              value={notif.newCandidature}
              onChange={(v) => setNotif((n) => ({ ...n, newCandidature: v }))}
            />
          </SettingRow>

          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Fréquence des résumés
              </p>
            </div>
            <div className="flex rounded-full border overflow-hidden text-sm shrink-0">
              {(
                [
                  { value: "immediate", label: "Immédiat" },
                  { value: "daily", label: "Quotidien" },
                  { value: "weekly", label: "Hebdo" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setNotif((n) => ({ ...n, frequency: opt.value }))
                  }
                  className={`px-3 py-1.5 transition-colors ${
                    notif.frequency === opt.value
                      ? "bg-synext-navy text-white"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button
              size="sm"
              className="rounded-full bg-synext-navy text-white hover:bg-synext-blue"
              onClick={handleSaveNotifications}
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </section>

      {/* ── Section 4 : Abonnement ───────────────────────── */}
      <section>
        <SectionHeader
          icon={<CreditCard className="h-4 w-4" />}
          title="Abonnement"
        />

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-foreground">
                  Plan actuel
                </p>
                <Badge
                  className={`rounded-full text-xs ${
                    settings.plan === "premium"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {settings.plan === "premium" ? "PREMIUM" : "GRATUIT"}
                </Badge>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>· 10 candidatures par mois</li>
                <li>· 1 profil actif</li>
                <li>· Accès aux annonces publiques</li>
              </ul>
            </div>
          </div>

          {settings.plan === "free" && (
            <div className="rounded-xl bg-synext-light border border-synext-blue/20 p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-synext-navy">
                  Passez au plan Premium
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Candidatures illimitées · Mise en avant · Statistiques avancées
                </p>
              </div>
              <Button
                size="sm"
                className="rounded-full bg-synext-navy text-white hover:bg-synext-blue shrink-0"
                onClick={() =>
                  toast.info("Redirection vers la page de paiement (mock)")
                }
              >
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Passer au Premium
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Section 5 : Données & Conformité ─────────────── */}
      <section>
        <SectionHeader
          icon={<Trash2 className="h-4 w-4" />}
          title="Données &amp; Conformité"
        />

        <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Télécharger mes données
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Exportez toutes vos données personnelles (RGPD).
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => toast.success("Export en cours de préparation (mock)")}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Télécharger
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">
                Supprimer mon compte
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Action irréversible. Toutes vos données seront supprimées.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Supprimer le compte
            </Button>
          </div>
        </div>
      </section>

      {/* Dialog confirmation suppression */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-synext-navy">
              Supprimer le compte ?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2">
              Cette action est <strong>irréversible</strong>. Votre profil,
              vos candidatures et toutes vos données seront définitivement
              supprimés de la plateforme.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-4">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              className="rounded-full bg-red-500 text-white hover:bg-red-600"
              onClick={handleDeleteAccount}
            >
              Supprimer définitivement
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
