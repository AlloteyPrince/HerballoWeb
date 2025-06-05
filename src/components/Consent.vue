<template>
  <div class="consent-wrapper">
    <div class="consent-card">
      <h1>Consent & Terms for Consultation</h1>
      <p class="intro">
        Please read and accept our terms and conditions before booking your
      </p>
      <div class="terms-box">
        <p>
          This consultation is provided with your health and well-being as our
          top priority. By participating, you agree to allow Herballo to support
          you through holistic, herbal-based care.
        </p>
        <p>
          The information you provide will be used solely for your consultation
          and may, with your implicit understanding, contribute to broader
          efforts aimed at improving herbal medicine and promoting natural
          health practices. Any such use will always be anonymous and handled
          with the highest standards of ethical care.
        </p>
        <p>
          We do not share your data with third parties without your permission.
          Your privacy, safety, and trust are deeply important to us. This
          agreement ensures we work together to serve your health and,
          potentially, help shape the future of herbal medicine for others as
          well.
        </p>
      </div>

      <label class="checkbox-label">
        <input type="checkbox" v-model="agreed" />
        I understand and agree to the Terms, Privacy Policy, and responsible
        data use for improving herbal care.
      </label>

      <button
        :disabled="!agreed || isLoading"
        @click="proceed"
        class="proceed-button"
        :class="{ 'is-loading': isLoading }"
      >
        <span v-if="isLoading">Processing...</span>
        <span v-else>Proceed to Booking</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const agreed = ref(false);
const isLoading = ref(false);
const router = useRouter();

// Load the agreed state from local storage on component mount
onMounted(() => {
  const storedAgreed = localStorage.getItem('herballo_consent_agreed');
  if (storedAgreed === 'true') {
    agreed.value = true;
  }
});

// Watch for changes to the agreed value and save it to local storage
watch(agreed, (newAgreed) => {
  localStorage.setItem('herballo_consent_agreed', String(newAgreed));
});

const proceed = async () => {
  if (agreed.value) {
    isLoading.value = true;

    await new Promise(resolve => setTimeout(resolve, 3000));

    router.push("/consultation/booking");
  }
};
</script>

<style scoped>
/* Styles remain the same */
.consent-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: #f0f0f0;
}

.consent-card {
  width: 70%;
  max-width: 600px;
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #105212;
}

@media (max-width: 768px) {
  .consent-card {
    width: 95%;
    padding: 1.5rem;
  }
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
}

.intro {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.terms-box {
  background: #fafafa;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 1.5rem;
  color: #333;
  max-height: 250px;
  overflow-y: auto;
  line-height: 1.6;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #333;
  user-select: none;
}

.proceed-button {
  background-color: #105212;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.proceed-button:disabled {
  background-color: #8fbf8f;
  cursor: not-allowed;
}

.proceed-button:not(:disabled):hover {
  background-color: #0c3d0e;
}

.proceed-button.is-loading {
  background-color: #8fbf8f;
  cursor: wait;
}

.proceed-button.is-loading span:not([v-if]) {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.proceed-button.is-loading span[v-if] {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.proceed-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.proceed-button.is-loading::after {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>