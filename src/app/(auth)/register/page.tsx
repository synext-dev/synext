import Link from "next/link";
import { RegisterForm } from "./_components/register-form";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-card">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Inscription</h1>
        <p className="text-muted-foreground mt-2">
          Créez votre compte Synext
        </p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-synext-blue hover:underline">
          Connexion
        </Link>
      </p>
    </div>
  );
}
