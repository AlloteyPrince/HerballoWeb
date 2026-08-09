export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, date, category, author, excerpt, cover_image, published, created_at")
    .order("created_at", { ascending: false });

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return data;
});
