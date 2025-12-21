<template>
  <div v-if="post" class="blog-detail-layout">
    <!-- Main Content Column -->
    <div class="main-column">
      <div class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-author"
            >By {{ post.author?.name || "Unknown" }}</span
          >
          <span class="post-date"
            >On {{ format(new Date(post.createdAt), "MMMM dd, yyyy") }}</span
          >
        </div>
      </div>

      <img
        v-if="post.coverImage"
        :src="api(post.coverImage)"
        :alt="post.title"
        class="post-cover-image"
      />
      <div class="post-content" v-html="post.content"></div>
    </div>

    <!-- Sidebar Column -->
    <aside class="sidebar">
      <button @click="handleShare" class="share-button-title">
        <i class="fas fa-share-alt"></i> Share
      </button>
      <p
        v-if="shareMessage"
        :class="{
          'success-message': shareSuccess,
          'error-message': !shareSuccess,
        }"
      >
        {{ shareMessage }}
      </p>

      <!-- Ratings -->
      <section class="ratings-section">
        <h3>Rate this Post</h3>
        <div class="current-avg-rating">
          Average Rating: {{ currentRating.toFixed(1) }}
          <span class="stars">⭐</span>
        </div>
        <div class="rating-input">
          <span
            v-for="star in 5"
            :key="star"
            @click="ratePost(star)"
            :class="{
              'star-icon': true,
              'filled-star': star <= userRatingSelection,
            }"
          >
            ⭐
          </span>
        </div>
        <p v-if="ratingError" class="error-message">{{ ratingError }}</p>
        <p v-if="ratingSuccess" class="success-message">{{ ratingSuccess }}</p>
      </section>

      <!-- Comments -->
      <section class="comments-section">
        <h3>Comments ({{ comments.length }})</h3>
        <div v-if="comments.length === 0" class="no-comments">
          No comments yet. Be the first to comment!
        </div>
        <div v-else class="comment-list">
          <div
            v-for="comment in comments"
            :key="comment._id"
            class="comment-item"
          >
            <p class="comment-author-name">
              {{ comment.name }}
              <span class="comment-date"
                >-
                {{ format(new Date(comment.createdAt), "MMM dd, yyyy") }}</span
              >
            </p>
            <p class="comment-text">{{ comment.comment }}</p>
          </div>
        </div>

        <div class="comment-form">
          <h4>Leave a Comment</h4>
          <input
            type="text"
            v-model="commentAuthor"
            placeholder="Your Name (Optional)"
            class="comment-input-name"
          />
          <textarea
            v-model="newCommentText"
            placeholder="Your Comment"
            rows="4"
            class="comment-input-text"
          ></textarea>
          <button
            @click="handleCommentSubmission"
            class="submit-comment-button"
          >
            Submit Comment
          </button>
          <p v-if="commentError" class="error-message">{{ commentError }}</p>
          <p v-if="commentSuccess" class="success-message">
            {{ commentSuccess }}
          </p>
        </div>
      </section>
    </aside>
  </div>
</template>

<script setup>
import { api } from "@/api";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { format } from "date-fns";
import {
  getPostBySlug,
  getCommentsByPostId,
  submitComment,
  submitRating,
} from "../api.js"; 

// ⭐ CORRECTED: Import useHead from @vueuse/head
import { useHead } from "@vueuse/head";

const route = useRoute();
const post = ref(null);
const loading = ref(true);
const error = ref(null);

// Comment states
const comments = ref([]);
const newCommentText = ref("");
const commentAuthor = ref("");
const commentError = ref(null);
const commentSuccess = ref(null);

// Rating states
const currentRating = ref(0);
const userRatingSelection = ref(0); // For visual selection of stars
const userHasRated = ref(
  localStorage.getItem("rated_" + route.params.slug) === "true"
); // Check if user has already rated this post
const ratingError = ref(null);
const ratingSuccess = ref(null);

// Share states
const shareMessage = ref(null);
const shareSuccess = ref(true);

// ⭐ CORRECTED: Use useHead for meta data
useHead({
  title: "Loading Blog Post...", // Default title
  meta: [
    { name: "description", content: "A blog post about herbal remedies." }, // Default description
    { property: "og:title", content: "Loading Blog Post..." },
    {
      property: "og:description",
      content: "A blog post about herbal remedies.",
    },
    { property: "og:type", content: "article" },
    { property: "og:url", content: window.location.href }, // Canonical URL will be set dynamically
    { property: "og:image", content: "" }, // Placeholder for cover image
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@HerballoBlog" }, // Replace with your actual Twitter handle if you have one
    { name: "twitter:title", content: "Loading Blog Post..." },
    {
      name: "twitter:description",
      content: "A blog post about herbal remedies.",
    },
    { name: "twitter:image", content: "" }, // Placeholder for cover image
  ],
});

const fetchPost = async (slug) => {
  loading.value = true;
  error.value = null;
  try {
    const fetchedPost = await getPostBySlug(slug);
    post.value = fetchedPost;
    comments.value = await getCommentsByPostId(fetchedPost._id);
    currentRating.value = fetchedPost.averageRating
      ? parseFloat(fetchedPost.averageRating)
      : 0; // Initialize average rating

    // ⭐ CORRECTED: Update meta tags reactively with useHead
    useHead({
      title: fetchedPost.title,
      meta: [
        {
          name: "description",
          content: fetchedPost.content
            ? fetchedPost.content.substring(0, 150) + "..."
            : "Read this insightful blog post on Herballo!",
        },
        { property: "og:title", content: fetchedPost.title },
        {
          property: "og:description",
          content: fetchedPost.content
            ? fetchedPost.content.substring(0, 150) + "..."
            : "Read this insightful blog post on Herballo!",
        },
        { property: "og:url", content: window.location.href },
        {
          property: "og:image",
          content:
            fetchedPost.coverImage ||
            "https://via.placeholder.com/1200x630?text=Herballo+Blog",
        },
        { name: "twitter:title", content: fetchedPost.title },
        {
          name: "twitter:description",
          content: fetchedPost.content
            ? fetchedPost.content.substring(0, 150) + "..."
            : "Read this insightful blog post on Herballo!",
        },
        {
          name: "twitter:image",
          content:
            fetchedPost.coverImage ||
            "https://via.placeholder.com/1200x630?text=Herballo+Blog",
        },
      ],
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    error.value = "Failed to load post. Please try again later.";
    // Reset meta tags to default on error (using useHead)
    useHead({
      title: "Blog Post Not Found",
      meta: [
        {
          name: "description",
          content: "The requested blog post could not be loaded.",
        },
        { property: "og:title", content: "Blog Post Not Found" },
        {
          property: "og:description",
          content: "The requested blog post could not be loaded.",
        },
        {
          property: "og:image",
          content:
            "https://via.placeholder.com/1200x630?text=Herballo+Blog+Error",
        },
        { name: "twitter:title", content: "Blog Post Not Found" },
        {
          name: "twitter:description",
          content: "The requested blog post could not be loaded.",
        },
        {
          name: "twitter:image",
          content:
            "https://via.placeholder.com/1200x630?text=Herballo+Blog+Error",
        },
      ],
    });
  } finally {
    loading.value = false;
  }
};

const handleCommentSubmission = async () => {
  commentError.value = null;
  commentSuccess.value = null;

  if (!newCommentText.value.trim()) {
    commentError.value = "Comment text cannot be empty.";
    return;
  }
  if (!post.value || !post.value._id) {
    commentError.value = "❌ Post not loaded, cannot submit comment.";
    return;
  }

  try {
    const data = await submitComment(post.value._id, {
      name: commentAuthor.value.trim() || "Anonymous",
      comment: newCommentText.value.trim(),
    });

    commentSuccess.value = "✅ Comment submitted successfully!";
    newCommentText.value = "";
    commentAuthor.value = "";
    comments.value.unshift(data.newComment);
    setTimeout(() => (commentSuccess.value = null), 3000);
  } catch (err) {
    console.error("Comment submission error:", err);
    commentError.value = `❌ ${err.message || "Could not submit comment."}`;
  }
};

const ratePost = async (stars) => {
  if (userHasRated.value) {
    ratingError.value = "You have already rated this post.";
    setTimeout(() => (ratingError.value = null), 3000);
    return;
  }
  if (!post.value || !post.value._id) {
    ratingError.value = "❌ Post not loaded, cannot rate.";
    return;
  }

  ratingError.value = null;
  ratingSuccess.value = null;
  userRatingSelection.value = stars;

  try {
    const data = await submitRating(post.value._id, stars);

    currentRating.value = parseFloat(data.averageRating);
    userHasRated.value = true;
    localStorage.setItem("rated_" + route.params.slug, "true");
    ratingSuccess.value = "✅ Rating submitted successfully!";
    setTimeout(() => (ratingSuccess.value = null), 3000);
  } catch (err) {
    console.error("Rating submission error:", err);
    ratingError.value = `❌ ${err.message || "Could not submit rating."}`;
  } finally {
    userRatingSelection.value = 0;
  }
};

const handleShare = async () => {
  shareMessage.value = null;
  const urlToShare = window.location.href;
  const titleToShare =
    post.value?.title || "Check out this blog post on Herballo!";
  const textToShare = post.value?.content
    ? post.value.content.substring(0, 100) + "..."
    : "Read more on Herballo blog!";

  if (navigator.share) {
    try {
      await navigator.share({
        title: titleToShare,
        text: textToShare,
        url: urlToShare,
      });
      shareSuccess.value = true;
      shareMessage.value = "✅ Post shared successfully!";
      setTimeout(() => (shareMessage.value = null), 3000);
    } catch (err) {
      if (err.name === "AbortError") {
        shareSuccess.value = false;
        shareMessage.value = "Share canceled.";
        setTimeout(() => (shareMessage.value = null), 3000);
      } else {
        console.error("Error sharing:", err);
        shareSuccess.value = false;
        shareMessage.value =
          "❌ Failed to share post. Trying to copy link instead...";
        await copyLink(urlToShare);
      }
    }
  } else {
    console.log("Web Share API not supported. Copying link instead.");
    await copyLink(urlToShare);
  }
};

const copyLink = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    shareSuccess.value = true;
    shareMessage.value = "✅ Link copied to clipboard!";
    setTimeout(() => (shareMessage.value = null), 3000);
  } catch (err) {
    console.error("Failed to copy link:", err);
    shareSuccess.value = false;
    shareMessage.value =
      "❌ Failed to copy link. Please copy it manually: " + url;
  }
};

onMounted(() => {
  if (route.params.slug) {
    fetchPost(route.params.slug);
  }
});

watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      fetchPost(newSlug);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* PublicBlogDetail.vue <style> */
.blog-detail-container {
  max-width: 1200px;
  width: 100%;
  margin: 40px auto;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.post-header {
  display: flex;
  align-items: center; /* Align items vertically */
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.post-title {
  margin-right: 20px; /* Space between title and share button */
  margin-bottom: 0; /* Remove default margin */
  color: #333;
  font-size: 2.2em;
  line-height: 1.2;
}

.post-meta {
  width: 100%; /* Occupy full width below title and button */
  font-size: 0.95em;
  color: #666;
  margin-top: 10px; /* Space below title/button */
}

.post-author {
  font-weight: bold;
  margin-right: 15px;
}

.post-date {
  font-style: italic;
}

.post-cover-image {
  max-width: 100%;
  max-height: 480px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-content {
  font-size: 1.1em;
  line-height: 1.8;
  color: #444;
}

.post-content p {
  margin-bottom: 1em;
}

.post-content h2,
.post-content h3 {
  color: #333;
  margin-top: 1.5em;
  margin-bottom: 0.8em;
}

/* Share Button Styles */
.share-button-title {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  white-space: nowrap; /* Keep button text on one line */
  display: flex; /* Align icon and text */
  align-items: center;
}

.share-button-title:hover {
  background-color: #0056b3;
}

.share-button-title i {
  margin-right: 5px;
}

/* Success/Error Messages */
p.success-message {
  color: green;
  margin-top: 10px;
  font-size: 0.85em;
  margin-left: 10px; /* Adjust as needed */
}

p.error-message {
  color: red;
  margin-top: 10px;
  font-size: 0.85em;
  margin-left: 10px; /* Adjust as needed */
}

/* Comments Section */
.comments-section,
.ratings-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.comments-section h3,
.ratings-section h3 {
  color: #333;
  font-size: 1.8em;
  margin-bottom: 20px;
}

.no-comments {
  color: #777;
  font-style: italic;
  margin-bottom: 20px;
}

.comment-list {
  margin-bottom: 30px;
}

.comment-item {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 15px;
  border: 1px solid #eee;
}

.comment-author-name {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.comment-date {
  font-weight: normal;
  font-size: 0.8em;
  color: #888;
}

.comment-text {
  color: #444;
  line-height: 1.6;
}

.comment-form {
  background-color: #f9f9f9;
  padding: 16px 20px;
  border-radius: 6px;
  border: 1px solid #eee;
  max-width: 100%;
}

.comment-form h4 {
  color: #333;
  font-size: 1.4em;
  margin-bottom: 15px;
}

.comment-input-name,
.comment-input-text {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.comment-input-text {
  resize: vertical;
}

.submit-comment-button {
  background-color: #105212;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.submit-comment-button:hover {
  background-color: #0c3d0e;
}

/* Ratings Section */
.current-avg-rating {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 15px;
}

.stars {
  color: gold; /* For actual star display */
}

.rating-input .star-icon {
  font-size: 1.8em;
  cursor: pointer;
  color: #ccc; /* Unfilled star color */
  transition: color 0.2s ease;
}

.rating-input .star-icon:hover,
.rating-input .filled-star {
  color: gold; /* Filled star color */
}

/* .................................................. */

.blog-detail-layout {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  flex-wrap: wrap;
}

.main-column {
  flex: 3;
  min-width: 0;
}

.sidebar {
  flex: 1;
  min-width: 300px;
  position: sticky;
  top: 100px;
  height: fit-content;
  background: #fdfdfd;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .blog-detail-layout {
    flex-direction: column;
  }

  .sidebar {
    position: static;
    width: 100%;
    margin-top: 40px;
  }
}
</style>
