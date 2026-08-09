const EDITABLE_FIELDS = ["title", "category", "excerpt", "content", "author", "date", "published"] as const;

export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  const updates: Record<string, unknown> = {};
  for (const key of EDITABLE_FIELDS) {
    if (body[key] !== undefined) updates[key] = body[key];
  }
  if (body.coverImage !== undefined) updates.cover_image = body.coverImage;

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No fields to update" });
  }

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase.from("blog_posts").update(updates).eq("id", id).select().single();

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return data;
});
