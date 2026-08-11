import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Client Supabase cote serveur. A utiliser dans les Server Components et
 * les Route Handlers pour lire/ecrire des donnees en respectant les
 * politiques RLS de l'utilisateur authentifie (voir supabase/policies.sql).
 */
export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}

/**
 * Client Supabase avec la cle de service (droits eleves). Reserve aux
 * operations serveur sensibles (veille automatisee, taches planifiees).
 * Ne jamais exposer cette cle au navigateur.
 */
export function createSupabaseServiceRoleClient() {
  const { createClient } = require("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
