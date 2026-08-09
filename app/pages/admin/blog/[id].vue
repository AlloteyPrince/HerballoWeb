<template>
  <div class="edit-post-container">
    <div class="header-row">
      <button @click="router.back()" class="btn-back">← Back to Dashboard</button>
      <h3>Edit Blog Post</h3>
    </div>

    <form v-if="!pending && post" @submit.prevent="handleUpdate" class="edit-form">
      <div class="form-grid">
        <div class="main-fields">
          <label>Post Title</label>
          <input v-model="form.title" placeholder="Title" required />

          <label>Category</label>
          <select v-model="form.category" required>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>

          <label>Excerpt</label>
          <textarea v-model="form.excerpt" rows="2" required></textarea>

          <label>Content</label>
          <textarea v-model="form.content" class="content-area" required></textarea>
        </div>

        <div class="sidebar-fields">
          <div class="upload-section">
            <label>Cover Image</label>
            <img v-if="form.coverImage" :src="form.coverImage" alt="Cover image preview" class="preview-img" />
            <input type="file" accept="image/*" @change="handleFileUpload" />
          </div>

          <div class="author-section">
            <label>Author Name</label>
            <input v-model="form.author" required />

            <label class="checkbox-label">
              <input type="checkbox" v-model="form.published" />
              Published
            </label>
          </div>
        </div>
      </div>

      <div class="action-footer">
        <button type="submit" :disabled="updating" class="btn-update">
          {{ updating ? "Updating..." : "Save Changes" }}
        </button>
        <button type="button" :disabled="deleting" class="btn-delete" @click="handleDelete">
          {{ deleting ? "Deleting..." : "Delete Post" }}
        </button>
        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </form>

    <div v-else-if="pending" class="loading-state">Loading post details...</div>
    <div v-else class="loading-state">Post not found.</div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const postId = route.params.id;

const categories = ["Consultation", "Education", "Wellness", "Diabetes", "Hypertension", "General"];

const updating = ref(false);
const deleting = ref(false);
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

const { data: post, pending } = await useAsyncData(
  `admin-post-${postId}`,
  () => adminFetch(`/api/admin/posts/${postId}`)
);

if (post.value) {
  form.value = {
    title: post.value.title,
    category: post.value.category,
    excerpt: post.value.excerpt,
    content: post.value.content,
    author: post.value.author,
    coverImage: post.value.cover_image,
    published: post.value.published,
  };
}

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const body = new FormData();
  body.append("file", file);

  try {
    const { url } = await adminFetch('/api/admin/upload', { method: 'POST', body });
    form.value.coverImage = url;
  } catch (err) {
    error.value = "Cover image upload failed";
  }
};

const handleUpdate = async () => {
  updating.value = true;
  message.value = "";
  error.value = "";

  try {
    await adminFetch(`/api/admin/posts/${postId}`, {
      method: "PUT",
      body: {
        title: form.value.title,
        category: form.value.category,
        excerpt: form.value.excerpt,
        content: form.value.content,
        author: form.value.author,
        coverImage: form.value.coverImage,
        published: form.value.published,
      },
    });
    message.value = "✅ Post updated successfully!";
  } catch (err) {
    error.value = err.data?.statusMessage || "Update failed";
  } finally {
    updating.value = false;
  }
};

const handleDelete = async () => {
  if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

  deleting.value = true;
  try {
    await adminFetch(`/api/admin/posts/${postId}`, { method: "DELETE" });
    router.push("/admin");
  } catch (err) {
    error.value = err.data?.statusMessage || "Delete failed";
    deleting.value = false;
  }
};

definePageMeta({
  layout: false,
  middleware: 'admin',
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

input, textarea, select {
  width: 100%;
  padding: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  width: auto;
  font-size: 0.9rem;
}

.checkbox-label input {
  width: auto;
  margin-bottom: 0;
}

.content-area { min-height: 400px; }

.preview-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.action-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-update {
  background: #105212;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-delete {
  background: #fee2e2;
  color: #dc2626;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-delete:hover { background: #dc2626; color: white; }

.success { color: #10b981; font-weight: bold; }
.error { color: #ef4444; font-weight: bold; }
</style>
