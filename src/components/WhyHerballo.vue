<template>
  <section class="why-herballo-section">
    <div class="why-herballo-container">
      <h2 class="why-herballo-heading">Why Herballo?</h2>

      <div class="why-herballo-content-wrapper">
        <!-- Large opening apostrophe -->
        <span class="apostrophe-open"> &lsquo; </span>

        <p class="why-herballo-text">
          Herballo is a modern herbal wellness brand rooted in African healing
          traditions and backed by evidence-based insights. We help you restore
          balance, detox naturally, and support long-term health using trusted
          herbal remedies. In a world of quick fixes, Herballo offers safe,
          personalized, and holistic care that works from the inside out. Choose
          Herballo for personalized care, authentic herbal expertise, and a
          commitment to holistic health that puts you first.
        </p>

        <!-- Large closing apostrophe -->
        <span class="apostrophe-close"> &rsquo; </span>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "WhyHerballo",
  // No data, props, or methods needed for this static content component
});
</script>

<style scoped>
.why-herballo-section {
  padding-top: 4rem; /* py-16 */
  padding-bottom: 4rem; /* py-16 */
  background-color: rgb(247, 250, 229); /* Updated background color */
  color: #4a5568; /* text-gray-800 */
  display: flex; /* For centering content */
  justify-content: center; /* For centering content horizontally */
}

@media (min-width: 768px) {
  .why-herballo-section {
    padding-top: 6rem; /* md:py-24 */
    padding-bottom: 6rem; /* md:py-24 */
  }
}

.why-herballo-container {
  max-width: 64rem; /* max-w-4xl (approximately, Tailwind's max-w-4xl is 56rem, I've adjusted slightly for aesthetics based on previous styling) */
  margin-left: 1.5rem; /* mx-auto + px-6, so combining margin and padding here for left/right margin */
  margin-right: 1.5rem; /* mx-auto + px-6 */
  padding-left: 1.5rem; /* px-6 */
  padding-right: 1.5rem; /* px-6 */
  text-align: center; /* text-center */
  width: 100%; /* Ensure it takes full width within its max-width */
}

/* Adjustments for mobile view (screens up to 767px wide) */
@media (max-width: 767px) {
  .why-herballo-container {
    margin-left: 1rem; /* Reduced from 1.5rem for more content width */
    margin-right: 1rem; /* Reduced from 1.5rem for more content width */
    padding-left: 1rem; /* Reduced from 1.5rem for more content width */
    padding-right: 1rem; /* Reduced from 1.5rem for more content width */
  }
}

.why-herballo-heading {
  font-size: 2.25rem; /* text-4xl */
  font-weight: 800; /* font-extrabold */
  margin-bottom: 2.5rem; /* mb-10 */
  color: #105212; /* Updated heading color */
}

@media (min-width: 640px) {
  .why-herballo-heading {
    font-size: 3rem; /* sm:text-5xl */
  }
}

.why-herballo-content-wrapper {
  position: relative;
  padding-left: 2rem; /* px-8 */
  padding-right: 2rem; /* px-8 */
}

/* Adjustments for mobile view (screens up to 767px wide) */
@media (max-width: 767px) {
  .why-herballo-content-wrapper {
    padding-left: 1.5rem; /* Reduced from 2rem for more content width */
    padding-right: 1.5rem; /* Reduced from 2rem for more content width */
  }
}

.apostrophe-open {
  position: absolute;
  left: -0.5rem; /* Adjusted for more space from text */
  top: 0;
  font-size: 10rem; /* text-[10rem] */
  line-height: 1; /* leading-none */
  color: rgba(34, 140, 140, 0.2); /* text-primary-light/20 */
  z-index: 0; /* -z-0 */
  user-select: none; /* select-none */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* Added subtle shadow */
  font-family: "Georgia", serif; /* Changed font specifically for apostrophe */
}

@media (min-width: 768px) {
  .apostrophe-open {
    left: -1rem; /* Adjusted for more space on larger screens */
    font-size: 15rem; /* md:text-[15rem] */
  }
}

.why-herballo-text {
  position: relative;
  z-index: 1; /* z-10 */
  font-size: 1.125rem; /* text-lg */
  line-height: 1.75; /* leading-relaxed */
  color: #1f2937; /* text-gray-darker */
  font-weight: 500; /* font-medium */
}

@media (min-width: 768px) {
  .why-herballo-text {
    font-size: 1.25rem; /* md:text-xl */
  }
}

.apostrophe-close {
  position: absolute;
  right: -0.5rem; /* Adjusted for more space from text */
  bottom: 0;
  font-size: 10rem; /* text-[10rem] */
  line-height: 1; /* leading-none */
  color: rgba(34, 140, 140, 0.2); /* text-primary-light/20 */
  z-index: 0; /* -z-0 */
  transform: translateY(25%); /* transform translate-y-1/4 */
  user-select: none; /* select-none */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* Added subtle shadow */
  font-family: "Georgia", serif; /* Changed font specifically for apostrophe */
}

@media (min-width: 768px) {
  .apostrophe-close {
    right: -1rem; /* Adjusted for more space on larger screens */
    font-size: 15rem; /* md:text-[15rem] */
  }
}
</style>
