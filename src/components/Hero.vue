<template>
  <div>
    <div class="hero-section">
      <div class="hero-content-wrapper">
        <p class="hero-1 typed-text"></p>
        <p class="hero-2 static-text">
          Explore the world of herbs. Start your journey today!
        </p>
        <button class="hero-button" @click="navigateToConsultation">
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
  props: {},
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
  padding-top: 8rem; /* Reduced to account for fixed navigation */
  padding-bottom: 5rem;
  text-align: left;
}

.hero-1,
.static-text,
.hero-button {
  position: relative;
  text-align: left;
}

.hero-1 {
  color: white;
  font-size: 3rem;
  line-height: 1.2;
  font-weight: bolder;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.8rem;
  /* Minimal fixed height - just enough for one line to prevent glitch */
  height: calc(3rem * 1.3);
  display: flex;
  align-items: flex-start;
}

.typed-cursor {
  color: white;
  opacity: 1;
  font-weight: normal;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.static-text {
  color: white;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1.5rem;
  margin-top: 0; /* Ensure no extra top margin */
}

.hero-button {
  background-color: #105212;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.hero-button:hover {
  background-color: #45a049;
}

@media screen and (max-width: 800px) {
  .hero-section {
    min-height: 100vh;
    padding: 0 1rem;
  }

  .hero-content-wrapper {
    padding-top: 5rem; /* Reduced for mobile to account for fixed navigation */
    padding-bottom: 3rem;
  }

  .hero-1 {
    font-size: 2rem;
    margin-bottom: 0.6rem;
    /* Minimal fixed height for mobile - just enough for one line */
    height: calc(2rem * 1.3);
    display: flex;
    align-items: flex-start;
  }

  .static-text {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .hero-button {
    padding: 12px 25px;
    font-size: 1rem;
  }
}
</style>
