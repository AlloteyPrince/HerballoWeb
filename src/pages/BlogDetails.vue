<template>
  <div class="blog-details" v-if="post">
    <h2>{{ post.title }}</h2>
    <p class="tags">#{{ post.tags.join(' #') }}</p>
    <div v-html="post.content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const post = ref(null)
const route = useRoute()

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/posts/${route.params.id}`)
    post.value = await res.json()
  } catch (err) {
    console.error('Failed to load post:', err)
  }
})
</script>

<style scoped>
.blog-details {
  max-width: 700px;
  margin: 40px auto;
  background: white;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
}
.blog-details h2 {
  margin-bottom: 10px;
}
.tags {
  color: #3498db;
  margin-bottom: 20px;
  display: block;
}
</style>
