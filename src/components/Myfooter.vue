<template>
  <footer class="footer-container">
    <div class="signup-box">
      <h2>Live Green! Stay Informed!</h2>
      <p>
        Get the latest on herbal research, healing stories, exclusive offers, and product news—directly to your inbox.
      </p>
      <form @submit.prevent="submitEmail">
        <div class="form-group">
          <input type="email" v-model="email" name="email" placeholder="Enter your email" required />
          <button type="submit" class="subscribe-button">Subscribe</button>
        </div>
        <p v-if="submissionMessage && !showWelcomePopup" :class="{'error-message': submissionMessage.includes('failed') || submissionMessage.includes('error') || submissionMessage.includes('valid')}">
          {{ submissionMessage }}
        </p>
      </form>
    </div>

    <div class="footer-info">
      <p>&copy; 2025 Herballo. All rights reserved.</p>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
        <a href="#">Contact</a>
      </div>
    </div>

    <div v-if="showWelcomePopup" class="welcome-popup-overlay">
      <div class="welcome-popup-content">
        <button class="close-popup-button" @click="closeWelcomePopup">&times;</button>
        <h3>Welcome to the Herballo Family!</h3>
        <p>Journey with us and let's explore the never-ending limits of herbal medicine.</p>
        
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const submissionMessage = ref('')
const showWelcomePopup = ref(false) // New reactive variable to control popup visibility

const submitEmail = async () => {
  // Basic client-side validation
  if (!email.value || !email.value.includes('@')) {
    submissionMessage.value = 'Please enter a valid email address.'
    return
  }

  // Clear previous messages and close any existing popup
  submissionMessage.value = 'Submitting...'
  showWelcomePopup.value = false; // Ensure popup is hidden during submission

  // Prepare form data for FormSubmit.co
  const formData = new FormData()
  formData.append('email', email.value)
  formData.append('_captcha', 'false')
  formData.append('_subject', 'New Newsletter Subscription from Herballo')

  try {
    const response = await fetch('https://formsubmit.co/info@herballo.co', {
      // IMPORTANT: Replace 'your@email.com' with your actual email address!
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      submissionMessage.value = ''; // Clear the text message as popup will handle success
      showWelcomePopup.value = true; // Show the welcome popup
      email.value = ''; // Clear the input field
    } else {
      submissionMessage.value = 'Subscription failed. Please try again later.'
      console.error('FormSubmit.co response not OK:', response.status, response.statusText);
    }
  } catch (error) {
    submissionMessage.value = 'Network error. Please check your connection and try again.'
    console.error('Error submitting form:', error);
  }
}

// Function to close the welcome popup
const closeWelcomePopup = () => {
  showWelcomePopup.value = false;
}
</script>

<style scoped>
/* Your existing footer styles */
.footer-container {
  background-color: #ffffff;
  color: #105212;
  padding: 3rem 1rem 1rem;
  text-align: center;
}

.signup-box {
  max-width: 600px;
  margin: 0 auto;
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

/* NEW FORM STYLE */
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

/* Footer Info */
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

/* Styles for submission messages */
.error-message {
  color: #dc3545; /* Red for errors */
  font-weight: bold;
  margin-top: 1rem;
}

/* --- Welcome Popup Styles --- */
.welcome-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.welcome-popup-content {
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 450px;
  /* NEW: Add horizontal margin to prevent it from touching edges on small screens */
  margin: 0 20px; /* Provides 20px space on left and right */
  position: relative;
  animation: fadeInScale 0.3s ease-out forwards;
}

.close-popup-button {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease;
}

.close-popup-button:hover {
  color: #333;
}

.welcome-popup-content h3 {
  font-family: 'Merriweather', serif;
  font-size: 2.2rem;
  color: #105212;
  margin-bottom: 1rem;
}

.welcome-popup-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
}

.popup-cta-button {
  background-color: #38a169;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(56, 161, 105, 0.3);
}

.popup-cta-button:hover {
  background-color: #2f855a;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(56, 161, 105, 0.4);
}

/* Animation for popup */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>