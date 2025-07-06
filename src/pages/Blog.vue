<template>
  <section class="blog-page">
    <h1 class="blog-header">Herballo Blog</h1>

    <div v-if="loading" class="blog-message">Loading posts...</div>
    <div v-else-if="error" class="blog-message error">{{ error }}</div>

    <div class="blog-grid">
      <BlogCard v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlogCard from '../components/BlogCard.vue'

const posts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/posts')
    const data = await res.json()
    posts.value = data.reverse()
  } catch (err) {
    error.value = 'Failed to load blog posts.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f8f9fa;
}

.blog-header {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.blog-message {
  text-align: center;
  color: #666;
}

.blog-message.error {
  color: #c0392b;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
