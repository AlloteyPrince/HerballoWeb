<template>
  <footer class="footer-container">
    
    <Getintouch />

    <div class="signup-box">
      <h2>Live Green! Stay Informed!</h2>
      <p>
        Get the latest on herbal research, healing stories, exclusive offers,
        and product news directly to your inbox.
      </p>
      
      <form @submit.prevent="submitEmail">
        <div class="form-group">
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit" class="subscribe-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
          </button>
        </div>
        
        <p
          v-if="submissionMessage"
          class="message"
          :class="{ 'error-message': submissionMessage.toLowerCase().includes('failed') || submissionMessage.toLowerCase().includes('error') }"
        >
          {{ submissionMessage }}
        </p>
      </form>
    </div>

    <div class="footer-info">
      <p>&copy; 2025 Herballo. All rights reserved.</p>
      <div class="footer-links">
        <NuxtLink to="/privacypolicy">Privacy Policy</NuxtLink>
        <NuxtLink to="/termsofuse">Terms of Use</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </div>
    </div>
    
    <Welcomepopup
      :show="showPopup"
      :title="popupTitle"
      :message="popupMessage"
      @close="closePopup"
    />
  </footer>
</template>

<script setup>
import Welcomepopup from './popups/welcomepopup.vue'


// Reactive state (replacing 'data')
const email = ref('')
const submissionMessage = ref('')
const isSubmitting = ref(false)
const showPopup = ref(false)
const popupTitle = ref('')
const popupMessage = ref('')

// Methods
const submitEmail = async () => {
  if (!email.value || !email.value.includes("@")) {
    submissionMessage.value = "Please enter a valid email address."
    return
  }

  submissionMessage.value = ""
  isSubmitting.value = true
  showPopup.value = false

  try {
    // Nuxt $fetch automatically stringifies the body and parses JSON responses
    await $fetch("/api/subscribe", {
      method: "POST",
      body: { email: email.value },
      onResponse({ response }) {
        if (response.ok) {
          popupTitle.value = "Welcome to the Herballo Family! 💚"
          popupMessage.value = "You're in! Thank you for joining Herballo. Journey with us and let's explore the never-ending limits of herbal medicine."
          showPopup.value = true
          email.value = "" // Clear the input
        }
      },
      onResponseError({ response }) {
        if (response.status === 409) {
          popupTitle.value = "Already Subscribed!"
          popupMessage.value = "We already have your details, but please stay around for more great content!"
          showPopup.value = true
        } else {
          submissionMessage.value = response._data?.message || "Subscription failed. Please try again."
        }
      }
    })
  } catch (error) {
    // Only handles actual network failures
    if (error.status !== 409) {
      submissionMessage.value = "Network error. Please try again."
    }
  } finally {
    isSubmitting.value = false
  }
}

const closePopup = () => {
  showPopup.value = false
}
</script>


<style scoped>
.footer-container {
  background-color: rgb(247, 250, 229);
  color: #105212;
  padding: 3rem 1rem 1rem;
  text-align: center;
}
.signup-box {
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 2rem;
}
.signup-box h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.signup-box p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #333;
}
.form-group {
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f9f9f9;
}
.form-group input[type="email"] {
  flex: 1;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  outline: none;
  background-color: transparent;
}
.subscribe-button {
  background-color: #105212;
  color: white;
  border: none;
  padding: 0 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  white-space: nowrap;
}
.subscribe-button:hover {
  background-color: #0c3d0e;
}
.message {
  margin-top: 1rem;
  font-size: 0.9rem;
}
.error-message {
  color: #dc3545;
  font-weight: bold;
}
.footer-info {
  margin-top: 2rem;
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  font-size: 0.9rem;
}
.footer-links {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.footer-links a {
  color: #105212;
  text-decoration: none;
}
.footer-links a:hover {
  text-decoration: underline;
}
</style>