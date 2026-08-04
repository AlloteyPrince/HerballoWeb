<template>
  <div class="blog-list">
    <div class="controls">
      <input v-model="searchQuery" type="text" placeholder="Search posts..." />
      <select v-model="selectedTag">
        <option value="">All Tags</option>
        <option v-for="tag in uniqueTags" :key="tag" :value="tag">
          #{{ tag }}
        </option>
      </select>
    </div>

    <div v-if="pending">Loading blog posts...</div>
    <div v-else-if="filteredPosts.length === 0">No blog posts found.</div>
    <div v-else class="post-cards">
      <div v-for="post in filteredPosts" :key="post._id" class="post-card">
        <div class="card-content" @click="openPost(post._id)">
          <img
            v-if="post.coverImage"
            :src="getFullImageUrl(post.coverImage)"
            alt="Cover"
            class="cover"
          />
          <h3>{{ post.title }}</h3>
          <p class="tags">#{{ post.tags.join(" #") }}</p>
          <p class="preview">{{ trimContent(post.content) }}</p>
        </div>
        <button class="delete" @click.stop="handleDelete(post._id)">
          🗑️ Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Nuxt auto-imports ref, computed, watch, useRuntimeConfig, etc.
const props = defineProps({
  refreshKey: Number,
});

const config = useRuntimeConfig();
const router = useRouter();
const token = useCookie('auth_token');

const searchQuery = ref("");
const selectedTag = ref("");

// 1. Data Fetching using Nuxt's useFetch
// This will reactively re-fetch whenever refreshKey changes
const { data: posts, pending, refresh } = await useFetch('/api/posts', {
  baseURL: config.public.apiBase,
  key: `admin-posts-${props.refreshKey}`, // Unique key based on refresh prop
  default: () => []
});

// Watch the refreshKey prop to trigger a refresh
watch(() => props.refreshKey, () => {
  refresh();
});

// 2. Methods
const getFullImageUrl = (path) => {
  if (!path) return '';
  // If path is already a full URL, return it; otherwise, append base API
  return path.startsWith('http') ? path : `${config.public.apiBase}${path}`;
};

const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this post?")) return;
  
  try {
    await $fetch(`/api/posts/${id}`, {
      baseURL: config.public.apiBase,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    
    // Refresh the list after successful deletion
    refresh();
  } catch (err) {
    console.error("Delete failed:", err);
    alert(err.data?.message || "Failed to delete post.");
  }
};

const openPost = (id) => {
  router.push(`/admin/blog/${id}`);
};

// 3. Computed Logic
const trimContent = (html) => {
  if (!html) return "";
  const plain = html.replace(/<[^>]*>/g, "");
  return plain.length > 100 ? plain.slice(0, 100) + "..." : plain;
};

const uniqueTags = computed(() => {
  const tagSet = new Set();
  posts.value?.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });
  return [...tagSet];
});

const filteredPosts = computed(() => {
  if (!posts.value) return [];
  
  return posts.value.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesTag =
      !selectedTag.value || post.tags.includes(selectedTag.value);

    return matchesSearch && matchesTag;
  });
});
</script>

<style scoped>
/* I've kept your styles but optimized them for a cleaner Admin look */
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

.tags { color: #105212; font-size: 0.85em; font-weight: 600; margin-bottom: 8px; }

.preview { font-size: 0.9em; color: #64748b; line-height: 1.5; }

.cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}
</style>