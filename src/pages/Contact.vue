<template>
  <div>
    <Navigation/>
  <div class="contact-us-page">
    <section class="contact-header">
      <h1>Get in Touch with Herballo</h1>
      <p>Have a question about our herbal medical consultations? Interested in our education programs? Or need assistance with product development? We're here to help!</p>
    </section>

    <section class="contact-info">
      <h2>Contact Information</h2>
      <div class="info-item">
        <i class="icon email-icon"></i> <strong>Email:</strong> <a href="mailto:info@herballo.co">info@herballo.co</a>
      </div>
      <div class="info-item">
        <i class="icon phone-icon"></i> <strong>Phone:</strong> <a href="tel:[Your Herballo Phone Number]">[Your Herballo Phone Number]</a>
        <p class="note">**Highly Recommended:** Please replace this with your actual phone number for direct contact.</p>
      </div>
      <div class="info-item">
        <i class="icon clock-icon"></i> <strong>Operating Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (GMT)
      </div>
      <div class="social-links">
        <h3>Connect With Us</h3>
        <a href="[Your Facebook URL]" target="_blank" class="social-icon facebook-icon"></a> <a href="[Your Instagram URL]" target="_blank" class="social-icon instagram-icon"></a> <a href="[Your LinkedIn URL]" target="_blank" class="social-icon linkedin-icon"></a> <p class="note">**Optional:** Add your social media links and corresponding icons.</p>
      </div>
    </section>

    <section class="contact-form-section">
      <h2>Send Us a Message</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_next" value="https://www.herballo.co/thank-you"> <div class="form-group">
          <label for="name">Your Name:</label>
          <input type="text" id="name" name="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="email">Your Email:</label>
          <input type="email" id="email" name="email" v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="subject">Subject:</label>
          <select id="subject" name="subject" v-model="form.subject" required>
            <option value="">Select a Subject</option>
            <option value="Consultation Inquiry">Consultation Inquiry</option>
            <option value="Product Development Services">Product Development Services</option>
            <option value="Education/Workshop Question">Education/Workshop Question</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Website Support">Website Support</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">Your Message:</label>
          <textarea id="message" name="message" v-model="form.message" rows="6" required></textarea>
        </div>
        <button type="submit" class="submit-button">Send Message</button>
        <p class="form-note">By submitting this form, you agree to our <router-link to="/privacy-policy">Privacy Policy</router-link>.</p>
        <p v-if="formStatus" :class="formStatus.type">{{ formStatus.message }}</p>
      </form>
      <p class="backend-note">**IMPORTANT:** Form submissions are handled by FormSubmit.co. You'll need to confirm your email with FormSubmit for the first submission.</p>
    </section>
  </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'ContactUs',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      formStatus: null // null, { type: 'success', message: '...' } or { type: 'error', message: '...' }
    };
  },
  methods: {
    async submitForm() {
      this.formStatus = null; // Clear previous status
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('email', this.form.email);
      formData.append('subject', this.form.subject);
      formData.append('message', this.form.message);

      // Add FormSubmit specific hidden fields
      formData.append('_captcha', 'false'); // Disable captcha for simpler testing, but consider enabling for production
      formData.append('_next', 'https://www.herballo.co/thank-you'); // Redirect to your thank you page

      try {
        const response = await fetch("https://formsubmit.co/info@herballo.co", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // FormSubmit successfully received the submission.
          // The user will be redirected by FormSubmit via the _next field.
          // We can show a temporary success message before redirection if needed,
          // but typically FormSubmit handles the full success feedback.
          this.formStatus = { type: 'success', message: 'Redirecting you to our thank-you page...' };
          // Clear the form after successful submission (before redirection)
          this.form.name = '';
          this.form.email = '';
          this.form.subject = '';
          this.form.message = '';

          // Note: FormSubmit will handle the actual redirection based on _next.
          // You don't usually need a manual window.location.href here.

        } else {
          // FormSubmit returned an error (e.g., email not configured, invalid input)
          this.formStatus = { type: 'error', message: 'Failed to send message. Please check your input and try again.' };
          console.error('FormSubmit error response:', response.status, response.statusText);
        }
      } catch (error) {
        // Network error or other fetch-related issues
        this.formStatus = { type: 'error', message: 'An error occurred. Please check your internet connection and try again.' };
        console.error('Network or fetch error:', error);
      }
    }
  }
};
</script>

<style scoped>
/* All the previous styling is retained and should be placed here */
.contact-us-page {
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.contact-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.contact-header h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 10px;
}

.contact-header p {
  font-size: 1.1em;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
}

.contact-info,
.contact-form-section {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #f0f0f0;
}

.contact-form-section:last-child {
  border-bottom: none;
}

h2 {
  color: #4CAF50; /* Primary green for section titles */
  font-size: 1.8em;
  margin-bottom: 25px;
  text-align: center;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #555;
}

.info-item strong {
  color: #2c3e50;
  min-width: 80px; /* Align text better */
  margin-right: 10px;
}

.info-item a {
  color: #4CAF50;
  text-decoration: none;
}

.info-item a:hover {
  text-decoration: underline;
}

.icon {
  display: inline-block;
  width: 24px; /* Adjust size of your icons */
  height: 24px;
  background-color: #4CAF50; /* Placeholder for icon background */
  border-radius: 50%;
  margin-right: 15px;
  /* Add specific SVG or background-image for real icons */
}

/* Example icon placeholders (replace with actual icons) */
.email-icon { background-color: #FFC107; } /* Yellow for email icon */
.phone-icon { background-color: #03A9F4; } /* Blue for phone icon */
.clock-icon { background-color: #9C27B0; } /* Purple for clock icon */
.facebook-icon { background-color: #3B5998; }
.instagram-icon { background-image: linear-gradient(to right, #833AB4, #FD1D1D, #FCB045); }
.linkedin-icon { background-color: #0077B5; }


.note {
  font-size: 0.9em;
  color: #777;
  margin-top: 5px;
  margin-left: 40px; /* Indent under icon */
  font-style: italic;
}

.social-links {
  margin-top: 30px;
  text-align: center;
}

.social-links h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.social-icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
  background-color: #ccc; /* Placeholder background */
  /* Add specific SVG or background-image for real icons */
}

/* Contact Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #2c3e50;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  box-sizing: border-box; /* Include padding in width */
}

.form-group textarea {
  resize: vertical; /* Allow vertical resizing */
  min-height: 120px;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: background-color 0.3s ease;
  align-self: flex-start; /* Align button to the left */
}

.submit-button:hover {
  background-color: #45a049;
}

.form-note {
  font-size: 0.9em;
  color: #777;
  margin-top: 10px;
  text-align: left;
}

.backend-note {
  font-size: 0.85em;
  color: #e67e22; /* Orange for warnings */
  margin-top: 20px;
  text-align: center;
  border: 1px solid #e67e22;
  padding: 10px;
  border-radius: 5px;
  background-color: #fef8e7;
}

/* Form status messages */
.success {
  color: #27ae60; /* Green */
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
}

.error {
  color: #c0392b; /* Red */
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
}
</style>