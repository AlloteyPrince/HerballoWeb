<template>
  <div class="bg-[#fdfdfb] min-h-screen py-12 px-4">
    <div class="max-w-6xl mx-auto">

      <header class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-[#105212]">Herballo Blog</h1>
        <p class="text-gray-500 text-lg mt-2">Natural wisdom, herbal knowledge, and wellness insights.</p>
      </header>

      <div v-if="pending" class="text-center py-16 text-gray-500">
        <p>Loading posts...</p>
      </div>

      <div v-else-if="error" class="text-center py-16 text-gray-500">
        <p>Failed to load posts. Please try again.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 no-underline text-inherit block"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              :src="post.cover_image"
              :alt="post.title"
              class="w-full h-full object-cover"
              @error="(e) => (e.target.src = 'https://vhyzuqcthnpqrrtfxeyj.supabase.co/storage/v1/object/public/images/blog/placeholder.jpg')"
            />
            <span class="absolute top-3 left-3 bg-[#105212] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {{ post.category }}
            </span>
          </div>
          <div class="p-6">
            <p class="text-xs text-gray-400 mb-2">{{ formatDate(post.date) }}</p>
            <h2 class="text-lg font-bold text-gray-900 mb-3 leading-snug">{{ post.title }}</h2>
            <p class="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{{ post.excerpt }}</p>
            <span class="text-sm text-[#105212] font-semibold">Read more →</span>
          </div>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const { data: posts, pending, error } = await useAsyncData('blog_posts', async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, date, category, excerpt, cover_image')
    .order('date', { ascending: false })
  if (error) throw error
  return data
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

useHead({
  title: 'Blog | Herballo',
  meta: [{ name: 'description', content: 'Herbal medicine insights and natural wellness articles from Herballo.' }],
})
</script>