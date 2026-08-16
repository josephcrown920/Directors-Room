import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const unconfiguredAuth = {
  async signInWithPassword() {
    return {
      error: new Error(
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      ),
    };
  },
  async signUp() {
    return {
      error: new Error(
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      ),
    };
  },
};

export const supabaseBrowser =
  url && anonKey
    ? createClient(url, anonKey)
    : {
        auth: unconfiguredAuth,
      };
