<template>
  <div class="blog-card">
    <div class="blog-image-wrapper">
      <img
        v-if="post.coverImage"
        :src="getFinalImageUrl(post.coverImage)"
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
  </div>
</template>

<script setup>
import { api } from "~/lib/api";
import { stripHtmlAndTruncate } from "~/lib/helper.js";

defineProps({ post: Object });

const getFinalImageUrl = (imageUrl) => {
  if (!imageUrl) return "/images/default-thumbnail.jpg";
  if (imageUrl.startsWith("http")) return imageUrl;
  return api(imageUrl);
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
.blog-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.blog-image-wrapper {
  overflow: hidden;
  height: 180px;
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
  margin-bottom: 6px;
  color: #333;
}

.blog-snippet {
  color: #555;
  max-height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}

.blog-tags {
  margin-top: auto;
  margin-bottom: 6px;
}

.tag {
  font-size: 0.75rem;
  background-color: #e7f5ec;
  color: #207144;
  padding: 3px 6px;
  border-radius: 6px;
  margin-right: 4px;
}

.blog-date {
  font-size: 0.7rem;
  color: #aaa;
  margin-top: 4px;
}
</style>
