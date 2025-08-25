<template>
  <footer class="footer-container">
    <GetInTouch />

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
            name="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit" class="subscribe-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
          </button>
        </div>
        <p
          v-if="submissionMessage"
          :class="{
            'error-message': submissionMessage.includes('failed') || submissionMessage.includes('error'),
          }"
        >
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
    
    <!-- Use the new reusable WelcomePopup component -->
    <WelcomePopup
      :show="showPopup"
      :title="popupTitle"
      :message="popupMessage"
      @close="closePopup"
    />
  </footer>
</template>

<script>
import GetInTouch from "@/components/GetInTouch.vue";
import { api } from '@/api'; // Assuming your API utility is at this path
import WelcomePopup from "@/components/popups/WelcomePopup.vue";

export default {
  name: "MyFooter",
  components: {
    GetInTouch,
    WelcomePopup,
  },
  data() {
    return {
      email: "",
      submissionMessage: "",
      isSubmitting: false,
      showPopup: false,
      popupTitle: '',
      popupMessage: '',
    };
  },
  methods: {
    async submitEmail() {
      if (!this.email || !this.email.includes("@")) {
        this.submissionMessage = "Please enter a valid email address.";
        return;
      }

      this.submissionMessage = "";
      this.isSubmitting = true;
      this.showPopup = false;

      try {
        const response = await fetch(api("/api/subscribe"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email }),
        });

        const data = await response.json();

        if (response.ok) {
          this.popupTitle = "Welcome to the Herballo Family! 💚";
          this.popupMessage = "You're in! Thank you for joining Herballo. Journey with us and let's explore the never-ending limits of herbal medicine.";
          this.showPopup = true;
          this.email = ""; // Clear the input
        } else if (response.status === 409) {
          // Already subscribed
          this.popupTitle = "Already Subscribed!";
          this.popupMessage = "We already have your details, but please stay around for more great content!";
          this.showPopup = true;
        } else {
          this.submissionMessage = data.message || "Subscription failed. Please try again.";
        }
      } catch (error) {
        this.submissionMessage = "Network error. Please try again.";
      } finally {
        this.isSubmitting = false;
      }
    },
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>

<style scoped>
/* Your existing footer styles remain unchanged */
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
.error-message {
  color: #dc3545;
  font-weight: bold;
  margin-top: 1rem;
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