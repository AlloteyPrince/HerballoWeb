import { createClient } from "@supabase/supabase-js";
import type { H3Event } from "h3";

/**
 * Verifies the request's Supabase bearer token and checks the signed-in
 * user's email against the ADMIN_EMAILS allowlist. Throws 401/403 otherwise.
 * Every admin write route must call this before touching the database.
 */
export async function requireAdmin(event: H3Event) {
  const authHeader = getHeader(event, "authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Missing auth token" });
  }

  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_KEY;
  if (!url || !anonKey) {
    throw createError({ statusCode: 500, statusMessage: "Server is missing Supabase credentials" });
  }

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user?.email) {
    throw createError({ statusCode: 401, statusMessage: "Invalid or expired session" });
  }

  const config = useRuntimeConfig();
  const allowlist = (config.adminEmails || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!allowlist.includes(data.user.email.toLowerCase())) {
    throw createError({ statusCode: 403, statusMessage: "This account is not authorized for admin access" });
  }

  return data.user;
}
