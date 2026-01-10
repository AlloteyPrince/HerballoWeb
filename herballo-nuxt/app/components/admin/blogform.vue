<template>
  <div class="blog-form">
    <h3>Create Blog Post</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.title" placeholder="Title" required />
      <input v-model="form.tags" placeholder="Tags (comma separated)" />
      
      <label class="file-label">Cover Image</label>
      <input type="file" @change="e => handleFileUpload(e, 'coverImage')" />
      
      <input v-model="form.authorName" placeholder="Author Name" required />
      <textarea v-model="form.authorBio" placeholder="Author Bio" required></textarea>
      
      <label class="file-label">Author Avatar</label>
      <input type="file" @change="e => handleFileUpload(e, 'authorAvatar')" />
      
      <textarea v-model="form.content" placeholder="Content" class="content-area" required></textarea>
      
      <button type="submit" :disabled="loading">
        {{ loading ? "Publishing..." : "Create Post" }}
      </button>
    </form>
    
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
// Nuxt auto-imports ref, useRuntimeConfig, useCookie
const config = useRuntimeConfig();
const token = useCookie('auth_token');
const emit = defineEmits(['postCreated']);

const loading = ref(false);
const message = ref("");
const error = ref("");

const form = ref({
  title: "",
  tags: "",
  content: "",
  authorName: "",
  authorBio: "",
  coverImage: null,
  authorAvatar: null
});

// Helper: Note - verify your 'uploadFile' utility is in 'app/utils/helper.js'
// Nuxt 3 also auto-imports files from the 'utils' directory if they use named exports
const handleFileUpload = async (e, field) => {
  const file = e.target.files[0];
  if (!file) return;
  
  try {
    loading.value = true;
    // Assuming uploadFile is available globally from app/utils/
    form.value[field] = await uploadFile(file);
    message.value = `${field} uploaded successfully!`;
  } catch (err) {
    error.value = `Failed to upload ${field}`;
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = "";
  message.value = "";

  try {
    await $fetch('/api/posts', {
      baseURL: config.public.apiBase,
      method: "POST",
      headers: {
        // Adding the auth token from our cookie
        Authorization: `Bearer ${token.value}`
      },
      body: {
        title: form.value.title,
        tags: parseTags(form.value.tags), // Assuming parseTags is in utils
        content: form.value.content,
        coverImage: form.value.coverImage,
        author: {
          name: form.value.authorName,
          bio: form.value.authorBio,
          avatar: form.value.authorAvatar
        },
      },
    });

    message.value = "✅ Post created successfully!";
    emit('postCreated'); // Let the parent know to refresh the list
    
    // Reset form
    form.value = { 
      title: "", tags: "", content: "", 
      authorName: "", authorBio: "", 
      coverImage: null, authorAvatar: null 
    };
  } catch (err) {
    error.value = err.data?.message || "Failed to create post";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.blog-form {
  max-width: 100%; /* Changed from 700px to fill the dashboard pane */
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

input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-family: inherit;
}

.content-area {
  min-height: 200px;
}

button {
  padding: 12px 24px;
  background: #105212; /* Matches Herballo branding */
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