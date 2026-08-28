import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeaderboardRow } from "@/components/leaderboard-row";
import { categoryBySlug, CATEGORIES } from "@/lib/categories";
import { getLeaderboard } from "@/lib/leaderboard";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/leaderboard/[category]">,
): Promise<Metadata> {
  const { category: slug } = await props.params;
  const category = categoryBySlug(slug);
  return { title: category ? category.name : "Leaderboard" };
}

export default async function LeaderboardPage(
  props: PageProps<"/leaderboard/[category]">,
) {
  const { category: slug } = await props.params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const { entries, isLive } = await getLeaderboard(slug);

  return (
    <main className="mx-auto max-w-[720px] px-4 py-10 sm:px-6 sm:py-14">
      <p className="mono text-[11.5px] font-medium tracking-[0.08em] text-[var(--ink-faint)] uppercase">
        {category.tagline}
      </p>
      <h1 className="mt-1.5 text-[1.9rem] font-semibold sm:text-[2.2rem]">
        {category.name}
      </h1>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--ink-faint)]">
        <span className="mono">resets every Monday, 00:00 UTC</span>
        {!isLive && (
          <span
            className="rounded-[3px] px-2 py-0.5 text-[11.5px] font-medium"
            style={{ background: "var(--secondary-soft)", color: "var(--secondary)" }}
          >
            demo data — bidding isn&apos;t live yet
          </span>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="mt-10 text-[14.5px] text-[var(--ink-soft)]">
          No templates listed in {category.name} yet.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-2">
          {entries.map((entry) => (
            <LeaderboardRow key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </main>
  );
}
