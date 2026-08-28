import { AuthShell, AuthLink } from "@/components/AuthShell";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Bem-vindo de volta"
      subtitle="Entre para continuar de onde parou na sua estante."
      footer={
        <>
          Ainda não tem conta? <AuthLink href="/signup">Criar conta</AuthLink>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
