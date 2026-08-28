const TILE_COUNT = 4;

function tileIndex(title: string) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  }
  return (hash % TILE_COUNT) + 1;
}

export function TemplateTile({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const i = tileIndex(title);

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-[3px] font-[family-name:var(--font-display)] font-semibold ${className ?? "h-11 w-11 text-[15px]"}`}
      style={{
        background: `var(--tile-${i}-bg)`,
        color: `var(--tile-${i}-ink)`,
      }}
      aria-hidden
    >
      {title.charAt(0).toUpperCase()}
    </div>
  );
}
