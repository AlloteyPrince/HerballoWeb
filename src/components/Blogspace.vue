<template>
  <div v-if="!error && posts.length > 0" class="blog-container">
    <div class="blogvisit">
      <p class="blog-visit">
        <router-link to="/blog">Our Research</router-link>
      </p>
    </div>

    <div
      class="blogspace"
      @mouseenter="pauseScroll"
      @mouseleave="resumeScroll"
      @touchstart="pauseScroll"
      @touchend="resumeScroll"
    >
      <div class="blog-track" :class="{ 'is-paused': isScrollingPaused }">
        <router-link
          v-for="post in posts"
          :key="post._id"
          :to="{ name: 'publicBlogDetail', params: { slug: post._id } }"
          class="box"
        >
          <div class="inner-box">
            <img class="img-box" :src="post.image" :alt="post.title" />
          </div>
          <div class="texts">
            <p class="box-text">{{ post.title }}</p>
            <p class="box-text2">{{ post.subtitle }}</p>
          </div>
        </router-link>

        <router-link
          v-for="post in posts"
          :key="post._id + '-dup'"
          :to="{ name: 'publicBlogDetail', params: { slug: post._id } }"
          class="box"
        >
          <div class="inner-box">
            <img class="img-box" :src="post.image" :alt="post.title" />
          </div>
          <div class="texts">
            <p class="box-text">{{ post.title }}</p>
            <p class="box-text2">{{ post.subtitle }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="blog-cta">
      <router-link to="/blog" class="blog-cta-button">
        Explore more
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { api } from "../api";
import { ref, onMounted } from "vue";

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
    posts.value = allPosts.reverse().slice(0, 4);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Scoped styles ensure these styles only apply to this component */
.blog-container {
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 6rem 0;
}

.blogvisit {
  margin-bottom: 2rem;
  color: #105212;
}

.blog-visit a {
  font-weight: 800;
  font-size: 3em;
  color: rgb(1, 59, 1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-visit a:hover {
  color: #666;
}

.blog-visit a:visited {
  color: #666;
}

.blogspace {
  width: 80%;
  overflow: hidden;
  position: relative;
}

.blog-track {
  display: flex;
  white-space: nowrap;
  animation: scroll-left 40s linear infinite;
  padding-bottom: 1rem;
}

.blog-track.is-paused {
  animation-play-state: paused;
}

/* Keyframe animation for continuous horizontal scroll (Desktop) */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Adjusted value for 4 boxes + 3 gaps on desktop */
    transform: translateX(-1192px);
  }
}

/* Updated `box` class to remove default link styling */
.box {
  height: auto;
  min-height: 180px;
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: box-shadow ease-in-out 0.3s;
  display: flex;
  flex-direction: column;
  width: 280px; /* Increased width */
  margin-right: 1.5rem;
  flex-shrink: 0;
  text-decoration: none; /* Remove underline from router-link */
  color: inherit; /* Inherit text color from parent */
}

.box:hover {
  box-shadow: 0 10px 20px rgb(197, 197, 197);
}

.inner-box {
  flex-shrink: 0;
}

.img-box {
  height: 150px; /* Increased height */
  width: 100%;
  object-fit: cover;
  display: block;
  border-radius: 20px 20px 0 0;
}

.texts {
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.box p {
  text-align: center;
  color: rgb(15, 32, 20);
  margin: 0;
  white-space: normal;
}

.box-text {
  font-weight: bold;
}

.box-text2 {
  font-size: 0.8rem;
}

.blog-cta {
  margin-top: 2rem;
  text-align: center;
}

.blog-cta-button {
  display: inline-block;
  padding: 1rem 2rem;
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
  background-color: #48bb78;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(56, 161, 105, 0.4);
}

.blog-message {
  text-align: center;
  color: #666;
  width: 100%;
  margin: 2rem 0;
}

.blog-message.error {
  color: #dc3545;
}

/* Media Query for Mobile View */
@media screen and (max-width: 800px) {
  .blog-container {
    width: 100%;
    padding: 2rem 0;
  }

  .blogspace {
    width: 100%;
    padding: 0 0.5rem;
  }

  .blog-track {
    animation-duration: 25s;
  }

  /* Re-calculated for 4 boxes + 3 gaps on mobile */
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-848px);
    }
  }

  .box {
    width: 200px; /* Increased width */
    min-height: 240px;
    margin-right: 1rem;
  }

  .img-box {
    height: 120px; /* Increased height */
  }

  .texts {
    padding: 8px;
  }

  .box-text2 {
    font-size: 0.75rem;
  }

  .blog-visit a {
    font-size: 2rem;
  }
}
</style>
