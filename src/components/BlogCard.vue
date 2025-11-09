<template>
  <div class="blog-card">
    <img
      v-if="post.image"
      :src="getFinalImageUrl(post.image)"
      alt="Cover Image"
      class="blog-image"
    />

    <div class="blog-content">
      <h2 class="blog-title">{{ post.title }}</h2>
      <p class="blog-snippet">{{ stripHtmlAndTruncate(post.content, 150) }}</p>

      <div class="blog-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>

      <p class="blog-date">{{ formatDate(post.createdAt) }}</p>
    </div>
  </div>
</template>

<script setup>
import { api } from "../api";
import { stripHtmlAndTruncate } from "../utils/helpers";

defineProps({ post: Object });

// NEW FUNCTION: Checks if the URL is a full Cloudinary URL or an old local path.
const getFinalImageUrl = (imageUrl) => {
  // If the URL starts with http or https, it's a full Cloudinary link.
  if (imageUrl && imageUrl.startsWith("http")) {
    return imageUrl; // Use the Cloudinary URL directly, bypassing the api() wrapper.
  }
  // Otherwise, assume it's an old local path and use the api() wrapper.
  return api(imageUrl);
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.blog-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.blog-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.blog-content {
  padding: 16px;
}

.blog-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.blog-snippet {
  color: #555;
  max-height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.blog-tags {
  margin-top: 12px;
}

.tag {
  font-size: 0.8rem;
  background-color: #e7f5ec;
  color: #207144;
  padding: 4px 8px;
  border-radius: 6px;
  margin-right: 6px;
}

.blog-date {
  margin-top: 10px;
  font-size: 0.75rem;
  color: #aaa;
}
</style>
