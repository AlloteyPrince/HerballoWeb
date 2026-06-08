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
        
        <!-- Left Side: Main Content (Spans 2 columns on large screens) -->
        <div class="lg:col-span-2">
          <!-- Meta Header -->
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

          <!-- Cinematic Cover Image -->
          <div class="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg mb-12">
            <img
              :src="post.cover_image"
              :alt="post.title"
              class="w-full h-full object-cover"
              @error="(e) => (e.target.src = 'https://vhyzuqcthnpqrrtfxeyj.supabase.co/storage/v1/object/public/images/blog/placeholder.jpg')"
            />
          </div>

          <!-- Rendered HTML Content Body -->
          <div 
            class="prose prose-emerald max-w-none text-gray-800 leading-relaxed space-y-6 text-base sm:text-lg"
            v-html="post.content"
          ></div>
        </div>

        <!-- Right Side: Sticky Sidebar (Spans 1 column, pins on scroll) -->
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
            <!-- Replaced duplicated category badge with Reading Insights -->
            <span class="text-xs text-gray-400 block mb-1">Reading Depth</span>
            <span class="text-xs font-medium text-gray-600 flex items-center gap-1.5">
              ⏱️ {{ estimateReadingTime(post.content) }} min read
            </span>
          </div>

          <!-- New Feature: Personalized Health Consultation Card -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Clinical Guidance</h4>
            <h3 class="font-bold text-lg text-gray-900 leading-snug mb-2">Understand your health options</h3>
            <p class="text-sm text-gray-500 mb-4 leading-relaxed">
              Want a deeper understanding of herbal remedies or personalized diagnostics for your wellness profile? Book a formal clinical assessment.
            </p>
            <NuxtLink to="/consultation" class="block text-center bg-[#105212] text-white text-xs font-bold px-4 py-3 rounded-xl no-underline hover:bg-[#0a360b] transition-colors shadow-sm">
              Schedule Consultation
            </NuxtLink>
          </div>

          <!-- Quick Return Action Card -->
          <div class="bg-gradient-to-br from-[#105212] to-[#0a360b] rounded-2xl p-6 text-white shadow-md">
            <h4 class="font-bold text-lg mb-2">Looking for remedies?</h4>
            <p class="text-sm text-green-100/80 mb-4 leading-relaxed">Head back to our library hub to search through more clinical plant diagnostics and wellness research.</p>
            <NuxtLink to="/blog" class="inline-block bg-white text-[#105212] text-xs font-bold px-4 py-2 rounded-xl no-underline hover:bg-gray-50 transition-colors">
              Explore More Articles
            </NuxtLink>
          </div>
        </aside>

      </article>

      <!-- Post not found -->
      <div v-else class="text-center py-24 text-gray-500">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Post not found</h2>
        <p class="mb-6">The item may have been un-published or moved.</p>
        <NuxtLink to="/blog" class="bg-[#105212] text-white px-6 py-2 rounded-xl text-sm font-semibold shadow-md no-underline">
          Browse All Articles
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const route = useRoute()

const { data: post, pending } = await useAsyncData(`blog-${route.params.slug}`, async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', route.params.slug)
    .eq('published', true)
    .single()

  if (error) return null
  return data
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Simple text length counter to auto-compute reading speed benchmarks
const estimateReadingTime = (htmlContent) => {
  if (!htmlContent) return 1
  const cleanText = htmlContent.replace(/<\/?[^>]+(>|$)/g, "") // Strip HTML tags
  const words = cleanText.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 225)) // Based on an average adult reading speed of 225 WPM
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
  color: #111827;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.prose :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
.prose :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.75;
}
.prose :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}
.prose :deep(li) {
  margin-bottom: 0.5rem;
}
</style>