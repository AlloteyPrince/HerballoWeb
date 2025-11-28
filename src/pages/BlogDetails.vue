<template>
  <div class="blog-details">
    <div class="header">
      <h1 class="title">{{ post.title }}</h1>
      <button @click="sharePost" class="share-btn">Share</button>
    </div>

    <div class="meta">
      <span>By {{ post.author?.name || "Unknown" }}</span> |
      <span>{{ formatDate(post.createdAt) }}</span>
    </div>

    <img v-if="post.coverImage" :src="getFinalImageUrl(post.coverImage)" class="cover-image" />

    <div class="content" v-html="post.content"></div>

    <div class="tags" v-if="post.tags?.length">
      <span class="tag" v-for="tag in post.tags" :key="tag">{{ tag }}</span>
    </div>

    <!-- Ratings -->
    <div class="ratings">
      <span>Average Rating: {{ post.averageRating }}/5</span>
      <div class="rate">
        <label v-for="i in 5" :key="i">
          <input type="radio" :value="i" v-model="userRating" @change="submitRating" />
          {{ i }}
        </label>
      </div>
    </div>

    <!-- Comments -->
    <div class="comments">
      <h3>Comments</h3>
      <div v-for="comment in post.comments" :key="comment._id" class="comment">
        <p><strong>{{ comment.name }}</strong> says:</p>
        <p>{{ comment.comment }}</p>
      </div>

      <h4>Add Comment</h4>
      <input v-model="newCommentName" type="text" placeholder="Your Name" />
      <textarea v-model="newCommentText" placeholder="Your Comment"></textarea>
      <button @click="submitComment">Submit Comment</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "@/api";
import { formatDate, getFinalImageUrl } from "@/helpers/helper.js";

const route = useRoute();
const postId = route.params.id;

const post = ref({
  title: "",
  content: "",
  author: {},
  tags: [],
  coverImage: "",
  comments: [],
  ratings: [],
  averageRating: 0,
});

const newCommentName = ref("");
const newCommentText = ref("");
const userRating = ref(0);

onMounted(async () => {
  await fetchPost();
});

const fetchPost = async () => {
  try {
    const res = await fetch(api(`/api/posts/${postId}`));
    if (!res.ok) throw new Error("Failed to fetch post");
    const data = await res.json();
    post.value = data;
  } catch (err) {
    console.error(err);
  }
};

// Share functionality
const sharePost = () => {
  if (navigator.share) {
    navigator.share({
      title: post.value.title,
      text: "Check out this post!",
      url: window.location.href,
    }).catch(err => console.error(err));
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }
};

// Submit a comment
const submitComment = async () => {
  if (!newCommentName.value.trim() || !newCommentText.value.trim()) return;

  try {
    const res = await fetch(api(`/api/posts/${postId}/comments`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newCommentName.value,
        comment: newCommentText.value,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to submit comment");

    post.value.comments.push(data);
    newCommentName.value = "";
    newCommentText.value = "";
  } catch (err) {
    console.error(err);
  }
};

// Submit rating
const submitRating = async () => {
  if (!userRating.value) return;
  try {
    const res = await fetch(api(`/api/posts/${postId}/ratings`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: userRating.value }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to submit rating");

    post.value.averageRating = data.averageRating;
  } catch (err) {
    console.error(err);
  }
};

// Helper for final image URLs
const getFinalImageUrlFn = (url) => getFinalImageUrl(url);
</script>

<style scoped>
.blog-details {
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 2rem;
}

.share-btn {
  padding: 8px 12px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.share-btn:hover {
  background-color: #2980b9;
}

.meta {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 16px;
}

.cover-image {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
}

.content {
  margin-bottom: 20px;
}

.tags {
  margin-bottom: 20px;
}
.tag {
  display: inline-block;
  margin-right: 6px;
  background: #eee;
  padding: 4px 8px;
  border-radius: 4px;
}

.ratings {
  margin-bottom: 20px;
}

.comments {
  margin-top: 20px;
}

.comment {
  margin-bottom: 12px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
}

input,
textarea {
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 16px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #27ae60;
}
</style>
