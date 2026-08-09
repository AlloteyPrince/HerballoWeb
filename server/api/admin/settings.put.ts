const EDITABLE_FIELDS = ["youtube_url", "linkedin_url", "tiktok_url", "twitter_url", "contact_email"] as const;

export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const body = await readBody(event);

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const key of EDITABLE_FIELDS) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase.from("site_settings").update(updates).eq("id", 1).select().single();

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return data;
});
