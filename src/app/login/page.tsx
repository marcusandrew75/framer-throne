import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getCurrentUser, isSupabaseConfigured } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage(props: PageProps<"/login">) {
  const searchParams = await props.searchParams;
  const nextParam = searchParams?.next;
  const next = typeof nextParam === "string" ? nextParam : "/submit";

  const user = await getCurrentUser();
  if (user) redirect(next);

  return (
    <main className="mx-auto max-w-[420px] px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-[1.75rem] font-semibold">Sign in</h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--ink-soft)]">
        We&apos;ll email you a link — no password to remember.
      </p>

      <div className="mt-6">
        {isSupabaseConfigured() ? (
          <LoginForm next={next} />
        ) : (
          <div className="rounded-[3px] border border-[var(--line)] bg-[var(--surface)] p-5">
            <p className="text-[14.5px] leading-relaxed text-[var(--ink-soft)]">
              Sign-in isn&apos;t live yet — this project isn&apos;t connected
              to Supabase.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
