<template>
  <div class="blog-details">
    <div class="blog-header">
      <h1>{{ post.title }}</h1>
      <button @click="sharePost" class="share-btn">Share</button>
    </div>

    <p class="meta">
      By {{ post.author?.name }} | {{ formatDate(post.createdAt) }}
    </p>

    <img
      v-if="post.coverImage"
      :src="post.coverImage"
      alt="Cover"
      class="cover-image"
    />

    <div class="content" v-html="post.content"></div>

    <div class="tags" v-if="post.tags?.length">
      <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <div class="ratings">
      <p>Average Rating: {{ post.averageRating }}</p>
      <div>
        <button v-for="n in 5" :key="n" @click="rate(n)">{{ n }}⭐</button>
      </div>
    </div>

    <div class="comments-section">
      <h3>Comments</h3>
      <div v-for="comment in post.comments" :key="comment._id" class="comment">
        <p>
          <strong>{{ comment.name }}</strong> says:
        </p>
        <p>{{ comment.comment }}</p>
        <small>{{ formatDate(comment.createdAt) }}</small>
      </div>

      <form @submit.prevent="addComment">
        <input v-model="commentName" placeholder="Your name" />
        <textarea
          v-model="commentText"
          placeholder="Write a comment"
        ></textarea>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { formatDate } from "../utils/helper.js";

const route = useRoute();
const post = ref({});
const commentName = ref("");
const commentText = ref("");

const fetchPost = async () => {
  const slug = route.params.slug;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${slug}`);
  const data = await res.json();
  post.value = data;
};

onMounted(fetchPost);

const sharePost = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert("Link copied to clipboard!");
};

const addComment = async () => {
  if (!commentText.value.trim()) return;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/posts/${post.value._id}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: commentName.value || "Anonymous",
        comment: commentText.value,
      }),
    }
  );
  if (res.ok) {
    commentName.value = "";
    commentText.value = "";
    fetchPost();
  }
};

const rate = async (value) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/posts/${post.value._id}/rate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    }
  );
  if (res.ok) fetchPost();
};
</script>

<style scoped>
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.share-btn {
  padding: 6px 12px;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
}
.cover-image {
  width: 100%;
  margin: 20px 0;
}
.tags .tag {
  display: inline-block;
  margin-right: 8px;
  padding: 4px 8px;
  background: #eee;
  border-radius: 4px;
}
.comment {
  border-top: 1px solid #ccc;
  padding: 8px 0;
}
</style>
