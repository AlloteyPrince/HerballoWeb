const ALLOWED_FOLDERS = ["blog", "plants"] as const;

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const form = await readMultipartFormData(event);
  const file = form?.find((f) => f.name === "file");
  const folderField = form?.find((f) => f.name === "folder")?.data?.toString();
  const folder = (ALLOWED_FOLDERS as readonly string[]).includes(folderField || "") ? folderField : "blog";

  if (!file || !file.data?.length) {
    throw createError({ statusCode: 400, statusMessage: "No file provided" });
  }

  const supabase = useSupabaseAdmin();
  const ext = file.filename?.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from("images").upload(path, file.data, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });

  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return { url: data.publicUrl };
});
