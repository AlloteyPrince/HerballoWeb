import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars as fasFaBars,
  faBookOpen,
  faBookReader,
} from "@fortawesome/free-solid-svg-icons";

import { createHead } from "@vueuse/head";

import { QuillEditor, Quill } from '@vueup/vue-quill'
import QuillSnow from 'quill/themes/snow.js'

// Import core styles
import '@vueup/vue-quill/dist/vue-quill.snow.css'

Quill.register('themes/snow', QuillSnow)

// 🔥 Track page views with Google Analytics
router.afterEach((to) => {
  if (window.gtag) {
    window.gtag("config", "G-FJV7EPR7Z2", {
      page_path: to.fullPath,
    });
  }
});

const head = createHead();

library.add(fasFaBars, faBookOpen, faBookReader);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(head);

app.mount("#app");
