import { createApp } from 'vue'
import App from './App.vue'
// import Hero from '@/components/Hero.vue' // Keep commented out if not used

// Import Font Awesome packages
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import specific icons you want to use
import { faBars as fasFaBars } from '@fortawesome/free-solid-svg-icons'; // Using solid bars

// Add the imported icons to the Font Awesome library
library.add(fasFaBars);

let vm = createApp(App);

// Register the Font Awesome component globally
// This allows you to use <font-awesome-icon> anywhere in your templates
vm.component('font-awesome-icon', FontAwesomeIcon);

// vm.component("Hero", Hero) // Keep commented out if not used

vm.mount('#app');