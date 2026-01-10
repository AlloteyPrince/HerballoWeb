<template>
  <div class="stat-card">
    <div class="card-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 8.24l-7.23 4.82-7.23-4.82A2 2 0 013 8.24V17a2 2 0 002 2h14a2 2 0 002-2v-8.76a2 2 0 00-1-1.7zm-1.89-2.22l-6.11 4.07-6.11-4.07A2 2 0 015 4h14a2 2 0 011.11.23z" />
      </svg>
    </div>
    <div class="card-content">
      <p class="card-label">Subscribers</p>
      
      <h2 v-if="pending" class="card-figure">...</h2>
      <h2 v-else-if="error" class="card-figure text-red-500">!</h2>
      <h2 v-else class="card-figure">{{ totalSubscribers }}</h2>
    </div>
  </div>
</template>

<script setup>
// Nuxt auto-imports useRuntimeConfig and useLazyFetch
const config = useRuntimeConfig();

// useLazyFetch means the dashboard will show immediately 
// and the number will pop in once the API responds.
const { data: subscribers, pending, error } = await useLazyFetch('/api/subscribers', {
  baseURL: config.public.apiBase,
  // We transform the data immediately to get the count
  transform: (res) => res.length || 0,
  default: () => 0
});

// Rename for clarity in the template
const totalSubscribers = subscribers;
</script>

<style scoped>
/* Styles updated for better dashboard layout */
.stat-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 12px; /* Smoother corners */
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  min-width: 240px;
  flex: 1; /* Allows card to grow in the dashboard-cards-row */
}

.card-icon {
  width: 56px;
  height: 56px;
  background-color: #105212; /* Herballo Green */
  color: white;
  border-radius: 12px;
  display: grid;
  place-items: center;
}

.card-icon svg {
  width: 28px;
  height: 28px;
}

.card-content {
  text-align: left;
}

.card-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.card-figure {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.text-red-500 {
  color: #ef4444;
}
</style>