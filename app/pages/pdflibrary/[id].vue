<script setup>
import { pdfs } from '~/lib/libraryData'
import { cn } from '~/lib/utils'

const route = useRoute()

// Find the specific book based on the URL ID
const book = pdfs.find(p => p.id === route.params.id)

// SEO & Social Media Optimization
useHead({
  title: book ? `${book.title} | Herballo Library` : 'Resource Not Found',
  meta: [
    { name: 'description', content: book ? book.intro.slice(0, 160) : '' },
    
    // Facebook & WhatsApp (Open Graph)
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://herballo.co/pdflibrary/${book?.id}` },
    { property: 'og:title', content: book ? `${book.title} | Herballo` : 'Herbal Guide' },
    { property: 'og:description', content: book ? book.intro.slice(0, 160) : '' },
    { property: 'og:image', content: book ? `https://herballo.co${book.image}` : 'https://herballo.co/logo.png' },

    // Twitter / X
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: book?.title },
    { name: 'twitter:description', content: book ? book.intro.slice(0, 160) : '' },
    { name: 'twitter:image', content: book ? `https://herballo.co${book.image}` : 'https://herballo.co/logo.png' },
  ],
  link: [
    { rel: 'canonical', href: `https://herballo.co/pdflibrary/${book?.id}` }
  ]
})

// SHARING FUNCTIONALITY
const shareLibrary = async () => {
  if (!book) return

  const shareData = {
    title: book.title,
    text: `Check out this free herbal guide: ${book.title}`,
    url: `https://herballo.co/pdflibrary/${book.id}`
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`
      window.open(whatsappUrl, '_blank')
    }
  } catch (err) {
    console.error('Error sharing:', err)
  }
}
</script>

<template>
  <div v-if="book" :class="cn('max-w-6xl mx-auto py-10 px-6 font-sans')">
    
    <div class="flex justify-between items-center mb-12">
      <NuxtLink to="/pdflibrary" class="text-green-700 font-medium hover:underline flex items-center gap-2">
        <span>←</span> Back to Library
      </NuxtLink>
      
      <button 
        @click="shareLibrary"
        :class="cn('flex items-center gap-2 text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-full transition-colors shadow-sm')"
      >
        <font-awesome-icon icon="share-nodes" />
        Share Guide
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      
      <div class="flex justify-center order-2 md:order-1">
        <img :src="book.image" 
             :alt="'Cover of ' + book.title" 
             class="w-full max-w-sm rounded-3xl shadow-2xl border border-gray-100 sticky top-10" />
      </div>

      <div class="text-left order-1 md:order-2">
        <h1 class="text-3xl md:text-5xl font-bold text-green-700 mb-6 leading-tight">
          {{ book.title }}
        </h1>

        <div class="prose prose-lg text-gray-700 mb-8">
          <p class="text-xl font-medium text-gray-600 mb-4 italic">Welcome to your foundational resource...</p>
          <p class="leading-relaxed">{{ book.intro }}</p>
        </div>

        <div class="mb-10">
          <ul :class="cn('space-y-4 bg-green-50 p-8 rounded-3xl border border-green-100 shadow-sm')">
            <li v-for="benefit in book.benefits" :key="benefit" class="flex items-start text-gray-800 font-medium">
              <span class="mr-3 text-green-600 font-bold">✔</span> {{ benefit }}
            </li>
          </ul>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <a :href="book.pdfUrl" 
             download 
             target="_blank"
             :class="cn('flex-1 bg-green-800 text-white text-center px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-green-600 transition-colors inline-block cursor-pointer')">
            📥 Download PDF
          </a>

          <a :href="book.pdfUrl" 
             target="_blank"
             :class="cn('flex-1 bg-transparent text-green-800 border-2 border-green-800 text-center px-8 py-4 rounded-full text-lg font-bold hover:bg-green-800 hover:text-white transition-colors inline-block cursor-pointer')">
            📖 Read Online
          </a>
        </div>
        
        <p class="text-sm text-gray-500 mt-4 text-center md:text-left">
          Format: PDF | Free Access via Herballo Library
        </p>
      </div>

    </div>
  </div>

  <div v-else class="text-center py-24 font-sans">
    <h2 class="text-2xl font-bold text-gray-800">Sorry, this resource could not be found.</h2>
    <NuxtLink to="/pdflibrary" class="text-green-700 underline mt-4 inline-block">Return to Library</NuxtLink>
  </div>
</template>