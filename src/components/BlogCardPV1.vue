<template>
  <router-link :to="`/blog/${post.slug}`" class="blog-card-link">
    <div class="blog-card">
      <!-- Blog Image with hover zoom -->
      <div class="blog-image-wrapper">
        <img
          v-if="post.image"
          :src="getFinalImageUrl(post.image)"
          alt="Cover Image"
          class="blog-image"
        />
      </div>

      <div class="blog-content">
        <h2 class="blog-title">{{ post.title }}</h2>
        <p class="blog-snippet" v-html="postExcerpt"></p>

        <div class="blog-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag"
            >#{{ tag }}</span
          >
        </div>

        <p class="blog-date">{{ formatDate(post.createdAt) }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";
import { stripHtmlAndTruncate } from "../utils/helpers";
import { api } from "../api"; // import the same API helper used in admin

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

// Unified image URL handler
const getFinalImageUrl = (imageUrl) => {
  if (!imageUrl) return "/images/default-thumbnail.jpg"; // fallback
  if (imageUrl.startsWith("http")) return imageUrl; // Cloudinary or external URLs
  return api(imageUrl); // Local backend path
};

// Processed excerpt
const postExcerpt = stripHtmlAndTruncate(props.post.content, 180);

// Format date
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
/* same styles as before */
.blog-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 20px;
}

.blog-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 400px;
}

.blog-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.blog-image-wrapper {
  overflow: hidden;
  height: 200px;
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #f0f0f0;
  transition: transform 0.4s ease;
}

.blog-card:hover .blog-image {
  transform: scale(1.05);
}

.blog-content {
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.blog-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.blog-snippet {
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px;
}

.blog-tags {
  margin-top: auto; 
  margin-bottom: 10px;
}

.tag {
  font-size: 0.8rem;
  background-color: #e7f5ec;
  color: #207144;
  padding: 4px 8px;
  border-radius: 6px;
  margin-right: 6px;
  display: inline-block; 
}

.blog-date {
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 0; 
}
</style>
