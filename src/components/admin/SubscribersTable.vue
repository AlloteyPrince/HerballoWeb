<template>
  <div class="subscribers-table-container">
    <table v-if="subscribers.length > 0">
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
    <p v-else>No subscribers found yet.</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  subscribers: {
    type: Array,
    required: true,
  },
});

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
</script>

<style scoped>
.subscribers-table-container {
  overflow-x: auto;
  margin-top: 2rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>