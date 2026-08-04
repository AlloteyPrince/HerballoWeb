<template>
  <div class="shop-page">
    <Navigation />
    
    <main class="shop-container">
      <Underconstruction />
    </main>

    <VFooter />
  </div>
</template>

<script setup>
useHead({
  title: "Herballo Shop - Herbs and Herbal Product Market Place",
  meta: [
    { 
      name: 'description', 
      content: 'Explore our comprehensive herbal medicine catalogue and products at Herballo Shop.' 
    },
    { 
      name: 'keywords', 
      content: 'herbal shop, herbs, herbal medicine, herbal products' 
    },
    { property: 'og:url', content: 'https://herballo.co/shop' }
  ],
  link: [
    { rel: 'canonical', href: 'https://herballo.co/shop' }
  ]
})

// Analytics tracking method
const trackContactClick = () => {
  if (process.client && window.gtag) {
    window.gtag("event", "contact_click", {
      event_category: "engagement",
      event_label: "Contact Button",
    });
  }
}
</script>

<style scoped>
.shop-page {
  /* Ensuring the Segoe UI font carries over */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.shop-container {
  /* Removes the "pushed down" look, aligns with your new About page */
  flex: 1;
  padding-top: 20px; 
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>