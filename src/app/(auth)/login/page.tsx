import Link from "next/link";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-card">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Connexion</h1>
        <p className="text-muted-foreground mt-2">
          Connectez-vous à votre compte Synext
        </p>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-synext-blue hover:underline">
          Inscription
        </Link>
      </p>
    </div>
  );
}
