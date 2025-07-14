// frontend/src/main.js

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Font Awesome Imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars as fasFaBars,
  faBookOpen,
  faBookReader,
  faShareAlt // Ensure this is imported for the share icon
} from "@fortawesome/free-solid-svg-icons";

// ⭐ CORRECTED: @vueuse/head setup
import { createHead } from "@vueuse/head"; // Import createHead

// Quill Editor (Rich Text Editor) Imports
import { QuillEditor, Quill } from '@vueup/vue-quill';
import QuillSnow from 'quill/themes/snow.js';
import '@vueup/vue-quill/dist/vue-quill.snow.css'; // Import core Quill styles

// Register QuillSnow theme
Quill.register('themes/snow', QuillSnow);

// Google Analytics Setup
router.afterEach((to) => {
  if (window.gtag) {
    window.gtag("config", "G-FJV7EPR7Z2", {
      page_path: to.fullPath,
    });
  }
});

// Add Font Awesome icons to the library
library.add(fasFaBars, faBookOpen, faBookReader, faShareAlt);

const app = createApp(App);

// Register Font Awesome component globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Register Quill Editor component globally (if you use it in multiple places)
app.component('QuillEditor', QuillEditor);

// Use Vue Router
app.use(router);

// ⭐ CORRECTED: Initialize and use @vueuse/head
const head = createHead(); // Create the head instance
app.use(head);             // Use it with your app

// Mount the app
app.mount("#app");