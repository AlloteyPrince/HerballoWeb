<template>
  <div v-if="!error && posts.length > 0" class="blog-container">
    <div class="blog-header">
      <h2 class="blog-title-heading">Our Latest Insights</h2>
      <p class="blog-subtitle">
        Stay informed and inspired with herbal medicine news and insights that
        cuts across.
      </p>
    </div>

    <div class="blog-grid">
      <BlogCardPV1
        v-for="post in posts"
        :key="post._id"
        :post="post"
      />
    </div>

    <div class="blog-cta">
      <router-link to="/blog" class="blog-cta-button">
        Explore more
      </router-link>
    </div>

    <div v-if="loading" class="blog-message">Loading posts...</div>
    <div v-else-if="error" class="blog-message error">{{ error }}</div>
  </div>
</template>

<script setup>
import { api } from "../api";
import { ref, onMounted } from "vue";
import BlogCardPV1 from "./BlogCardPV1.vue"; // Adjust path if necessary

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fetch(api("/api/posts"));
    if (!res.ok) {
      throw new Error("Failed to load blog posts.");
    }
    const allPosts = await res.json();
    // Get the 4 most recent blog posts
    posts.value = allPosts.reverse().slice(0, 4);
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    error.value = "Failed to load blog posts. Please try again later.";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/*
  CSS is now structured for a single, centered grid row.
*/
.blog-container {
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin: 0 auto;
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

/* This is the key change for the grid layout */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Forces exactly 4 columns */
  gap: 2rem; /* Spacing between cards */
  max-width: 1200px; /* Limits the max width of the grid */
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
}

.blog-cta-button:hover {
  background-color: #2f855a;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(56, 161, 105, 0.4);
}

.blog-message {
  text-align: center;
  color: #666;
  margin-top: 2rem;
}

.blog-message.error {
  color: #dc3545;
}

/* Media Queries for responsive design */
@media (max-width: 1024px) {
  /* On tablets, show 2 cards per row */
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  /* On mobile, show 1 card per row */
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