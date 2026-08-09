/** Calls an /api/admin/** route with the current Supabase session's access token attached. */
export async function adminFetch<T = unknown>(url: string, options: Record<string, unknown> = {}): Promise<T> {
  const supabase = useSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  return $fetch<T>(url, {
    ...options,
    headers: {
      ...((options.headers as Record<string, string>) || {}),
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
}
