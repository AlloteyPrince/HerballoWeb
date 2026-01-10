<template>
  <section class="service-section" ref="sectionRef">
    <div class="component-header" :class="{ 'animate-in': isVisible }">
      <h1>Our Services</h1>
      <p>Explore our services and what we offer to make your life easier.</p>
    </div>

    <div class="services-container">
      <div 
        v-for="(service, index) in services" 
        :key="index"
        class="service-item"
        :class="{ 'animate-in': isVisible }"
        :style="{ transitionDelay: `${index * 0.2}s` }"
      >
        <img :src="service.image" :alt="service.title" />
        
        <div class="service-content">
          <h2>{{ service.title }}</h2>
          <p>
            {{ service.shortDescription }}
            <br />
            <span class="view-more" @click="openDetailPopup(service)">
              ...View More
            </span>
          </p>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Servicesdetailpopup
        v-if="showDetailPopup"
        :title="currentServiceDetail.title"
        :description="currentServiceDetail.description"
        @close="closeDetailPopup"
      />
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// Nuxt auto-imports components, but you can explicitly import if needed:
// import ServiceDetailPopup from "@/components/popups/ServiceDetailPopup.vue";

const isVisible = ref(false);
const sectionRef = ref(null);
const showDetailPopup = ref(false);
const currentServiceDetail = ref({ title: "", description: "" });

const services = [
  {
    title: 'Online Consultation',
    image: '/images/telemed.jpg', // Use absolute paths for Nuxt public folder
    shortDescription: "Our online consultation sessions are tailored to vast health needs. Whether you're seeking guidance on your herbal medicine journey or personalized health insights.",
    description: "Our online consultation sessions are tailored to vast health needs. Whether you're seeking guidance on your herbal medicine journey, advice on using herbal remedies effectively, or personalized health insights, our experts are here to help. Explore the natural path to wellness with confidence and clarity"
  },
  {
    title: 'Herbal Medicine Education',
    image: '/images/herbal-education.jpg',
    shortDescription: "Through engaging talks, YouTube, TikTok, and more, we bring herbal medicine education to life. We connect, share insights, and inspire healthier lifestyles.",
    description: "Through engaging talks, YouTube, TikTok, and more, we bring herbal medicine education to life. We connect, share insights, and inspire healthier lifestyles through interactive platforms and speaking engagements. Our comprehensive approach covers everything from basic herbal knowledge to advanced applications."
  },
  {
    title: 'Product Development',
    image: '/images/herbal-pd.jpg',
    shortDescription: "We specialize in product development, FDA-compliant labeling, and modern product design. By blending innovation with current herbal medicine trends.",
    description: "We specialize in product development, FDA-compliant labeling, and modern product design. By blending innovation with current herbal medicine trends, we help create, brand, and position products to thrive in today's market. Our expertise ensures your products are not only effective but also beautifully presented."
  }
];

const openDetailPopup = (service) => {
  currentServiceDetail.value = { title: service.title, description: service.description };
  showDetailPopup.value = true;
};

const closeDetailPopup = () => {
  showDetailPopup.value = false;
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true;
    }
  }, { threshold: 0.1 });

  if (sectionRef.value) observer.observe(sectionRef.value);
});
</script>

<style lang="scss" scoped>
.service-section {
  padding: 100px 5%;
  background-color: white;
  font-family: "Segoe UI", Tahoma, sans-serif;
  overflow: hidden;
}

.component-header {
  text-align: center;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    color: #105212;
    font-weight: 800;
    margin-bottom: 10px;
  }

  p {
    color: #64748b;
    font-size: 1.1rem;
  }
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.service-item {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  border: 1px solid #f1f5f1;
  
  /* Animation Start State */
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(16, 82, 18, 0.15);
    border-color: #105212;
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.service-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  h2 {
    font-size: 1.5rem;
    color: #0f172a;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    font-size: 1rem;
    color: #475569;
    line-height: 1.7;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.view-more {
  color: #105212;
  cursor: pointer;
  font-weight: 700;
  display: inline-block;
  margin-top: 10px;
  transition: color 0.3s;

  &:hover {
    color: #22c55e;
    text-decoration: underline;
  }
}

@media (max-width: 768px) {
  .service-section { padding: 60px 1.5rem; }
  .services-container { grid-template-columns: 1fr; }
  .service-item { transform: translateY(20px); }
}
</style>