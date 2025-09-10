<template>
  <div v-if="!error && posts.length > 0" class="blog-container">
    <div class="blog-heading-and-link">
      <h2 class="blog-heading">
        <router-link to="/blog">Our Research</router-link>
      </h2>
      <router-link to="/blog" class="explore-more-link">
        Explore more
      </router-link>
    </div>

    <div
      class="blog-track-wrapper"
      @mouseenter="pauseScroll"
      @mouseleave="resumeScroll"
      @touchstart="pauseScroll"
      @touchend="resumeScroll"
    >
      <div class="blog-track" :class="{ 'is-paused': isScrollingPaused }">
        <BlogCardPV1
          v-for="post in posts"
          :key="post._id"
          :post="post"
          class="blog-card"
        />
        <BlogCardPV1
          v-for="post in posts"
          :key="post._id + '-dup'"
          :post="post"
          class="blog-card"
        />
      </div>
    </div>

    <div v-if="loading" class="blog-message">Loading posts...</div>
    <div v-else-if="error" class="blog-message error">{{ error }}</div>
  </div>
</template>

<script setup>
import { api } from "../api";
import { ref, onMounted } from "vue";
import BlogCardPV1 from "./BlogCardPV1.vue"; // Ensure this path is correct

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const isScrollingPaused = ref(false);

const pauseScroll = () => {
  isScrollingPaused.value = true;
};

const resumeScroll = () => {
  isScrollingPaused.value = false;
};

onMounted(async () => {
  try {
    const res = await fetch(api("/api/posts"));
    if (!res.ok) {
      throw new Error("Failed to load blog posts.");
    }
    const allPosts = await res.json();
    // Get the latest 5 posts to display in the carousel
    posts.value = allPosts.reverse().slice(0, 5); 
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
  Here is the updated CSS. The goal is to make the card-specific styling
  handled by BlogCardPV1, and this component's CSS will only handle
  the layout and animation.
*/
.blog-container {
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  overflow: hidden;
}

.blog-heading-and-link {
  width: 90%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.blog-heading {
  font-size: 2.5rem;
  margin: 0;
}

.blog-heading a {
  color: #105212;
  text-decoration: none;
  font-weight: bold;
}

.explore-more-link {
  padding: 0.75rem 1.5rem;
  background-color: #38a169;
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  white-space: nowrap;
}

.explore-more-link:hover {
  background-color: #2f855a;
  transform: translateY(-2px);
}

.blog-track-wrapper {
  width: 100%;
  overflow: hidden;
}

.blog-track {
  display: flex;
  white-space: nowrap;
  animation: scroll-left 50s linear infinite;
}

.blog-track.is-paused {
  animation-play-state: paused;
}

/* Keyframe animation for continuous horizontal scroll */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Adjusted to scroll half the track's width */
    transform: translateX(-50%);
  }
}

.blog-track .blog-card {
  /* This ensures the cards are the same size and spacing */
  width: 300px; /* Adjust as needed */
  margin-right: 2rem; /* Spacing between cards */
  flex-shrink: 0;
}

/* Media Queries for different screen sizes */
@media (max-width: 1024px) {
  .blog-heading {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .blog-heading-and-link {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 1rem;
  }

  .explore-more-link {
    margin-top: 1rem;
    align-self: flex-end;
  }

  .blog-track {
    animation-duration: 30s;
  }

  .blog-track .blog-card {
    width: 250px;
    margin-right: 1.5rem;
  }
}
</style>