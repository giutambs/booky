import type { BookStatus } from "@prisma/client";

export const STATUS_LABEL: Record<BookStatus, string> = {
  QUERO_LER: "Quero ler",
  LENDO: "Lendo",
  LIDO: "Lido",
  ABANDONADO: "Abandonado",
};

export const STATUS_ORDER: BookStatus[] = [
  "LENDO",
  "QUERO_LER",
  "LIDO",
  "ABANDONADO",
];

export const STATUS_STYLES: Record<BookStatus, string> = {
  QUERO_LER: "bg-sage-soft text-brand-dark",
  LENDO: "bg-accent-soft text-accent",
  LIDO: "bg-brand text-paper",
  ABANDONADO: "bg-border text-ink-soft",
};
