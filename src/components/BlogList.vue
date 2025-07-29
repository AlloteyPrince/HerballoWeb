<template>
  <div class="blog-list">
    <!-- Search + Filter Controls -->
    <div class="controls">
      <input v-model="searchQuery" type="text" placeholder="Search posts..." />
      <select v-model="selectedTag">
        <option value="">All Tags</option>
        <option v-for="tag in uniqueTags" :key="tag" :value="tag">
          #{{ tag }}
        </option>
      </select>
    </div>

    <!-- Blog Results -->
    <div v-if="loading">Loading blog posts...</div>
    <div v-else-if="filteredPosts.length === 0">No blog posts found.</div>
    <div v-else class="post-cards">
      <div v-for="post in filteredPosts" :key="post._id" class="post-card">
        <div class="card-content" @click="openPost(post._id)">
          <img
            v-if="post.coverImage"
            :src="api(post.coverImage)"
            alt="Cover"
            class="cover"
          />
          <h3>{{ post.title }}</h3>
          <p class="tags">#{{ post.tags.join(" #") }}</p>
          <p class="preview">{{ trimContent(post.content) }}</p>
        </div>
        <button class="delete" @click.stop="deletePost(post._id)">
          🗑️ Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from "@/api";
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  refreshKey: Number,
});

const posts = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const selectedTag = ref("");
const router = useRouter();

const fetchPosts = async () => {
  loading.value = true;
  try {
    const res = await fetch(api('/api/posts'));
    posts.value = await res.json();
  } catch (err) {
    console.error("Error fetching posts:", err);
  }
  loading.value = false;
};

const deletePost = async (id) => {
  if (!confirm("Are you sure you want to delete this post?")) return;
  try {
    const res = await fetch(api(`/api/posts/${id}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.ok) {
      posts.value = posts.value.filter((p) => p._id !== id);
    } else {
      alert("Failed to delete post.");
    }
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

const openPost = (id) => {
  router.push(`/admin/blog/${id}`);
};

watch(() => props.refreshKey, fetchPosts);
onMounted(fetchPosts);

// Remove HTML tags and truncate
const trimContent = (html) => {
  const plain = html.replace(/<[^>]*>/g, "");
  return plain.length > 100 ? plain.slice(0, 100) + "..." : plain;
};

// Extract unique tags from all posts
const uniqueTags = computed(() => {
  const tagSet = new Set();
  posts.value.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return [...tagSet];
});

// Filter by search query and tag
const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
   const matchesSearch =
  post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
  stripHtmlAndTruncate(post.content, 1000).toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesTag =
      !selectedTag.value || post.tags.includes(selectedTag.value);

    return matchesSearch && matchesTag;
  });
});
</script>

<style scoped>
.blog-list {
  margin-top: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.controls input,
.controls select {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
}

.post-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.post-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.post-card:hover {
  transform: translateY(-2px);
}

.card-content {
  cursor: pointer;
}

.delete {
  position: absolute;
  top: 12px;
  right: 12px;
  background: crimson;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 0.8rem;
  cursor: pointer;
}

.tags {
  color: #3498db;
  font-size: 0.9em;
  margin-bottom: 6px;
}

.preview {
  font-size: 0.95em;
  color: #333;
}

.cover {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}
</style>
