<template>
  <div class="blog-form">
    <h3>Create new blog post</h3>

    <form @submit.prevent="handleSubmit">
      <input v-model="title" type="text" placeholder="Title" required />
      <input v-model="slug" type="text" placeholder="Slug" required />
      <input v-model="tags" type="text" placeholder="Tags (comma separated)" />
      <input type="file" @change="handleFileUpload" />

      <!-- Quill Editor -->
      <QuillEditor
        ref="quillRef"
        v-model:content="content"
        contentType="html"
        class="quill"
        :modules="modules"
      />

      <button type="submit">Submit Post</button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const title = ref('')
const slug = ref('')
const tags = ref('')
const content = ref('')
const message = ref('')
const error = ref('')
const coverImage = ref(null)
const quillRef = ref(null)

const emit = defineEmits(['postCreated'])

const handleFileUpload = async (e) => {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('image', file)

  try {
    const res = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    coverImage.value = data.imageUrl
  } catch (err) {
    console.error('Image upload failed:', err)
  }
}

const handleSubmit = async () => {
  message.value = ''
  error.value = ''

  try {
    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title: title.value,
        slug: slug.value,
        tags: tags.value.split(',').map((t) => t.trim()),
        content: content.value,
        coverImage: coverImage.value,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      error.value = data.message || 'Failed to create post'
    } else {
      message.value = '✅ Blog post created!'
      emit('postCreated')
      title.value = ''
      slug.value = ''
      tags.value = ''
      content.value = ''
    }
  } catch (err) {
    error.value = '❌ Something went wrong'
  }
}

// Optional: Setup for image uploads inside Quill
const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
    ],
    handlers: {
      image: () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = async () => {
          const file = input.files[0]
          const formData = new FormData()
          formData.append('image', file)

          try {
            const res = await fetch('http://localhost:5000/api/upload', {
              method: 'POST',
              body: formData,
            })
            const data = await res.json()
            const imageUrl = `http://localhost:5000${data.imageUrl}`

            const editor = quillRef.value?.getEditor?.()
            if (editor) {
              const range = editor.getSelection()
              editor.insertEmbed(range.index, 'image', imageUrl)
            }
          } catch (err) {
            console.error('Image upload failed:', err)
          }
        }
      },
    },
  },
}
</script>

<style scoped>
.blog-form {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.quill {
  margin-bottom: 16px;
  background: white;
  border-radius: 6px;
  border: 1px solid #ccc;
  overflow: hidden;
}

button {
  padding: 10px 16px;
  background-color: #2ecc71;
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
