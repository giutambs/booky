"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Início", icon: "🏠" },
  { href: "/estante", label: "Estante", icon: "📚" },
  { href: "/estante/adicionar", label: "Adicionar", icon: "➕" },
  { href: "/perfil", label: "Perfil", icon: "👤" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-20 border-t border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-medium transition ${
                active ? "text-brand" : "text-ink-faint"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-base transition ${
                  active ? "bg-sage-soft" : ""
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
