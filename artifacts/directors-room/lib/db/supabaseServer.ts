import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export function supabaseServer() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, anonKey, {
    global: {
      headers: {
        "X-Client-Info": "directors-room",
      },
    },
    auth: {
      storageKey: "supabase-auth",
      storage: {
        getItem: (key) => cookieStore.get(key)?.value ?? null,
        setItem: () => {},
        removeItem: () => {},
      },
    },
  });
}
