<template>
  <section class="library-parallax-section" ref="libraryRef">
    <div class="parallax-overlay"></div>

    <div class="container" :class="{ 'animate-in': isVisible }">
      <div class="text_content">
        <div class="library-icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="library-icon"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        </div>

        <h2 class="library-title">Knowledge is the best medicine</h2>

        <p class="text-sub">
          Explore our extensive library to discover herbs that are touching and
          transforming lives worldwide. Whether you're seeking healing,
          inspiration, or knowledge, this is the place to start.
        </p>

        <button
          @click="navigateToLearn"
          class="library-button"
          :class="{ pulse: isPulsing }"
        >
          Check it here
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);
const libraryRef = ref(null);
const isPulsing = ref(false);

const navigateToLearn = () => {
  navigateTo("/ulearn");
};

const startPulseAnimation = () => {
  setInterval(() => {
    isPulsing.value = true;
    setTimeout(() => {
      isPulsing.value = false;
    }, 1500);
  }, 2000);
};

onMounted(() => {
  startPulseAnimation();
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true;
      }
    },
    { threshold: 0.2 }
  );

  if (libraryRef.value) observer.observe(libraryRef.value);
});
</script>

<style lang="scss" scoped>
.library-parallax-section {
  position: relative;
  padding: 10rem 0;
  min-height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;

  /* THE PARALLAX MAGIC */
  background-image: url("/images/hmkl.jpg");
  background-attachment: fixed; /* This keeps the image static while content rolls */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  font-family: "Segoe UI", Tahoma, sans-serif;
  overflow: hidden;

  /* Mobile Fix: Parallax often stutters on mobile, so we disable 'fixed' for small screens */
  @media (max-width: 1024px) {
    background-attachment: scroll;
  }
}

.parallax-overlay {
  position: absolute;
  inset: 0;
  /* Dark green-tinted overlay for branding */
  background: linear-gradient(
    180deg,
    rgba(16, 82, 18, 0.6) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2; /* Ensures text is above the overlay */
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 1200px;
  width: 100%;

  opacity: 0;
  transform: translateY(40px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.text_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
}

.library-icon-wrapper {
  margin-bottom: 1.5rem;
  .library-icon {
    width: 90px;
    height: 90px;
    color: #22c55e; /* Highlighted icon color */
    filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.4));
  }
}

.library-title {
  font-size: clamp(2.2rem, 6vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1.2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.text-sub {
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 750px;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
}

.library-button {
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  color: white;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 1.3rem 4rem;
  border-radius: 4rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(16, 82, 18, 0.5);
    border-color: white;
  }

  &.pulse {
    animation: pulse-shadow 2s infinite;
  }
}

@keyframes pulse-shadow {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}
</style>
