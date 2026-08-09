<template>
  <div class="blog-list">
    <div class="controls">
      <input v-model="searchQuery" type="text" placeholder="Search posts..." />
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="c in uniqueCategories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div v-if="pending">Loading blog posts...</div>
    <div v-else-if="error">Failed to load posts: {{ error.data?.statusMessage || error.message }}</div>
    <div v-else-if="filteredPosts.length === 0">No blog posts found.</div>
    <div v-else class="post-cards">
      <div v-for="post in filteredPosts" :key="post.id" class="post-card">
        <span class="status-pill" :class="post.published ? 'is-published' : 'is-draft'">
          {{ post.published ? 'Published' : 'Draft' }}
        </span>
        <div class="card-content" @click="openPost(post.id)">
          <img
            v-if="post.cover_image"
            :src="post.cover_image"
            :alt="post.title"
            class="cover"
          />
          <h3>{{ post.title }}</h3>
          <p class="category">#{{ post.category }}</p>
          <p class="preview">{{ post.excerpt }}</p>
          <p class="meta">By {{ post.author }} · {{ formatDate(post.date) }}</p>
        </div>
        <button class="delete" @click.stop="handleDelete(post.id)">
          🗑️ Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  refreshKey: Number,
});

const router = useRouter();

const searchQuery = ref("");
const selectedCategory = ref("");

const { data: posts, pending, error, refresh } = await useAsyncData(
  () => `admin-posts-${props.refreshKey}`,
  () => adminFetch('/api/admin/posts'),
  { default: () => [] }
);

watch(() => props.refreshKey, () => {
  refresh();
});

const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

  try {
    await adminFetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    refresh();
  } catch (err) {
    console.error("Delete failed:", err);
    alert(err.data?.statusMessage || "Failed to delete post.");
  }
};

const openPost = (id) => {
  router.push(`/admin/blog/${id}`);
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  });
};

const uniqueCategories = computed(() => {
  const set = new Set();
  posts.value?.forEach((post) => { if (post.category) set.add(post.category); });
  return [...set];
});

const filteredPosts = computed(() => {
  if (!posts.value) return [];

  return posts.value.filter((post) => {
    const q = searchQuery.value.toLowerCase();
    const matchesSearch = !q || post.title.toLowerCase().includes(q) || post.excerpt?.toLowerCase().includes(q);
    const matchesCategory = !selectedCategory.value || post.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});
</script>

<style scoped>
.blog-list { margin-top: 20px; }

.controls {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.controls input, .controls select {
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  flex: 1;
  outline: none;
}

.controls input:focus { border-color: #105212; }

.post-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.post-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }

.status-pill {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  z-index: 1;
}
.status-pill.is-published { background: #dcfce7; color: #15803d; }
.status-pill.is-draft { background: #fef3c7; color: #92400e; }

.delete {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.delete:hover { background: #dc2626; color: white; }

.category { color: #105212; font-size: 0.85em; font-weight: 600; margin-bottom: 8px; }

.preview { font-size: 0.9em; color: #64748b; line-height: 1.5; margin-bottom: 8px; }

.meta { font-size: 0.75em; color: #94a3b8; }

.cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}
</style>
