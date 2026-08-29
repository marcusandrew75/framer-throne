export function FoxMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="ThemeCrown"
    >
      {/* head */}
      <path
        d="M32,56 L12,34 L4,6 L24,24 L32,18 L40,24 L60,6 L52,34 Z"
        fill="var(--tile-4-ink)"
      />
      {/* inner ears */}
      <path d="M10,12 L20,20 L11,24 Z" fill="var(--tile-4-bg)" />
      <path d="M54,12 L44,20 L53,24 Z" fill="var(--tile-4-bg)" />
      {/* muzzle */}
      <ellipse cx="32" cy="42" rx="13" ry="12" fill="var(--tile-4-bg)" />
      {/* eyes */}
      <circle cx="24" cy="34" r="2.4" fill="var(--ink)" />
      <circle cx="40" cy="34" r="2.4" fill="var(--ink)" />
      {/* nose */}
      <path d="M29,50 L35,50 L32,54 Z" fill="var(--ink)" />
      {/* crown */}
      <path
        d="M20,20 L20,14 L24,4 L28,12 L32,2 L36,12 L40,4 L44,14 L44,20 Z"
        fill="var(--accent)"
      />
    </svg>
  );
}
