<template>
  <div class="not-found-container">
    <h1 class="error-code">404</h1>
    <h2 class="error-message">Page Not Found</h2>
    <p class="description">
      Oops! The page you're looking for doesn't exist or has been moved.
    </p>
    <router-link to="/" class="home-link">Go to Homepage</router-link>
  </div>
</template>

<script setup>
import { useHead } from "@vueuse/head"; // Or if you're using Vue's built-in useHead from Nuxt-like setup
</script>

<style scoped>
/* Basic styling for the 404 page */
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh; /* Occupy most of the viewport height */
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
}

.error-code {
  font-size: 6rem; /* Large font size */
  font-weight: bold;
  color: #e74c3c; /* Red color for error */
  margin-bottom: 10px;
}

.error-message {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 30px;
  max-width: 600px;
  line-height: 1.5;
}

.home-link {
  display: inline-block;
  padding: 12px 25px;
  background-color: #3498db; /* Blue button */
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.home-link:hover {
  background-color: #2980b9;
}
</style>
