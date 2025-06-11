<template>
  <div class="resource-detail-page" v-if="resource">
    <section class="detail-header">
      <router-link to="/library" class="back-link">
        &larr; Back to Library
      </router-link>
      <h1>{{ resource.botanicalName }}</h1>
      <p class="common-name">{{ resource.commonName }}</p>
      <p class="remedies-summary">{{ resource.remedies }}</p>
    </section>

    <section class="detail-content" v-html="resource.content"></section>

    <section class="disclaimer-note">
      <p><strong>Disclaimer:</strong> The information provided here is for educational purposes only and should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always consult with a licensed Medical Herbalist or conventional healthcare professional for any health concerns or before starting any new treatment.</p>
    </section>
  </div>
  <div v-else-if="loading" class="loading-state">
    <p>Loading plant details...</p>
  </div>
  <div v-else class="error-state">
    <p>Plant details not found or an error occurred.</p>
    <p>Please try going back to the <router-link to="/library">Library</router-link>.</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'; // Import defineComponent for Options API

// Plant Structure (for your reference, not enforced without TypeScript)
// {
//   id: string;
//   botanicalName: string;
//   commonName: string;
//   remedies: string;
//   content: string;
// }

export default defineComponent({
  name: 'PlantDetail', // Component name

  data() {
    return {
      resource: null, // Initial state for the plant details
      loading: true,  // Loading indicator
      error: null,    // Error message if fetch fails or resource not found
    };
  },

  watch: {
    // Watch for changes in the route parameter 'id'
    '$route.params.id': {
      handler(newId) {
        if (newId) {
          this.fetchResourceDetails(newId);
        }
      },
      immediate: true, // Run the handler immediately when the component is mounted
    },
  },

  mounted() {
    // In a standard Vue.js project, there's no definePageMeta like in Nuxt.js.
    // The data fetching logic is handled in `watch` or directly in `mounted` if no ID watching is needed.
  },

  methods: {
    async fetchResourceDetails(plantId) {
      this.loading = true; // Set loading to true before fetching
      this.resource = null; // Clear previous resource
      this.error = null;    // Clear previous error

      try {
        const response = await fetch('/ULearn.json'); // Fetch your JSON data
        if (!response.ok) {
          // Handle HTTP errors (e.g., 404, 500)
          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || response.statusText}`);
        }
        const allPlants = await response.json(); // Parse the JSON data
        // Find the specific plant by ID
        this.resource = allPlants.find(plant => plant.id === plantId) || null;

        if (!this.resource) {
          this.error = 'Resource not found.'; // Set error if plant ID is not found
        }
      } catch (e) {
        // Catch any network errors or errors from the fetch/parsing
        this.error = e.message || 'Error fetching resource details.';
        console.error('Error fetching ULearn.json for resource detail:', e);
      } finally {
        this.loading = false; // Set loading to false after fetch completes (success or failure)
      }
    },
  },
});
</script>

<style scoped>
/* Scoped styles for the PlantDetail component */
.resource-detail-page {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.detail-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.back-link {
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  color: #228c8c; /* Your primary light color */
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #1a6f6f; /* A slightly darker shade for hover */
}

.back-link svg {
  margin-right: 8px;
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 10px;
}

.common-name {
  font-size: 1.3em;
  color: #666;
  margin-bottom: 15px;
}

.remedies-summary {
  font-size: 1.1em;
  color: #555;
  line-height: 1.5;
}

.detail-content {
  line-height: 1.7;
  color: #444;
  margin-bottom: 30px;
}

/* Basic styling for content HTML to ensure readability */
.detail-content h2 {
  font-size: 1.8em;
  color: #333;
  margin-top: 25px;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.detail-content h3 {
  font-size: 1.4em;
  color: #444;
  margin-top: 20px;
  margin-bottom: 10px;
}

.detail-content p {
  margin-bottom: 1em;
}

.detail-content ul,
.detail-content ol {
  margin-left: 25px;
  margin-bottom: 1em;
}

.detail-content li {
  margin-bottom: 0.5em;
}

.disclaimer-note {
  background-color: #fcf8e3;
  border: 1px solid #faebcc;
  border-radius: 5px;
  padding: 15px;
  font-size: 0.9em;
  color: #8a6d3b;
  margin-top: 30px;
}

.disclaimer-note strong {
  color: #66512c;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 50px;
  color: #777;
}

.error-state p {
  color: #d9534f;
  font-weight: 500;
}
</style>