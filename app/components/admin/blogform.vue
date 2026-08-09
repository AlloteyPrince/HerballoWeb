<template>
  <div class="blog-form">
    <h3>Create Blog Post</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.title" placeholder="Title" required />

      <select v-model="form.category" required>
        <option value="" disabled>Select a category</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>

      <textarea v-model="form.excerpt" placeholder="Short excerpt (shown in the blog list)" rows="2" required></textarea>

      <label class="file-label">Cover Image</label>
      <input type="file" accept="image/*" @change="e => handleFileUpload(e)" />
      <img v-if="form.coverImage" :src="form.coverImage" alt="Cover preview" class="cover-preview" />

      <input v-model="form.author" placeholder="Author Name" required />

      <textarea v-model="form.content" placeholder="Content" class="content-area" required></textarea>

      <label class="checkbox-label">
        <input type="checkbox" v-model="form.published" />
        Publish immediately
      </label>

      <button type="submit" :disabled="loading">
        {{ loading ? "Publishing..." : "Create Post" }}
      </button>
    </form>

    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
const emit = defineEmits(['postCreated']);

const categories = ["Consultation", "Education", "Wellness", "Diabetes", "Hypertension", "General"];

const loading = ref(false);
const uploading = ref(false);
const message = ref("");
const error = ref("");

const form = ref({
  title: "",
  category: "",
  excerpt: "",
  content: "",
  author: "",
  coverImage: "",
  published: true,
});

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const body = new FormData();
  body.append("file", file);

  try {
    uploading.value = true;
    const { url } = await adminFetch('/api/admin/upload', { method: 'POST', body });
    form.value.coverImage = url;
  } catch (err) {
    error.value = "Failed to upload cover image";
  } finally {
    uploading.value = false;
  }
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = "";
  message.value = "";

  try {
    await adminFetch('/api/admin/posts', {
      method: "POST",
      body: {
        title: form.value.title,
        category: form.value.category,
        excerpt: form.value.excerpt,
        content: form.value.content,
        author: form.value.author,
        coverImage: form.value.coverImage || null,
        published: form.value.published,
      },
    });

    message.value = "✅ Post created successfully!";
    emit('postCreated');

    form.value = {
      title: "", category: "", excerpt: "", content: "",
      author: "", coverImage: "", published: true,
    };
  } catch (err) {
    error.value = err.data?.statusMessage || "Failed to create post";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.blog-form {
  max-width: 100%;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.file-label {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 4px;
}

input, textarea, select {
  display: block;
  width: 100%;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-family: inherit;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  width: auto;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: #334155;
}

.checkbox-label input {
  width: auto;
  margin-bottom: 0;
}

.content-area {
  min-height: 200px;
}

.cover-preview {
  width: 100%;
  max-width: 240px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

button {
  padding: 12px 24px;
  background: #105212;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success { color: #059669; font-weight: 500; margin-top: 10px; }
.error { color: #dc2626; font-weight: 500; margin-top: 10px; }
</style>
