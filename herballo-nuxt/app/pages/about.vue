<template>
  <div class="about-page">
    <Navigation />

    <header class="hero-stripe">
      <div class="container hero-inner reveal-item">
        <h1 class="main-title">About Herballo</h1>
        <p class="hero-tagline">Health from the ground up</p>
        <div class="hero-content">
          <p class="intro-text">
            Herballo is a health-focused translational herbal-regenerative science company dedicated to bridging the gap between traditional botanical wisdom and modern medical innovation. We integrate traditional practices with modern insights to provide natural health solutions. By merging ethnobotanical research with regenerative science, we translate nature’s most potent secrets into precise, life-enhancing solutions
          </p>
          <NuxtLink to="/" class="btn-pulse-gradient">
            Discover Your Wellness Journey →
          </NuxtLink>
        </div>
      </div>
    </header>

    <section class="pillars-stripe">
      <div class="container">
        <h2 class="subheading reveal-item">Our Core Pillars</h2>
        <div class="pillars-grid">
          <div 
            v-for="(pillar, index) in pillars" 
            :key="index" 
            class="pillar-card reveal-item"
          >
            <div class="pillar-icon-wrapper">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="pillar-svg"
                v-html="pillar.svgPath"
              ></svg>
            </div>
            <h3>{{ pillar.title }}</h3>
            <p>{{ pillar.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="vision-stripe-gradient">
      <div class="container reveal-item">
        <div class="vision-box">
          <h2>Our Vision</h2>
          <p>
            Herballo aims to become a center of herbal excellence — a hub of
            research, education, and innovation rooted in African herbal tradition.
          </p>
        </div>
      </div>
    </section>

    <section class="philosophy-stripe">
      <div class="container">
        <h2 class="subheading reveal-item">Our Philosophy</h2>
        <div class="philosophy-centered reveal-item">
          <p class="philo-text">
            {{ philosophyText }}
          </p>
        </div>
      </div>
    </section>

    <section class="team-stripe">
      <div class="container reveal-item">
        <div class="team-card">
          <div class="avatar">DA</div>
          <div class="team-info">
            <h3>Dr MH Prince Allotey</h3>
            <p>Founder & Visionary • Accra, Ghana</p>
          </div>
        </div>
      </div>
    </section>

    <VFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const pillars = [
  { 
    title: 'Research & Dev', 
    desc: "Scientifically validating indigenous herbal heritage.",
    svgPath: '<path d="M4.5 3h15M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3M12 18v-4M9 10h6"/>'
  },
  { 
    title: 'Consultation', 
    desc: "Personalized care sessions for holistic health.",
    svgPath: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  },
  { 
    title: 'ULearn Platform', 
    desc: "Empowering you to use nature's pharmacy safely.",
    svgPath: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
  },
  { 
    title: 'Products', 
    desc: "Research-backed formulations for daily wellness.",
    svgPath: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
  },
  { 
    title: 'Herballo Media', 
    desc: "Spreading awareness through digital storytelling.",
    svgPath: '<rect width="20" height="15" x="2" y="3" rx="2" ry="2"/><circle cx="12" cy="10" r="3"/><path d="M16 18h.01M8 18h.01M12 18h.01"/>'
  },
  { 
    title: 'Herballo Farms', 
    desc: "Sustainable cultivation of organic medicinal herbs.",
    svgPath: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>'
  }
];

// Philosophy text combined into a single string for better centering
const philosophyText = `At Herballo, we believe that modern medicine finds its greatest potential when it addresses the fundamental foundations of human health. Our motto, "Health from the Ground Up," represents our commitment to this journey—sourcing the Earth’s most potent botanicals and translating their wisdom into advanced regenerative solutions. While traditional medicine has long recognized the healing power of nature, Herballo bridges the gap by providing the scientific evidence and molecular precision behind those results to support tissue restoration and systemic vitality.`;

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
});
</script>

<style scoped>
/* 1. SEGOE UI & GLOBAL WRAPPER */
.about-page {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3748;
  background: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 2. HERO STRIPE */
.hero-stripe {
  width: 100%;
  background: linear-gradient(135deg, #f0f7f0 0%, #ffffff 100%);
  padding: 60px 0 40px 0;
  text-align: center;
}

.main-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  color: #105212;
  margin-bottom: 0.5rem;
}

.hero-tagline {
  font-size: 1.1rem;
  color: #38a169;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 1.5rem;
}

.intro-text {
  max-width: 750px;
  margin: 0 auto 2.5rem;
  font-size: 1.15rem;
  line-height: 1.8;
  color: #4a5568;
}

/* 3. GRADIENT PULSE BUTTON */
.btn-pulse-gradient {
  display: inline-block;
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  color: #fff;
  padding: 1.1rem 2.8rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

/* 4. PILLARS GRID */
.pillars-stripe {
  padding: 80px 0;
}

.subheading {
  font-size: 2.2rem;
  color: #105212;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 700;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.pillar-card {
  padding: 3rem 2rem;
  background: #fff;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid #f1f1f1;
}

.pillar-icon-wrapper {
  width: 70px;
  height: 70px;
  background: #f0f7f0;
  color: #105212;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.pillar-svg {
  width: 32px;
  height: 32px;
}

.pillar-card h3 {
  font-size: 1.4rem;
  color: #105212;
  margin-bottom: 0.8rem;
}

/* 5. VISION STRIPE */
.vision-stripe-gradient {
  width: 100%;
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  padding: 100px 0;
  color: #fff;
  text-align: center;
}

.vision-box h2 { font-size: 2.8rem; margin-bottom: 1.5rem; font-weight: 800; }
.vision-box p { font-size: 1.4rem; max-width: 850px; margin: 0 auto; line-height: 1.6; }

/* 6. TEAM & CENTERED PHILOSOPHY */
.philosophy-stripe { 
  padding: 100px 0; 
  background: #f9fdf9; 
  text-align: center;
}

.philosophy-centered {
  max-width: 800px;
  margin: 0 auto;
}

.philo-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #4a5568;
  font-style: italic; /* Adds a touch of "Philosophy" elegance */
}

.team-stripe { padding: 80px 0; }
.team-card {
  max-width: 450px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8fcf8;
  border-radius: 100px 30px 30px 100px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.avatar {
  min-width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #105212, #22c55e);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
}

/* 7. REVEAL ANIMATIONS */
.reveal-item {
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-item.active {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .main-title { font-size: 2.5rem; }
  .vision-box h2 { font-size: 2rem; }
  .team-card { flex-direction: column; text-align: center; border-radius: 20px; }
}
</style>