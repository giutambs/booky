"use client";

import { useState, useTransition } from "react";
import type { BookStatus } from "@prisma/client";
import { updateBookStatus } from "@/lib/actions";
import { STATUS_LABEL, STATUS_STYLES } from "@/lib/status";

const OPTIONS: BookStatus[] = ["QUERO_LER", "LENDO", "LIDO", "ABANDONADO"];

export function StatusMenu({
  bookId,
  status,
}: {
  bookId: string;
  status: BookStatus;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function choose(next: BookStatus) {
    setOpen(false);
    startTransition(() => {
      updateBookStatus(bookId, next);
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${STATUS_STYLES[status]} ${isPending ? "opacity-60" : ""}`}
      >
        {STATUS_LABEL[status]}
        <span className="text-[10px]">▾</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full z-20 mt-1.5 w-40 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
            {OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => choose(opt)}
                className={`block w-full px-3.5 py-2.5 text-left text-sm transition hover:bg-sage-soft ${
                  opt === status ? "font-semibold text-brand" : "text-ink"
                }`}
              >
                {STATUS_LABEL[opt]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
