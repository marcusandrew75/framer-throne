import Link from "next/link";
import { CrownMark } from "./crown-mark";
import { CATEGORIES } from "@/lib/categories";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1160px] items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-[family-name:var(--font-display)] text-[17px] font-semibold tracking-tight"
        >
          <CrownMark className="h-5 w-5 text-[var(--accent)]" />
          Framer Throne
        </Link>

        <nav
          aria-label="Categories"
          className="no-scrollbar flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto"
        >
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/leaderboard/${category.slug}`}
              className="shrink-0 whitespace-nowrap rounded-[3px] border border-transparent px-3 py-2 text-[13.5px] font-medium text-[var(--ink-soft)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
