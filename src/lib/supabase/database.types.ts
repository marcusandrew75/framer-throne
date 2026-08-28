// Hand-written to match supabase/migrations/0001_init.sql and 0002_ranking.sql.
// Once the project is linked to a real Supabase instance, regenerate with:
//   supabase gen types typescript --project-id <id> > src/lib/supabase/database.types.ts
// and this file (plus this comment) goes away.

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      templates: {
        Row: {
          id: string;
          author_id: string;
          category_id: string;
          slug: string;
          title: string;
          url: string;
          thumbnail_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          category_id: string;
          slug: string;
          title: string;
          url: string;
          thumbnail_url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["templates"]["Insert"]>;
      };
      rounds: {
        Row: {
          id: string;
          category_id: string;
          starts_at: string;
          ends_at: string;
          created_at: string;
        };
        // No Insert type exported deliberately — rounds are only ever
        // created through the `ensure_current_round` RPC, never a direct
        // table insert (see 0001_init.sql: no insert policy on rounds).
        Update: never;
      };
      bids: {
        Row: {
          id: string;
          template_id: string;
          round_id: string;
          user_id: string;
          amount_cents: number;
          stripe_payment_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          template_id: string;
          round_id: string;
          user_id: string;
          amount_cents: number;
          stripe_payment_id: string;
          created_at?: string;
        };
        // Bids are immutable and non-refundable by design — no Update type.
        Update: never;
      };
    };
    Views: {
      template_round_scores: {
        Row: {
          template_id: string;
          round_id: string;
          total_bid_cents: number;
          score: number;
          first_bid_at: string | null;
        };
      };
      leaderboard: {
        Row: {
          template_id: string;
          template_slug: string;
          title: string;
          thumbnail_url: string | null;
          author_id: string;
          category_id: string;
          category_slug: string;
          round_id: string;
          starts_at: string;
          ends_at: string;
          total_bid_cents: number;
          score: number;
          first_bid_at: string | null;
          rank: number;
        };
      };
    };
    Functions: {
      ensure_current_round: {
        Args: { p_category_id: string };
        Returns: string;
      };
      current_leaderboard: {
        Args: { p_category_slug: string };
        Returns: Database["public"]["Views"]["leaderboard"]["Row"][];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
