import { auth } from "@/lib/auth";
import { getUserStats } from "@/lib/stats";
import { logout } from "@/lib/actions";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function ProfilePage() {
  const session = await auth();
  const user = session!.user;
  const stats = await getUserStats(user.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-xl font-semibold text-paper">
          {initials(user.name ?? "")}
        </div>
        <div>
          <h1 className="font-display text-lg font-semibold text-ink">
            {user.name}
          </h1>
          <p className="text-sm text-ink-soft">{user.email}</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-display text-sm font-semibold text-ink">
          Suas estatísticas
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Stat value={stats.totalRead} label="livros lidos" />
          <Stat value={stats.readThisYear} label="lidos este ano" />
          <Stat value={stats.streak} label="meses seguidos lendo" />
          <Stat
            value={stats.avgRating ? stats.avgRating.toFixed(1) : "–"}
            label="nota média dada"
          />
        </div>
      </div>

      {stats.byYear.length > 0 && (
        <div>
          <h2 className="mb-3 font-display text-sm font-semibold text-ink">
            Livros por ano
          </h2>
          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4">
            {stats.byYear.map(([year, count]) => {
              const max = stats.byYear[0][1];
              return (
                <div key={year} className="flex items-center gap-3">
                  <span className="w-12 text-xs font-semibold text-ink-soft">
                    {year}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-sage-soft">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${(count / max) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs font-semibold text-ink">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <form action={logout}>
        <button
          type="submit"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-danger transition hover:bg-danger/5"
        >
          Sair da conta
        </button>
      </form>
    </div>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-2xl border border-border bg-surface py-5">
      <span className="font-display text-2xl font-semibold text-brand">
        {value}
      </span>
      <span className="text-center text-xs leading-tight text-ink-soft">
        {label}
      </span>
    </div>
  );
}
