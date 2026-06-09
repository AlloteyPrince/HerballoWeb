<template>
  <div class="bg-[#fdfdfb] min-h-screen py-12 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- Back Navigation -->
      <div class="mb-8">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center text-sm font-semibold text-[#105212] hover:underline no-underline"
        >
          ← Back to Herballo Blog
        </NuxtLink>
      </div>

      <!-- Loading state -->
      <div v-if="pending" class="text-center py-24 text-gray-500">
        <p class="text-lg">Reading natural wisdom...</p>
      </div>

      <!-- Post found -->
      <article v-else-if="post" class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

        <!-- Left Side: Main Content -->
        <div class="lg:col-span-2">
          <header class="mb-8">
            <div class="flex items-center flex-wrap gap-3 mb-4 text-xs">
              <span class="bg-[#105212] text-white font-semibold px-3 py-1 rounded-full">
                {{ post.category }}
              </span>
              <span class="text-gray-400">
                {{ formatDate(post.date) }}
              </span>
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {{ post.title }}
            </h1>
            <p v-if="post.excerpt" class="text-lg text-gray-500 mt-4 font-normal leading-relaxed italic border-l-4 border-[#105212] pl-4">
              {{ post.excerpt }}
            </p>
          </header>

          <!-- Cover Image -->
          <div class="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg mb-12">
            <img
              :src="post.cover_image"
              :alt="post.title"
              class="w-full h-full object-cover"
              @error="(e) => (e.target.src = 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800')"
            />
          </div>

          <!-- Rendered Content Body -->
          <div
            class="prose prose-emerald max-w-none text-gray-800 leading-relaxed space-y-6 text-base sm:text-lg"
            v-html="renderedContent"
          ></div>
        </div>

        <!-- Right Side: Sticky Sidebar -->
        <aside class="lg:sticky lg:top-8 space-y-6 w-full">

          <!-- Author & Metadata Card -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Author & Date</h4>
            <div class="flex items-center gap-3 mb-4">
              <div class="h-10 w-10 rounded-full bg-[#105212]/10 flex items-center justify-center text-[#105212] font-bold">
                {{ post.author ? post.author[0] : 'H' }}
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ post.author || 'Herballo Team' }}</p>
                <p class="text-xs text-gray-400">Published {{ formatDate(post.date) }}</p>
              </div>
            </div>
            <hr class="border-gray-100 my-4" />
            <span class="text-xs text-gray-400 block mb-1">Reading Depth</span>
            <span class="text-xs font-medium text-gray-600 flex items-center gap-1.5">
              ⏱️ {{ estimateReadingTime(post.content) }} min read
            </span>
          </div>

          <!-- Consultation Card - Green background -->
          <div class="bg-[#105212] rounded-2xl p-6 shadow-sm">
            <h4 class="text-xs font-bold text-green-300 uppercase tracking-wider mb-2">Clinical Guidance</h4>
            <h3 class="font-bold text-lg text-white leading-snug mb-2">Understand your health options</h3>
            <p class="text-sm text-green-100 mb-4 leading-relaxed">
              Want a deeper understanding of herbal remedies or personalized diagnostics for your wellness profile? Book a formal clinical assessment.
            </p>
            <NuxtLink
              to="/consultation"
              class="block text-center bg-white text-[#105212] text-xs font-bold px-4 py-3 rounded-xl no-underline hover:bg-green-50 transition-colors shadow-sm"
            >
              Schedule Consultation
            </NuxtLink>
          </div>

          <!-- Explore More Card - Light green tint background -->
          <div class="bg-[#f0f7f0] rounded-2xl p-6 border border-[#105212]/10">
            <h4 class="text-xs font-bold text-[#105212] uppercase tracking-wider mb-2">Explore More</h4>
            <h3 class="font-bold text-lg text-gray-900 leading-snug mb-2">More from Herballo</h3>
            <p class="text-sm text-gray-500 mb-4 leading-relaxed">
              Discover more articles on herbal medicine, natural wellness, and plant-based health from our growing library.
            </p>
            <NuxtLink
              to="/blog"
              class="block text-center border-2 border-[#105212] text-[#105212] text-xs font-bold px-4 py-3 rounded-xl no-underline hover:bg-[#105212] hover:text-white transition-colors"
            >
              Browse All Articles →
            </NuxtLink>
          </div>

        </aside>
      </article>

      <!-- Post not found -->
      <div v-else class="text-center py-24 text-gray-500">
        <p class="text-lg mb-4">Post not found.</p>
        <NuxtLink to="/blog" class="text-[#105212] font-semibold hover:underline">← Back to Blog</NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const supabase = useSupabaseClient()
const route = useRoute()

const { data: post, pending } = await useAsyncData(`blog-${route.params.slug}`, async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', route.params.slug)
    .single()

  if (error) return null
  return data
})

const renderedContent = computed(() => {
  if (!post.value?.content) return ''

  let html = post.value.content

  html = html.replace(/```json/g, '')
  html = html.replace(/```/g, '')

  return html
    .split(/\n\n+/)
    .map(block => {
      block = block.trim()
      if (!block) return ''

      if (block.startsWith('## ')) {
        return `<h2>${block.replace('## ', '')}</h2>`
      }
      if (block.startsWith('### ')) {
        return `<h3>${block.replace('### ', '')}</h3>`
      }

      block = block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      block = block.replace(/\n/g, '<br/>')

      return `<p>${block}</p>`
    })
    .join('\n')
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const estimateReadingTime = (content) => {
  if (!content) return 1
  const cleanText = content.replace(/<\/?[^>]+(>|$)/g, '')
  const words = cleanText.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 225))
}

useHead({
  title: post.value ? `${post.value.title} | Herballo` : 'Post Not Found | Herballo',
  meta: [{ name: 'description', content: post.value?.excerpt || '' }],
})
</script>

<style scoped>
.prose :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #105212;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}
.prose :deep(h3) {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}
.prose :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.85;
  color: #374151;
}
.prose :deep(strong) {
  font-weight: 700;
  color: #111827;
}
.prose :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}
.prose :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.75;
}
.prose :deep(br) {
  display: block;
  margin: 0.2rem 0;
}
</style>