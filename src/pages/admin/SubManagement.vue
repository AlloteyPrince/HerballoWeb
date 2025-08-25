<template>
  <div class="subscription-management-page">
    <h2>Subscription Management</h2>

    <div class="dashboard-cards-row">
      <SubscribersCard />
      <SendNewsletterCard />
    </div>

    <SubscribersTable :subscribers="subscribers" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../../api";
import SubscribersCard from "@/components/admin/SubscribersCard.vue";
import SubscribersTable from "@/components/admin/SubscribersTable.vue";
import SendNewsletterCard from "@/components/admin/SendNewsletterCard.vue";

const subscribers = ref([]);

const fetchAllSubscribers = async () => {
  try {
    const res = await fetch(api("/api/subscribers"));
    if (res.ok) {
      const data = await res.json();
      subscribers.value = data;
    } else {
      console.error("Failed to fetch subscribers.");
    }
  } catch (err) {
    console.error("Network error:", err);
  }
};

onMounted(() => {
  fetchAllSubscribers();
});
</script>

<style scoped>
.subscription-management-page {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.dashboard-cards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* Centers the cards */
  margin: 2rem 0;
}
</style>