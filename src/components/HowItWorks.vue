<template>
  <div class="how-it-works-container">
    <div class="how-it-works-content-wrapper">
      <div class="header-section">
        <h2 class="how-it-works-title">
          Your Journey to Better Health in 4 Simple Steps
        </h2>
      </div>

      <div class="steps-container">
        <div class="steps-grid">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="step-card"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <!-- Colored number badge -->
            <div class="step-number" :class="step.numberClass">
              {{ index + 1 }}
            </div>

            <!-- Connecting line (not visible on last step) -->
            <div v-if="index < steps.length - 1" class="connecting-line"></div>

            <!-- Icon -->
            <component :is="step.icon" class="step-icon" :class="step.colorClass" />
            
            <div class="step-content">
              <h3 class="step-title">{{ step.title }}</h3>
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

<script>
export default {
  name: 'ConsultationSteps',
  data() {
    return {
      isPulsing: false,
      steps: [
        {
          title: 'Step 1: Share Your Needs',
          description: 'Tell us a little about yourself and your health concerns. It could also be general or about medicinal herbs. This helps us understand how best to support you.',
          colorClass: 'blue-icon-color',
          numberClass: 'number-blue',
          icon: 'EditIcon'
        },
        {
          title: 'Step 2: Secure Your Consultation',
          description: 'Once you\'ve shared your information, you\'ll proceed to a secure payment page. Your payment confirms your session.',
          colorClass: 'green-icon-color',
          numberClass: 'number-green',
          icon: 'CreditCardIcon'
        },
        {
          title: 'Step 3: Receive Your Meeting Details',
          description: 'After your payment is confirmed, our team will review your information and connect you with the most suitable practitioner or resource person. You\'ll receive all the necessary details (date, time, link, etc.) for your online consultation.',
          colorClass: 'purple-icon-color',
          numberClass: 'number-purple',
          icon: 'MailIcon'
        },
        {
          title: 'Step 4: Your Personalized Consultation',
          description: 'Connect with your chosen practitioner or resource person at the scheduled time from the comfort of your home. Discuss your health needs, ask any questions about medicinal herbs, and receive expert guidance tailored to you.',
          colorClass: 'red-icon-color',
          numberClass: 'number-red',
          icon: 'ShieldCheckIcon'
        }
      ]
    }
  },
  components: {
    EditIcon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      `
    },
    CreditCardIcon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      `
    },
    MailIcon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 13a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
        </svg>
      `
    },
    ShieldCheckIcon: {
      template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.92 12c0 2.872.675 5.61 1.938 8.001A12.004 12.004 0 0012 21c2.872 0 5.61-.675 8.001-1.938A12.004 12.004 0 0021.08 12c0-2.872-.675-5.61-1.938-8.001z" />
        </svg>
      `
    }
  },
  mounted() {
    this.startPulseAnimation();
  },
  methods: {
    navigateToConsultation() {
      if (this.$router) {
        this.$router.push("/consultation");
      } else {
        console.warn("Vue Router not found. Cannot navigate to /consultation.");
      }
    },
    startPulseAnimation() {
      setInterval(() => {
        this.isPulsing = true;
        setTimeout(() => {
          this.isPulsing = false;
        }, 1500);
      }, 2000);
    }
  }
};
</script>

<style scoped>
.how-it-works-container {
  width: 100%;
  padding: 4rem 1rem;
  background: #ffffff;
  min-height: 100vh;
  box-sizing: border-box;
}

.how-it-works-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 4rem;
}

.how-it-works-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.3;
  animation: fadeInDown 0.8s ease-out;
}

.steps-container {
  position: relative;
  margin-bottom: 4rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

@media (min-width: 1024px) {
  .steps-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.step-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
  transform: translateY(30px);
  opacity: 0;
  animation: slideInUp 0.6s ease-out forwards;
}

.step-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06);
}

/* Step number badge */
.step-number {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: bounceIn 0.6s ease-out forwards;
}

.number-blue {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.number-green {
  background: linear-gradient(135deg, #10b981, #059669);
}

.number-purple {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
}

.number-red {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

/* Connecting line between steps */
.connecting-line {
  position: absolute;
  top: 5px;
  left: 50%;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, 
    rgba(16, 82, 18, 0.3) 0%, 
    rgba(34, 197, 94, 0.5) 50%, 
    rgba(16, 82, 18, 0.3) 100%);
  z-index: 0;
  transform-origin: left center;
  animation: lineGrow 1s ease-out forwards;
  animation-delay: 0.8s;
  transform: scaleX(0);
}

@media (max-width: 1023px) {
  .connecting-line {
    display: none;
  }
}

.step-icon {
  width: 3.5rem;
  height: 3.5rem;
  margin: 2rem auto 1.5rem;
  transition: transform 0.3s ease;
  color: currentColor;
  display: block;
  animation: iconFloat 3s ease-in-out infinite;
}

.step-card:hover .step-icon {
  transform: scale(1.15) rotate(5deg);
  animation-play-state: paused;
}

.blue-icon-color { color: #1d4ed8; }
.green-icon-color { color: #059669; }
.purple-icon-color { color: #7c3aed; }
.red-icon-color { color: #dc2626; }

.step-content {
  flex-grow: 1;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.step-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.cta-section {
  text-align: center;
  margin-top: 4rem;
  animation: fadeInUp 1s ease-out;
  animation-delay: 1.2s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.get-started-button {
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

.get-started-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.get-started-button:hover::before {
  opacity: 1;
}

.get-started-button:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow:
    0 10px 15px -3px rgba(16, 82, 18, 0.4),
    0 4px 6px -2px rgba(16, 82, 18, 0.3);
}

.get-started-button:active {
  transform: translateY(0) scale(1.02);
}

.get-started-button.pulse {
  animation: pulse 2s infinite;
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.get-started-button:hover .button-icon {
  transform: translateX(4px);
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes bounceIn {
  0% {
    transform: translateX(-50%) scale(0);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%) scale(1.1);
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}

@keyframes lineGrow {
  to {
    transform: scaleX(1);
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

/* Responsive adjustments */
@media (max-width: 767px) {
  .how-it-works-container {
    padding: 2rem 1rem;
  }

  .step-number {
    width: 45px;
    height: 45px;
    font-size: 1.25rem;
    top: -18px;
  }

  .step-icon {
    width: 3rem;
    height: 3rem;
    margin: 1.5rem auto 1rem;
  }

  .step-card {
    padding: 2rem 1.5rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>