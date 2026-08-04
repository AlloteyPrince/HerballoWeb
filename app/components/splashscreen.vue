<template>
  <Transition name="fade-out">
    <div v-if="showSplash" class="splash-screen-container">
      <img
        src="/images/herballo-logo.png" 
        alt="Herballo Logo"
        class="splash-logo"
      />
    </div>
  </Transition>
</template>

<script setup>
const showSplash = ref(true); 
const SPLASH_DURATION = 5000; // Exact 5 seconds
const SEEN_SPLASH_KEY = "hasSeenSplash";

onMounted(() => {
  if (process.client) {
    const hasSeenSplash = sessionStorage.getItem(SEEN_SPLASH_KEY);

    if (hasSeenSplash) {
      // If they've seen it this session, hide immediately
      showSplash.value = false;
    } else {
      // First time visit: Wait exactly 5 seconds
      setTimeout(() => {
        showSplash.value = false;
        sessionStorage.setItem(SEEN_SPLASH_KEY, "true");
      }, SPLASH_DURATION);
    }
  }
});
</script>

<style scoped>
.splash-screen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001; /* Stay above everything */
  overflow: hidden;
}

.splash-logo {
  max-width: 200px;
  height: auto;
  /* Reduced to 1.5s per loop so it 'pulses' about 3 times in 5 seconds */
  animation: popAndShrink 1.5s ease-in-out infinite; 
}

@keyframes popAndShrink {
  0% { transform: scale(0.8); opacity: 0; }
  30% { transform: scale(1.1); opacity: 1; }
  50% { transform: scale(1); opacity: 1; }
  70% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0; }
}

/* Smooth fade transition when the splash screen leaves */
.fade-out-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-out-leave-to {
  opacity: 0;
}
</style>