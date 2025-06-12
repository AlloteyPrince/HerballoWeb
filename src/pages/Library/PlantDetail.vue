<template>
  <div class="plant-detail-page">
    <!-- Back Button -->
    <button @click="$router.go(-1)" class="back-button">
      ← Back to Library
    </button>

    <!-- Plant Names Section -->
    <div class="plant-names">
      <h1>{{ plant.commonName }}</h1>
      <p class="scientific-name">
        <em>{{ plant.scientificName }}</em>
      </p>
      <p class="other-names" v-if="plant.otherCommonNames?.length">
        Also known as: {{ plant.otherCommonNames.join(", ") }}
      </p>
    </div>

    <!-- Hero Section -->
    <div class="plant-hero">
      <!-- Primary Image -->
      <img 
        :src="plant.imageUrl?.[0] || '/images/plant-placeholder.jpg'" 
        :alt="plant.commonName"
        class="hero-image"
      />
      <div class="hero-overlay"></div>
      <!-- Image Gallery (if multiple images) -->
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

    <!-- Main Content -->
    <div class="plant-content">
      <!-- Tagline -->
      <p class="tagline">{{ plant.tagline }}</p>

      <!-- Health Benefits -->
      <div class="detail-section" v-if="plant.primaryHealthBenefits?.length">
        <h2>🌟 Health Benefits</h2>
        <ul class="benefits-list">
          <li v-for="(benefit, index) in plant.primaryHealthBenefits" :key="index">
            {{ benefit }}
          </li>
        </ul>
      </div>

      <!-- Active Compounds -->
      <div class="detail-section" v-if="plant.keyActiveCompounds?.length">
        <h2>🧪 Key Active Compounds</h2>
        <div class="compounds-grid">
          <span v-for="(compound, index) in plant.keyActiveCompounds" :key="index">
            {{ compound }}
          </span>
        </div>
      </div>

      <!-- Preparations -->
      <div class="detail-section" v-if="plant.commonPreparations?.length">
        <h2>🍽️ Common Preparations</h2>
        <div class="preparations-grid">
          <span v-for="(prep, index) in plant.commonPreparations" :key="index">
            {{ prep }}
          </span>
        </div>
      </div>

      <!-- Warnings -->
      <div class="detail-section warning" v-if="plant.specificWarnings?.length">
        <h2>⚠️ Warnings</h2>
        <ul>
          <li v-for="(warning, index) in plant.specificWarnings" :key="index">
            {{ warning }}
          </li>
        </ul>
      </div>

      <!-- External Link -->
      <div class="external-link" v-if="plant.readMoreLink">
        <a :href="plant.readMoreLink" target="_blank" rel="noopener">
          Learn more about {{ plant.commonName }} →
        </a>
      </div>
    </div>

    <!-- Image Modal (Optional) -->
    <div v-if="showImageModal" class="image-modal" @click="closeImageModal">
      <img :src="selectedImage" :alt="plant.commonName" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PlantDetail",
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
      document.body.style.overflow = "hidden"; // Prevent scrolling
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
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  font-family: "Inter", sans-serif;
  color: #333;
}

/* Back Button */
.back-button {
  background: none;
  border: none;
  color: #10b981;
  font-weight: 600;
  cursor: pointer;
  margin: 1rem 0;
  padding: 0.5rem 0;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: opacity 0.2s;
}

.back-button:hover {
  opacity: 0.8;
}

/* Plant Names Section */
.plant-names {
  margin-bottom: 1.5rem;
  text-align: center;
}

.plant-names h1 {
  font-size: 2.5rem;
  color: #111827;
  margin: 0 0 0.5rem;
  font-weight: 700;
}

.plant-names .scientific-name {
  font-style: italic;
  color: #6b7280;
  margin: 0;
  font-size: 1.2rem;
}

.plant-names .other-names {
  margin-top: 0.5rem;
  color: #9ca3af;
  font-size: 1rem;
}

/* Hero Section */
.plant-hero {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
  height: 350px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
}

/* Image Gallery */
.image-gallery {
  position: absolute;
  bottom: 10px; /* Moved to very bottom */
  left: 0;
  right: 0;
  padding: 0 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.image-gallery::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.gallery-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: 2px solid white;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;
  flex-shrink: 0; /* Prevent thumbnails from shrinking */
}

.gallery-thumbnail:hover {
  transform: scale(1.05);
}

/* Main Content */
.tagline {
  font-size: 1.2rem;
  color: #4b5563;
  margin: 1.5rem 0;
  line-height: 1.5;
  font-weight: 500;
}

.detail-section {
  margin-bottom: 2.5rem;
}

.detail-section h2 {
  font-size: 1.5rem;
  color: #111827;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f3f4f6;
}

/* Health Benefits */
.benefits-list {
  padding-left: 1.25rem;
}

.benefits-list li {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

/* Active Compounds & Preparations Grid */
.compounds-grid,
.preparations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.compounds-grid span,
.preparations-grid span {
  background: #f3f4f6;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
}

/* Warnings */
.warning {
  background: #fef2f2;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #ef4444;
}

.warning h2 {
  color: #dc2626;
  border-bottom-color: #fca5a5;
}

.warning li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* External Link */
.external-link {
  margin: 2rem 0;
  text-align: center;
}

.external-link a {
  color: #10b981;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px dashed #10b981;
  padding-bottom: 0.1rem;
  transition: all 0.2s;
}

.external-link a:hover {
  color: #059669;
  border-bottom-color: #059669;
}

/* Image Modal */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

.image-modal img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .plant-names h1 {
    font-size: 2rem;
  }

  .plant-names .scientific-name {
    font-size: 1.1rem;
  }

  .plant-hero {
    height: 280px;
  }

  .compounds-grid,
  .preparations-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

@media (max-width: 480px) {
  .plant-names h1 {
    font-size: 1.7rem;
  }

  .plant-names .scientific-name {
    font-size: 1rem;
  }

  .plant-hero {
    height: 220px;
  }

  .tagline {
    font-size: 1.1rem;
  }
}
</style>