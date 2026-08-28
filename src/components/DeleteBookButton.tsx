"use client";

import { useState, useTransition } from "react";
import { deleteBook } from "@/lib/actions";

export function DeleteBookButton({ bookId }: { bookId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-ink-soft">Remover da estante?</span>
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => deleteBook(bookId))}
          className="rounded-full bg-danger px-3 py-1 font-semibold text-paper disabled:opacity-60"
        >
          {isPending ? "Removendo..." : "Sim, remover"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded-full border border-border px-3 py-1 font-semibold text-ink-soft"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-xs font-semibold text-danger hover:underline"
    >
      Remover livro
    </button>
  );
}
