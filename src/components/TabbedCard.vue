<template>
  <div class="tabbed-card-container">
    <h2 class="tabbed-card-main-title">Need Help?</h2>

    <div class="tabs-header">
      <button
        class="tab-button"
        :class="{ 'is-active': activeTab === 'faq' }"
        @click="activeTab = 'faq'"
      >
        Frequently Asked Questions
      </button>
      <button
        class="tab-button"
        :class="{ 'is-active': activeTab === 'contact' }"
        @click="activeTab = 'contact'"
      >
        Contact Us
      </button>
    </div>

    <div class="tabs-content">
      <div v-if="activeTab === 'faq'" class="tab-panel">
        <div class="faq-list">
          <div class="faq-item">
            <h4>Q: What is Herballo?</h4>
            <p>A: Herballo is your trusted source for natural herbal remedies and knowledge, dedicated to promoting holistic well-being through nature's finest.</p>
          </div>
          <div class="faq-item">
            <h4>Q: Are your products organic?</h4>
            <p>A: We prioritize sourcing organic and sustainably harvested herbs whenever possible. Please check individual product descriptions for specific certifications.</p>
          </div>
          <div class="faq-item">
            <h4>Q: How can I contact customer support?</h4>
            <p>A: You can reach our customer support team via the contact form below, or by emailing us at support@herballo.com. We aim to respond within 24-48 hours.</p>
          </div>
          <div class="faq-item">
            <h4>Q: Do you ship internationally?</h4>
            <p>A: Yes, we offer international shipping to many countries. Shipping costs and delivery times vary by destination and will be calculated at checkout.</p>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'contact'" class="tab-panel">
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="form.name" required placeholder="Your Name">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" required placeholder="your.email@example.com">
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" v-model="form.message" rows="5" required placeholder="Your message..."></textarea>
          </div>
          <button type="submit" class="submit-button">Send Message</button>
        </form>
        <p v-if="formMessage" class="form-status-message">{{ formMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabbedCardComponent', // Renamed component
  data() {
    return {
      activeTab: 'faq', // Default active tab
      form: {
        name: '',
        email: '',
        message: '',
      },
      formMessage: '',
    };
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.form);
      this.formMessage = 'Thank you for your message! We will get back to you soon.';
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
      setTimeout(() => {
        this.formMessage = '';
      }, 5000);
    },
  },
};
</script>

<style scoped>
.tabbed-card-container {
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
}

.tabbed-card-main-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 700;
}

.tabs-header {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
}

.tab-button {
  flex: 1;
  padding: 15px 20px;
  background-color: #f0f0f0;
  color: #555;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: center;
  margin-right: 5px; /* Space between tabs */
}

.tab-button:last-child {
  margin-right: 0;
}

.tab-button.is-active {
  background-color: #4CAF50; /* Active tab color (green) */
  color: white;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1); /* Shadow for active tab */
  transform: translateY(-2px); /* Slight lift for active tab */
}

.tab-button:hover:not(.is-active) {
  background-color: #e8f5e9; /* Light green on hover for inactive tabs */
  color: #388e3c;
}

.tabs-content {
  padding: 0 10px;
}

.tab-panel {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* FAQ Section Styling */
.faq-list .faq-item {
  margin-bottom: 20px;
}

.faq-list .faq-item:last-child {
  margin-bottom: 0;
}

.faq-list .faq-item h4 {
  font-size: 1.15rem;
  color: #388e3c; /* Green for questions */
  margin-bottom: 8px;
  font-weight: 600;
}

.faq-list .faq-item p {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

/* Contact Form Styling */
.contact-form .form-group {
  margin-bottom: 20px;
}

.contact-form label {
  display: block;
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 8px;
  font-weight: 500;
}

.contact-form input[type="text"],
.contact-form input[type="email"],
.contact-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.contact-form input[type="text"]:focus,
.contact-form input[type="email"]:focus,
.contact-form textarea:focus {
  border-color: #4CAF50; /* Green focus border */
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2); /* Green focus shadow */
  outline: none;
}

.contact-form textarea {
  resize: vertical; /* Allow vertical resizing */
}

.submit-button {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #4CAF50; /* Green submit button */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.form-status-message {
  margin-top: 20px;
  padding: 10px;
  border-radius: 6px;
  background-color: #d4edda; /* Light green background for success message */
  color: #155724; /* Dark green text */
  border: 1px solid #c3e6cb;
  text-align: center;
  font-size: 1rem;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .tabbed-card-container {
    padding: 15px;
    margin: 20px auto;
  }
  .tabbed-card-main-title {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  .tab-button {
    padding: 12px 15px;
    font-size: 1rem;
  }
  .tab-panel {
    padding: 20px;
  }
  .faq-list .faq-item h4 {
    font-size: 1.05rem;
  }
  .faq-list .faq-item p {
    font-size: 0.95rem;
  }
  .contact-form label {
    font-size: 1rem;
  }
  .contact-form input,
  .contact-form textarea {
    padding: 10px;
    font-size: 0.95rem;
  }
  .submit-button {
    padding: 12px;
    font-size: 1.1rem;
  }
}
