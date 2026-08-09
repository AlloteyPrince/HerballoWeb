export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const id = getRouterParam(event, "id");

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();

  if (error) throw createError({ statusCode: 404, statusMessage: "Post not found" });
  return data;
});
