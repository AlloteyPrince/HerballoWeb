<template>
  <div>
    <Navigation />
    <section class="about-container">
      <div class="bg-decoration">
        <div class="floating-leaf" style="left: 10%; animation-delay: 0s">
          🌿
        </div>
        <div class="floating-leaf" style="left: 20%; animation-delay: 3s">
          🍃
        </div>
        <div class="floating-leaf" style="left: 70%; animation-delay: 6s">
          🌱
        </div>
        <div class="floating-leaf" style="left: 80%; animation-delay: 9s">
          🌿
        </div>
        <div class="floating-leaf" style="left: 30%; animation-delay: 12s">
          🍃
        </div>
        <div class="floating-leaf" style="left: 60%; animation-delay: 15s">
          🌱
        </div>
      </div>

      <div class="hero-section">
        <div class="hero-content">
          <h1 class="section-title fade-in delay-1">About Herballo</h1>
          <p class="hero-subtitle fade-in delay-2">Health from the ground up</p>
          <p class="intro fade-in delay-3">
            Herballo is a health-focused brand specializing in herbal medicine
            education, research, and product development. We primarily provide
            natural health solutions, personalized consultations, educational
            content, and the promotion and production of herbal-related
            products. Our mission is to promote holistic well-being by
            integrating traditional herbal practices with modern health
            insights.
          </p>
          <p class="intro fade-in delay-4 text-break">
            We're building a future where herbal medicine is validated, trusted,
            and accessible to all.
          </p>
          <router-link to="/" class="cta-button slide-in delay-5">
            <span>Discover Your Wellness Journey</span>
            <span>→</span>
          </router-link>
        </div>
      </div>

      <div class="content-section">
        <h2 class="subheading slide-in delay-6">Our Core Pillars</h2>

        <div class="pillars-grid">
          <div class="pillar card slide-in delay-7">
            <div class="pillar-icon">🔬</div>
            <h3>Research & Development</h3>
            <p>
              We explore Africa's rich medicinal heritage by scientifically
              validating indigenous herbs. Our goal is to bridge the gap between
              traditional practices and modern evidence-based medicine.
            </p>
            <router-link to="/home" class="pillar-cta-button">
              <span>Learn More</span>
              <span>→</span>
            </router-link>
          </div>

          <div class="pillar card slide-in delay-8">
            <div class="pillar-icon">👩‍⚕️</div>
            <h3>Consultation & Care</h3>
            <p>
              Through personalized one-on-one sessions, we listen to your unique
              health story and recommend holistic herbal solutions — integrating
              lifestyle, diet, and nature-based remedies.
            </p>
            <router-link to="/" class="pillar-cta-button">
              <span>Book a Consultation</span>
              <span>→</span>
            </router-link>
          </div>

          <div class="pillar card slide-in delay-9">
            <div class="pillar-icon">📚</div>
            <h3>Herbal Education</h3>
            <p>
              Our ULearn platform and community resources empower individuals
              and professionals to understand and use herbs safely, effectively,
              and confidently.
            </p>
            <router-link to="/home" class="pillar-cta-button">
              <span>Explore ULearn</span>
              <span>→</span>
            </router-link>
          </div>

          <div class="pillar card slide-in delay-10">
            <div class="pillar-icon">🧪</div>
            <h3>Product Development</h3>
            <p>
              Backed by research, our products are crafted for purity, potency,
              and purpose — using ethically sourced botanicals and verified
              herbal formulations.
            </p>
            <router-link to="/home" class="pillar-cta-button">
              <span>View Products</span>
              <span>→</span>
            </router-link>
          </div>

          <div class="pillar card slide-in delay-10">
            <div class="pillar-icon">📲</div>
            <h3>Herballo Media</h3>
            <p>
              Our media platform shares stories, insights, and the latest in
              herbal research. We aim to inspire and educate through engaging
              content that connects people with nature's wisdom.
            </p>
            <router-link to="/home" class="pillar-cta-button">
              <span>View Products</span>
              <span>→</span>
            </router-link>
          </div>

          <div class="pillar card slide-in delay-10">
            <div class="pillar-icon">🪴</div>
            <h3>Herballo Farms</h3>
            <p>
              Our sustainable farms cultivate medicinal herbs with care for the
              environment and community. We practice regenerative agriculture to
              ensure the health of our planet while providing high-quality
              herbal ingredients for both our products and the wider herbal
              community.
            </p>
            <router-link to="/home" class="pillar-cta-button">
              <span>View Products</span>
              <span>→</span>
            </router-link>
          </div>
        </div>

        <h2 class="subheading slide-in delay-11">Our Philosophy</h2>
        <ul class="philosophy fade-in delay-12">
          <li class="philosophy-item">
            <div class="philosophy-icon">🤝</div>
            <div class="philosophy-content">
              <strong>Integrity</strong>: Transparent sourcing, scientific
              validation, and ethical care in everything we do. We believe in
              honest communication about our processes, ingredients, and
              research findings.
            </div>
          </li>
          <li class="philosophy-item">
            <div class="philosophy-icon">📖</div>
            <div class="philosophy-content">
              <strong>Education</strong>: Empowering informed wellness decisions
              through knowledge and understanding. We make complex herbal
              science accessible to everyone, fostering a community of informed
              practitioners.
            </div>
          </li>
          <li class="philosophy-item">
            <div class="philosophy-icon">🌍</div>
            <div class="philosophy-content">
              <strong>Sustainability</strong>: Honoring the earth as a source of
              healing for generations to come. Our practices prioritize
              environmental stewardship and the long-term health of our
              ecosystems.
            </div>
          </li>
        </ul>

        <h2 class="subheading slide-in delay-13">Our Vision</h2>
        <p class="vision-text fade-in delay-14">
          Herballo aims to become a center of herbal excellence — a hub of
          research, education, and innovation much like **KEMRI**, but rooted in
          African herbal tradition. We're working toward a future where herbal
          medicine has its rightful place in mainstream healthcare.
        </p>

        <blockquote class="quote fade-in delay-15">
          "Whether you're seeking personal healing, professional insight, or
          just beginning your herbal journey — welcome to Herballo. This is
          where tradition meets science, and nature meets you."
        </blockquote>

        <h2 class="subheading slide-in delay-16">Meet the Team</h2>
        <div class="team-member fade-in delay-17">
          <div class="team-avatar">
            <span>DA</span>
          </div>
          <div class="team-info">
            <h3>Dr MH Prince Allotey</h3>
            <p class="role">Founder of Herballo</p>
            <p class="location">Accra, Ghana</p>
          </div>
        </div>
      </div>
    </section>
    <VFooter />
  </div>
</template>

<script>
import { useSEO } from "../composables/useSEO";
import Navigation from "@/components/Navigation.vue";
import VFooter from "@/components/VFooter.vue";
import { onMounted } from "vue";

export default {
  name: "About",
  components: { VFooter, Navigation },
  methods: {
    trackContactClick() {
      if (window.gtag) {
        window.gtag("event", "contact_click", {
          event_category: "engagement",
          event_label: "Contact Button",
        });
      }
    },
  },
  setup() {
    useSEO({
      title: "About Herballo - Herbal Medicine Education & Research",
      description:
        "Learn about Herballo, a health-focused brand specializing in herbal medicine education, research, and product development.",
      keywords:
        "herbal medicine, herbal education, herbal research, natural health",
      url: "https://herballo.co/about",
      image: "https://herballo.co/about-og.jpg",
    });

    const initializeAnimations = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      document.querySelectorAll(".fade-in, .slide-in").forEach((el) => {
        observer.observe(el);
      });

      const createFloatingLeaf = () => {
        const bgDecoration = document.querySelector(".bg-decoration");
        if (!bgDecoration) return;

        const leaf = document.createElement("div");
        leaf.className = "floating-leaf";
        leaf.innerHTML = ["🌿", "🍃", "🌱"][Math.floor(Math.random() * 3)];
        leaf.style.left = Math.random() * 100 + "%";
        leaf.style.animationDelay = "0s";
        leaf.style.animationDuration = 15 + Math.random() * 10 + "s";

        bgDecoration.appendChild(leaf);

        setTimeout(() => {
          if (leaf.parentNode) {
            leaf.remove();
          }
        }, 25000);
      };

      setInterval(createFloatingLeaf, 4000);
    };

    onMounted(() => {
      initializeAnimations();
    });

    return {};
  },
};
</script>

<style scoped>
html {
  scroll-padding-top: 80px;
}

.about-container {
  font-family: "Poppins", sans-serif;
  color: #1a1a1a;
  background: linear-gradient(135deg, #f8fcf9 0%, #e8f5e8 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  padding-top: 80px;
}

.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.floating-leaf {
  position: absolute;
  color: rgba(72, 187, 120, 0.1);
  font-size: 2rem;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(56, 161, 105, 0.1) 0%,
    rgba(72, 187, 120, 0.05) 100%
  );
  padding: 2rem 1rem;
}

.hero-content {
  max-width: 1000px; /* Increased max-width */
  padding: 2rem 4rem; /* Adjusted padding to give more space */
}

.logo-container {
  margin-bottom: 2rem;
  position: relative;
}

.site-logo-new {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #38a169, #48bb78);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 20px 40px rgba(56, 161, 105, 0.3);
  animation: logoFloat 6s ease-in-out infinite;
}

.site-logo-new span {
  font-size: 3rem;
  color: white;
}

@keyframes logoFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.section-title {
  font-family: "Poppins", sans-serif;
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 700;
  background: linear-gradient(135deg, #1a5e2f, #38a169);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 2rem;
  color: #4a5568;
  margin-bottom: 2rem;
  font-weight: 600;
}

.intro {
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #38a169, #48bb78);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(56, 161, 105, 0.4);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 45px rgba(56, 161, 105, 0.55);
}

.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.subheading {
  font-family: "Poppins", sans-serif;
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 600;
  text-align: center;
  margin: 5rem 0 3rem;
  color: #1a5e2f;
  position: relative;
}

.subheading::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #38a169, #48bb78);
  border-radius: 2px;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.pillar.card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.pillar.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #38a169, #48bb78);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.pillar.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.pillar.card:hover::before {
  transform: scaleX(1);
}

.pillar-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: block;
}

.pillar h3 {
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1a5e2f;
  font-weight: 600;
}

.pillar p {
  color: #4a5568;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.pillar-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #38a169;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  border: 2px solid #38a169;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(56, 161, 105, 0.2);
}

.pillar-cta-button:hover {
  background: #38a169;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(56, 161, 105, 0.35);
}

.philosophy {
  list-style: none;
  padding: 0;
  margin: 3rem auto 0;
  max-width: 800px;
}

.philosophy-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 1.5rem 0;
  position: relative;
}

.philosophy-item:not(:last-child)::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 60px;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(56, 161, 105, 0.3), transparent);
}

.philosophy-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  width: 60px;
  text-align: center;
}

.philosophy-content {
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.7;
}

.philosophy-content strong {
  color: #1a5e2f;
  font-weight: 600;
}

.vision-text {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
}

.quote {
  background: linear-gradient(
    135deg,
    rgba(56, 161, 105, 0.1),
    rgba(72, 187, 120, 0.05)
  );
  border-left: 5px solid #38a169;
  border-radius: 15px;
  padding: 2rem;
  font-style: italic;
  font-size: 1.3rem;
  color: #2d3748;
  margin: 3rem auto;
  max-width: 800px;
  position: relative;
  text-align: center;
}

.quote::before {
  content: '"';
  font-size: 4rem;
  color: #38a169;
  position: absolute;
  top: -10px;
  left: 20px;
  font-family: "Poppins", sans-serif;
}

.team-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 3rem;
  padding: 3rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.team-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #38a169, #48bb78);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-weight: bold;
  box-shadow: 0 15px 35px rgba(56, 161, 105, 0.3);
}

.team-info h3 {
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1a5e2f;
}

.team-info .role {
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.team-info .location {
  color: #718096;
  font-size: 1rem;
}

.fade-in,
.slide-in {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.fade-in.visible,
.slide-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.delay-1 {
  transition-delay: 0.1s;
}
.delay-2 {
  transition-delay: 0.2s;
}
.delay-3 {
  transition-delay: 0.3s;
}
.delay-4 {
  transition-delay: 0.4s;
}
.delay-5 {
  transition-delay: 0.5s;
}
.delay-6 {
  transition-delay: 0.6s;
}
.delay-7 {
  transition-delay: 0.7s;
}
.delay-8 {
  transition-delay: 0.8s;
}
.delay-9 {
  transition-delay: 0.9s;
}
.delay-10 {
  transition-delay: 1s;
}
.delay-11 {
  transition-delay: 1.1s;
}
.delay-12 {
  transition-delay: 1.2s;
}
.delay-13 {
  transition-delay: 1.3s;
}
.delay-14 {
  transition-delay: 1.4s;
}
.delay-15 {
  transition-delay: 1.5s;
}
.delay-16 {
  transition-delay: 1.6s;
}
.delay-17 {
  transition-delay: 1.7s;
}

@media (max-width: 768px) {
  .about-container {
    padding-top: 45px;
  }

  html {
    scroll-padding-top: 45px;
  }

  .hero-section {
    min-height: 80vh;
    padding: 2rem 1rem;
  }

  .hero-content {
    padding: 2rem 1.5rem; /* Adjusted for mobile */
  }

  .content-section {
    padding: 2rem 1rem;
  }

  .pillars-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .pillar.card {
    padding: 2rem;
  }

  .philosophy-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 1rem;
  }

  .philosophy-item::after {
    left: 0 !important;
    width: 100%;
  }

  .philosophy-icon {
    width: auto;
  }

  .team-member {
    padding: 2rem;
  }

  .team-avatar {
    width: 120px;
    height: 120px;
    font-size: 2.5rem;
  }

  .team-info h3 {
    font-size: 1.5rem;
  }

  .quote {
    font-size: 1.1rem;
    padding: 1.5rem;
  }

  .quote::before {
    font-size: 3rem;
  }
}
</style>
