import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addReadingLog } from "@/lib/actions";
import { BookCover } from "@/components/BookCover";
import { StatusMenu } from "@/components/StatusMenu";
import { Stars } from "@/components/Stars";
import { DeleteBookButton } from "@/components/DeleteBookButton";
import { formatDate } from "@/lib/format";

const MOODS = ["🙂", "😍", "😢", "😱", "🤔", "😴", "🔥", "😤"];

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const userId = session!.user.id;

  const book = await prisma.book.findUnique({
    where: { id },
    include: { logs: { orderBy: { createdAt: "desc" } } },
  });

  if (!book || book.userId !== userId) {
    notFound();
  }

  const addLogWithBook = addReadingLog.bind(null, book.id);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/estante"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand"
      >
        ← Voltar para a estante
      </Link>

      <div className="flex gap-4">
        <div className="h-40 w-28 shrink-0 overflow-hidden rounded-xl shadow-sm">
          <BookCover coverUrl={book.coverUrl} title={book.title} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h1 className="text-lg font-semibold leading-snug text-ink">
            {book.title}
          </h1>
          <p className="text-sm text-ink-soft">{book.author}</p>
          {book.totalPages && (
            <p className="text-xs text-ink-faint">{book.totalPages} páginas</p>
          )}
          <div>
            <StatusMenu bookId={book.id} status={book.status} />
          </div>
        </div>
      </div>

      {book.status !== "QUERO_LER" && (
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-ink-soft">
            <span>Progresso</span>
            <span>{book.progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-sage-soft">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${Math.min(100, book.progress)}%` }}
            />
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-surface p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Sua avaliação
        </p>
        <Stars bookId={book.id} rating={book.rating} />
      </div>

      <div>
        <h2 className="mb-3 font-display text-sm font-semibold text-ink">
          Novo registro de leitura
        </h2>
        <form
          action={addLogWithBook}
          className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4"
        >
          <textarea
            name="note"
            rows={2}
            placeholder="O que você achou até aqui?"
            className="w-full resize-none rounded-xl border border-border bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
          />

          <div className="flex items-center gap-3">
            <div className="flex flex-1 flex-col gap-1">
              <label htmlFor="progress" className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                Progresso (%)
              </label>
              <input
                id="progress"
                name="progress"
                type="number"
                min={0}
                max={100}
                defaultValue={book.progress}
                inputMode="numeric"
                className="w-full rounded-xl border border-border bg-paper px-3.5 py-2 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="mood" className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                Humor
              </label>
              <select
                id="mood"
                name="mood"
                defaultValue="🙂"
                className="rounded-xl border border-border bg-paper px-2.5 py-2 text-base outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
              >
                {MOODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-ink-soft">
            <input type="checkbox" name="spoiler" className="rounded border-border" />
            Contém spoiler
          </label>

          <button
            type="submit"
            className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-brand-dark"
          >
            Publicar
          </button>
        </form>
      </div>

      <div>
        <h2 className="mb-3 font-display text-sm font-semibold text-ink">
          Histórico de leitura
        </h2>

        {book.logs.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface px-4 py-6 text-center text-sm text-ink-soft">
            Nenhum registro ainda. Conte como está a leitura!
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {book.logs.map((log) => (
              <li
                key={log.id}
                className="rounded-2xl border border-border bg-surface p-4"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {log.mood && <span>{log.mood}</span>}
                    <span className="text-xs text-ink-faint">
                      {formatDate(log.createdAt)}
                    </span>
                  </div>
                  {log.progress != null && (
                    <span className="text-xs font-semibold text-brand">
                      {log.progress}%
                    </span>
                  )}
                </div>
                {log.note && (
                  <p
                    className={`text-sm text-ink ${log.spoiler ? "blur-[3px] transition hover:blur-none" : ""}`}
                  >
                    {log.note}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center pb-2">
        <DeleteBookButton bookId={book.id} />
      </div>
    </div>
  );
}
