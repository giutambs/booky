import { AuthShell, AuthLink } from "@/components/AuthShell";
import { SignupForm } from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <AuthShell
      title="Crie sua conta"
      subtitle="Um login só seu, para guardar suas leituras e seu progresso."
      footer={
        <>
          Já tem conta? <AuthLink href="/login">Entrar</AuthLink>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
