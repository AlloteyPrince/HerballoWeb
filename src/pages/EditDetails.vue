<template>
  <div class="edit-post">
    <h2>Edit Blog Post</h2>

    <form @submit.prevent="handleUpdate">
      <input v-model="title" type="text" placeholder="Title" required />
      <input v-model="slug" type="text" placeholder="Slug" required />
      <input v-model="tags" type="text" placeholder="Tags (comma separated)" />

      <quill-editor v-model:content="content" contentType="html" />

      <button type="submit">Update Post</button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const route = useRoute()
const router = useRouter()

const title = ref('')
const slug = ref('')
const tags = ref('')
const content = ref('')
const message = ref('')
const error = ref('')

// Fetch the existing post
onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/posts/${route.params.id}`)
    const data = await res.json()
    title.value = data.title
    slug.value = data.slug
    tags.value = data.tags.join(', ')
    content.value = data.content
  } catch (err) {
    error.value = 'Failed to fetch blog post'
  }
})

// Update handler
const handleUpdate = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/posts/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title: title.value,
        slug: slug.value,
        tags: tags.value.split(',').map(t => t.trim()),
        content: content.value,
      })
    })

    if (!res.ok) {
      const data = await res.json()
      error.value = data.message || 'Failed to update'
    } else {
      message.value = '✅ Post updated!'
      setTimeout(() => router.push(`/admin/blog/${route.params.id}`), 1000)
    }
  } catch (err) {
    error.value = 'Error updating post'
  }
}
</script>

<style scoped>
.edit-post {
  max-width: 700px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}
input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  padding: 10px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.success {
  color: green;
  margin-top: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
