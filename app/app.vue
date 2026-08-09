<template>
  <div>
    <Splashscreen />
    <NuxtLayout>
      <NuxtPage :transition="{
  name: 'page',
  mode: 'out-in'
}" />
    </NuxtLayout>
  </div>
</template>

<script setup>
useJsonLd({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Herballo",
      alternateName: "Herballo Co",
      url: SITE_URL,
      logo: BRAND_LOGO,
      description:
        "Herballo is a health-focused translational herbal-regenerative science company bridging traditional African botanical wisdom with modern medical research and personalised herbal consultations.",
      email: "info@herballo.co",
      sameAs: [
        "https://www.youtube.com/@HerballoCo",
        "https://www.linkedin.com/company/herballo/",
        "https://www.tiktok.com/@Herballo",
        "https://x.com/princeo43022643",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Herballo",
      description: "Natural health, herbal medicine consultations and education rooted in African herbal wisdom.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
});
</script>

<style>
/* Keeping these global so they work on all pages */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-in-out;
}

.page-enter-from {
  opacity: 0;
  /* transform: translateY(10px); */
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Global Body Styles */
body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
}
</style>
