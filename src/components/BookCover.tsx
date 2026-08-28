export function BookCover({
  coverUrl,
  title,
  className = "",
}: {
  coverUrl: string | null;
  title: string;
  className?: string;
}) {
  if (coverUrl) {
    return (
      <img
        src={coverUrl}
        alt={`Capa de ${title}`}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-sage-soft to-brand-light/40 p-2 text-center font-display text-[11px] font-semibold leading-tight text-brand-dark ${className}`}
    >
      {title}
    </div>
  );
}
