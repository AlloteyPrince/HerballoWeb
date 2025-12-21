<template>
  <div class="main">
    <div class="container">
      <div class="text_content">
        <font-awesome-icon :icon="['fas', 'book-reader']" class="library-icon" />
        <h2>Knowledge is the best medicine</h2>
        <p class="text-sub">Explore our extensive library to discover herbs that are touching and transforming lives worldwide. Whether you're seeking healing, inspiration, or knowledge, this is the place to start.</p>
        
        <button
          @click="navigateToLearn"
          class="library-button"
          :class="{ 'pulse': isPulsing }"
        >
          Check it here
        </button>

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
  data() {
    return {
      isPulsing: false,
    }
  },
  mounted() {
    // Start the pulse animation when the component is mounted
    this.startPulseAnimation();
  },
  methods: {
    navigateToLearn() {
      this.$router.push('/ulearn');
    },
    startPulseAnimation() {
      // Logic for the pulsating effect
      setInterval(() => {
        this.isPulsing = true;
        setTimeout(() => {
          this.isPulsing = false;
        }, 1500); // Animation duration is 2s, so we make the pulse class inactive a bit earlier.
      }, 2000); // Repeat every 2 seconds.
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
  padding: 8rem 0;
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

/* Updated Button Styling to match other components */
.library-button {
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 6px -1px rgba(16, 82, 18, 0.3),
    0 2px 4px -1px rgba(16, 82, 18, 0.2);
  position: relative;
  overflow: hidden;
}

.library-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    0 10px 15px -3px rgba(16, 82, 18, 0.4),
    0 4px 6px -2px rgba(16, 82, 18, 0.3);
}

.library-button.pulse {
  animation: pulse 2s infinite;
}

/* Animations from previous components */
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

  .library-button {
    padding: 12px 25px;
    font-size: 1rem;
  }
}
</style>