<template>
  <div>
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="!loading && !error">Total Subscribers: {{ subscribers.length }}</p>

    <div v-if="loading">
      <p>Loading subscribers...</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="subscribers.length > 0">
      <slot name="header"></slot>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Subscribed At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subscriber in subscribers" :key="subscriber._id">
            <td>{{ subscriber.email }}</td>
            <td>{{ formatDate(subscriber.subscribedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No subscribers found yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../api";

const props = defineProps({
  title: String,
});

const subscribers = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchSubscribers = async () => {
  try {
    const res = await fetch(api("/api/subscribers"));
    const data = await res.json();

    if (res.ok) {
      subscribers.value = data;
    } else {
      error.value = data.message || "Failed to fetch subscribers.";
    }
  } catch (err) {
    console.error(err);
    error.value = "Failed to connect to the server.";
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
  fetchSubscribers();
});
</script>

<style scoped>
/* You can add specific table styling here */
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
</style>
