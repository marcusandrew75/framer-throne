import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RankBadge } from "@/components/rank-badge";
import { TemplateTile } from "@/components/template-tile";
import { categoryBySlug } from "@/lib/categories";
import { findDemoEntry } from "@/lib/demo-data";

export async function generateMetadata(
  props: PageProps<"/t/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const found = findDemoEntry(slug);
  return { title: found ? found.entry.title : "Template" };
}

export default async function TemplatePage(props: PageProps<"/t/[slug]">) {
  const { slug } = await props.params;
  const found = findDemoEntry(slug);
  if (!found) notFound();

  const { entry, categorySlug } = found;
  const category = categoryBySlug(categorySlug);

  return (
    <main className="mx-auto max-w-[560px] px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href={`/leaderboard/${categorySlug}`}
        className="mono text-[13px] text-[var(--ink-faint)]"
      >
        ← {category?.name ?? "leaderboard"}
      </Link>

      <div className="mt-5 flex items-center gap-4">
        <TemplateTile
          title={entry.title}
          thumbnailUrl={entry.thumbnailUrl}
          className="h-16 w-16 text-[22px]"
        />
        <div>
          <h1 className="text-[1.6rem] font-semibold">{entry.title}</h1>
          <p className="text-[14px] text-[var(--ink-faint)]">
            {entry.authorHandle}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <RankBadge rank={entry.rank} />
        <div>
          <div className="mono tabular text-[14px] font-medium">
            {entry.rank === 1 ? "Currently #1" : `Currently #${entry.rank}`} in{" "}
            {category?.name}
          </div>
          <div className="mono tabular text-[12.5px] text-[var(--ink-faint)]">
            ${entry.totalBidCents / 100} bid this round
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[3px] border border-[var(--line)] bg-[var(--surface)] p-4">
        <p className="text-[14px] leading-relaxed text-[var(--ink-soft)]">
          Bidding checkout isn&apos;t live yet — this is where you&apos;ll be
          able to put $1 or more behind {entry.title} and watch its rank move
          in real time.
        </p>
        <button
          type="button"
          disabled
          title="Coming soon"
          className="mt-4 w-full cursor-not-allowed rounded-[3px] border border-[var(--line-strong)] py-3 text-[14px] font-medium text-[var(--ink-faint)]"
        >
          Bid $1 — coming soon
        </button>
      </div>
    </main>
  );
}
