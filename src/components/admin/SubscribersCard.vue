<template>
  <div class="stat-card">
    <div class="card-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M19 8.24l-7.23 4.82-7.23-4.82A2 2 0 013 8.24V17a2 2 0 002 2h14a2 2 0 002-2v-8.76a2 2 0 00-1-1.7zm-1.89-2.22l-6.11 4.07-6.11-4.07A2 2 0 015 4h14a2 2 0 011.11.23z"
        />
      </svg>
    </div>
    <div class="card-content">
      <p class="card-label">Subscribers</p>
      <h2 v-if="loading" class="card-figure">...</h2>
      <h2 v-else-if="error" class="card-figure">!</h2>
      <h2 v-else class="card-figure">{{ totalSubscribers }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../../api";

const totalSubscribers = ref(0);
const loading = ref(true);
const error = ref(false);

const fetchSubscriberCount = async () => {
  try {
    // Corrected endpoint
    const res = await fetch(api("/api/subscribers/subscribers"));
    if (res.ok) {
      const data = await res.json();
      totalSubscribers.value = data.length;
    } else {
      error.value = true;
    }
  } catch (err) {
    console.error("Failed to fetch subscriber count:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSubscriberCount();
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