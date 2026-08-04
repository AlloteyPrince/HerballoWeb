<template>
  <section 
    v-if="!pending && !error && posts?.length > 0" 
    class="blog-section" 
    ref="blogSectionRef"
  >
    <div class="blog-container">
      <div class="blog-header" :class="{ 'animate-in': isVisible }">
        <h2 class="blog-title-heading">Our Latest Insights</h2>
        <p class="blog-subtitle">
          Stay informed and inspired with herbal medicine news and insights that
          reach across borders.
        </p>
      </div>

      <div class="blog-grid">
        <Blogcardpv1 
          v-for="(post, index) in posts" 
          :key="post._id" 
          :post="post" 
          :class="{ 'animate-in': isVisible }"
          :style="{ transitionDelay: `${index * 0.15}s` }"
        />
      </div>

      <div class="blog-cta" :class="{ 'animate-in': isVisible }">
        <NuxtLink
          to="/blog"
          class="blog-cta-button"
          :class="{ pulse: isPulsing }"
        >
          Explore more
        </NuxtLink>
      </div>
    </div>
  </section>

  <div v-else-if="pending" class="blog-skeleton-loader">
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Nuxt 3 Data Fetching - Hides component if fetch fails or returns empty
const { data: posts, pending, error } = await useFetch('/api/posts', {
  baseURL: 'https://your-api-url.com', 
  transform: (data) => {
    if (!data || data.length === 0) return [];
    return data.reverse().slice(0, 4);
  }
});

const isVisible = ref(false);
const blogSectionRef = ref(null);
const isPulsing = ref(false);

const startPulseAnimation = () => {
  setInterval(() => {
    isPulsing.value = true;
    setTimeout(() => { isPulsing.value = false; }, 1500);
  }, 2000);
};

onMounted(() => {
  startPulseAnimation();
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true;
    }
  }, { threshold: 0.15 });

  if (blogSectionRef.value) observer.observe(blogSectionRef.value);
});
</script>

<style lang="scss" scoped>
/* Only takes up space if content is visible */
.blog-section {
  padding: 100px 5%;
  background-color: white;
  font-family: "Segoe UI", Tahoma, sans-serif;
}

.blog-container {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.blog-title-heading {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 800;
  color: #105212;
  margin-bottom: 1rem;
}

.blog-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
}

/* Staggered Card Animation */
:deep(.blog-card-pv1) {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.blog-cta {
  margin-top: 5rem;
  opacity: 0;
  transition: opacity 1s ease-in;
  transition-delay: 0.6s;

  &.animate-in {
    opacity: 1;
  }
}

.blog-cta-button {
  display: inline-flex;
  padding: 1.2rem 3.5rem;
  background: linear-gradient(135deg, #105212 0%, #22c55e 100%);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(16, 82, 18, 0.2);

  &.pulse {
    animation: pulse-ring 2s infinite;
  }
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

@media (max-width: 1200px) {
  .blog-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .blog-grid { grid-template-columns: 1fr; }
}
</style>