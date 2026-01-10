<template>
  <div class="consultation-index">
    <div class="info-container">
      <header class="text-center">
        <h1 class="brand-title">Herbal Consultation</h1>
        <p class="brand-subtitle">Your natural wellness journey starts here.</p>
      </header>

      <div class="steps-grid">
        <div v-for="(step, index) in steps" :key="index" class="step-card">
          <div class="step-icon">{{ index + 1 }}</div>
          <div class="step-body">
            <h4>{{ step.displayTitle }}</h4>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>

      <div class="consent-box">
        <div class="terms-viewer">
          <h4 class="red-title">Consent & Terms</h4>
          <p>By proceeding, you agree to allow <strong>Herballo</strong> to support you through holistic, herbal-based care. Your information is treated with medical-grade confidentiality and used solely for your personalized protocol.</p>
          <p>You acknowledge that while our practitioners are experts in herbal medicine, this does not replace emergency medical care. You agree to our data protection policy under GDPR standards.</p>
        </div>

        <div class="agreement-action">
          <label class="check-container">
            <input type="checkbox" v-model="agreed" />
            <span class="checkmark"></span>
            <span class="check-text">I have read and agree to the Terms & Privacy Policy</span>
          </label>

          <button 
            @click="handleProceed" 
            :disabled="!agreed || isLoading"
            class="proceed-btn"
            :class="{ 'btn-loading': isLoading }"
          >
            <span v-if="!isLoading">Start Booking Form</span>
            <span v-else class="loader"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const agreed = ref(false);
const isLoading = ref(false);

const steps = [
  { displayTitle: 'Health Profile', description: 'Briefly share your concerns and goals.' },
  { displayTitle: 'Secure Booking', description: 'Confirm your session via secure payment.' },
  { displayTitle: 'Expert Match', description: 'We pair you with the right herbalist.' },
  { displayTitle: 'Live Session', description: 'Meet virtually and get your herbal plan.' }
];

const handleProceed = async () => {
  if (!agreed.value) return;
  
  // 1. Start the loading state
  isLoading.value = true;
  
  if (process.client) {
    localStorage.setItem('herballo_consent_agreed', 'true');
  }

  // 2. Wait for 1.5 seconds so the user sees the spinner
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // 3. Navigate only after the delay
  return navigateTo('/consultation/booking');
};

useHead({
  title: 'Consultation | Herballo',
});
</script>

<style scoped lang="scss">
/* I'm keeping your styles exactly as you have them */
.consultation-index {
  min-height: 100vh;
  background: #fdfdfb;
  padding: 3rem 1rem;
  color: #2c3e50;
}

.info-container {
  max-width: 900px;
  margin: 0 auto;
}

.brand-title { color: #105212; font-size: 2.5rem; font-weight: 800; }
.brand-subtitle { color: #666; margin-bottom: 3rem; }

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.step-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  .step-icon {
    background: #105212;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  h4 { font-size: 1.1rem; color: #105212; margin-bottom: 0.5rem; }
  p { font-size: 0.85rem; color: #555; line-height: 1.4; }
}

.consent-box {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.terms-viewer {
  padding: 2rem;
  background: #f9fbf9;
  border-bottom: 1px solid #eee;
  max-height: 200px;
  overflow-y: auto;
  font-size: 0.9rem;
  line-height: 1.6;
  
  .red-title { margin-bottom: 1rem; color: #d32f2f; font-weight: bold; }
}

.agreement-action {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.check-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.95rem;
}

.proceed-btn {
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  background: #105212;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;           /* Added to center the loader */
  justify-content: center; /* Added to center the loader */
  align-items: center;     /* Added to center the loader */
  min-height: 52px;        /* Added to keep button size consistent */

  &:disabled { background: #ccc; cursor: not-allowed; }
  
  &:hover:not(:disabled) { 
    background: #2e7d32; 
    transform: translateY(-2px); 
  }
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>