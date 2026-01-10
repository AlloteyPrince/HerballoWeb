<template>
  <div class="edit-post-container">
    <div class="header-row">
      <button @click="router.back()" class="btn-back">← Back to Dashboard</button>
      <h3>Edit Blog Post</h3>
    </div>

    <form v-if="!pending" @submit.prevent="handleUpdate" class="edit-form">
      <div class="form-grid">
        <div class="main-fields">
          <label>Post Title</label>
          <input v-model="form.title" placeholder="Title" required />
          
          <label>Tags (comma separated)</label>
          <input v-model="form.tags" placeholder="Herbs, Health, Natural..." />
          
          <label>Content</label>
          <textarea v-model="form.content" class="content-area" required></textarea>
        </div>

        <div class="sidebar-fields">
          <div class="upload-section">
            <label>Cover Image</label>
            <img v-if="form.coverImage" :src="getFullImageUrl(form.coverImage)" class="preview-img" />
            <input type="file" @change="e => handleFileUpload(e, 'coverImage')" />
          </div>

          <div class="author-section">
            <label>Author Name</label>
            <input v-model="form.authorName" required />
            
            <label>Author Bio</label>
            <textarea v-model="form.authorBio" rows="3"></textarea>
            
            <label>Author Avatar</label>
            <img v-if="form.authorAvatar" :src="getFullImageUrl(form.authorAvatar)" class="avatar-preview" />
            <input type="file" @change="e => handleFileUpload(e, 'authorAvatar')" />
          </div>
        </div>
      </div>

      <div class="action-footer">
        <button type="submit" :disabled="updating" class="btn-update">
          {{ updating ? "Updating..." : "Save Changes" }}
        </button>
        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </form>
    
    <div v-else class="loading-state">Loading post details...</div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const token = useCookie('auth_token');
const postId = route.params.id;

const updating = ref(false);
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

// Fetch post data using useFetch (Auto-runs on load)
const { data: post, pending } = await useFetch(`/api/posts/${postId}`, {
  baseURL: config.public.apiBase,
  onResponse({ response }) {
    if (response._data) {
      const d = response._data;
      form.value = {
        title: d.title,
        tags: d.tags ? d.tags.join(", ") : "",
        content: d.content,
        authorName: d.author?.name || "",
        authorBio: d.author?.bio || "",
        coverImage: d.coverImage,
        authorAvatar: d.author?.avatar
      };
    }
  }
});

const getFullImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${config.public.apiBase}${path}`;
};

const handleFileUpload = async (e, field) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    form.value[field] = await uploadFile(file); // From utils/
  } catch (err) {
    error.value = "File upload failed";
  }
};

const handleUpdate = async () => {
  updating.value = true;
  message.value = "";
  error.value = "";

  try {
    await $fetch(`/api/posts/${postId}`, {
      baseURL: config.public.apiBase,
      method: "PUT",
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        title: form.value.title,
        tags: parseTags(form.value.tags), // From utils/
        content: form.value.content,
        coverImage: form.value.coverImage,
        author: {
          name: form.value.authorName,
          bio: form.value.authorBio,
          avatar: form.value.authorAvatar
        },
      },
    });
    message.value = "✅ Post updated successfully!";
  } catch (err) {
    error.value = err.data?.message || "Update failed";
  } finally {
    updating.value = false;
  }
};

// Set layout to false if you don't want the main site navigation
definePageMeta({
  layout: false,
  middleware: 'auth' // Ensure only logged in admins can reach this
});
</script>

<style scoped>
.edit-post-container {
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
}

.header-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 2rem;
}

.btn-back {
  background: none;
  border: 1px solid #ccc;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
}

.form-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.main-fields, .sidebar-fields {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #334155;
}

input, textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.content-area { min-height: 400px; }

.preview-img, .avatar-preview {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.avatar-preview { height: 80px; width: 80px; border-radius: 50%; }

.btn-update {
  background: #105212;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.success { color: #10b981; font-weight: bold; margin-top: 1rem; }
.error { color: #ef4444; font-weight: bold; margin-top: 1rem; }
</style>