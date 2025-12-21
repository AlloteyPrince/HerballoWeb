<template>
  <div v-if="!error && posts.length > 0" class="blog-container">
    <!-- Section Title and Subtitle -->
    <div class="blog-header">
      <h2 class="blog-title-heading">Our Latest Insights</h2>
      <p class="blog-subtitle">
        Stay informed and inspired with herbal medicine news and insights that
        cuts across.
      </p>
    </div>

    <!-- Static, Centered 4-Card Grid -->
    <div class="blog-grid">
      <BlogCardPV1 v-for="post in posts" :key="post._id" :post="post" />
    </div>

    <!-- Centered "Explore More" Button -->
    <div class="blog-cta">
      <router-link
        to="/blog"
        class="blog-cta-button"
        :class="{ pulse: isPulsing }"
      >
        Explore more
      </router-link>
    </div>

    <!-- Loading and Error States -->
    <div v-if="loading" class="blog-message">Loading posts...</div>
    <div v-else-if="error" class="blog-message error">{{ error }}</div>
  </div>
</template>

<script setup>
import { api } from "../api";
import { ref, onMounted } from "vue";
import BlogCardPV1 from "./BlogCardPV1.vue";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const isPulsing = ref(false);

const startPulseAnimation = () => {
  setInterval(() => {
    isPulsing.value = true;
    setTimeout(() => {
      isPulsing.value = false;
    }, 1500); // Pulse duration is 2s, so we stop the class at 1.5s
  }, 2000); // Repeat every 2 seconds
};

onMounted(async () => {
  try {
    const res = await fetch(api("/api/posts"));
    if (!res.ok) {
      throw new Error("Failed to load blog posts.");
    }
    const allPosts = await res.json();
    posts.value = allPosts.reverse().slice(0, 4);
    startPulseAnimation(); // Start the pulse animation after the data loads
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    error.value = "Failed to load blog posts. Please try again later.";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.blog-container {
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin: 0 auto;
  width: 100%;
}

.blog-header {
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
}

.blog-title-heading {
  font-size: 2.5rem;
  font-weight: bold;
  color: #105212;
  margin-bottom: 0.5rem;
}

.blog-subtitle {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
}

.blog-cta {
  margin-top: 3rem;
  text-align: center;
}

.blog-cta-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: #38a169;
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(56, 161, 105, 0.3);
  position: relative;
  overflow: hidden;
}

.blog-cta-button:hover {
  background-color: #2f855a;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(56, 161, 105, 0.4);
}

.blog-cta-button.pulse {
  animation: pulse 2s infinite;
}

.blog-message {
  text-align: center;
  color: #666;
  margin-top: 2rem;
}

.blog-message.error {
  color: #dc3545;
}

/* Animations from ConsultationSteps */
@keyframes pulse {
  0%,
  100% {
    box-shadow:
      0 4px 6px -1px rgba(16, 82, 18, 0.3),
      0 2px 4px -1px rgba(16, 82, 18, 0.2),
      0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  50% {
    box-shadow:
      0 4px 6px -1px rgba(16, 82, 18, 0.3),
      0 2px 4px -1px rgba(16, 82, 18, 0.2),
      0 0 0 10px rgba(34, 197, 94, 0);
  }
}

/* Media Queries for responsive design */
@media (max-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .blog-title-heading {
    font-size: 2rem;
  }
  .blog-subtitle {
    font-size: 0.9rem;
  }
}
</style>
