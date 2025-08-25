<template>
  <div class="service-section">
    <div class="component-header">
      <h1>Our Services</h1>
      <p>Explore our services and what we offer to make your life easier.</p>
    </div>

    <div class="services-container">
      <div class="service-item">
        <!-- Image now comes first and spans full width of the card -->
        <img src="../images/telemed.jpg" alt="Service 1 Image" />
        <div class="service-content">
          <h2>Online Consultation</h2>
          <p>
            Our online consultation sessions are tailored to vast health needs.
            Whether you're seeking guidance on your herbal medicine journey,
            advice on using herbal remedies effectively, or personalized health
            insights, our experts are here to help.
            <br />
            <span
              class="view-more"
              @click="
                openDetailPopup(
                  'Online Herbal Medicine Consultation',
                  'Our online consultation sessions are tailored to vast health needs. Whether you\'re seeking guidance on your herbal medicine journey, advice on using herbal remedies effectively, or personalized health insights, our experts are here to help. Explore the natural path to wellness with confidence and clarity'
                )
              "
              >...View More</span
            >
          </p>
        </div>
      </div>

      <div class="service-item">
        <!-- Image now comes first and spans full width of the card -->
        <img src="../images/herbal-education.jpg" alt="Service 2 Image" />
        <div class="service-content">
          <h2>Herbal Medicine Education</h2>
          <p>
            Through engaging talks, YouTube, TikTok, and more, we bring herbal
            medicine education to life. We connect, share insights, and inspire
            healthier lifestyles through interactive platforms and speaking
            engagements. <br /><span
              class="view-more"
              @click="
                openDetailPopup(
                  'Reach Out Herbal Medicine Education',
                  'Through engaging talks, YouTube, TikTok, and more, we bring herbal medicine education to life. We connect, share insights, and inspire healthier lifestyles through interactive platforms and speaking engagements. Our comprehensive approach covers everything from basic herbal knowledge to advanced applications, ensuring you have the tools to make informed decisions about your health.'
                )
              "
              >...View More</span
            >
          </p>
        </div>
      </div>

      <div class="service-item">
        <!-- Image now comes first and spans full width of the card -->
        <img src="../images/herbal-pd.jpg" alt="Service 3 Image" />
        <div class="service-content">
          <h2>Product Development and Packaging</h2>
          <p>
            We specialize in product development, FDA-compliant labeling, and
            modern product design. By blending innovation with current herbal
            medicine trends, we help create, brand, and position products to
            thrive in today's.
            <br />
            <span
              class="view-more"
              @click="
                openDetailPopup(
                  'Product Development and Packaging',
                  'We specialize in product development, FDA-compliant labeling, and modern product design. By blending innovation with current herbal medicine trends, we help create, brand, and position products to thrive in today\'s market. Our expertise ensures your products are not only effective but also beautifully presented and compliant with all regulations.'
                )
              "
              >...View More</span
            >
          </p>
        </div>
      </div>
    </div>

    <!-- The popup component will be rendered here -->
    <ServiceDetailPopup
      v-if="showDetailPopup"
      :title="currentServiceDetail.title"
      :description="currentServiceDetail.description"
      @close="closeDetailPopup"
    />
  </div>
</template>

<script>

import ServiceDetailPopup from "@/components/popups/ServiceDetailPopup.vue"; 

export default {
  name: "Services",
  components: {
    ServiceDetailPopup,
  },
  data() {
    return {
      showDetailPopup: false,
      currentServiceDetail: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    // Method to open the detail popup with specific service content
    openDetailPopup(title, description) {
      this.currentServiceDetail = { title, description };
      this.showDetailPopup = true;
    },
    // Method to close the detail popup
    closeDetailPopup() {
      this.showDetailPopup = false;
    },
  },
};
</script>

<style scoped>
/* Reset basic padding and margin for consistent rendering */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* Main section styling */
.service-section {
  padding: 20px; /* General padding for the section */
  background-color: white; /* White background */
  padding-bottom: 100px; /* More padding at the bottom */
  padding-top: 100px; /* Padding at the top */
}

/* Header for the component */
.component-header {
  text-align: center; /* Center align text */
  margin-bottom: 50px; /* Space below header */
}

/* Added media query to reduce margin-bottom for mobile header */
@media (max-width: 768px) {
  .component-header {
    margin-bottom: 20px; /* Reduced margin for mobile */
  }
}

.component-header h1 {
  font-size: 3em; /* Large heading font size */
  margin: 0; /* Remove default margin */
  color: rgb(1, 59, 1); /* Dark green color for heading */
}

.component-header p {
  font-size: 1em; /* Paragraph font size */
  color: #666; /* Gray color for paragraph */
}

/* Flex container for the service items */
.services-container {
  margin: 0 auto; /* Center the container horizontally */
  padding: 0 2rem; /* Horizontal padding */
  height: auto; /* Auto height based on content */
  max-width: 1200px; /* Maximum width for the container */
  display: flex; /* Use flexbox for layout */
  justify-content: space-between; /* Distribute items with space between them */
  align-items: stretch; /* Make items stretch to equal height */
  gap: 2rem; /* Gap between service items */
}

/* Individual service item styling */
.service-item {
  width: 30%; /* Take up 30% of the container width */
  text-align: center; /* Center align text within the item */
  border-radius: 15px; /* Rounded corners */
  background-color: #ffffff; /* White background */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Initial shadow */
  transition: box-shadow 0.3s ease; /* Smooth transition for hover effect */
  display: flex; /* Use flexbox for internal layout */
  flex-direction: column; /* Stack content vertically */
  height: 550px; /* Fixed height for visual uniformity across items */
  overflow: hidden; /* Hide anything overflowing the rounded corners */
}

/* New: Styling for the content wrapper within each service item */
.service-content {
  padding: 20px; /* Padding for title and paragraph */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1; /* Allow content to grow and take available space */
}

/* Hover effect for service items */
.service-item:hover {
  box-shadow: 0 10px 20px rgba(0, 100, 0, 0.4); /* Darker greenish shadow on hover */
}

.service-item h2 {
  font-size: 1.5em; /* Heading font size */
  margin-bottom: 10px; /* Space below heading */
  color: black; /* Changed to black as requested */
  flex-shrink: 0; /* Prevent heading from shrinking */
}

.service-item img {
  width: 100%; /* Image fills item width */
  height: 180px; /* Fixed image height */
  object-fit: cover; /* Cover the area, cropping if necessary */
  /* Reverted margin-bottom as it's now handled by padding below the image wrapper */
  /* Remove border-radius here as it's handled by the parent item's overflow and top-left/right on image */
  border-top-left-radius: 15px; /* Match parent's top-left radius */
  border-top-right-radius: 15px; /* Match parent's top-right radius */
  flex-shrink: 0; /* Prevent image from shrinking */
}

.service-item p {
  font-size: 1em; /* Paragraph font size */
  color: #444; /* Dark gray color */
  line-height: 1.6; /* Line spacing */
  flex-grow: 1; /* Allow paragraph to grow and take available space */
  overflow-y: hidden; /* Hide overflow content vertically */
  text-overflow: ellipsis; /* Add ellipsis if text overflows */
  display: -webkit-box; /* Required for -webkit-line-clamp */
  -webkit-line-clamp: 7; /* Limit text to 7 lines */
  -webkit-box-orient: vertical; /* Required for -webkit-box-orient */
}

.view-more {
  color: rgb(1, 59, 1); /* Green color for the "View More" link */
  cursor: pointer; /* Pointer cursor on hover */
  font-weight: bold; /* Bold text */
  margin-left: 5px; /* Small margin to the left */
  white-space: nowrap; /* Prevent line breaks within the link */
}

.view-more:hover {
  text-decoration: underline; /* Underline on hover */
}

/* Media Query for Mobile View (screens up to 768px wide) */
@media (max-width: 768px) {
  .services-container {
    flex-wrap: wrap; /* Wrap items to the next line */
    padding: 0 5px; /* Reduced horizontal padding for mobile */
    justify-content: center; /* Center items when wrapped */
  }

  .service-item {
    width: 98%; /* Increased width for mobile cards */
    height: auto; /* Allow height to adjust based on content */
    min-height: 450px; /* Ensure a minimum height for mobile cards */
    margin-bottom: 20px; /* Space between wrapped items */
  }

  /* Adjust padding for service-content on mobile */
  .service-content {
    padding: 15px; /* Slightly less padding on mobile */
  }

  .service-item p {
    font-size: 1em; /* Keep font size consistent */
    color: #000000; /* Black color for paragraph on mobile */
    overflow-y: visible; /* Allow content to expand */
    -webkit-line-clamp: unset; /* Remove line clamping */
  }
}
</style>
