export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const body = await readBody(event);

  if (!body?.commonName || !body?.scientificName) {
    throw createError({ statusCode: 400, statusMessage: "Common name and scientific name are required" });
  }

  const supabase = useSupabaseAdmin();

  const baseId = slugify(`${body.commonName} ${body.scientificName}`).replace(/-/g, "_");
  let id = baseId;
  let suffix = 2;
  while (true) {
    const { data: existing } = await supabase.from("plants").select("id").eq("id", id).maybeSingle();
    if (!existing) break;
    id = `${baseId}_${suffix++}`;
  }

  const { data, error } = await supabase
    .from("plants")
    .insert({
      id,
      common_name: body.commonName,
      other_common_names: body.otherCommonNames || [],
      scientific_name: body.scientificName,
      family: body.family || null,
      image_url: body.imageUrl || [],
      tagline: body.tagline || "",
      primary_health_benefits: body.primaryHealthBenefits || [],
      key_active_compounds: body.keyActiveCompounds || [],
      common_preparations: body.commonPreparations || [],
      specific_warnings: body.specificWarnings || [],
      additional_info: body.additionalInfo || "",
      read_more_link: body.readMoreLink || "",
    })
    .select()
    .single();

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return data;
});
