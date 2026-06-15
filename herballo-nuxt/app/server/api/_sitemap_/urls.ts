import { createClient } from '@supabase/supabase-js'
import { defineSitemapEventHandler, asSitemapUrl } from '#sitemap/server'

export default defineSitemapEventHandler(async () => {
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  )

  // Fetch all published blog posts
  const { data: blogs } = await client
    .from('blogs') // 👈 change to your actual table name
    .select('slug, updated_at')
    .eq('published', true) // 👈 remove this if you don't have a published column

  return [
    ...(blogs || []).map((post) =>
      asSitemapUrl({
        loc: `/blog/${post.slug}`,
        lastmod: post.updated_at,
        changefreq: 'weekly',
        priority: 0.8,
      })
    ),
  ]
})