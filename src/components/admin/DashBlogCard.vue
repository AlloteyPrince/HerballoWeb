<template>
  <div class="stat-card">
    <div class="card-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        />
      </svg>
    </div>
    <div class="card-content">
      <p class="card-label">Blogs</p>
      <h2 v-if="loading" class="card-figure">...</h2>
      <h2 v-else-if="error" class="card-figure">!</h2>
      <h2 v-else class="card-figure">{{ totalBlogs }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../../api";

const totalBlogs = ref(0);
const loading = ref(true);
const error = ref(false);

const fetchBlogCount = async () => {
  try {
    // Corrected endpoint
    const res = await fetch(api("/api/posts/count"));
    if (res.ok) {
      const data = await res.json();
      totalBlogs.value = data.count;
    } else {
      error.value = true;
    }
  } catch (err) {
    console.error("Failed to fetch blog count:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBlogCount();
});
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  max-width: 300px;
}
.card-icon {
  width: 50px;
  height: 50px;
  background-color: #105212;
  color: white;
  border-radius: 50%;
  display: grid;
  place-items: center;
}
.card-icon svg {
  width: 25px;
  height: 25px;
}
.card-content {
  text-align: left;
}
.card-label {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}
.card-figure {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}
</style>