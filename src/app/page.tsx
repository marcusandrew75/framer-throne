import Link from "next/link";
import { FoxMascot } from "@/components/fox-mascot";
import { LeaderboardRow } from "@/components/leaderboard-row";
import { CATEGORIES } from "@/lib/categories";
import { DEMO_LEADERBOARDS } from "@/lib/demo-data";

const PREVIEW_ENTRIES = DEMO_LEADERBOARDS.saas.slice(0, 4);

export default function HomePage() {
  return (
    <main>
      {/* ---------- hero ---------- */}
      <section className="mx-auto max-w-[1160px] px-4 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-14">
          <div>
            <p className="mono mb-5 text-[12px] font-medium tracking-[0.1em] text-[var(--accent-deep)] uppercase">
              For Framer template authors
            </p>
            <h1 className="max-w-[19ch] text-[2.1rem] leading-[1.08] font-semibold tracking-tight sm:text-[2.75rem]">
              A fairer way to get your template discovered.
            </h1>
            <p className="mt-5 max-w-[46ch] text-[16.5px] leading-relaxed text-[var(--ink-soft)]">
              Bid $1 or more to rank your template — small bids get a real
              shot, not just the biggest budgets.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/leaderboard/saas"
                className="rounded-[3px] px-5 py-3 text-[14.5px] font-medium"
                style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
              >
                Browse the leaderboards
              </Link>
              <a
                href="#how-it-works"
                className="rounded-[3px] border border-[var(--line-strong)] px-5 py-3 text-[14.5px] font-medium text-[var(--ink)]"
              >
                How it works
              </a>
            </div>
            <Link
              href="/submit"
              className="mt-4 inline-block text-[13px] text-[var(--ink-faint)] hover:text-[var(--ink)]"
            >
              Got a template? Submit it →
            </Link>
          </div>

          <div className="rounded-[3px] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <span className="font-[family-name:var(--font-display)] text-[15px] font-semibold">
                SaaS — this week
              </span>
              <span className="mono text-[11.5px] text-[var(--ink-faint)] whitespace-nowrap">
                resets Mon 00:00 UTC
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {PREVIEW_ENTRIES.map((entry) => (
                <LeaderboardRow key={entry.slug} entry={entry} />
              ))}
            </div>
            <Link
              href="/leaderboard/saas"
              className="mt-4 inline-block text-[13.5px] font-medium"
              style={{ color: "var(--accent-deep)" }}
            >
              See the full board →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- how it works ---------- */}
      <section
        id="how-it-works"
        className="border-t border-[var(--line)] bg-[var(--surface)]"
      >
        <div className="mx-auto max-w-[1160px] px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-[1.5rem] font-semibold sm:text-[1.75rem]">
            How it works
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              {
                n: "01",
                title: "Submit once",
                body: "List your template — title, category, and a link to where people can buy it. It's free to submit, and you're eligible to be ranked right away.",
              },
              {
                n: "02",
                title: "Bid $1 or more",
                body: "Anyone can bid on any template — you boosting your own, or a fan backing a favorite. The more someone spends, the less each extra dollar moves the needle, so a $1 bid still counts.",
              },
              {
                n: "03",
                title: "Rank resets weekly",
                body: "Every Monday at 00:00 UTC, every category resets to zero — last week's bids don't carry over. There's always a fresh shot at #1.",
              },
            ].map((step) => (
              <div key={step.n}>
                <span className="mono text-[13px] text-[var(--accent-deep)]">
                  {step.n}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--ink-soft)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- categories ---------- */}
      <section className="mx-auto max-w-[1160px] px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-[1.5rem] font-semibold sm:text-[1.75rem]">
          Launch categories
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/leaderboard/${category.slug}`}
              className="flex items-center justify-between rounded-[3px] border border-[var(--line)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--line-strong)]"
            >
              <div>
                <div className="font-[family-name:var(--font-display)] text-[15.5px] font-semibold">
                  {category.name}
                </div>
                <div className="mono mt-0.5 text-[11.5px] text-[var(--ink-faint)] uppercase tracking-[0.04em]">
                  {category.tagline}
                </div>
              </div>
              <span className="mono text-[13px] text-[var(--accent-deep)]">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1160px] items-center gap-2 px-4 py-8 text-[13px] text-[var(--ink-faint)] sm:px-6">
          <FoxMascot className="h-5 w-5" />
          ThemeCrown
        </div>
      </footer>
    </main>
  );
}
