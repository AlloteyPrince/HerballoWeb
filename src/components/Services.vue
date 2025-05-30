<template>
  <div class="service-section">
    <div class="component-header">
      <h1>Our Services</h1>
      <p>Explore our services and what we offer to make your life easier.</p>
    </div>

    <div class="services-container">
      <div class="service-item">
        <h2>Online Herbal Medicine Consultation</h2>
        <img src="../images/herbal-education.jpg" alt="Service 1 Image" />
        <p>Our online consultation sessions are tailored to vast health needs. Whether you're seeking guidance on your herbal medicine journey, advice on using herbal remedies effectively, or personalized health insights, our experts are here to help. 
          <br>
          <span class="view-more" @click="openDetailPopup('Online Herbal Medicine Consultation', 'Our online consultation sessions are tailored to vast health needs. Whether you\'re seeking guidance on your herbal medicine journey, advice on using herbal remedies effectively, or personalized health insights, our experts are here to help. Explore the natural path to wellness with confidence and clarity')">...View More</span></p>
      </div>

      <div class="service-item">
        <h2>Reach Out Herbal Medicine Education</h2>
        <img src="../images/herbal-education.jpg" alt="Service 2 Image" />
        <p>Through engaging talks, YouTube, TikTok, and more, we bring herbal medicine education to life. We connect, share insights, and inspire healthier lifestyles through interactive platforms and speaking engagements. 
          <br><span class="view-more" @click="openDetailPopup('Reach Out Herbal Medicine Education', 'Through engaging talks, YouTube, TikTok, and more, we bring herbal medicine education to life. We connect, share insights, and inspire healthier lifestyles through interactive platforms and speaking engagements. Our comprehensive approach covers everything from basic herbal knowledge to advanced applications, ensuring you have the tools to make informed decisions about your health.')">...View More</span></p>
      </div>

      <div class="service-item">
        <h2>Product Development and Packaging</h2>
        <img src="../images/herbal-pd.jpg" alt="Service 3 Image" />
        <p>We specialize in product development, FDA-compliant labeling, and modern product design. By blending innovation with current herbal medicine trends, we help create, brand, and position products to thrive in today's.
          <br>
          <span class="view-more" @click="openDetailPopup('Product Development and Packaging', 'We specialize in product development, FDA-compliant labeling, and modern product design. By blending innovation with current herbal medicine trends, we help create, brand, and position products to thrive in today\'s market. Our expertise ensures your products are not only effective but also beautifully presented and compliant with all regulations.')">...View More</span></p>
      </div>
    </div>

    <ServiceDetailPopup
      v-if="showDetailPopup"
      :title="currentServiceDetail.title"
      :description="currentServiceDetail.description"
      @close="closeDetailPopup"
    />
  </div>
</template>

<script>
import ServiceDetailPopup from './ServiceDetailPopup.vue'; // Ensure this path is correct

export default {
  name: "Services",
  components: {
    ServiceDetailPopup,
  },
  data() {
    return {
      showDetailPopup: false,
      currentServiceDetail: {
        title: '',
        description: '',
      },
    };
  },
  methods: {
    openDetailPopup(title, description) {
      this.currentServiceDetail = { title, description };
      this.showDetailPopup = true;
    },
    closeDetailPopup() {
      this.showDetailPopup = false;
    },
  },
};
</script>

<style scoped>
/* Styles for the Component */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.service-section {
  padding: 20px;
  background-color: white;
   padding-bottom: 80px;
  
}

/* Component Header */
.component-header {
  text-align: center;
  margin-bottom: 40px;
  margin-top: 40px;
}

.component-header h1 {
  font-size: 3em;
  margin: 0;
  color: rgb(1, 59, 1);
}

.component-header p {
  font-size: 1em;
  color: #666;
}

/* Flex Container for Services */
.services-container {
  margin: 0 auto;
  padding: 0 2rem;
  height: auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 2rem;
}

/* Service Item Styles */
.service-item {
  width: 30%;
  text-align: center;
  border-radius: 15px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Slightly darker initial shadow */
  transition: box-shadow 0.3s ease;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 550px; /* Shortened height for visual uniformity */
  box-sizing: border-box;
}

.service-item:hover {
  box-shadow: 0 10px 20px rgba(0, 100, 0, 0.4); /* Darker greenish shadow on hover */
}

.service-item h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: rgb(1, 59, 1);
  flex-shrink: 0;
}

.service-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  flex-shrink: 0;
}

.service-item p {
  font-size: 1em;
  color: #444;
  line-height: 1.6;
  flex-grow: 1;
  overflow-y: hidden; /* Ensure content is hidden if it overflows */
  text-overflow: ellipsis; /* Add ellipsis for overflowed text */
  display: -webkit-box;
  -webkit-line-clamp: 7; /* Limit to 7 lines before ellipsis */
  -webkit-box-orient: vertical;
  /* Removed padding-right and scrollbar specific styles */
}

.view-more {
  color: rgb(1, 59, 1); /* Green color for the link */
  cursor: pointer;
  font-weight: bold;
  margin-left: 5px;
  white-space: nowrap;
}

.view-more:hover {
  text-decoration: underline;
}

/* Media Query for Mobile View */
@media (max-width: 768px) {
  .services-container {
    flex-wrap: wrap;
    padding: 10px;
    justify-content: center;
  }

  .service-item {
    width: 90%;
    height: auto; /* Allow height to adjust on mobile if content is shorter */
    min-height: 450px; /* Ensure a minimum height for mobile */
    margin-bottom: 20px;
  }

  .service-item p {
    font-size: 1em;
    color: #000000;
    overflow-y: visible; /* Allow content to expand on mobile */
    -webkit-line-clamp: unset; /* Remove line clamping on mobile */
  }
}
</style>
