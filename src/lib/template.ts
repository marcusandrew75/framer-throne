import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/auth";
import { getLeaderboard } from "@/lib/leaderboard";
import { findDemoEntry, type LeaderboardEntry } from "@/lib/demo-data";

export type TemplateLookup = {
  entry: LeaderboardEntry;
  categorySlug: string;
  isLive: boolean;
};

/**
 * Looks a template up by slug for the profile page — demo data first (so
 * the seeded examples keep working), then the real database. A freshly
 * submitted template has no bids yet, but it still shows up here: the
 * `leaderboard` view includes every template in its category at score 0.
 */
export async function getTemplateBySlug(
  slug: string,
): Promise<TemplateLookup | null> {
  const demo = findDemoEntry(slug);
  if (demo) return { ...demo, isLive: false };

  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();

    const { data: templateRow } = await supabase
      .from("templates")
      .select("category_id")
      .eq("slug", slug)
      .maybeSingle();
    if (!templateRow) return null;

    const { data: categoryRow } = await supabase
      .from("categories")
      .select("slug")
      .eq("id", templateRow.category_id)
      .maybeSingle();
    if (!categoryRow) return null;

    const { entries } = await getLeaderboard(categoryRow.slug);
    const entry = entries.find((e) => e.slug === slug);
    if (!entry) return null;

    return { entry, categorySlug: categoryRow.slug, isLive: true };
  } catch {
    return null;
  }
}
