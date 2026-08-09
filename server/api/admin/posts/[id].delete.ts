export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const id = getRouterParam(event, "id");

  const supabase = useSupabaseAdmin();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return { success: true };
});
