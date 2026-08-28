import { prisma } from "@/lib/prisma";

export async function getUserStats(userId: string) {
  const books = await prisma.book.findMany({ where: { userId } });

  const read = books.filter((b) => b.status === "LIDO");
  const ratings = read.filter((b) => b.rating != null).map((b) => b.rating!);
  const avgRating =
    ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : null;

  const monthsWithFinish = new Set(
    read
      .filter((b) => b.finishedAt)
      .map((b) => {
        const d = new Date(b.finishedAt!);
        return `${d.getFullYear()}-${d.getMonth()}`;
      })
  );

  let streak = 0;
  const cursor = new Date();
  while (true) {
    const key = `${cursor.getFullYear()}-${cursor.getMonth()}`;
    if (monthsWithFinish.has(key)) {
      streak += 1;
      cursor.setMonth(cursor.getMonth() - 1);
    } else {
      break;
    }
  }

  const now = new Date();
  const readThisYear = read.filter(
    (b) => b.finishedAt && new Date(b.finishedAt).getFullYear() === now.getFullYear()
  ).length;

  const byYear = new Map<number, number>();
  for (const b of read) {
    if (!b.finishedAt) continue;
    const year = new Date(b.finishedAt).getFullYear();
    byYear.set(year, (byYear.get(year) ?? 0) + 1);
  }

  return {
    totalBooks: books.length,
    totalRead: read.length,
    readThisYear,
    avgRating,
    streak,
    byYear: [...byYear.entries()].sort((a, b) => b[0] - a[0]),
  };
}
