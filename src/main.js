import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars as fasFaBars, faBookOpen, faBookReader } from '@fortawesome/free-solid-svg-icons';

import { createHead } from '@vueuse/head'


const head = createHead()

library.add(fasFaBars, faBookOpen, faBookReader);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(head)

app.mount('#app');