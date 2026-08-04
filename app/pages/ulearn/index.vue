<template>
  <div class="library-page-wrapper">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="text-white">ULearn Library</h1>
        <p class="hero-subtitle">
          Discover the power of nature through our comprehensive plant database.
        </p>
        <div class="search-bar-wrapper">
          <svg
            class="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>

          <Input
            placeholder="Search plants..."
            :model-value="searchTerm"
            class="search-bar-hero"
            style="padding-left: 3.5rem !important; border-radius: 9999px"
            aria-label="Search plants database"
            @input="handleInput"
          />

          <div v-if="isSearching" class="search-loading">
            <div class="search-spinner"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="plants-section">
      <div class="container">
        <div
          v-if="error"
          class="error-state"
          style="text-align: center; padding: 40px"
        >
          <div class="error-icon" style="font-size: 2rem; margin-bottom: 10px">
            ⚠️
          </div>
          <p>{{ error.message }}</p>
          <button
            @click="refresh()"
            class="view-details-btn"
            style="margin-top: 15px"
          >
            Retry Loading
          </button>
        </div>

        <div
          v-else-if="pending"
          class="loading-state"
          style="text-align: center; padding: 40px"
        >
          <div
            class="search-spinner"
            style="
              margin: 0 auto 15px;
              width: 40px;
              height: 40px;
              border-width: 3px;
            "
          ></div>
          <p>Loading herbal plants...</p>
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
                  {{ plant.scientificName || "Scientific name not available" }}
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

          <div
            v-if="filteredPlants.length === 0 && searchTerm"
            class="no-results"
            style="text-align: center; padding: 40px"
          >
            <div class="no-results-icon">🌿</div>
            <p>No plants found matching your search</p>
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
                :class="['pagination-number', { active: page === currentPage }]"
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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const searchTerm = ref("");
const isSearching = ref(false);
const searchTimeout = ref(null);
const currentPage = ref(1);
const itemsPerPage = 10;

const {
  data: plants,
  pending,
  error,
  refresh,
} = await useFetch("/jsons/ULearn.json");

const allPlants = computed(() => {
  const raw = toRaw(plants.value);
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw.id) return [raw];
  return raw.plants || raw.data || [];
});

const filteredPlants = computed(() => {
  const query = searchTerm.value.toLowerCase().trim();
  const list = allPlants.value;
  if (!query) return list;

  return list.filter((plant) => {
    const main = String(plant.commonName || "").toLowerCase();
    const sci = String(plant.scientificName || "").toLowerCase();
    const tag = String(plant.tagline || "").toLowerCase();
    const others = Array.isArray(plant.otherCommonNames)
      ? plant.otherCommonNames.join(" ").toLowerCase()
      : String(plant.otherCommonNames || "").toLowerCase();

    return (
      main.includes(query) ||
      sci.includes(query) ||
      tag.includes(query) ||
      others.includes(query)
    );
  });
});

const handleInput = (e) => {
  const value = e?.target?.value ?? e;
  searchTerm.value = value;
  currentPage.value = 1;
  isSearching.value = true;
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    isSearching.value = false;
  }, 300);
};

const totalPages = computed(() =>
  Math.ceil(filteredPlants.value.length / itemsPerPage)
);
const paginatedPlants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPlants.value.slice(start, start + itemsPerPage);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  let start = Math.max(1, current - 2);
  let end = Math.min(total, start + 4);
  if (end - start < 4) start = Math.max(1, end - 4);
  for (let i = start; i <= end; i++) {
    if (i > 0) pages.push(i);
  }
  return pages;
});

const formatCommonName = (n) => (Array.isArray(n) ? n.join(", ") : n || "");
const getImageUrl = (p) =>
  Array.isArray(p.imageUrl)
    ? p.imageUrl[0]
    : p.imageUrl || "/images/plant-placeholder.jpg";
const goToPlantDetail = (p) => navigateTo(`/ulearn/${p.id}`);
const goToPage = (p) => {
  currentPage.value = p;
  nextTick(() => {
    document
      .querySelector(".plants-section")
      ?.scrollIntoView({ behavior: "smooth" });
  });
};
</script>

<style scoped>
/* 100% Original CSS with only the alignment fix added to .pagination-numbers */
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}
.hero-section {
  position: relative;
  height: 50vh;
  width: 100%;
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
  color: #111827;
  z-index: 2;
  width: 20px;
  height: 20px;
  pointer-events: none;
}
.search-bar-hero {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  color: #111827 !important;
}
.view-details-btn {
  background-color: #105212;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.view-details-btn:hover {
  background-color: #16a34a;
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
}
.search-term {
  font-weight: 500;
  color: #10b981;
}
.plant-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  min-height: 120px;
}
.plant-card:hover {
  background-color: #f0fdf4;
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
.plant-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.plant-scientific {
  font-style: italic;
  color: #6b7280;
  font-size: 0.9rem;
}
.plant-description {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
}
.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 9999px;
  cursor: pointer;
}

/* ADDED FLEX-DIRECTION TO ENSURE HORIZONTAL ALIGNMENT */
.pagination-numbers {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.pagination-number {
  width: 40px;
  height: 40px;
  border: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}
.pagination-number.active {
  background: #10b981;
  color: white;
  border-radius: 9999px;
  border-color: #10b981;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .search-bar-hero {
    padding: 0.75rem 1rem 0.75rem 2.5rem;
  }
  .plant-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .plant-image-container {
    width: 100%;
    height: 180px;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .plant-action {
    width: 100%;
    margin-top: 1rem;
    margin-left: 0;
  }
  .view-details-btn {
    width: 100%;
  }
}
</style>