# Framer Throne

A pay-to-rank leaderboard for Framer template authors, built so a $1 bid
still moves the needle. See the [MVP spec](https://claude.ai/code/artifact/85a468a2-04c9-45a8-a2c6-06ef36da83b6)
for the full product design — this README only covers running the code.

## Stack

Next.js (App Router, TypeScript, Tailwind v4) · Supabase (Postgres + Auth) · Stripe

## Setup

1. Create a Supabase project (a free/dev one is fine to start).
2. Copy `.env.example` to `.env.local` and fill in the Supabase and Stripe
   keys from your project's dashboards. Use Stripe **test-mode** keys
   (`sk_test_...` / `pk_test_...`) until you're ready to take real payments.
3. Run the migrations against your Supabase project (via the SQL editor,
   or the Supabase CLI: `supabase db push`), in order:
   - `supabase/migrations/0001_init.sql` — schema: categories, templates,
     rounds, bids, and the RLS policies that let a user bid or list a
     template only as themself.
   - `supabase/migrations/0002_ranking.sql` — the log-curve ranking views
     and the `current_leaderboard(category_slug)` function the app queries.
   - `supabase/seed.sql` — the five launch categories.
4. `npm install`
5. `npm run dev` and open http://localhost:3000

## How ranking works

Score is `ln(1 + total_bid_cents / 100)`, not raw dollars — see the spec's
"Ranking algorithm" section for why. Rounds are weekly (Monday 00:00 UTC)
and created lazily by `ensure_current_round()` the first time anyone bids
or views a category that week — there's no cron job to run.

## What's here vs. what's next

This scaffold covers the schema, the ranking function (both verified
against a real Postgres instance — see the migrations' inline comments),
and the Supabase client wiring (`src/lib/supabase/`, `src/proxy.ts`). The
actual pages from the spec — leaderboard, template profile, submit form,
bid checkout, author/founder dashboards — aren't built yet.
