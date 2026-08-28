"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { BookStatus } from "@prisma/client";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireUserId() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  return session.user.id;
}

async function requireOwnedBook(bookId: string, userId: string) {
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book || book.userId !== userId) {
    throw new Error("Livro não encontrado.");
  }
  return book;
}

export async function createBook(formData: FormData) {
  const userId = await requireUserId();

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const coverUrl = String(formData.get("coverUrl") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "QUERO_LER") as BookStatus;
  const totalPagesRaw = String(formData.get("totalPages") ?? "").trim();
  const totalPages = totalPagesRaw ? Number(totalPagesRaw) : null;

  if (!title || !author) {
    throw new Error("Título e autor(a) são obrigatórios.");
  }

  const book = await prisma.book.create({
    data: {
      title,
      author,
      coverUrl,
      status,
      totalPages: Number.isFinite(totalPages) ? totalPages : null,
      startedAt: status === "LENDO" ? new Date() : null,
      finishedAt: status === "LIDO" ? new Date() : null,
      userId,
    },
  });

  revalidatePath("/");
  revalidatePath("/estante");
  redirect(`/estante/${book.id}`);
}

export async function updateBookStatus(bookId: string, status: BookStatus) {
  const userId = await requireUserId();
  await requireOwnedBook(bookId, userId);

  const data: {
    status: BookStatus;
    startedAt?: Date;
    finishedAt?: Date | null;
    progress?: number;
  } = { status };

  if (status === "LENDO") {
    data.startedAt = new Date();
  }
  if (status === "LIDO") {
    data.finishedAt = new Date();
    data.progress = 100;
  } else {
    data.finishedAt = null;
  }

  await prisma.book.update({ where: { id: bookId }, data });

  revalidatePath("/");
  revalidatePath("/estante");
  revalidatePath(`/estante/${bookId}`);
}

export async function rateBook(bookId: string, rating: number) {
  const userId = await requireUserId();
  await requireOwnedBook(bookId, userId);

  const clamped = Math.min(5, Math.max(1, Math.round(rating)));
  await prisma.book.update({
    where: { id: bookId },
    data: { rating: clamped },
  });

  revalidatePath(`/estante/${bookId}`);
  revalidatePath("/perfil");
}

export async function addReadingLog(bookId: string, formData: FormData) {
  const userId = await requireUserId();
  const book = await requireOwnedBook(bookId, userId);

  const note = String(formData.get("note") ?? "").trim() || null;
  const mood = String(formData.get("mood") ?? "").trim() || null;
  const spoiler = formData.get("spoiler") === "on";
  const progressRaw = String(formData.get("progress") ?? "").trim();
  const progress = progressRaw ? Number(progressRaw) : null;

  await prisma.readingLog.create({
    data: {
      bookId,
      note,
      mood,
      spoiler,
      progress: progress !== null && Number.isFinite(progress) ? progress : null,
    },
  });

  if (progress !== null && Number.isFinite(progress)) {
    const clamped = Math.min(100, Math.max(0, Math.round(progress)));
    await prisma.book.update({
      where: { id: bookId },
      data: {
        progress: clamped,
        status: clamped >= 100 ? "LIDO" : "LENDO",
        startedAt: book.startedAt ?? new Date(),
        finishedAt: clamped >= 100 ? new Date() : null,
      },
    });
  }

  revalidatePath(`/estante/${bookId}`);
  revalidatePath("/");
  revalidatePath("/perfil");
}

export async function deleteBook(bookId: string) {
  const userId = await requireUserId();
  await requireOwnedBook(bookId, userId);

  await prisma.book.delete({ where: { id: bookId } });

  revalidatePath("/");
  revalidatePath("/estante");
  redirect("/estante");
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}
