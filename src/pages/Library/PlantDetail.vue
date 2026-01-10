<template>
  <div class="page-wrapper">
    <Navigation />

    <div class="plant-detail-page">
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
            <li v-for="(benefit, index) in plant.primaryHealthBenefits" :key="index">
              {{ benefit }}
            </li>
          </ul>
        </div>

        <div class="detail-section" v-if="plant.keyActiveCompounds?.length">
          <h2>🧪 Key Active Compounds</h2>
          <div class="compounds-grid">
            <span v-for="(compound, index) in plant.keyActiveCompounds" :key="index">
              {{ compound }}
            </span>
          </div>
        </div>

        <div class="detail-section" v-if="plant.commonPreparations?.length">
          <h2>🍽️ Common Preparations</h2>
          <div class="preparations-grid">
            <span v-for="(prep, index) in plant.commonPreparations" :key="index">
              {{ prep }}
            </span>
          </div>
        </div>

        <div class="detail-section warning" v-if="plant.specificWarnings?.length">
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
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: "PlantDetail",
  components: {
    Navigation
  },
  data() {
    return {
      plant: {},
      isLoading: true,
      error: null,
      showImageModal: false,
      selectedImage: "",
    };
  },
  async created() {
    await this.fetchPlantData();
  },
  methods: {
    async fetchPlantData() {
      try {
        const plantId = this.$route.params.id;
        const response = await fetch("/ULearn.json");
        const plants = await response.json();
        this.plant = plants.find((p) => p.id === plantId) || {};

        if (!this.plant.id) {
          throw new Error("Plant not found");
        }
      } catch (err) {
        this.error = err.message;
        console.error("Error loading plant:", err);
      } finally {
        this.isLoading = false;
      }
    },
    openImageModal(img) {
      this.selectedImage = img;
      this.showImageModal = true;
      document.body.style.overflow = "hidden";
    },
    closeImageModal() {
      this.showImageModal = false;
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style scoped>
.plant-detail-page {
  /* FIX: 110px padding ensures the content starts below the 85px fixed header */
  padding: 110px 1rem 4rem; 
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Inter", sans-serif;
  color: #333;
}


.plant-names {
  margin-bottom: 2rem;
  text-align: center;
}

.plant-names h1 {
  font-size: 2.8rem;
  color: #ffffff;
  margin: 0 0 0.5rem;
  font-weight: 800;
  background-color: linear-gradient(135deg, #033726 0%, #078537 100%);
  border-radius: 0.5rem;
  padding: 15px;
  text-transform: capitalize;
}

.scientific-name {
  font-style: italic;
  color: #078537;
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

/* NEW: Plant Family Style */
.plant-family {
  margin-top: 0.5rem;
  color: #4b5563;
  font-size: 1.1rem;
}

.other-names {
  margin-top: 0.5rem;
  color: #9ca3af;
  font-size: 1rem;
}

.plant-hero {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 3rem;
  height: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.hero-image { width: 100%; height: 100%; object-fit: cover; }

.image-gallery {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  z-index: 2;
}

.gallery-thumbnail {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  border: 3px solid white;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;
}

.gallery-thumbnail:hover { transform: scale(1.1); }

.tagline {
  font-size: 1.3rem;
  color: #374151;
  margin: 2rem 0;
  line-height: 1.6;
  font-weight: 500;
  border-left: 4px solid #10b981;
  padding-left: 20px;
  font-style: italic;
}

.detail-section { margin-bottom: 3rem; }

.detail-section h2 {
  font-size: 1.8rem;
  color: #111827;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f3f4f6;
}

.benefits-list li { margin-bottom: 1rem; line-height: 1.6; font-size: 1.1rem; }

.compounds-grid, .preparations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.compounds-grid span, .preparations-grid span {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  color: #033726;
}

.warning {
  background: #fef2f2;
  padding: 2rem;
  border-radius: 15px;
  border-left: 6px solid #ef4444;
}

.warning h2 { color: #dc2626; border-bottom-color: #fca5a5; }

.external-link a {
  color: #10b981;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.1rem;
}

.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-modal img { max-width: 90%; max-height: 90%; border-radius: 10px; }

@media (max-width: 768px) {
  .plant-hero { height: 300px; }
  .plant-detail-page { padding-top: 100px; }
}
</style>