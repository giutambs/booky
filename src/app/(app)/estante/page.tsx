import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookCard } from "@/components/BookCard";
import { STATUS_LABEL } from "@/lib/status";
import type { BookStatus } from "@prisma/client";

const FILTERS: { key: BookStatus | "TODOS"; label: string }[] = [
  { key: "TODOS", label: "Todos" },
  { key: "LENDO", label: STATUS_LABEL.LENDO },
  { key: "QUERO_LER", label: STATUS_LABEL.QUERO_LER },
  { key: "LIDO", label: STATUS_LABEL.LIDO },
  { key: "ABANDONADO", label: STATUS_LABEL.ABANDONADO },
];

export default async function ShelfPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  const userId = session!.user.id;

  const activeFilter = (params.status as BookStatus | undefined) ?? "TODOS";
  const q = params.q?.trim() ?? "";

  const books = await prisma.book.findMany({
    where: {
      userId,
      ...(activeFilter !== "TODOS" ? { status: activeFilter } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { author: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Minha estante
        </h1>
        <Link
          href="/estante/adicionar"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-lg text-paper shadow-sm"
          aria-label="Adicionar livro"
        >
          +
        </Link>
      </div>

      <form method="GET" className="relative">
        {activeFilter !== "TODOS" && (
          <input type="hidden" name="status" value={activeFilter} />
        )}
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar por título ou autor(a)"
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
        />
      </form>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => {
          const href =
            f.key === "TODOS"
              ? q
                ? `/estante?q=${encodeURIComponent(q)}`
                : "/estante"
              : `/estante?status=${f.key}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
          const active = activeFilter === f.key;
          return (
            <Link
              key={f.key}
              href={href}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                active
                  ? "border-brand bg-brand text-paper"
                  : "border-border bg-surface text-ink-soft hover:border-brand"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {books.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface px-4 py-10 text-center text-sm text-ink-soft">
          Nenhum livro encontrado por aqui.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3.5">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
