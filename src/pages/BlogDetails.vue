<template>
  <div class="blog-details" v-if="post">
    <button class="edit-btn" @click="editPost">✏️ Edit</button>
    <img
      v-if="post.coverImage"
      :src="`http://localhost:5000${post.coverImage}`"
      alt="Cover"
      class="cover-image"
    />
    <h2>{{ post.title }}</h2>
    <p class="tags">#{{ post.tags.join(" #") }}</p>
    <div v-html="post.content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // ✅ add useRouter

const post = ref(null);
const route = useRoute();
const router = useRouter(); // ✅ define router

const editPost = () => {
  router.push(`/admin/blog/edit/${route.params.id}`); // ✅ use router here
};

onMounted(async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/posts/${route.params.id}`
    );
    post.value = await res.json();
  } catch (err) {
    console.error("Failed to load post:", err);
  }
});
</script>

<style scoped>
.blog-details {
  max-width: 700px;
  margin: 40px auto;
  background: white;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}
.blog-details h2 {
  margin-bottom: 10px;
}
.tags {
  color: #3498db;
  margin-bottom: 20px;
  display: block;
}

.cover-image {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

.edit-btn {
  margin-top: 24px;
  padding: 10px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
