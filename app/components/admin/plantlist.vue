<template>
  <div class="plant-list">
    <input v-model="searchQuery" type="text" placeholder="Search plants..." class="search-input" />

    <div v-if="pending">Loading plants...</div>
    <div v-else-if="error">Failed to load plants: {{ error.data?.statusMessage || error.message }}</div>
    <div v-else-if="filteredPlants.length === 0">No plants found.</div>
    <div v-else class="plant-cards">
      <div v-for="plant in filteredPlants" :key="plant.id" class="plant-card">
        <div class="card-content" @click="openPlant(plant.id)">
          <img
            v-if="plant.image_url?.[0]"
            :src="plant.image_url[0]"
            :alt="plant.common_name"
            class="cover"
          />
          <h3>{{ plant.common_name }}</h3>
          <p class="scientific">{{ plant.scientific_name }}</p>
          <p class="preview">{{ plant.tagline }}</p>
        </div>
        <button class="delete" @click.stop="handleDelete(plant.id)">
          🗑️ Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  refreshKey: Number,
});

const router = useRouter();
const searchQuery = ref("");

const { data: plants, pending, error, refresh } = await useAsyncData(
  () => `admin-plants-${props.refreshKey}`,
  () => adminFetch('/api/admin/plants'),
  { default: () => [] }
);

watch(() => props.refreshKey, () => {
  refresh();
});

const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this plant? This cannot be undone.")) return;

  try {
    await adminFetch(`/api/admin/plants/${id}`, { method: "DELETE" });
    refresh();
  } catch (err) {
    console.error("Delete failed:", err);
    alert(err.data?.statusMessage || "Failed to delete plant.");
  }
};

const openPlant = (id) => {
  router.push(`/admin/plants/${id}`);
};

const filteredPlants = computed(() => {
  if (!plants.value) return [];
  const q = searchQuery.value.toLowerCase();
  if (!q) return plants.value;
  return plants.value.filter((p) =>
    p.common_name.toLowerCase().includes(q) || p.scientific_name?.toLowerCase().includes(q)
  );
});
</script>

<style scoped>
.plant-list { margin-top: 20px; }

.search-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  margin-bottom: 24px;
}

.search-input:focus { border-color: #105212; }

.plant-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.plant-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.plant-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }

.delete {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.delete:hover { background: #dc2626; color: white; }

.scientific { font-style: italic; color: #105212; font-size: 0.85em; margin-bottom: 8px; }

.preview { font-size: 0.9em; color: #64748b; line-height: 1.5; }

.cover {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}
</style>
