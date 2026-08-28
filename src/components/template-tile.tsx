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
  thumbnailUrl,
  className,
}: {
  title: string;
  /** Real screenshot, when a template has one — falls back to the brand
   * monogram tile otherwise (true for every demo entry today). */
  thumbnailUrl?: string | null;
  className?: string;
}) {
  const sizeClasses = className ?? "h-11 w-11 text-[15px]";

  if (thumbnailUrl) {
    // Arbitrary external author-supplied URLs — not worth wiring up
    // next/image's remotePatterns allowlist for a fallback path.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={thumbnailUrl}
        alt=""
        className={`shrink-0 rounded-[3px] object-cover ${sizeClasses}`}
      />
    );
  }

  const i = tileIndex(title);

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-[3px] font-[family-name:var(--font-display)] font-semibold ${sizeClasses}`}
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
