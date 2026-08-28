import Link from "next/link";
import type { Book } from "@prisma/client";
import { BookCover } from "@/components/BookCover";
import { STATUS_LABEL, STATUS_STYLES } from "@/lib/status";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/estante/${book.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <BookCover coverUrl={book.coverUrl} title={book.title} />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span
          className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[book.status]}`}
        >
          {STATUS_LABEL[book.status]}
        </span>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink">
          {book.title}
        </h3>
        <p className="line-clamp-1 text-xs text-ink-soft">{book.author}</p>
      </div>
    </Link>
  );
}
