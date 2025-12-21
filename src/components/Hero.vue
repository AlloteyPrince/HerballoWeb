<template>
  <div>
    <div class="hero-section">
      <div class="hero-content-wrapper">
        <p class="hero-1 typed-text"></p>
        <p class="hero-2 static-text">
          Explore the world of herbs. Start your journey today!
        </p>
        <button class="hero-button pulse" @click="navigateToConsultation">
          <svg class="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Book a Consultation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Typed from "typed.js";

export default {
  name: "Hero",
  data() {
    return {
      typed: null,
    };
  },
  mounted() {
    this.initTypedAnimation();
  },
  beforeUnmount() {
    if (this.typed) {
      this.typed.destroy();
    }
  },
  methods: {
    initTypedAnimation() {
      const options = {
        strings: [
          "Research herbal medicines",
          "Discover natural remedies",
          "Book your consultation now!",
        ],
        typeSpeed: 50,
        backSpeed: 25,
        startDelay: 500,
        backDelay: 1500,
        loop: true,
        loopCount: Infinity,
        showCursor: true,
        cursorChar: "|",
      };
      this.typed = new Typed(".typed-text", options);
    },
    navigateToConsultation() {
      this.$router.push("/consultation");
    },
  },
};
</script>

<style scoped>
.hero-section {
  width: 100%;
  min-height: 80vh;
  background-image: url(../images/ha7.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.hero-content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 900px;
  width: 100%;
  margin: auto;
  padding-top: 8rem;
  padding-bottom: 5rem;
  text-align: left;
}

.hero-1 {
  color: white;
  font-size: 3rem;
  line-height: 1.2;
  font-weight: bolder;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.8rem;
  height: calc(3rem * 1.3);
  display: flex;
  align-items: flex-start;
}

.static-text {
  color: white;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  margin-top: 0;
}

/* --- UPDATED BUTTON STYLES --- */
.hero-button {
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 6px -1px rgba(16, 82, 18, 0.3), 
    0 2px 4px -1px rgba(16, 82, 18, 0.2);
  position: relative;
  overflow: hidden;
}

/* Shimmer Effect */
.hero-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-button:hover::before {
  opacity: 1;
}

.hero-button:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 10px 15px -3px rgba(16, 82, 18, 0.4), 
    0 4px 6px -2px rgba(16, 82, 18, 0.3);
}

.hero-button:active {
  transform: translateY(0) scale(1.02);
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.hero-button:hover .button-icon {
  transform: translateX(4px);
}

/* Pulse Animation */
.hero-button.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 
      0 4px 6px -1px rgba(16, 82, 18, 0.3), 
      0 2px 4px -1px rgba(16, 82, 18, 0.2), 
      0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  50% {
    box-shadow: 
      0 4px 6px -1px rgba(16, 82, 18, 0.3), 
      0 2px 4px -1px rgba(16, 82, 18, 0.2), 
      0 0 0 10px rgba(34, 197, 94, 0);
  }
}

/* Mobile Adjustments */
@media screen and (max-width: 800px) {
  .hero-section {
    min-height: 100vh;
    padding: 0 1rem;
  }

  .hero-content-wrapper {
    padding-top: 5rem;
    padding-bottom: 3rem;
  }

  .hero-1 {
    font-size: 2rem;
    height: calc(2rem * 1.3);
  }

  .hero-button {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
}
</style>