<template>
  <div class="stat-card action-card" @click="goToNewsletterSender">
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
      <p class="card-label">Send Newsletter</p>
      <h2 class="card-figure">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.02L5 12.02l1.41-1.41L11 14.2l5.6-5.6 1.41 1.41-7.01 7.01z"
          />
        </svg>
      </h2>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["navigate"]);

const goToNewsletterSender = () => {
  // Emit an event to the parent component with the desired section key
  emit("navigate", "emailing");
};
</script>

<style scoped>
/* Re-using the stat-card styles */
.stat-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  max-width: 300px;
  min-height: 120px; /* Ensure consistent height */
}

.action-card {
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #105212;
  color: white;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.action-card .card-icon {
  background-color: white;
  color: #105212;
}

.card-icon {
  width: 50px;
  height: 50px;
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
  color: inherit;
  margin: 0;
}
.card-figure {
  font-size: 2rem;
  font-weight: bold;
  color: inherit;
  margin: 0;
}
</style>