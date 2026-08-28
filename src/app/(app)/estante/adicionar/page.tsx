import Link from "next/link";
import { createBook } from "@/lib/actions";
import { STATUS_LABEL } from "@/lib/status";

const inputClass =
  "w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-ink-soft";

export default function AddBookPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Link
          href="/estante"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-sage-soft"
          aria-label="Voltar"
        >
          ←
        </Link>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Adicionar livro
        </h1>
      </div>

      <form action={createBook} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className={labelClass}>
            Título
          </label>
          <input
            id="title"
            name="title"
            required
            className={inputClass}
            placeholder="Nome do livro"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="author" className={labelClass}>
            Autor(a)
          </label>
          <input
            id="author"
            name="author"
            required
            className={inputClass}
            placeholder="Nome do autor(a)"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="coverUrl" className={labelClass}>
            Capa (URL) <span className="normal-case font-normal">— opcional</span>
          </label>
          <input
            id="coverUrl"
            name="coverUrl"
            type="url"
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="totalPages" className={labelClass}>
            Páginas <span className="normal-case font-normal">— opcional</span>
          </label>
          <input
            id="totalPages"
            name="totalPages"
            type="number"
            min={1}
            inputMode="numeric"
            className={inputClass}
            placeholder="Ex: 320"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select id="status" name="status" defaultValue="QUERO_LER" className={inputClass}>
            {Object.entries(STATUS_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-paper transition hover:bg-brand-dark"
        >
          Adicionar à estante
        </button>
      </form>
    </div>
  );
}
