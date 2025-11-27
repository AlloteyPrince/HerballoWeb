<template>
  <div class="how-it-works-container">
    <div class="how-it-works-content-wrapper">
      <div class="header-section">
        <h2 class="how-it-works-title">
          How it works
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
            <!-- Step number with icon inside -->
            <div class="step-number" :class="step.numberClass">
              <component :is="step.icon" class="number-icon" />
            </div>

            <!-- Icon below -->
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
  margin-bottom: 1rem;
  line-height: 1.3;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

/* Card */
.step-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  transform: translateY(30px);
  opacity: 0;
  animation: slideInUp 0.6s ease-out forwards;
}

.step-card:hover {
  transform: translateY(-10px) scale(1.02);
}

/* Number badge with icon */
.step-number {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.number-icon {
  width: 24px;
  height: 24px;
}

/* Soft faint backgrounds */
.number-blue {
  background: rgba(59,130,246,0.15);
  color: #1d4ed8;
}

.number-green {
  background: rgba(16,185,129,0.15);
  color: #059669;
}

.number-purple {
  background: rgba(168,85,247,0.15);
  color: #7c3aed;
}

.number-red {
  background: rgba(239,68,68,0.15);
  color: #dc2626;
}

/* Icons below */
.step-icon {
  width: 3rem;
  height: 3rem;
  margin: 2rem auto 1.2rem;
  animation: iconFloat 3s infinite ease-in-out;
}

.blue-icon-color { color: #1d4ed8; }
.green-icon-color { color: #059669; }
.purple-icon-color { color: #7c3aed; }
.red-icon-color { color: #dc2626; }

/* Text */
.step-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

.step-description {
  color: #64748b;
  line-height: 1.6;
  margin-top: 0.75rem;
}

/* CTA */
.cta-section {
  text-align: center;
  margin-top: 4rem;
}

.get-started-button {
  background: linear-gradient(135deg, #105212, #22c55e);
  color: white;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Animations */
@keyframes slideInUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
