<template>
    <div class="service-section">
      <!-- Component Header -->
      <div class="component-header">
        <h1>Our Services</h1>
        <p>Explore our services and what we offer to make your life easier.</p>
      </div>
  
      <!-- Services Container (Flex Display) -->
      <div class="services-container">
        <!-- Service 1 -->
        <div class="service-item">
          <h2>Online Herbal Medicine Consultation</h2>
          <img src="../images/herbal-education.jpg" alt="Service 1 Image" />
          <p>Our online consultation sessions are tailored to vast health needs. Whether you're seeking guidance on your herbal medicine journey, advice on using herbal remedies effectively, or personalized health insights, our experts are here to help. Explore the natural path to wellness with confidence and clarity</p>
        </div>
  
        <!-- Service 2 -->
        <div class="service-item">
          <h2>Reach Out Herbal Medicine Education</h2>
          <img src="../images/herbal-education.jpg" alt="Service 2 Image" />
          <p>Through engaging talks, YouTube, TikTok, and more, we bring herbal medicine education to life. We connect, share insights, and inspire healthier lifestyles through interactive platforms and speaking engagements.</p>
        </div>
  
        <!-- Service 3 -->
        <div class="service-item">
          <h2>Product Development and Packaging</h2>
          <img src="../images/herbal-pd.jpg" alt="Service 3 Image" />
          <p>We specialize in product development, FDA-compliant labeling, and modern product design. By blending innovation with current herbal medicine trends, we help create, brand, and position products to thrive in today's market.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: "Services",
  props:'',
  data(){
    return{}
  }
}
</script>
  
<style scoped>
/* Styles for the Component */
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;

}

.service-section {
  padding: 20px;
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
    align-items: flex-start;
    gap: 2rem;
}

/* Service Item Styles */
.service-item {
  width: 40%;
  text-align: center;
  border: solid 5px rgb(188, 212, 188);
  border-radius: 15px;
  padding: 20px; /* Space between the border and the content */
}

.service-item h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.service-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.service-item p {
  font-size: 1em;
  color: #444;
  font-size: 1rem;
}

/* Media Query for Mobile View */
@media (max-width: 768px) {
  .services-container {
    flex-wrap: wrap; /* Allow items to wrap to the next line */
    padding: 10px;
  }

  .service-item {
    width: 100%; /* Make each service take the full width on small screens */
    margin-bottom: 3px; /* Add space between items */
  }

  .service-item p {
  font-size: 1em;
  color: #000000;
  font-size: 1rem;
}
}
</style>