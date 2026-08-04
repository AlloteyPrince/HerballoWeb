<template>
  <div class="policy-page">
    <div class="policy-container">
      <h1>Privacy Policy</h1>
      <p class="last-updated">Last Updated: January 2026</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>Herballo</strong>. We are committed to protecting your personal information and your right to privacy. This policy applies to all information collected through our health consultation services and herbal medicine education platform.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>We collect personal information that you voluntarily provide to us when you:</p>
        <ul>
          <li>Register for a health consultation.</li>
          <li>Sign up for our herbal education newsletter.</li>
          <li>Submit inquiries regarding herbal medicine.</li>
        </ul>
        <p><strong>Health Data:</strong> During consultations, you may provide information regarding your health history. We treat this data with the highest level of confidentiality.</p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide personalized herbal consultations.</li>
          <li>Deliver educational content and research updates.</li>
          <li>Ensure the safety and accuracy of our herbal recommendations.</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures designed to protect the security of any personal health information we process. However, please remember that no method of transmission over the internet is 100% secure.
        </p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <p>
          You may review, change, or terminate your account at any time. If you are located in the EEA or UK, you have certain rights under applicable data protection laws (GDPR).
        </p>
      </section>

      <section>
        <h2>6. Contact Us</h2>
        <p>
          If you have questions or comments about this policy, you may email us at 
          <a href="mailto:privacy@herballo.com">privacy@herballo.com</a>.
        </p>
      </section>
      
      <div class="back-home">
        <NuxtLink to="/">← Back to Home</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Privacy Policy | Herballo',
  meta: [
    { name: 'description', content: 'Herballo privacy policy regarding health consultations and herbal education.' },
    { name: 'robots', content: 'noindex, follow' }
  ]
})
</script>

<style scoped>
.policy-page {
  background-color: #fdfdfb; 
  color: #2c3e50;
  line-height: 1.6;
  padding: 4rem 1rem;
}

.policy-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

h1 {
  color: #105212;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.last-updated {
  color: #888;
  font-style: italic;
  margin-bottom: 2rem;
}

h2 {
  color: #105212;
  margin-top: 2rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

.back-home {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.back-home a {
  color: #105212;
  text-decoration: none;
  font-weight: bold;
}

.back-home a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .policy-container {
    padding: 1.5rem;
  }
}
</style>

