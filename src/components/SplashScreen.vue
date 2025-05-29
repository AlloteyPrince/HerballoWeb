<template>
  <Transition name="fade-out">
    <div v-if="showSplash" class="splash-screen-container">
      <img
        src="/herballo-logo.png"
        alt="Your Company Logo"
        class="splash-logo"
      />
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

const showSplash = ref(true); // Control visibility of the splash screen
const SPLASH_DURATION = 5000; // 5 seconds in milliseconds
const SEEN_SPLASH_KEY = "hasSeenSplash"; // Key for sessionStorage

onMounted(() => {
  // Check if user has seen the splash screen in this session
  const hasSeenSplash = sessionStorage.getItem(SEEN_SPLASH_KEY);

  if (hasSeenSplash) {
    // If seen, hide immediately (or after a very brief delay for smoother transition)
    showSplash.value = false;
  } else {
    // If not seen, show for the full duration
    setTimeout(() => {
      showSplash.value = false;
      sessionStorage.setItem(SEEN_SPLASH_KEY, "true"); // Mark as seen for this session
    }, SPLASH_DURATION);
  }
});
</script>

<style scoped>
.splash-screen-container {
  position: fixed; /* Fixes it to the viewport */
  top: 0;
  left: 0;
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  background-color: white; /* The white background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Ensure it's on top of everything else */
  overflow: hidden; /* Prevent scrollbars if content peeks */
}

.splash-logo {
  max-width: 200px; /* Adjust logo size as needed */
  height: auto;
  animation: popAndShrink 2s ease-in-out infinite; /* Animation applied to the logo */
}

/* Define the animation for the logo */
@keyframes popAndShrink {
  0% {
    transform: scale(0.8); /* Start smaller */
    opacity: 0; /* Start invisible */
  }
  20% {
    transform: scale(1.1); /* Pop up slightly larger */
    opacity: 1; /* Fully visible */
  }
  50% {
    transform: scale(1); /* Return to normal size */
    opacity: 1;
  }
  80% {
    transform: scale(1.1); /* Pop up again */
    opacity: 1;
  }
  100% {
    transform: scale(0.8); /* Return to smaller size */
    opacity: 0; /* Fade out before repeating */
  }
}

/* Vue Transition for the splash screen container itself */
.fade-out-enter-active,
.fade-out-leave-active {
  transition: opacity 0.5s ease;
}

.fade-out-enter-from,
.fade-out-leave-to {
  opacity: 0;
}
</style>
