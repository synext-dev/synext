"use client";

import { useState, useTransition } from "react";
import { registerAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<"TRAINER" | "ORGANIZATION">("TRAINER");
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    startTransition(async () => {
      const result = await registerAction({
        name,
        email,
        password,
        confirmPassword,
        role,
      });
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          name="name"
          placeholder="Jean Dupont"
          required
          minLength={2}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@exemple.com"
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Je suis</Label>
        <Select
          value={role}
          onValueChange={(v) => setRole(v as "TRAINER" | "ORGANIZATION")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TRAINER">Formateur</SelectItem>
            <SelectItem value="ORGANIZATION">Organisme de formation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          minLength={8}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
          minLength={8}
          disabled={isPending}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Inscription..." : "Créer mon compte"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Phase 1 — Seuls les comptes test fonctionnent (trainer@synext.com, org@synext.com)
      </p>
    </form>
  );
}
