export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const supabase = useSupabaseAdmin();

  const [postsTotal, postsPublished, plantsTotal, bookingsTotal, subscribersTotal, subscribersActive, categoryRows] =
    await Promise.all([
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
      supabase.from("plants").select("*", { count: "exact", head: true }),
      supabase.from("bookings").select("*", { count: "exact", head: true }),
      supabase.from("subscribers").select("*", { count: "exact", head: true }),
      supabase.from("subscribers").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("blog_posts").select("category"),
    ]);

  // Blog post `category` is sometimes a comma-separated list of topics rather
  // than a single value — split and tally each topic, then keep the top 6
  // and fold the rest into "Other" so the chart never exceeds a readable
  // number of bars.
  const tagCounts: Record<string, number> = {};
  for (const row of categoryRows.data || []) {
    const raw = (row.category as string) || "";
    for (const tag of raw.split(",").map((t) => t.trim()).filter(Boolean)) {
      // Normalize casing so e.g. "Clinical safety" and "Clinical Safety" merge.
      const key = tag.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
      tagCounts[key] = (tagCounts[key] || 0) + 1;
    }
  }

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  const topTags = sortedTags.slice(0, 6);
  const otherCount = sortedTags.slice(6).reduce((sum, [, count]) => sum + count, 0);
  const postsByTopic = [...topTags, ...(otherCount > 0 ? [["Other", otherCount] as [string, number]] : [])].map(
    ([label, count]) => ({ label, count })
  );

  return {
    blogPosts: { total: postsTotal.count || 0, published: postsPublished.count || 0 },
    plants: plantsTotal.count || 0,
    bookings: bookingsTotal.count || 0,
    subscribers: { total: subscribersTotal.count || 0, active: subscribersActive.count || 0 },
    postsByTopic,
  };
});
