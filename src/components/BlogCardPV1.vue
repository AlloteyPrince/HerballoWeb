<template>
  <div class="blog-detail">
    <div class="blog-header">
      <h1 class="blog-title">{{ blog.title }}</h1>
      <button @click="shareBlog" class="share-btn">🔗 Share</button>
    </div>

    <img v-if="blog.coverImage" :src="blog.coverImage" alt="Cover Image" class="cover-image" />

    <div class="author-info">
      <img v-if="blog.author?.avatar" :src="blog.author.avatar" alt="Author Avatar" class="author-avatar" />
      <div>
        <p class="author-name">{{ blog.author?.name }}</p>
        <p class="author-bio">{{ blog.author?.bio }}</p>
        <p class="blog-date">{{ blogDate }}</p>
      </div>
    </div>

    <div class="blog-content" v-html="blog.content"></div>

    <!-- Rating -->
    <div class="rating-section">
      <p>Rate this blog:</p>
      <div class="stars">
        <span v-for="n in 5" :key="n" @click="rateBlog(n)">
          <i :class="n <= userRating ? 'fas fa-star' : 'far fa-star'"></i>
        </span>
      </div>
      <p>Average rating: {{ blog.rating || 0 }}/5</p>
    </div>

    <!-- Comments -->
    <div class="comments-section">
      <h3>Comments</h3>
      <div v-if="blog.comments?.length">
        <div class="comment" v-for="(comment, index) in blog.comments" :key="index">
          <p class="comment-author">{{ comment.name }}:</p>
          <p class="comment-text">{{ comment.text }}</p>
        </div>
      </div>
      <div v-else>
        <p>No comments yet. Be the first to comment!</p>
      </div>

      <form @submit.prevent="submitComment" class="comment-form">
        <input v-model="commentName" type="text" placeholder="Your name" required />
        <textarea v-model="commentText" placeholder="Your comment" required></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { api } from "@/api";
import { correctImageUrl, formatDate } from "../utils/helper.js";

const route = useRoute();
const blog = ref({});
const commentName = ref("");
const commentText = ref("");
const userRating = ref(0);
const error = ref("");

const blogDate = computed(() => formatDate(blog.value.createdAt));

onMounted(async () => {
  const slug = route.params.slug;
  try {
    const res = await fetch(api(`/api/posts/slug/${slug}`));
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to load blog");

    // Correct image URLs
    data.coverImage = correctImageUrl(data.coverImage);
    if (data.author?.avatar) data.author.avatar = correctImageUrl(data.author.avatar);

    blog.value = data;
  } catch (err) {
    console.error(err);
    error.value = "Failed to load blog details.";
  }
});

const submitComment = async () => {
  if (!commentName.value.trim() || !commentText.value.trim()) return;

  try {
    const res = await fetch(api(`/api/posts/${blog.value._id}/comments`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: commentName.value, text: commentText.value }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to submit comment");

    // Update local comments immediately
    blog.value.comments = blog.value.comments || [];
    blog.value.comments.push({ name: commentName.value, text: commentText.value });

    commentName.value = "";
    commentText.value = "";
  } catch (err) {
    console.error(err);
    error.value = "Failed to submit comment";
  }
};

const rateBlog = async (rating) => {
  try {
    const res = await fetch(api(`/api/posts/${blog.value._id}/rate`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to rate");

    userRating.value = rating;
    blog.value.rating = data.newAverage || rating;
  } catch (err) {
    console.error(err);
    error.value = "Failed to submit rating";
  }
};

const shareBlog = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert("Blog link copied to clipboard!");
};
</script>

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
}
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.share-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.cover-image {
  width: 100%;
  margin: 20px 0;
  border-radius: 10px;
}
.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;
  object-fit: cover;
}
.blog-content {
  margin-bottom: 30px;
}
.rating-section {
  margin-bottom: 30px;
}
.stars span {
  cursor: pointer;
  font-size: 1.5rem;
  color: gold;
}
.comments-section {
  margin-bottom: 30px;
}
.comment-form input,
.comment-form textarea {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.comment-form button {
  padding: 8px 14px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.error { color: red; margin-top: 10px; }
</style>
