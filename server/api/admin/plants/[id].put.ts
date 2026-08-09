const FIELD_MAP: Record<string, string> = {
  commonName: "common_name",
  otherCommonNames: "other_common_names",
  scientificName: "scientific_name",
  family: "family",
  imageUrl: "image_url",
  tagline: "tagline",
  primaryHealthBenefits: "primary_health_benefits",
  keyActiveCompounds: "key_active_compounds",
  commonPreparations: "common_preparations",
  specificWarnings: "specific_warnings",
  additionalInfo: "additional_info",
  readMoreLink: "read_more_link",
};

export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  const updates: Record<string, unknown> = {};
  for (const [key, column] of Object.entries(FIELD_MAP)) {
    if (body[key] !== undefined) updates[column] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No fields to update" });
  }

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase.from("plants").update(updates).eq("id", id).select().single();

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return data;
});
