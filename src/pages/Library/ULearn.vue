<template>
  <div class="library-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="text-white">ULearn Library</h1>
        <p class="hero-subtitle hidden md:block">
          Discover the power of nature through our comprehensive plant database.
        </p>
        <div class="search-bar-wrapper">
          <IconSearch class="search-icon" />
          <Input
            placeholder="Search plants..."
            v-model="searchTerm"
            class="search-bar-hero"
            aria-label="Search plants database"
          />
        </div>
      </div>
    </section>

    <!-- Plants Grid Section -->
    <section class="plants-grid-section">
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading herbal plants...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
        <button @click="loadPlants" class="retry-btn">Retry Loading</button>
      </div>

      <div v-else class="plants-grid">
        <!-- Plant Card -->
        <div 
          v-for="plant in filteredPlants" 
          :key="plant.id" 
          class="plant-card"
          @click="goToPlantDetail(plant)"
        >
          <div class="plant-image-container">
            <img
              :src="plant.imageUrl || '/images/plant-placeholder.jpg'"
              :alt="formatCommonName(plant.commonName)"
              class="plant-image"
              loading="lazy"
            />
          </div>
          <div class="plant-info">
            <div class="plant-text-content">
              <h3 class="plant-name">{{ formatCommonName(plant.commonName) }}</h3>
              <p class="plant-scientific">
                {{ plant.scientificName || "Scientific name not available" }}
              </p>
              <p class="plant-tagline">
                {{ plant.tagline || "No description available" }}
              </p>
            </div>
            <div class="plant-actions">
              <Button class="view-more-btn">
                View Details
              </Button>
            </div>
          </div>
        </div>

        <div v-if="filteredPlants.length === 0" class="no-results">
          <div class="no-results-icon">🌿</div>
          <p>No plants found matching your search</p>
          <p class="text-gray-500 mt-2">Try a different search term</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@/components/icons";

export default defineComponent({
  name: "LibraryPage",
  components: {
    Input,
    Button,
    IconSearch,
  },
  data() {
    return {
      plants: [],
      isLoading: true,
      error: null,
      searchTerm: "",
    };
  },
  computed: {
    filteredPlants() {
      if (!this.searchTerm) return this.plants;

      const search = this.searchTerm.toLowerCase();
      return this.plants.filter((plant) => {
        const commonName = this.formatCommonName(plant.commonName).toLowerCase();
        const scientificName = (plant.scientificName || "").toLowerCase();
        const tagline = (plant.tagline || "").toLowerCase();

        return (
          commonName.includes(search) ||
          scientificName.includes(search) ||
          tagline.includes(search)
        );
      });
    },
  },
  created() {
    this.loadPlants();
  },
  methods: {
    async loadPlants() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch("/ULearn.json");
        if (!response.ok) throw new Error("Failed to fetch plant data");
        const data = await response.json();
        this.processPlantData(data);
      } catch (e) {
        this.error = e.message || "Failed to load plant data";
        console.error("Error loading plants:", e);
      } finally {
        this.isLoading = false;
      }
    },
    processPlantData(data) {
      if (Array.isArray(data)) {
        this.plants = data;
      } else if (data && typeof data === "object") {
        const possibleArrayKeys = ["plants", "data", "items"];
        for (const key of possibleArrayKeys) {
          if (Array.isArray(data[key])) {
            this.plants = data[key];
            return;
          }
        }
        this.plants = [data];
      } else {
        throw new Error("Invalid data format");
      }
    },
    formatCommonName(name) {
      if (Array.isArray(name)) {
        return name.join(", ");
      }
      return name || "Common name not available";
    },
    goToPlantDetail(plant) {
      if (!plant?.id) {
        console.error("Plant missing ID:", plant);
        return;
      }
      this.$router.push({
        name: "PlantDetail",
        params: { id: plant.id },
      });
    },
  },
});
</script>

<style scoped>
.library-page {
  min-height: 100vh;
  background: white;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  animation: fadeIn 0.6s ease-out;
}

/* Hero Section */
.hero-section {
  background-image: url("/images/ha7.jpg");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 2rem 4rem;
  text-align: center;
  position: relative;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.search-bar-wrapper {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  z-index: 2;
}

.search-bar-hero {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Plants Grid Section */
.plants-grid-section {
  padding: 2rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.plants-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.plant-card {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 200px;
}

.plant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.plant-image-container {
  width: 20%;
  min-width: 120px;
  overflow: hidden;
}

.plant-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.plant-card:hover .plant-image {
  transform: scale(1.05);
}

.plant-info {
  width: 80%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.plant-text-content {
  overflow: hidden;
}

.plant-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.plant-scientific {
  font-style: italic;
  color: #4b5563;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
}

.plant-tagline {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.plant-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
}

.view-more-btn {
  background-color: #105212;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-more-btn:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

/* Loading and Error States */
.loading-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #228c8c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.error-state {
  text-align: center;
  padding: 3rem;
  color: #dc2626;
  background: #fef2f2;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background: #228c8c;
  color: white;
  border-radius: 8px;
  font-weight: 500;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1rem 3rem;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .plant-card {
    flex-direction: column;
    height: auto;
  }
  
  .plant-image-container {
    width: 100%;
    height: 180px;
  }
  
  .plant-info {
    width: 100%;
    padding: 1.25rem;
  }
  
  .plant-name {
    white-space: normal;
  }
  
  .plant-tagline {
    -webkit-line-clamp: 2;
  }

  .plant-actions {
    justify-content: stretch;
  }

  .view-more-btn {
    width: 100%;
    justify-content: center;
    padding: 0.75rem 1rem;
  }
}

@media (min-width: 1200px) {
  .plants-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>