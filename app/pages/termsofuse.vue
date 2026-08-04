<template>
  <div class="policy-page">
    <div class="policy-container">
      <h1>Terms of Use</h1>
      <p class="last-updated">Effective Date: January 2026</p>

      <section class="disclaimer-box">
        <h2>⚠️ Medical Disclaimer</h2>
        <p>
          <strong>Herballo does not provide medical diagnosis or treatment.</strong> The content on this platform, including herbal education materials and consultations, is for informational and educational purposes only. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </section>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing Herballo, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </section>

      <section>
        <h2>2. Consultation Services</h2>
        <p>
          Our health consultations are designed to provide herbal education and lifestyle suggestions. Our practitioners are herbalists, not licensed medical doctors (unless explicitly stated). Consultations do not constitute a doctor-patient relationship.
        </p>
      </section>

      <section>
        <h2>3. Educational Content</h2>
        <p>
          The herbal research and information provided on Herballo are based on traditional use and modern research. However, the effectiveness of herbal medicine varies by individual. Herballo is not responsible for any adverse reactions resulting from the use of herbs discussed on the platform.
        </p>
      </section>

      <section>
        <h2>4. User Responsibilities</h2>
        <p>
          Users are responsible for verifying the safety of any herb with their primary healthcare provider, especially if they are pregnant, nursing, or taking prescription medications (due to potential herb-drug interactions).
        </p>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          All educational materials, blog posts, and research summaries are the property of Herballo and may not be reproduced without written permission.
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
  title: 'Terms of Use | Herballo',
  meta: [
    { name: 'description', content: 'Terms and conditions for Herballo herbal consultations and education.' }
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

.disclaimer-box {
  background-color: #fff9e6;
  border-left: 5px solid #ffcc00;
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 4px;
}

.disclaimer-box h2 {
  color: #856404;
  margin-top: 0;
  border: none;
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

@media (max-width: 600px) {
  .policy-container {
    padding: 1.5rem;
  }
}
</style>