<template>
  <section class="why-herballo-section">
    <div 
      class="why-herballo-container" 
      :class="{ 'animate-in': isVisible }" 
      ref="sectionRef"
    >
      <h2 class="why-herballo-heading">Why Herballo?</h2>

      <div class="why-herballo-content-wrapper">
        <span class="apostrophe-open"> &lsquo; </span>

        <p class="why-herballo-text">
          Herballo is a modern herbal wellness brand rooted in African healing
          traditions and backed by evidence-based insights. We help you restore
          balance, detox naturally, and support long-term health using trusted
          herbal remedies. In a world of quick fixes, Herballo offers safe,
          personalized, and holistic care that works from the ground up. Choose
          Herballo for personalized care, authentic herbal expertise, and a
          commitment to holistic health that puts you first.
        </p>

        <span class="apostrophe-close"> &rsquo; </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sectionRef = ref(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        // Optional: stop observing once it has animated in
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // Triggers when 20% of the section is visible

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});
</script>

<style lang="scss" scoped>
.why-herballo-section {
  background-color: #f7fae5; /* Your Creamy Background */
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  font-family: "Segoe UI", Tahoma, sans-serif;
  overflow: hidden; /* Prevents apostrophes from causing scrollbars during animation */

  @media (min-width: 768px) {
    padding: 8.5rem 0;
  }
}

.why-herballo-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
  width: 100%;
  
  /* Initial State for Animation */
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);

  /* Animation Triggered Class */
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.why-herballo-heading {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 800;
  margin-bottom: 3.5rem;
  color: #105212;
  letter-spacing: -0.8px;
}

.why-herballo-content-wrapper {
  position: relative;
  padding: 0 1.5rem;
  @media (min-width: 768px) { padding: 0 5rem; }
}

.why-herballo-text {
  position: relative;
  z-index: 2;
  font-size: 1.15rem;
  line-height: 1.85;
  color: #1f2937;
  font-weight: 500;
  @media (min-width: 768px) { font-size: 1.35rem; }
}

/* Apostrophes with their own slight delay for "clean" feel */
.apostrophe-open, .apostrophe-close {
  position: absolute;
  font-family: "Georgia", serif;
  color: rgba(16, 82, 18, 0.07);
  line-height: 1;
  user-select: none;
  z-index: 1;
  /* They follow the container but you could add a transition delay here */
}

.apostrophe-open {
  top: -45px; left: -5px; font-size: 11rem;
  @media (min-width: 768px) { top: -95px; left: -50px; font-size: 17rem; }
}

.apostrophe-close {
  bottom: -65px; right: -5px; font-size: 11rem;
  transform: translateY(25%);
  @media (min-width: 768px) { bottom: -115px; right: -50px; font-size: 17rem; }
}
</style>