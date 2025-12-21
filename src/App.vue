<template>
  <div id="app">
    <SplashScreen v-if="showSplash" />

    <div v-else class="main-app-content">
      <router-view />
    </div>

    <!-- <HerbPopUp
      v-if="showPopup"
      @close="closePopup"
    /> -->

    <SubscriptionPopup />
  </div>
</template>

<script>
import SplashScreen from "@/components/SplashScreen.vue";
import HerbPopUp from './components/popups/HerbPopUp.vue'; // Import the HerbPopUp component
import SubscriptionPopup from "./components/popups/SubscriptionPopup.vue";

export default {
  name: "App",
  components: {
    SplashScreen,
    HerbPopUp,
    SubscriptionPopup,
  },
  data() {
    return {
      showSplash: !sessionStorage.getItem("splashShown"),
      showPopup: false, // Data property for the pop-up visibility
      // Removed popupContent and herbData from here, they are now in HerbPopUp.vue
    };
  },
  mounted() {
    // Logic for SplashScreen
    if (this.showSplash) {
      setTimeout(() => {
        this.showSplash = false;
        sessionStorage.setItem("splashShown", "true");
        
        this.initiatePopup();
      }, 3000); // SplashScreen duration
    } else {
      // If splash screen is not shown (e.g., user revisited), initiate pop-up immediately
      this.initiatePopup();
    }
  },
  methods: {
    initiatePopup() {
      // Check if the pop-up has already been shown in this browser/device
      const hasPopupBeenShown = localStorage.getItem('herbPopupShown');

      if (!hasPopupBeenShown) {
        // If not shown, set a timer to display it after 30 seconds (30,000 milliseconds)
        setTimeout(() => {
          this.showPopup = true; // Show the pop-up

          // Set a flag in localStorage so it doesn't appear again on this device/browser
          localStorage.setItem('herbPopupShown', 'true');
        }, 30000); // Delay for pop-up after main content loads
      }
    },
    // Method to close the pop-up when the close button is clicked
    closePopup() {
      this.showPopup = false;
    },
    // Removed fetchRandomHerbData() from here, it is now in HerbPopUp.vue
  },
};
</script>

<style>
/* Global styles for the entire application */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  scroll-behavior: smooth;
}

body {
  font-family: "Poppins", sans-serif; /* Using Poppins as per your existing body font */
}

.main-app-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.blog-content img {
  max-width: 100% !important;
  height: auto !important;
  /* border-radius: 10px; */
  object-fit: contain;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
  margin: 20px 0;
  display: block;
}
</style>
