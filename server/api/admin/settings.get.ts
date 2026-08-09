export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return data;
});
