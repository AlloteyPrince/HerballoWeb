import { createClient } from "@supabase/supabase-js";

let client: ReturnType<typeof createClient> | null = null;

/**
 * Service-role Supabase client for server routes only. Bypasses RLS —
 * never import this from client-side code or return it to the browser.
 */
export function useSupabaseAdmin() {
  if (client) return client;

  const config = useRuntimeConfig();
  const url = process.env.SUPABASE_URL;
  const serviceKey = config.supabaseServiceRoleKey;

  if (!url || !serviceKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Server is missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
    });
  }

  client = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return client;
}
