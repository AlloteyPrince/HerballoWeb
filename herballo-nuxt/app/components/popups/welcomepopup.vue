<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="show" class="welcome-popup-overlay" @click.self="$emit('close')">
        <div class="welcome-popup-content">
          <button 
            class="close-popup-button" 
            @click="$emit('close')"
            aria-label="Close popup"
          >
            &times;
          </button>
          <h3>{{ title }}</h3>
          <p>{{ message }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * In Nuxt 3, defineProps and defineEmits are auto-imported.
 * No need to import them from 'vue'.
 */
defineProps({
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

defineEmits(['close']);
</script>

<style scoped>
.welcome-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* High z-index to stay above everything */
  backdrop-filter: blur(4px); /* Modern touch: slight blur to background */
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
  font-size: 1.8rem; /* Adjusted slightly for better balance */
  color: #105212;
  margin-bottom: 1rem;
}

.welcome-popup-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

/* Nuxt Transition Styles 
  Replaces the manual @keyframes for a cleaner implementation
*/
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>