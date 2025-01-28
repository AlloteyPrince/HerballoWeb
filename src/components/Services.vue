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
          <p>Some information about the first service and its benefits.</p>
        </div>
  
        <!-- Service 2 -->
        <div class="service-item">
          <h2>Reach Out Herbal Medicine Education</h2>
          <img src="../images/herbal-education.jpg" alt="Service 2 Image" />
          <p>Details about the second service and why it's important for you.</p>
        </div>
  
        <!-- Service 3 -->
        <div class="service-item">
          <h2>Product Development and Packaging</h2>
          <img src="../images/herbal-pd.jpg" alt="Service 3 Image" />
          <p>More information about the third service and how it can help.</p>
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

.service-section {
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Component Header */
.component-header {
  text-align: center;
  margin-bottom: 20px;
}

.component-header h1 {
  font-size: 2em;
  margin: 0;
}

.component-header p {
  font-size: 1.1em;
  color: #666;
}

/* Flex Container for Services */
.services-container {
  /* display: flex;
  justify-content: space-between;
  gap: 20px; */

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
  width: 30%;
  text-align: center;
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
}

/* Media Query for Mobile View */
@media (max-width: 768px) {
  .services-container {
    flex-wrap: wrap; /* Allow items to wrap to the next line */
  }

  .service-item {
    width: 100%; /* Make each service take the full width on small screens */
    margin-bottom: 20px; /* Add space between items */
  }
}
</style>