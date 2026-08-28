import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserStats } from "@/lib/stats";
import { BookCover } from "@/components/BookCover";

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name;
}

export default async function HomePage() {
  const session = await auth();
  const userId = session!.user.id;

  const [current, stats, recentBooks] = await Promise.all([
    prisma.book.findFirst({
      where: { userId, status: "LENDO" },
      orderBy: { updatedAt: "desc" },
    }),
    getUserStats(userId),
    prisma.book.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
  ]);

  return (
    <div className="flex flex-col gap-7">
      <div>
        <p className="text-sm text-ink-soft">Olá,</p>
        <h1 className="font-display text-2xl font-semibold text-ink">
          {firstName(session!.user.name ?? "leitor(a)")} 👋
        </h1>
      </div>

      {current ? (
        <Link
          href={`/estante/${current.id}`}
          className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg">
            <BookCover coverUrl={current.coverUrl} title={current.title} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Lendo agora
            </p>
            <h2 className="mt-1 truncate text-base font-semibold text-ink">
              {current.title}
            </h2>
            <p className="truncate text-sm text-ink-soft">{current.author}</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sage-soft">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${Math.min(100, current.progress)}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              {current.progress}% concluído
            </p>
          </div>
        </Link>
      ) : (
        <Link
          href="/estante/adicionar"
          className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-surface px-4 py-8 text-center transition hover:border-brand"
        >
          <span className="text-2xl">📖</span>
          <p className="text-sm font-medium text-ink">
            Você não está lendo nada agora
          </p>
          <p className="text-xs text-ink-soft">
            Toque para adicionar um livro à sua estante
          </p>
        </Link>
      )}

      <div className="grid grid-cols-3 gap-3">
        <StatBox value={stats.totalRead} label="livros lidos" />
        <StatBox value={stats.streak} label="meses seguidos" />
        <StatBox
          value={stats.avgRating ? stats.avgRating.toFixed(1) : "–"}
          label="nota média"
        />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold text-ink">
            Atividade recente
          </h2>
          <Link href="/estante" className="text-xs font-semibold text-brand">
            Ver estante →
          </Link>
        </div>

        {recentBooks.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface px-4 py-6 text-center text-sm text-ink-soft">
            Sua estante está vazia. Que tal adicionar o primeiro livro?
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {recentBooks.map((book) => (
              <li key={book.id}>
                <Link
                  href={`/estante/${book.id}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-2.5 transition hover:border-brand"
                >
                  <div className="h-12 w-9 shrink-0 overflow-hidden rounded-md">
                    <BookCover coverUrl={book.coverUrl} title={book.title} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">
                      {book.title}
                    </p>
                    <p className="truncate text-xs text-ink-soft">
                      {book.author}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatBox({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-2xl border border-border bg-surface py-4">
      <span className="font-display text-xl font-semibold text-brand">
        {value}
      </span>
      <span className="text-center text-[11px] leading-tight text-ink-soft">
        {label}
      </span>
    </div>
  );
}
