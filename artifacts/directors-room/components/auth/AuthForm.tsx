"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/db/supabaseClient";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fn =
      mode === "login"
        ? supabaseBrowser.auth.signInWithPassword({ email, password })
        : supabaseBrowser.auth.signUp({ email, password });

    const { error } = await fn;
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    router.push("/studio");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <div>
        <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-ink border border-line px-3 py-2.5 text-sm text-white outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
          Password
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-ink border border-line px-3 py-2.5 text-sm text-white outline-none focus:border-accent"
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 rounded-full bg-white text-ink text-sm font-medium hover:bg-gold transition-colors disabled:opacity-50"
      >
        {loading ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
      </button>
    </form>
  );
}
