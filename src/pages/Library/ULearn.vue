<template>
  <div>
    <Navigation />
    <div class="library-page-wrapper">
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="text-white">ULearn Library</h1>
          <p class="hero-subtitle hidden md:block">
            Discover the power of nature through our comprehensive plant
            database.
          </p>
          <div class="search-bar-wrapper">
            <IconSearch class="search-icon" />
            <Input
              placeholder="Search plants..."
              v-model="searchTerm"
              class="search-bar-hero"
              aria-label="Search plants database"
              @input="onSearchInput"
            />
            <div v-if="isSearching" class="search-loading">
              <div class="search-spinner"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="plants-section">
        <div class="container">
          <div v-if="isLoading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading herbal plants...</p>
          </div>

          <div v-else-if="error" class="error-state">
            <div class="error-icon">⚠️</div>
            <p>{{ error }}</p>
            <button @click="loadPlants" class="retry-btn">Retry Loading</button>
          </div>

          <div v-else class="plants-list">
            <div class="results-summary">
              <p>
                Showing {{ paginatedPlants.length }} of
                {{ filteredPlants.length }} plants
                <span v-if="searchTerm" class="search-term"
                  >for "{{ searchTerm }}"</span
                >
              </p>
            </div>

            <div
              v-for="plant in paginatedPlants"
              :key="plant.id"
              class="plant-card"
              @click="goToPlantDetail(plant)"
            >
              <div class="plant-image-container">
                <img
                  :src="getImageUrl(plant)"
                  :alt="formatCommonName(plant.commonName)"
                  class="plant-image"
                  loading="lazy"
                />
              </div>

              <div class="plant-content">
                <div class="plant-info">
                  <h3 class="plant-name">
                    {{ formatCommonName(plant.commonName) }}
                  </h3>
                  <p class="plant-scientific">
                    {{
                      plant.scientificName || "Scientific name not available"
                    }}
                  </p>
                  <p class="plant-description">
                    {{ plant.tagline || "No description available" }}
                  </p>
                </div>
              </div>

              <div class="plant-action">
                <button
                  class="view-details-btn"
                  @click.stop="goToPlantDetail(plant)"
                >
                  View Details
                </button>
              </div>
            </div>

            <div v-if="totalPages > 1" class="pagination">
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="pagination-btn"
              >
                Previous
              </button>

              <div class="pagination-numbers">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'pagination-number',
                    { active: page === currentPage },
                  ]"
                >
                  {{ page }}
                </button>
              </div>

              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="pagination-btn"
              >
                Next
              </button>
            </div>

            <div v-if="filteredPlants.length === 0" class="no-results">
              <div class="no-results-icon">🌿</div>
              <p>No plants found matching your search</p>
              <p class="no-results-subtitle">Try a different search term</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <VFooter />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@/components/icons";
import Navigation from "@/components/Navigation.vue";
import { useSEO } from "@/composables/useSEO";
import VFooter from "@/components/VFooter.vue";

export default defineComponent({
  name: "ULearn",
  components: {
    Input,
    Button,
    IconSearch,
    Navigation,
    VFooter
  },
  data() {
    return {
      plants: [],
      isLoading: true,
      error: null,
      searchTerm: "",
      isSearching: false,
      searchTimeout: null,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  mounted() {
    useSEO({
      title: "Herballo Ulearn - Herbal Medicine Library & Education",
      description:
        "Explore our comprehensive herbal medicine library and educational content at Herballo Ulearn.",
      keywords:
        "herbs, plants, leafs, dry leaves, fruit, branches, stem, herbal education, herbal medicine, herbal library, herbal medicine courses,Herbal plant database,medicinal herbs list, traditional medicine library,natural remedies encyclopedia,plant-based medicine information,herbal remedies database,botanical medicine index,ethnobotany resources,healing plants guide, herb identification library, ayurvedic herbs database,chinese herbal medicine information, african medicinal plants, herbal uses and benefits, phytotherapy library, medicinal plant research,holistic health herbs, natural healing repository, plant extracts uses, herbal pharmacology library",
      url: "https://herballo.co/ulearn",
    });
    this.loadPlants();
  },
  computed: {
    filteredPlants() {
      if (!this.searchTerm) return this.plants;

      const search = this.searchTerm.toLowerCase();
      return this.plants.filter((plant) => {
        const commonName = this.formatCommonName(
          plant.commonName
        ).toLowerCase();
        const scientificName = (plant.scientificName || "").toLowerCase();
        const tagline = (plant.tagline || "").toLowerCase();

        return (
          commonName.includes(search) ||
          scientificName.includes(search) ||
          tagline.includes(search)
        );
      });
    },
    totalPages() {
      return Math.ceil(this.filteredPlants.length / this.itemsPerPage);
    },
    paginatedPlants() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPlants.slice(start, end);
    },
    visiblePages() {
      const pages = [];
      const totalPages = this.totalPages;
      const current = this.currentPage;

      let start = Math.max(1, current - 2);
      let end = Math.min(totalPages, start + 4);

      if (end - start < 4) {
        start = Math.max(1, end - 4);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
  },
  watch: {
    filteredPlants() {
      this.currentPage = 1;
    },
  },
  created() {
    this.loadPlants();
  },
  methods: {
    trackContactClick() {
      if (window.gtag) {
        window.gtag("event", "contact_click", {
          event_category: "engagement",
          event_label: "Contact Button",
        });
      }
    },
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
        this.plants = data.map((plant, index) => ({
          ...plant,
          id: plant.id || `plant-${index}`,
        }));
      } else if (data && typeof data === "object") {
        const possibleArrayKeys = ["plants", "data", "items"];
        for (const key of possibleArrayKeys) {
          if (Array.isArray(data[key])) {
            this.plants = data[key].map((plant, index) => ({
              ...plant,
              id: plant.id || `plant-${index}`,
            }));
            return;
          }
        }
        this.plants = [{ ...data, id: data.id || "plant-1" }];
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
        name: "plantDetail",
        params: { id: plant.id },
      });
    },
    getImageUrl(plant) {
      if (Array.isArray(plant.imageUrl)) {
        return plant.imageUrl[0] || "/images/plant-placeholder.jpg";
      }
      return plant.imageUrl || "/images/plant-placeholder.jpg";
    },
    onSearchInput() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.isSearching = true;

      this.searchTimeout = setTimeout(() => {
        this.isSearching = false;
      }, 300);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$el.querySelector(".plants-section").scrollIntoView({
          behavior: "smooth",
        });
      }
    },
  },
});
</script>

---

<style scoped>
.library-page-wrapper {
  margin-top: 80px; /* Adjust this to match your navigation bar's height */
}

.hero-section {
  position: relative;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/images/ha7.jpg");
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 2rem;
}

.hero-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
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

.search-loading {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.search-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.plants-section {
  padding: 2rem 1rem;
  background: #fafafa;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.results-summary {
  padding: 1.5rem 1.5rem 0;
  color: #6b7280;
  font-size: 0.9rem;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 0;
}

.search-term {
  font-weight: 500;
  color: #10b981;
}

.plants-list {
  display: flex;
  flex-direction: column;
}

.plant-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-height: 120px;
}

.plant-card:hover {
  background-color: #f0fdf4;
}

.plant-card:last-child {
  border-bottom: none;
}

.plant-image-container {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 1.5rem;
}

.plant-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plant-content {
  flex: 1;
  min-width: 0;
}

.plant-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.plant-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
}

.plant-scientific {
  font-style: italic;
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}

.plant-description {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0.5rem 0 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.plant-action {
  margin-left: 1.5rem;
  flex-shrink: 0;
}

.view-details-btn {
  background-color: #105212;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.view-details-btn:hover {
  background-color: #45a049;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 1rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.pagination-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #10b981;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 0.25rem;
}

.pagination-number {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  min-width: 40px;
}

.pagination-number:hover {
  background: #f9fafb;
  border-color: #10b981;
}

.pagination-number.active {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.loading-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.error-state {
  text-align: center;
  padding: 3rem;
  color: #dc2626;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
}

.retry-btn:hover {
  background: #059669;
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

.no-results-subtitle {
  color: #9ca3af;
  margin-top: 0.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .library-page-wrapper {
    margin-top: 64px;
  }

  .plant-card {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    min-height: auto;
  }

  .plant-image-container {
    width: 100%;
    height: 180px;
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .plant-action {
    margin-left: 0;
    margin-top: 1rem;
    width: 100%;
  }

  .view-details-btn {
    width: 100%;
    padding: 1rem;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .pagination-numbers {
    order: -1;
    width: 100%;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
}
</style>