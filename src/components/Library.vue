<template>
  <div class="main">
    <div class="container">
      <div class="text_content">
        <font-awesome-icon :icon="['fas', 'book-reader']" class="library-icon" />
        <h2>Knowledge is the best medicine</h2>
        <p class="text-sub">Explore our extensive library to discover herbs that are touching and transforming lives worldwide. Whether you're seeking healing, inspiration, or knowledge, this is the place to start.</p>
        <button @click="navigateToLearn">Check it here</button>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: "Library",
  components: {
    FontAwesomeIcon
  },
  props: '',
  data() {
    return {}
  },
  methods: {
    navigateToLearn() {
      this.$router.push('/ulearn');
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main {
  background: none !important;
  background-color: transparent !important;
  padding: 2rem 0;
  min-height: 50vh;
  display: flex;
  align-items: center;
}

.container {
  background: none !important;
  background-color: transparent !important;
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.text_content {
  background: none !important;
  background-color: transparent !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
}

.library-icon {
  font-size: 100px;
  color: white;
  margin-bottom: 20px;
}

.text_content h2 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.text-sub {
  margin-top: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 600px;
}

button {
  background-color: #105212;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0d420f;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .library-icon {
    font-size: 80px;
    margin-bottom: 15px;
  }

  .text_content h2 {
    font-size: 2em;
  }

  .text-sub {
    font-size: 0.95em;
    margin-bottom: 15px;
  }

  button {
    padding: 12px 25px;
    font-size: 1rem;
  }
}
</style>