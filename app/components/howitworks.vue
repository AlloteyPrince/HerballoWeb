<template>
  <div class="how-it-works-container">
    <div class="how-it-works-content-wrapper">
      <div class="header-section">
        <h2 class="how-it-works-title">How it Works</h2>
        <p class="how-it-works-subtitle">Your path to natural wellness in four simple steps.</p>
      </div>

      <div class="steps-container">
        <div class="steps-grid">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="step-card"
          >
            <div class="step-number-circle">
              {{ index + 1 }}
            </div>
            
            <div class="step-content">
              <h3 class="step-title">{{ step.displayTitle }}</h3>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <button
          class="get-started-button"
          @click="navigateToConsultation"
          :class="{ 'pulse': isPulsing }"
        >
          <svg class="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Get Started Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isPulsing = ref(false);

const steps = [
  {
    displayTitle: 'Share Your Needs',
    description: 'Tell us a little about yourself and your health concerns. This helps us understand how best to support you.'
  },
  {
    displayTitle: 'Secure Your Consultation',
    description: 'Once you\'ve shared your information, you\'ll proceed to a secure payment page. Your payment confirms your session.'
  },
  {
    displayTitle: 'Receive Your Meeting Details',
    description: 'Our team will review your information and connect you with the most suitable practitioner. You\'ll receive all the necessary details via email.'
  },
  {
    displayTitle: 'Your Personalized Consultation',
    description: 'Connect with your practitioner at the scheduled time from the comfort of your home and receive expert guidance tailored to you.'
  }
];

const startPulseAnimation = () => {
  setInterval(() => {
    isPulsing.value = true;
    setTimeout(() => { isPulsing.value = false; }, 1500);
  }, 2000);
};

onMounted(() => {
  startPulseAnimation();
});

const navigateToConsultation = () => {
  navigateTo('/consultation');
};
</script>

<style lang="scss" scoped>
* { box-sizing: border-box; }

.how-it-works-container {
  width: 100%;
  padding: 8rem 5%;
  /* IMPROVED GRADIENT BACKGROUND FEATURE */
  /* This creates a soft blend from top-left white to a very light mint-green at bottom-right */
  background: 
    radial-gradient(circle at top left, rgba(255, 255, 255, 1) 0%, rgba(240, 249, 241, 0.4) 40%, rgba(255, 255, 255, 1) 100%),
    linear-gradient(135deg, #ffffff 0%, #f1f8f3 100%);
  
  min-height: 90vh;
  display: flex;
  align-items: center;
  font-family: "Segoe UI", Tahoma, sans-serif;
  overflow: hidden;
}

.how-it-works-content-wrapper {
  max-width: 1250px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
}

.header-section {
  text-align: center;
  margin-bottom: 5.5rem;

  .how-it-works-title {
    font-size: clamp(2.4rem, 5vw, 3.4rem);
    font-weight: 800;
    color: #105212;
    margin-bottom: 1.2rem;
    letter-spacing: -1px;
  }

  .how-it-works-subtitle {
    color: #475569;
    font-size: 1.2rem;
    max-width: 650px;
    margin: 0 auto;
    font-weight: 400;
  }
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2.5rem;
}

.step-card {
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent to let gradient show through */
  backdrop-filter: blur(8px); /* Subtle glass effect */
  border-radius: 1.5rem;
  padding: 4rem 2.2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-15px);
    background: white;
    box-shadow: 0 25px 50px -12px rgba(16, 82, 18, 0.15);
    border-color: #d1dbd3;
  }
}

.step-number-circle {
  width: 60px;
  height: 60px;
  background-color: #105212;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 2.2rem;
  box-shadow: 0 0 0 10px rgba(16, 82, 18, 0.08);
}

.step-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.2rem;
}

.step-description {
  color: #475569;
  line-height: 1.8;
  font-size: 1rem;
}

.cta-section {
  text-align: center;
  margin-top: 6rem;
}

.get-started-button {
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  color: white;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 1.3rem 3.8rem;
  border-radius: 4rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(16, 82, 18, 0.3);

  &:hover {
    transform: scale(1.06);
    box-shadow: 0 15px 30px rgba(16, 82, 18, 0.4);
  }

  &.pulse { animation: pulse-animation 2s infinite; }
}

.button-icon { width: 1.5rem; height: 1.5rem; }

@keyframes pulse-animation {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

@media (max-width: 768px) {
  .how-it-works-container { padding: 5rem 1.5rem; }
  .step-card { padding: 3rem 1.5rem; }
}
</style>