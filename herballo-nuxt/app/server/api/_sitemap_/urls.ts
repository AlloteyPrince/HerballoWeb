import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  )

  const { data: posts } = await client
    .from('blog_posts')
    .select('slug, updated_at')

  return (posts || []).map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.updated_at,
    changefreq: 'weekly',
    priority: 0.8,
  }))
})