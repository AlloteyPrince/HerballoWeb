<template>
  <div>
    <Hero />
    <Howitworks />
    <Whyherballo />
    <Services />
    <Librarysection />
    <Blogarea />
  </div>
</template>

<script setup>
import { keywordString, diabetesKeywords, hypertensionKeywords, herbalMedicineGeneralKeywords, biotechRegenerativeKeywords } from "~/data/seoKeywords";

definePageMeta({
  layout: "default",
});

usePageSeo({
  title: "Herballo — Herbal Medicine & Natural Health Consultations in Ghana",
  description:
    "Herballo blends African herbal wisdom with modern regenerative science. Book a personalised herbal consultation for diabetes, hypertension and natural wellness, or explore our free plant library and health education resources.",
  path: "/",
  keywords: keywordString(
    herbalMedicineGeneralKeywords.slice(0, 15),
    diabetesKeywords.slice(0, 5),
    hypertensionKeywords.slice(0, 5),
    biotechRegenerativeKeywords.slice(0, 5)
  ),
});

</script>

<style scoped></style>
