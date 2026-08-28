"use client";

import { useState, useTransition } from "react";
import { rateBook } from "@/lib/actions";

export function Stars({
  bookId,
  rating,
}: {
  bookId: string;
  rating: number | null;
}) {
  const [value, setValue] = useState(rating ?? 0);
  const [hover, setHover] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const shown = hover ?? value;

  function pick(n: number) {
    setValue(n);
    startTransition(() => {
      rateBook(bookId, n);
    });
  }

  return (
    <div
      className={`flex gap-1 ${isPending ? "opacity-60" : ""}`}
      onMouseLeave={() => setHover(null)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => pick(n)}
          onMouseEnter={() => setHover(n)}
          aria-label={`Avaliar com ${n} estrela${n > 1 ? "s" : ""}`}
          className="text-2xl leading-none transition hover:scale-110"
        >
          <span className={n <= shown ? "text-accent" : "text-border"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}
