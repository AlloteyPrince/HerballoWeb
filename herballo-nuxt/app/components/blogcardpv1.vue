<template>
  <NuxtLink :to="`/blog/${post._id || post.id}`" class="blog-card">
    <div class="blog-image-wrapper">
      <img
        v-if="post.coverImage"
        :src="getFinalImageUrl(post.coverImage)"
        @error="handleImageError"
        alt="Cover Image"
        class="blog-image"
      />
      <img
        v-else
        src="/images/default-thumbnail.jpg"
        alt="Default Cover"
        class="blog-image"
      />
    </div>

    <div class="blog-content">
      <h2 class="blog-title">{{ post.title }}</h2>
      <p class="blog-snippet">{{ stripHtmlAndTruncate(post.content, 150) }}</p>

      <div class="blog-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>

      <p class="blog-date">{{ formatDate(post.createdAt) }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
import { stripHtmlAndTruncate } from "~/lib/helper";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

// This handles your Render backend vs external images
const getFinalImageUrl = (imageUrl) => {
  if (!imageUrl) return "/images/default-thumbnail.jpg";
  if (imageUrl.startsWith("http")) return imageUrl;

  // Replace this with your actual Render API base URL for images
  const apiBase = "https://your-render-backend.onrender.com";
  return `${apiBase}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
};

// Fallback if the backend image URL is broken (404)
const handleImageError = (e) => {
  e.target.src = "/images/default-thumbnail.jpg";
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
/* Remove default link styling */
.blog-card {
  text-decoration: none;
  color: inherit;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensures all cards in a row are same height */
}

.blog-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px); /* Slightly more lift for premium feel */
}

.blog-image-wrapper {
  overflow: hidden;
  height: 180px;
  background-color: #f9f9f9;
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.blog-card:hover .blog-image {
  transform: scale(1.05);
}

.blog-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.blog-title {
  font-size: 1.15rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1a1a1a;
  line-height: 1.3;
}

.blog-snippet {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 15px;
}

.blog-tags {
  margin-top: auto;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  font-size: 0.7rem;
  background-color: #e7f5ec;
  color: #078537;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.blog-date {
  font-size: 0.75rem;
  color: #999;
}
</style>
