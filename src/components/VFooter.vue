<template>
  <footer class="footer-container">
    <!-- The GetInTouch component is placed here -->
    <GetInTouch />

    <div class="signup-box">
      <h2>Live Green! Stay Informed!</h2>
      <p>
        Get the latest on herbal research, healing stories, exclusive offers,
        and product news—directly to your inbox.
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
          <button type="submit" class="subscribe-button">Subscribe</button>
        </div>
        <p
          v-if="submissionMessage && !showWelcomePopup"
          :class="{
            'error-message':
              submissionMessage.includes('failed') ||
              submissionMessage.includes('error') ||
              submissionMessage.includes('valid'),
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

    <!-- Welcome Popup Overlay -->
    <div v-if="showWelcomePopup" class="welcome-popup-overlay">
      <div class="welcome-popup-content">
        <button class="close-popup-button" @click="closeWelcomePopup">
          &times;
        </button>
        <h3>Welcome to the Herballo Family!</h3>
        <p>
          You're in! 💚 Thank you for joining Herballo. Journey with us and
          let's explore the never-ending limits of herbal medicine.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
// Ensure the path to GetInTouch.vue is correct for your project structure
import GetInTouch from "@/components/GetInTouch.vue";

export default {
  name: "MyFooter",
  components: {
    GetInTouch,
  },
  data() {
    return {
      email: "",
      submissionMessage: "",
      showWelcomePopup: false,
    };
  },
  // Methods for your component
  methods: {
    async submitEmail() {
      // Basic client-side validation
      if (!this.email || !this.email.includes("@")) {
        this.submissionMessage = "Please enter a valid email address.";
        return;
      }

      // Clear previous messages and close any existing popup
      this.submissionMessage = "Submitting...";
      this.showWelcomePopup = false; // Ensure popup is hidden during submission

      // Prepare form data for FormSubmit.co
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("_captcha", "false"); // Disable captcha for testing, consider re-enabling for production
      formData.append("_subject", "New Newsletter Subscription from Herballo");

      try {
        // IMPORTANT: Replace 'info@herballo.co' with your actual FormSubmit.co endpoint!
        // This is typically the email address you registered with FormSubmit.co
        const response = await fetch("https://formsubmit.co/info@herballo.co", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          this.submissionMessage = ""; // Clear the text message as popup will handle success
          this.showWelcomePopup = true; // Show the welcome popup
          this.email = ""; // Clear the input field
        } else {
          this.submissionMessage =
            "Subscription failed. Please try again later.";
          console.error(
            "FormSubmit.co response not OK:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        this.submissionMessage =
          "Network error. Please check your connection and try again.";
        console.error("Error submitting form:", error);
      }
    },
    // Function to close the welcome popup
    closeWelcomePopup() {
      this.showWelcomePopup = false;
    },
  },
};
</script>

<style scoped>
/* Your existing footer styles */
.footer-container {
  background-color: rgb(247, 250, 229); /* Updated background color */
  color: #105212; /* Brand green for main text */
  padding: 3rem 1rem 1rem;
  text-align: center;
}

.signup-box {
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 2rem; /* Added padding to separate from footer-info */
}

.signup-box h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.signup-box p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #333; /* Darker grey for body text */
}

/* Newsletter Form Styles */
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
  background-color: #105212; /* Brand green for button */
  color: white;
  border: none;
  padding: 0 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  white-space: nowrap; /* Prevents button text from wrapping */
}

.subscribe-button:hover {
  background-color: #0c3d0e; /* Darker green on hover */
}

/* Submission Message Styles */
.error-message {
  color: #dc3545; /* Red for errors */
  font-weight: bold;
  margin-top: 1rem;
}

/* Footer Info (Copyright and Links) */
.footer-info {
  margin-top: 2rem;
  border-top: 1px solid #ccc; /* Separator line */
  padding-top: 1rem;
  font-size: 0.9rem;
}

.footer-links {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap; /* Allows links to wrap on smaller screens */
}

.footer-links a {
  color: #105212; /* Brand green for footer links */
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

/* --- Welcome Popup Styles --- */
.welcome-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensures popup is on top of other content */
}

.welcome-popup-content {
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 450px;
  margin: 0 20px; /* Provides 20px space on left and right for mobile */
  position: relative;
  animation: fadeInScale 0.3s ease-out forwards; /* Animation for appearance */
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
  /* Consider importing a specific font if "Merriweather" is not globally available */
  font-family: "Merriweather", serif;
  font-size: 2.2rem;
  color: #105212; /* Brand green for popup heading */
  margin-bottom: 1rem;
}

.welcome-popup-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555; /* Dark grey for popup body text */
  margin-bottom: 1.5rem;
}

.popup-cta-button {
  background-color: #38a169; /* Example green for CTA button */
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

/* Animation for popup appearance */
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
