<script setup>
import { pdfs } from "~/lib/libraryData";
import { cn } from "~/lib/utils";
import { keywordString, herbalMedicineGeneralKeywords } from "~/data/seoKeywords";

usePageSeo({
  title: "Herbal Resource Library — Free Downloadable Guides | Herballo",
  description: "Download free herbal medicine guides from Herballo's resource library — practical, natural health resources for your wellness journey.",
  path: "/pdflibrary",
  keywords: keywordString(["free herbal guides pdf", "downloadable herbal medicine guides", "herbal resource library"], herbalMedicineGeneralKeywords.slice(0, 10)),
});
</script>

<template>
  <div :class="cn('max-w-6xl mx-auto py-12 px-4 font-sans')">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-green-800 mb-2">
        🌿 Herbal Resource Library
      </h1>
      <p class="text-gray-600">
        Downloadable guides for your natural health journey.
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="pdf in pdfs"
        :key="pdf.id"
        :class="
          cn(
            'bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col'
          )
        "
      >
        <img
          :src="pdf.image"
          :alt="pdf.title"
          class="w-full h-64 object-cover"
          loading="lazy"
          decoding="async"
        />

        <div class="p-6 flex flex-col flex-grow text-center">
          <h2 class="text-xl font-bold text-gray-800 mb-4">{{ pdf.title }}</h2>
          <div class="mt-auto">
            <NuxtLink
              :to="`/pdflibrary/${pdf.id}`"
              :class="
                cn(
                  'inline-block bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition-colors'
                )
              "
            >
              View & Download
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
