<template>
  <footer class="footer-container">
    <div class="signup-box">
      <h2>Live Green! Stay Informed!</h2>
      <p>
        Get the latest on herbal research, healing stories, exclusive offers, and product news—directly to your inbox.
      </p>
      <form @submit.prevent="submitEmail">
        <div class="form-group">
          <input type="email" v-model="email" placeholder="Enter your email" required />
          <button class="subscribe-button">Subscribe</button>
        </div>
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
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const submitEmail = () => {
  alert(`Thanks for subscribing, ${email.value}!`)
  email.value = ''
}
</script>

<style scoped>
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
</style>
