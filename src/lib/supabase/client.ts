"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase cote navigateur. A utiliser dans les Client Components
 * (formulaires de connexion, inscription, mot de passe oublie, etc.).
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
