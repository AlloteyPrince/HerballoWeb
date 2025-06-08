<template>
  <section class="about-container">
    <div class="header-section">
      <img
        src="/herballo-logo.png"
        alt="Herballo Logo"
        class="site-logo fade-in"
      />
      <h1 class="section-title fade-in delay-1">About Herballo</h1>
      <p class="intro fade-in delay-2">
        Herballo is a health-focused brand specializing in herbal medicine
        education, research, and product development. We primarily provide
        natural health solutions, personalized consultations, educational
        content, and the promotion and production of herbal-related products.
        Our mission is to promote holistic well-being by integrating traditional
        herbal practices with modern health insights.
      </p>
      <p class="intro fade-in delay-3">
        We're not just here to sell products — we’re building a future where
        **herbal medicine is validated, trusted, and accessible** to all.
      </p>
      <router-link to="/home" class="cta-button slide-in delay-4">
        Discover Your Wellness Journey
      </router-link>
    </div>

    <div class="content-section">
      <h2 class="subheading slide-in delay-5">Our Core Pillars</h2>

      <div class="pillars-grid">
        <div class="pillar card slide-in delay-6">
          <div class="pillar-icon">🔬</div>
          <h3>Research & Development</h3>
          <p>
            We explore Africa’s rich medicinal heritage by scientifically
            validating indigenous herbs. Our goal is to bridge the gap between
            traditional practices and modern evidence-based medicine.
          </p>
        </div>

        <div class="pillar card slide-in delay-7">
          <div class="pillar-icon">👩🏽‍⚕️</div>
          <h3>Consultation & Care</h3>
          <p>
            Through personalized one-on-one sessions, we listen to your unique
            health story and recommend holistic herbal solutions — integrating
            lifestyle, diet, and nature-based remedies.
          </p>
          <router-link to="/home" class="pillar-cta-button">
            Book a Consultation
          </router-link>
        </div>

        <div class="pillar card slide-in delay-8">
          <div class="pillar-icon">📚</div>
          <h3>Herbal Education</h3>
          <p>
            Our ULearn platform and community resources empower individuals
            and professionals to understand and use herbs safely, effectively,
            and confidently.
          </p>
          <router-link to="/home" class="pillar-cta-button">
            Explore ULearn
          </router-link>
        </div>

        <div class="pillar card slide-in delay-9">
          <div class="pillar-icon">🧪</div>
          <h3>Product Development</h3>
          <p>
            Backed by research, our products are crafted for purity, potency,
            and purpose — using ethically sourced botanicals and verified herbal
            formulations.
          </p>
          <router-link to="/home" class="pillar-cta-button">
            View Products
          </router-link>
        </div>
      </div>

      <h2 class="subheading slide-in delay-10">Our Philosophy</h2>
      <ul class="philosophy fade-in delay-11">
        <li>
          <strong>Integrity</strong>: Transparent sourcing, scientific
          validation, and ethical care.
        </li>
        <li>
          <strong>Education</strong>: Empowering informed wellness decisions.
        </li>
        <li>
          <strong>Sustainability</strong>: Honoring the earth as a source of
          healing.
        </li>
      </ul>

      <h2 class="subheading slide-in delay-12">Our Vision</h2>
      <p class="vision-text fade-in delay-13">
        Herballo aims to become a center of herbal excellence — a hub of
        research, education, and innovation much like **KEMRI**, but rooted in
        African herbal tradition. We're working toward a future where herbal
        medicine has its rightful place in mainstream healthcare.
      </p>

      <blockquote class="quote fade-in delay-14">
        “Whether you're seeking personal healing, professional insight, or just
        beginning your herbal journey — welcome to Herballo. This is where
        tradition meets science, and nature meets you.”
      </blockquote>

      <h2 class="subheading slide-in delay-15">Meet the Team</h2>
      <div class="team-member fade-in delay-16">
        <div class="team-info">
          <h3>Dr MH Prince Allotey</h3>
          <p class="role">Founder of Herballo</p>
          <p class="location">Accra, Ghana</p>
        </div>
      </div>
    </div>
  </section>
  <MyFooter />
</template>

<script>
import MyFooter from "@/components/MyFooter.vue";
export default{
  name: About,
  components:{ MyFooter}
}
// No logic needed for now
</script>

<style scoped>
/* Basic Reset & Base Styles */
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px; /* Reduced overall container padding */
  font-family: "Open Sans", sans-serif;
  color: #333;
  background: #fdfdfd;
  line-height: 1.7;
}



/* --- Header Section --- */
.header-section {
  text-align: center;
  margin-bottom: 40px; /* Reduced margin */
  padding: 30px 20px; /* Reduced padding */
  background: linear-gradient(145deg, #e7f7ed, #f3fff5);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.site-logo {
  max-width: 130px; /* Slightly smaller logo */
  height: auto;
  margin-bottom: 20px; /* Reduced margin */
  animation: fadeIn 1s ease-out forwards;
}

.section-title {
  font-family: "Merriweather", serif;
  font-size: 3.5rem; /* Slightly reduced font size for balance */
  font-weight: 700;
  color: #1a5e2f;
  margin-bottom: 15px; /* Reduced margin */
  letter-spacing: 0.03em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

.intro {
  font-size: 1.15rem; /* Slightly reduced font size */
  line-height: 1.7;
  margin-bottom: 20px; /* Reduced margin */
  color: #4f4f4f;
  max-width: 800px; /* Adjusted max-width */
  margin-left: auto;
  margin-right: auto;
  font-weight: 300;
}

.cta-button {
  display: inline-block;
  background-color: #38a169;
  color: white;
  padding: 14px 28px; /* Slightly smaller padding */
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.1rem; /* Slightly smaller font size */
  font-weight: 600;
  margin-top: 25px; /* Reduced margin */
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(56, 161, 105, 0.4);
}

.cta-button:hover {
  background-color: #2f855a;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(56, 161, 105, 0.5);
}

/* --- Content Sections --- */
.content-section {
  padding: 20px 0; /* Reduced padding */
}

.subheading {
  font-family: "Merriweather", serif;
  font-size: 2.2rem; /* Slightly reduced font size */
  color: #2f855a;
  margin-top: 50px; /* Reduced margin */
  margin-bottom: 25px; /* Reduced margin */
  font-weight: 700;
  text-align: center;
  position: relative;
  padding-bottom: 10px; /* Reduced padding */
}

.subheading::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 80px; /* Adjusted width */
  height: 4px; /* Adjusted thickness */
  background-color: #48bb78;
  border-radius: 3px;
}

/* --- Pillars Grid (Now a single column) --- */
.pillars-grid {
  display: grid;
  grid-template-columns: 1fr; /* Force single column */
  gap: 30px; /* Reduced gap between pillars */
  margin-top: 40px; /* Reduced margin */
  max-width: 700px; /* Control width of the single column */
  margin-left: auto; /* Center the single column */
  margin-right: auto; /* Center the single column */
}

.pillar {
  padding: 30px; /* Slightly reduced padding */
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
  border: 1px solid #e0f2e0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  display: flex; /* Use flexbox for internal alignment */
  flex-direction: column; /* Stack contents */
  align-items: center; /* Center horizontally */
}

.pillar:hover {
  transform: translateY(-8px); /* Slightly less pronounced lift */
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12); /* Adjusted hover shadow */
}

.pillar-icon {
  font-size: 3.5rem; /* Slightly smaller icons */
  margin-bottom: 18px; /* Adjusted margin */
  line-height: 1;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.1));
}

.pillar h3 {
  font-family: "Merriweather", serif;
  font-size: 1.8rem; /* Slightly smaller font size */
  margin-bottom: 10px; /* Reduced margin */
  color: #1a5e2f;
  font-weight: 700;
}

.pillar p {
  font-size: 1rem; /* Slightly smaller text */
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px; /* Space for pillar-specific CTA */
}

.pillar-cta-button {
  display: inline-block;
  background-color: #48bb78; /* A slightly softer green for pillar CTAs */
  color: white;
  padding: 10px 20px; /* Smaller padding for pillar CTAs */
  border-radius: 30px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 3px 10px rgba(72, 187, 120, 0.3);
  margin-top: auto; /* Push to bottom of pillar card */
}

.pillar-cta-button:hover {
  background-color: #2f855a;
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(72, 187, 120, 0.4);
}

/* --- Philosophy List --- */
.philosophy {
  list-style: none;
  padding: 0;
  margin: 40px auto 40px auto; /* Reduced margins */
  max-width: 700px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px; /* Reduced gap */
}

.philosophy li {
  font-size: 1.1rem; /* Slightly reduced font size */
  line-height: 1.7;
  color: #4f4f4f;
  position: relative;
  padding-left: 30px;
  text-align: left;
  font-weight: 400;
}

.philosophy li::before {
  content: "🍃";
  position: absolute;
  left: 0;
  color: #38a169;
  font-size: 1.4em;
  line-height: 1;
  top: 0;
}

/* --- Vision Text --- */
.vision-text {
  font-size: 1.15rem; /* Slightly reduced font size */
  line-height: 1.7;
  margin-bottom: 40px; /* Reduced margin */
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: #4f4f4f;
  font-weight: 300;
}

/* --- Quote --- */
.quote {
  border-left: 7px solid #48bb78; /* Slightly thinner border */
  padding: 25px 30px; /* Reduced padding */
  font-style: italic;
  font-size: 1.3rem; /* Slightly reduced font size */
  color: #2f855a;
  background-color: #e6ffe6;
  margin: 50px auto; /* Reduced margins */
  max-width: 800px;
  border-radius: 10px;
  line-height: 1.6;
  font-weight: 500;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* --- Team Member --- */
.team-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px; /* Reduced gap */
  margin-top: 50px; /* Reduced margin */
  padding: 35px; /* Reduced padding */
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  max-width: 500px; /* Adjusted max-width */
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.profile-pic {
  width: 150px; /* Adjusted size */
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #48bb78; /* Adjusted border */
  box-shadow: 0 0 0 5px rgba(72, 187, 120, 0.4);
}

.team-info h3 {
  margin: 12px 0 6px; /* Adjusted margins */
  font-size: 2rem; /* Adjusted font size */
  color: #1a5e2f;
  font-weight: 700;
}

.team-info .role {
  margin: 0;
  font-size: 1.15rem; /* Adjusted font size */
  color: #555;
  font-style: italic;
}

.team-info .location {
  margin: 6px 0 0;
  font-size: 1rem; /* Adjusted font size */
  color: #777;
}

/* --- Animations --- */
/* (Keeping delays mostly the same, but you might want to adjust if the faster flow makes it feel too quick) */
.fade-in { opacity: 0; animation: fadeIn 1s ease-out forwards; }
.fade-in.delay-1 { animation-delay: 0.3s; }
.fade-in.delay-2 { animation-delay: 0.6s; }
.fade-in.delay-3 { animation-delay: 0.9s; }
.fade-in.delay-4 { animation-delay: 1.2s; }
.fade-in.delay-5 { animation-delay: 0.3s; }
.fade-in.delay-6 { animation-delay: 0.6s; }
.fade-in.delay-7 { animation-delay: 0.9s; }
.fade-in.delay-8 { animation-delay: 1.2s; }
.fade-in.delay-9 { animation-delay: 1.5s; }
.fade-in.delay-10 { animation-delay: 1.8s; }
.fade-in.delay-11 { animation-delay: 2.1s; }
.fade-in.delay-12 { animation-delay: 2.4s; }
.fade-in.delay-13 { animation-delay: 2.7s; }
.fade-in.delay-14 { animation-delay: 3s; }
.fade-in.delay-15 { animation-delay: 3.3s; }
.fade-in.delay-16 { animation-delay: 3.6s; }

.slide-in { opacity: 0; transform: translateY(30px); animation: slideIn 0.8s ease-out forwards; }
.slide-in.delay-4 { animation-delay: 1.5s; }
.slide-in.delay-5 { animation-delay: 0.3s; }
.slide-in.delay-6 { animation-delay: 0.6s; }
.slide-in.delay-7 { animation-delay: 0.8s; }
.slide-in.delay-8 { animation-delay: 1s; }
.slide-in.delay-9 { animation-delay: 1.2s; }
.slide-in.delay-10 { animation-delay: 1.5s; }
.slide-in.delay-11 { animation-delay: 1.8s; }
.slide-in.delay-12 { animation-delay: 2.1s; }
.slide-in.delay-15 { animation-delay: 3s; }

@keyframes fadeIn { to { opacity: 1; } }
@keyframes slideIn { to { opacity: 1; transform: translateY(0); } }

/* --- Responsive Design --- */
/* Adjustments for smaller screens to maintain good density */
@media (max-width: 992px) {
  .section-title { font-size: 2.8rem; }
  .intro { font-size: 1.1rem; }
  .subheading { font-size: 2rem; }
  .pillar h3 { font-size: 1.6rem; }
  .pillar-icon { font-size: 3.5rem; }
  .quote { font-size: 1.1rem; }
  .team-info h3 { font-size: 1.7rem; }
  .profile-pic { width: 130px; height: 130px; }
  .pillar { padding: 25px; } /* Slightly less padding on smaller screens */
}

@media (max-width: 768px) {
  .about-container { padding: 30px 15px; }
  .section-title { font-size: 2.2rem; }
  .intro { font-size: 1rem; margin-bottom: 15px; }
  .subheading { font-size: 1.8rem; margin-top: 40px; margin-bottom: 20px;}
  .site-logo { max-width: 100px; margin-bottom: 15px; }
  .cta-button { padding: 12px 24px; font-size: 1rem; margin-top: 20px;}
  .pillars-grid { gap: 25px; margin-top: 30px; }
  .pillar h3 { font-size: 1.4rem; }
  .pillar-icon { font-size: 3rem; margin-bottom: 15px; }
  .philosophy { margin: 30px auto; gap: 15px; }
  .philosophy li { font-size: 1rem; padding-left: 25px;}
  .vision-text { font-size: 1rem; margin-bottom: 30px; }
  .quote { font-size: 1rem; padding: 20px 25px; margin: 40px auto; }
  .team-member { padding: 30px; margin-top: 40px; gap: 20px; }
  .profile-pic { width: 100px; height: 100px; }
  .team-info h3 { font-size: 1.4rem; margin: 10px 0 5px;}
  .team-info .role { font-size: 1rem; }
  .team-info .location { font-size: 0.9rem; }
  .pillar-cta-button { padding: 8px 16px; font-size: 0.9rem; }
}
</style>