import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header name={session.user.name ?? "Leitor(a)"} />
      <main className="mx-auto w-full max-w-md flex-1 px-5 pb-8 pt-5">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
