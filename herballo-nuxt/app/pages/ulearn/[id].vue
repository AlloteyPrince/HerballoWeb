<template>
  <div class="page-wrapper">
    <Navigation />

    <div v-if="pending" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading plant details...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <p>{{ error.message }}</p>
      <button @click="navigateTo('/ulearn')" class="back-btn">
        Back to Library
      </button>
    </div>

    <div v-else-if="plant" class="plant-detail-page">
      <div class="action-bar">
        <button @click="navigateTo('/ulearn')" class="back-btn">← Back</button>
        <button @click="sharePlant" class="share-btn">Share 🔗</button>
      </div>

      <div class="plant-hero">
        <img
          :src="plant.imageUrl?.[0] || '/images/plant-placeholder.jpg'"
          :alt="plant.commonName"
          class="hero-image"
        />
        <div class="hero-overlay"></div>
        <div class="image-gallery" v-if="plant.imageUrl?.length > 1">
          <img
            v-for="(img, index) in plant.imageUrl"
            :key="index"
            :src="img"
            :alt="plant.commonName"
            @click="openImageModal(img)"
            class="gallery-thumbnail"
          />
        </div>
      </div>

      <div class="plant-names">
        <h1>{{ plant.commonName }}</h1>
        <p class="scientific-name">
          <em>{{ plant.scientificName }}</em>
        </p>

        <p class="plant-family" v-if="plant.family">
          <strong>Family:</strong> {{ plant.family }}
        </p>

        <p class="other-names" v-if="plant.otherCommonNames?.length">
          Also known as: {{ plant.otherCommonNames.join(", ") }}
        </p>
      </div>

      <div class="plant-content">
        <p class="tagline">{{ plant.tagline }}</p>

        <div class="detail-section" v-if="plant.primaryHealthBenefits?.length">
          <h2>🌟 Health Benefits</h2>
          <ul class="benefits-list">
            <li
              v-for="(benefit, index) in plant.primaryHealthBenefits"
              :key="index"
            >
              {{ benefit }}
            </li>
          </ul>
        </div>

        <div class="detail-section" v-if="plant.keyActiveCompounds?.length">
          <h2>🧪 Key Active Compounds</h2>
          <div class="compounds-grid">
            <span
              v-for="(compound, index) in plant.keyActiveCompounds"
              :key="index"
            >
              {{ compound }}
            </span>
          </div>
        </div>

        <div class="detail-section" v-if="plant.commonPreparations?.length">
          <h2>🍽️ Common Preparations</h2>
          <div class="preparations-grid">
            <span
              v-for="(prep, index) in plant.commonPreparations"
              :key="index"
            >
              {{ prep }}
            </span>
          </div>
        </div>

        <div
          class="detail-section warning"
          v-if="plant.specificWarnings?.length"
        >
          <h2>⚠️ Warnings</h2>
          <ul>
            <li v-for="(warning, index) in plant.specificWarnings" :key="index">
              {{ warning }}
            </li>
          </ul>
        </div>

        <div class="external-link" v-if="plant.readMoreLink">
          <a :href="plant.readMoreLink" target="_blank" rel="noopener">
            Learn more about {{ plant.commonName }} →
          </a>
        </div>
      </div>

      <div v-if="showImageModal" class="image-modal" @click="closeImageModal">
        <img :src="selectedImage" :alt="plant.commonName" />
      </div>
    </div>

    <Transition name="toast">
      <div v-if="showToast" class="toast-notification">
        Link copied to clipboard! ✅
      </div>
    </Transition>
  </div>
</template>

<script setup>
const route = useRoute();
const plantId = route.params.id;

// Reactive state
const showImageModal = ref(false);
const selectedImage = ref("");
const showToast = ref(false);

// Fetch plant data
const {
  data: plant,
  pending,
  error,
} = await useFetch("/jsons/ULearn.json", {
  transform: (data) => {
    const plants = Array.isArray(data) ? data : [];
    const foundPlant = plants.find((p) => p.id === plantId);
    if (!foundPlant) {
      throw createError({ statusCode: 404, statusMessage: "Plant not found" });
    }
    return foundPlant;
  },
});

// Dynamic SEO
const siteUrl = "https://herballo.com";
const shareTitle = computed(() =>
  plant.value ? `${plant.value.commonName} | Herballo ULearn` : "Plant Details"
);
const shareDesc = computed(
  () => plant.value?.tagline || "Discover medicinal plants."
);
const shareImg = computed(() => {
  const img = plant.value?.imageUrl?.[0] || "/images/plant-placeholder.jpg";
  return img.startsWith("http") ? img : `${siteUrl}${img}`;
});

useSeoMeta({
  title: shareTitle,
  ogTitle: shareTitle,
  description: shareDesc,
  ogDescription: shareDesc,
  ogImage: shareImg,
  twitterCard: "summary_large_image",
});

// Share Logic
const sharePlant = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: shareTitle.value,
        text: shareDesc.value,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    }
  } catch (err) {
    console.error("Error sharing:", err);
  }
};

// Modal Logic
const openImageModal = (img) => {
  selectedImage.value = img;
  showImageModal.value = true;
  if (process.client) document.body.style.overflow = "hidden";
};

const closeImageModal = () => {
  showImageModal.value = false;
  if (process.client) document.body.style.overflow = "auto";
};

onUnmounted(() => {
  if (process.client && showImageModal.value)
    document.body.style.overflow = "auto";
});
</script>

<style scoped>
/* UPDATED: Buttons on opposite sides */
.action-bar {
  display: flex;
  justify-content: space-between; /* This pushes buttons to edges */
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
}

.back-btn {
  padding: 0.6rem 1.2rem;
  color: #078537;
  border: none;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  background: white;
  transition: all 0.2s;
}

.share-btn {
  padding: 0.6rem 1.2rem;
  /* background: #10b981; */
  color: rgb(0, 0, 0);
  border: none;
  /* border-radius: 0px; */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover,
.share-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Toast styling */
.toast-notification {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #10b981;
  color: white;
  padding: 12px 28px;
  border-radius: 50px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 3000;
  font-weight: 600;
}

/* Rest of the layout */
.loading-container,
.error-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.plant-detail-page {
  padding: 20px 1rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}
.plant-names h1 {
  font-size: 2.5rem;
  color: #fff;
  background: linear-gradient(135deg, #033726 0%, #078537 100%);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}
.scientific-name {
  color: #078537;
  text-align: center;
  font-size: 1.3rem;
  margin-top: 10px;
}
.plant-hero {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 400px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tagline {
  font-size: 1.2rem;
  border-left: 4px solid #10b981;
  padding-left: 15px;
  font-style: italic;
  margin: 2rem 0;
}
.detail-section {
  margin-bottom: 2.5rem;
}
.compounds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}
.compounds-grid span {
  background: #f3f4f6;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
}
.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-modal img {
  max-width: 90%;
  border-radius: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .plant-names h1 {
    font-size: 1.8rem;
  }
  .plant-hero {
    height: 250px;
  }
  /* On mobile, they stay on opposite sides but smaller padding */
  .back-btn,
  .share-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
