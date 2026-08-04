<template>
  <section class="hero-section">
    <div class="hero-content-wrapper" :class="{ 'fade-in-up': isLoaded }">
      <div class="hero-text-block">
        <h1 class="hero-title">
          <span ref="typedElement" class="typed-text"></span>
        </h1>

        <p class="hero-subtitle">
          Explore the world of herbs. Start your journey today!
        </p>

        <div class="btn-container">
          <button class="hero-button pulse" @click="navigateToConsultation">
            <svg
              class="button-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span class="btn-text">Book a Consultation</span>
          </button>
        </div>
      </div>
    </div>

    <div
      class="scroll-arrow-wrapper"
      :style="{ opacity: scrollOpacity }"
      @click="scrollToContent"
    >
      <div class="long-arrow">
        <div class="stalk"></div>
        <div class="head"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Typed from "typed.js";

const typedElement = ref(null);
const isLoaded = ref(false);
const scrollY = ref(0);
let typedInstance = null;

const scrollOpacity = computed(() => {
  const opacity = 1 - scrollY.value / 120;
  return opacity < 0 ? 0 : opacity;
});

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

const navigateToConsultation = () => navigateTo("/consultation");

const scrollToContent = () => {
  window.scrollTo({ top: window.innerHeight - 85, behavior: "smooth" });
};

onMounted(() => {
  isLoaded.value = true;
  window.addEventListener("scroll", handleScroll);

  const options = {
    strings: [
      "Research herbal medicines",
      "Discover natural remedies",
      "Book your consultation",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  };

  if (typedElement.value) {
    typedInstance = new Typed(typedElement.value, options);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (typedInstance) typedInstance.destroy();
});
</script>

<style scoped>
.hero-section {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  min-height: 80vh;
  background-image: url("/images/herballothemeimg.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
  padding: 0;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 1;
}

.hero-content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  padding: 0 5%;
  margin: 0 auto;
  opacity: 0;
}

.fade-in-up {
  animation: fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-title {
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4.2rem;
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.03em;
  margin-bottom: 0.8rem;
  white-space: nowrap;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.4rem;
  margin-bottom: 2rem; /* Slightly more air */
  font-weight: 400;
  font-family: "Segoe UI", sans-serif;
}

/* --- ENHANCED BUTTON STYLES --- */
.hero-button {
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  color: white;
  font-family: "Segoe UI", sans-serif;
  font-weight: 600;
  font-size: 1.1rem; /* Increased font size */
  padding: 1.1rem 3.2rem; /* Increased width and height */
  border-radius: 50px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 14px; /* More space between icon and text */
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  box-shadow: 0 10px 20px -10px rgba(16, 82, 18, 0.5);
}

.hero-button:hover {
  transform: translateY(-3px);
  filter: brightness(1.1);
  box-shadow: 0 15px 30px -12px rgba(16, 82, 18, 0.6);
}

.button-icon {
  width: 1.25rem; /* Balanced icon size */
  height: 1.25rem;
  flex-shrink: 0;
}

/* GHOST BOUNCE ARROW */
.scroll-arrow-wrapper {
  position: absolute;
  bottom: 40px;
  right: 15%; 
  z-index: 3;
  cursor: pointer;
  transition: opacity 0.4s ease-out;
}

.long-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ghost-bounce 2.5s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
}

.stalk {
  width: 2px;
  height: 70px;
  background: white;
}
.head {
  width: 12px;
  height: 12px;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(45deg);
  margin-top: -8px;
}

@keyframes ghost-bounce {
  0% { transform: translateY(-10px); opacity: 0; }
  50% { transform: translateY(15px); opacity: 1; }
  100% { transform: translateY(30px); opacity: 0; }
}

@media (max-width: 1100px) {
  .hero-title { font-size: 3rem; white-space: normal; }
  .scroll-arrow-wrapper { right: 10%; }
}

@media (max-width: 850px) {
  .hero-section { min-height: 100vh; }
  .hero-content-wrapper { text-align: center; }
  .hero-title { font-size: 2.2rem; white-space: normal; }
  .hero-button {
    font-size: 1rem;
    padding: 1rem 2.4rem; /* Tightened for mobile but still large */
  }
  .scroll-arrow-wrapper { 
    right: auto; 
    left: 50%; 
    transform: translateX(-50%); 
  }
}

.hero-button.pulse { animation: pulse-glow 2s infinite; }
@keyframes pulse-glow {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
  70% { box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}
</style>