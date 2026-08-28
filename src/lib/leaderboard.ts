import { createClient } from "@/lib/supabase/server";
import { DEMO_LEADERBOARDS, type LeaderboardEntry } from "@/lib/demo-data";

export type LeaderboardResult = {
  entries: LeaderboardEntry[];
  /** false when this is placeholder content, e.g. Supabase isn't configured yet. */
  isLive: boolean;
};

/**
 * Live leaderboard for a category, falling back to demo content when
 * Supabase isn't configured or the query fails — so pages render correctly
 * before a project is wired up, rather than throwing.
 */
export async function getLeaderboard(
  categorySlug: string,
): Promise<LeaderboardResult> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { entries: DEMO_LEADERBOARDS[categorySlug] ?? [], isLive: false };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("current_leaderboard", {
      p_category_slug: categorySlug,
    });

    if (error || !data) {
      throw error ?? new Error("current_leaderboard returned no data");
    }

    return {
      entries: data.map((row) => ({
        rank: row.rank,
        slug: row.template_slug,
        title: row.title,
        // No profiles/username table yet — show a short id until authors
        // have a display name to fetch instead.
        authorHandle: `#${row.author_id.slice(0, 8)}`,
        totalBidCents: row.total_bid_cents,
        score: row.score,
        thumbnailUrl: row.thumbnail_url,
      })),
      isLive: true,
    };
  } catch {
    return { entries: DEMO_LEADERBOARDS[categorySlug] ?? [], isLive: false };
  }
}
