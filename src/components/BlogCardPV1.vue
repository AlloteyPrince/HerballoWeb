<template>
  <router-link :to="`/blog/${post.slug}`" class="blog-card-link">
    <div class="blog-card">
      <img
        v-if="post.coverImage"
        :src="api(post.coverImage)"
        alt="Cover Image"
        class="blog-image"
      />

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
import { api } from "../api";
import { defineProps } from "vue";
import { stripHtmlAndTruncate } from "../utils/helper"; // Adjust this path if helpers.js is in a different directory

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

// Directly call the utility function to create the processed excerpt
const postExcerpt = stripHtmlAndTruncate(props.post.content, 180); // Adjust char limit as needed

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
  height: 100%;
}

.blog-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.blog-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.blog-content {
  padding: 16px;
  /* flex-grow: 1; */
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
  margin-top: auto; /* Pushes tags to the bottom of the content area */
  margin-bottom: 10px; /* Space between tags and date */
}

.tag {
  font-size: 0.8rem;
  background-color: #e7f5ec;
  color: #207144;
  padding: 4px 8px;
  border-radius: 6px;
  margin-right: 6px;
  display: inline-block; /* Ensure tags don't break onto new lines awkwardly */
}

.blog-date {
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 0; /* Reset previous margin-top as tags provide space */
}
</style>
