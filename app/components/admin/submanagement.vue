<template>
  <div class="subscription-management">
    <h2>Subscription Management</h2>

    <div class="dashboard-cards-row">
      <AdminSubscribersCard />
      <AdminSendNewsletterCard />
    </div>

    <div v-if="pending" class="loading">Loading subscribers...</div>
    <AdminSubscribersTable v-else :subscribers="subscribers" />
  </div>
</template>

<script setup>
// Nuxt auto-imports useFetch and useRuntimeConfig
const config = useRuntimeConfig();

// useFetch is better than fetch + onMounted because it handles 
// SSR and hydration automatically.
const { data: subscribers, pending, error } = await useFetch('/api/subscribers', {
  baseURL: config.public.apiBase,
  default: () => []
});

// If you need to manually refresh (e.g., after a delete), 
// you can destructure { refresh } from useFetch above.
</script>

<style scoped>
.subscription-management {
  padding: 20px;
  width: 100%; /* Changed from max-width to fill the dashboard pane */
}

.dashboard-cards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 2rem 0;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .dashboard-cards-row {
    justify-content: center;
  }
}
</style>