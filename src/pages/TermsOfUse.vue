<template>
  <div class="terms-of-use-page">
    <section class="terms-header">
      <h1>Herballo Terms of Use</h1>
      <p><strong>Last Updated:</strong> June 9, 2025</p>
    </section>

    <section class="terms-section">
      <h2>1. Welcome to Herballo – Your Health Partner</h2>
      <p>This document explains the rules for using our website (<a href="https://www.herballo.co" target="_blank">www.herballo.co</a>) and all our services. By using our site or booking our services, you agree to these rules and our <router-link to="/privacy-policy">Privacy Policy</router-link>. If you don't agree, please don't use our site or services.</p>
      <p>Herballo provides **medical consultations, diagnosis, and treatment using herbal medicine**, conducted by our **licensed and trained Medical Herbalists**.</p>
      <p>We also offer herbal education and product development services for other businesses.</p>
    </section>

    <section class="terms-section">
      <h2>2. Who Can Use Our Services</h2>
      <p>You must be at least **18 years old** to book medical consultations or engage in product development services with Herballo.</p>
    </section>

    <section class="terms-section">
      <h2>3. Our Services (What We Do)</h2>
      <h3>Medical Herbal Consultations:</h3>
      <ul>
        <li>These are professional medical consultations where our licensed Medical Herbalists diagnose your conditions and provide treatment plans using herbal medicine.</li>
        <li>**Our Practitioners:** All consultations are conducted by Medical Herbalists who are licensed and trained in Ghana, adhering to the standards set by the Traditional Medicine Practice Council (TMPC).</li>
        <li>**Your Role:** You must provide accurate and complete health information. You are responsible for following the agreed-upon treatment plan and for informing your other healthcare providers about your herbal treatment.</li>
      </ul>

      <h3>Herbal Education:</h3>
      <ul>
        <li>We offer courses and workshops to teach you about herbal medicine. The materials are for your learning and cannot be shared or copied without our permission.</li>
      </ul>

      <h3>Herbal Product Development Services:</h3>
      <ul>
        <li>We help *other businesses and individuals* create and improve their own herbal products. We guide you on things like ingredients and how to meet regulations (like Ghana FDA).</li>
        <li>**Please remember:** You (our client) are responsible for your final product and making sure it meets all legal requirements for sale. We advise; you're responsible for the finished product.</li>
      </ul>
    </section>

    <section class="terms-section">
      <h2>4. How You Use Our Site</h2>
      <ul>
        <li>**Be Responsible:** Use our site and services lawfully and respectfully. Don't use our site for anything illegal, to harm anyone, or to copy our content without our permission.</li>
        <li>**Your Account (if you have one):** Keep your account details (like your password) safe. You're responsible for what happens with your account.</li>
      </ul>
    </section>

    <section class="terms-section">
      <h2>5. Important Considerations</h2>
      <ul>
        <li>**Scope of Practice:** Our Medical Herbalists provide care within the recognized scope of medical herbalism in Ghana. For complex or severe conditions, or if you have concerns, we may recommend you also consult with conventional medical doctors.</li>
        <li>**Individual Results:** While our goal is to provide effective care, individual responses to herbal treatments can vary.</li>
        <li>**Your Health Information:** We treat all your medical and personal information with strict confidentiality, as detailed in our Privacy Policy.</li>
        <li>**Product Development Responsibility:** For any product we help *you* develop, the ultimate legal responsibility for its safety, quality, and compliance with Ghana FDA regulations (including registration) rests with **you**, the client, as the product owner/seller.</li>
      </ul>
    </section>

    <section class="terms-section">
      <h2>6. Our Rights & Your Agreement</h2>
      <ul>
        <li>**Our Content:** All the content on our website (words, pictures, course materials) belongs to Herballo.</li>
        <li>**Limitation of Responsibility:** We are not responsible for any big losses or damages you might face from using our site or services beyond what Ghanaian law allows.</li>
        <li>**Governing Law:** These terms are based on the laws of **Ghana**. If there's a disagreement, we'll try to resolve it amicably, but it would fall under Ghanaian law.</li>
      </ul>
    </section>

    <section class="terms-section">
      <h2>7. Changes to These Terms</h2>
      <p>We might update these rules from time to time. If we make big changes, we'll let you know (e.g., by email or a prominent notice on our site). By continuing to use our site or services after changes, you agree to the new terms.</p>
    </section>

    <section class="terms-section">
      <h2>8. Contact Us</h2>
      <p>If you have any questions about these terms, please reach out:</p>
      <ul>
        <li>**Email:** <a href="mailto:info@herballo.co">info@herballo.co</a></li>
        <li>**Website:** <a href="https://www.herballo.co/contact" target="_blank">www.herballo.co/contact</a></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TermsOfUse',
  // No data() or methods needed as content is directly in template and no interactive elements are specified.
};
</script>

<style scoped>
/* Basic styling for the terms of use page */
.terms-of-use-page {
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

.terms-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.terms-header h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 10px;
}

.terms-header p {
  font-size: 1.1em;
  color: #555;
}

.terms-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #f0f0f0;
}

.terms-section:last-child {
  border-bottom: none; /* No border for the last section */
}

.terms-section h2 {
  color: #4CAF50; /* Primary green for section titles */
  font-size: 1.8em;
  margin-bottom: 15px;
  text-align: left;
}

.terms-section h3 {
  color: #333;
  font-size: 1.3em;
  margin-top: 25px;
  margin-bottom: 10px;
  text-align: left;
}

.terms-section p,
.terms-section ul {
  margin-bottom: 15px;
  text-align: left;
}

.terms-section ul {
  list-style: disc;
  margin-left: 25px;
}

.terms-section ul ul {
  list-style: circle;
  margin-left: 20px;
}

.terms-section li {
  margin-bottom: 8px;
}

/* Specific styling for links within the text */
.terms-section a {
  color: #4CAF50;
  text-decoration: underline;
}

.terms-section a:hover {
  text-decoration: none;
}
</style>