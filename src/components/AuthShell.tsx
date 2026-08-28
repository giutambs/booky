import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl text-paper shadow-sm">
            📖
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            {title}
          </h1>
          <p className="mt-2 max-w-[280px] text-sm text-ink-soft">
            {subtitle}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
          {children}
        </div>

        <p className="mt-6 text-center text-sm text-ink-soft">{footer}</p>
      </div>
    </main>
  );
}

export function AuthLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="font-semibold text-brand hover:underline">
      {children}
    </Link>
  );
}
