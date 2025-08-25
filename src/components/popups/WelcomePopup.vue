<template>
  <div v-if="show" class="welcome-popup-overlay">
    <div class="welcome-popup-content">
      <button class="close-popup-button" @click="$emit('close')">
        &times;
      </button>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Welcome to the Herballo Family!',
  },
  message: {
    type: String,
    default: "You're in! 💚 Thank you for joining Herballo. Journey with us and let's explore the never-ending limits of herbal medicine.",
  },
});

const emit = defineEmits(['close']);
</script>

<style scoped>
/*
 * Replicating your styles exactly for the pop-up
 * so it looks identical to your footer pop-up.
 */
.welcome-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.welcome-popup-content {
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 450px;
  margin: 0 20px;
  position: relative;
  animation: fadeInScale 0.3s ease-out forwards;
}

.close-popup-button {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease;
}

.close-popup-button:hover {
  color: #333;
}

.welcome-popup-content h3 {
  font-size: 2.2rem;
  color: #105212;
  margin-bottom: 1rem;
}

.welcome-popup-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>