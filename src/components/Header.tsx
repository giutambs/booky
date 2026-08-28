import { logout } from "@/lib/actions";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Header({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-paper">
            📖
          </div>
          <span className="font-display text-base font-semibold text-ink">
            Booky
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-soft text-xs font-semibold text-brand-dark">
            {initials(name)}
          </div>
          <form action={logout}>
            <button
              type="submit"
              title="Sair"
              aria-label="Sair"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-sage-soft hover:text-brand-dark"
            >
              ⏻
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
