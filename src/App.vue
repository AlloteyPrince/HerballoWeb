<template>
  <div id="app">
    <SplashScreen v-if="showSplash" />

    <div v-else class="main-app-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import SplashScreen from "@/components/SplashScreen.vue";

export default {
  name: 'App',
  components: { SplashScreen },
  data() {
    return {
      // Initialize showSplash based on sessionStorage
      // It will be true if 'splashShown' is NOT in sessionStorage,
      // meaning it's the first load in this session.
      showSplash: !sessionStorage.getItem('splashShown')
    };
  },
  mounted() {
    // If the splash screen is set to show, hide it after a delay
    if (this.showSplash) {
      setTimeout(() => {
        this.showSplash = false; // Hide the splash screen
        // Mark that the splash screen has been shown in this session
        sessionStorage.setItem('splashShown', 'true');
      }, 3000); // Adjust this duration (in milliseconds) as needed
                // This is the time your splash screen animation should run
    }
    // If showSplash is already false (because 'splashShown' was found in sessionStorage),
    // then no action is needed, and the main content will render immediately.
  },
  methods: {}
};
</script>

<style>
/* Global styles for your entire application */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  scroll-behavior: smooth;
}

body {
  font-family: 'Poppins', sans-serif; /* Ensure Poppins is correctly imported/linked in your project */
}

/* Optional: Add some basic styling for your main app content if needed */
.main-app-content {
  min-height: 100vh; /* Ensure the main content takes full height after splash screen */
  display: flex; /* Use flexbox for your main layout */
  flex-direction: column; /* Stack children vertically */
}
</style>