export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const body = await readBody(event);

  if (!body?.title || !body?.content) {
    throw createError({ statusCode: 400, statusMessage: "Title and content are required" });
  }

  const supabase = useSupabaseAdmin();

  // Ensure the slug is unique — append -2, -3, ... on collision.
  const baseSlug = slugify(body.title);
  let slug = baseSlug;
  let suffix = 2;
  while (true) {
    const { data: existing } = await supabase.from("blog_posts").select("id").eq("slug", slug).maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${suffix++}`;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      slug,
      title: body.title,
      category: body.category || "General",
      excerpt: body.excerpt || "",
      content: body.content,
      cover_image: body.coverImage || null,
      author: body.author || "Herballo Team",
      date: body.date || new Date().toISOString().slice(0, 10),
      published: body.published ?? true,
    })
    .select()
    .single();

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return data;
});
