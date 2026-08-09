export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .order("common_name", { ascending: true });

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return data;
});
