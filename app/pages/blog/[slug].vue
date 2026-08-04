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

        <!-- Right Side: Sticky Sidebar - 2 Cards -->
        <aside class="lg:sticky lg:top-8 space-y-6 w-full">

          <!-- Card 1: Author + Share -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            
            <!-- Author Section -->
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
            <div class="flex items-center gap-1.5 mb-6">
              <span class="text-xs text-gray-400">⏱️</span>
              <span class="text-xs font-medium text-gray-600">{{ estimateReadingTime(post.content) }} min read</span>
            </div>

            <hr class="border-gray-100 mb-6" />

            <!-- Share Section -->
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Share This Article</h4>
            <p class="text-xs text-gray-500 mb-4">Found this helpful? Share it with someone who needs it.</p>

            <div class="flex flex-col gap-3">

              <!-- WhatsApp -->
              <a
                :href="whatsappUrl"
                target="_blank"
                class="flex items-center gap-3 bg-[#25D366] text-white text-xs font-bold px-4 py-3 rounded-xl no-underline hover:bg-[#1ebe5d] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share on WhatsApp
              </a>

              <!-- Twitter/X -->
              <a
                :href="twitterUrl"
                target="_blank"
                class="flex items-center gap-3 bg-black text-white text-xs font-bold px-4 py-3 rounded-xl no-underline hover:bg-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Share on X
              </a>

              <!-- Facebook -->
              <a
                :href="facebookUrl"
                target="_blank"
                class="flex items-center gap-3 bg-[#1877F2] text-white text-xs font-bold px-4 py-3 rounded-xl no-underline hover:bg-[#1465d8] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Share on Facebook
              </a>

              <!-- Copy Link -->
              <button
                @click="copyLink"
                class="flex items-center gap-3 bg-gray-100 text-gray-700 text-xs font-bold px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {{ copied ? 'Link Copied!' : 'Copy Link' }}
              </button>

            </div>
          </div>

          <!-- Card 2: Consultation + Explore More -->
          <div class="bg-[#105212] rounded-2xl p-6 shadow-sm">

            <!-- Consultation Section -->
            <h4 class="text-xs font-bold text-green-300 uppercase tracking-wider mb-2">Clinical Guidance</h4>
            <h3 class="font-bold text-lg text-white leading-snug mb-2">Understand your health options</h3>
            <p class="text-sm text-green-100 mb-4 leading-relaxed">
              Want a deeper understanding of herbal remedies or personalized diagnostics for your wellness profile? Book a formal clinical assessment.
            </p>
            <NuxtLink
              to="/consultation"
              class="block text-center bg-white text-[#105212] text-xs font-bold px-4 py-3 rounded-xl no-underline hover:bg-green-50 transition-colors shadow-sm mb-6"
            >
              Schedule Consultation
            </NuxtLink>

            <hr class="border-green-800 mb-6" />

            <!-- Explore More Section -->
            <h4 class="text-xs font-bold text-green-300 uppercase tracking-wider mb-2">Explore More</h4>
            <h3 class="font-bold text-lg text-white leading-snug mb-2">More from Herballo</h3>
            <p class="text-sm text-green-100 mb-4 leading-relaxed">
              Discover more articles on herbal medicine, natural wellness, and plant-based health from our growing library.
            </p>
            <NuxtLink
              to="/blog"
              class="block text-center border-2 border-white text-white text-xs font-bold px-4 py-3 rounded-xl no-underline hover:bg-white hover:text-[#105212] transition-colors"
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
import { computed, ref } from 'vue'

const supabase = useSupabaseClient()
const route = useRoute()
const copied = ref(false)

const { data: post, pending } = await useAsyncData(`blog-${route.params.slug}`, async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', route.params.slug)
    .single()

  if (error) return null
  return data
})

const pageUrl = computed(() => {
  if (process.client) return window.location.href
  return `https://herballo.co/blog/${route.params.slug}`
})

const whatsappUrl = computed(() => {
  const text = `Check out this article from Herballo: ${post.value?.title}\n\n${pageUrl.value}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
})

const twitterUrl = computed(() => {
  const text = `${post.value?.title} — via @Herballo\n\n${pageUrl.value}`
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
})

const facebookUrl = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl.value)}`
})

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(pageUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    console.error('Failed to copy link')
  }
}

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