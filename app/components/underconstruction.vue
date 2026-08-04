<template>
  <div class="under-construction-container">
    <div class="logo-animation-wrapper">
      <img
        src="/images/herballo-logo.png"
        alt="Herballo Logo"
        class="construction-logo"
      />
    </div>

    <h1 class="construction-title">Page Under Construction</h1>
    <p class="construction-message">
      We're working hard to bring you something amazing! Please check back soon.
    </p>

    <div class="loader-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <NuxtLink to="/" class="btn-pulse-gradient back-home">
      Return Home
    </NuxtLink>
  </div>
</template>

<script setup>
// In Nuxt 3 script setup, we don't need 'export default' or 'name'
</script>

<style scoped>
.under-construction-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Reduced from 100vh to avoid double scrolling when Navigation is present */
  min-height: calc(100vh - 100px);
  width: 100%;
  text-align: center;
  background-color: transparent;
  padding: 2rem;
  box-sizing: border-box;
  /* Ensuring the font matches the rest of the app */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.logo-animation-wrapper {
  margin-bottom: 2rem;
}

.construction-logo {
  max-width: 180px;
  height: auto;
  animation: popAndShrink 2.5s ease-in-out infinite;
}

@keyframes popAndShrink {
  0%,
  100% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.construction-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  /* Using your brand green */
  color: #105212;
}

.construction-message {
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 500px;
  margin-bottom: 2rem;
  color: #4a5568;
}

/* Loader dots with your brand green */
.loader-dots {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 3rem;
}

.loader-dots span {
  width: 14px;
  height: 14px;
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loader-dots span:nth-child(1) {
  animation-delay: -0.32s;
}
.loader-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Adding the brand pulse button for consistency */
.btn-pulse-gradient {
  display: inline-block;
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  color: #fff;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  animation: pulse-ring 2s infinite;
  transition: transform 0.3s ease;
}

.btn-pulse-gradient:hover {
  transform: scale(1.05);
}

@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

@media screen and (max-width: 768px) {
  .construction-title {
    font-size: 2.2rem;
  }
  .construction-logo {
    max-width: 140px;
  }
}
</style>
