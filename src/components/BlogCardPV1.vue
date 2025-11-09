<template>
  <router-link :to="`/blog/${post.slug}`" class="blog-card-link">
    <div class="blog-card">
      <img
        v-if="post.coverImage"
        :src="getFinalImageUrl(post.coverImage)"
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

// NEW FUNCTION: Checks if the URL is a full Cloudinary URL or an old local path.
const getFinalImageUrl = (imageUrl) => {
  // If the URL starts with http or https, it's a full Cloudinary link.
  if (imageUrl && imageUrl.startsWith("http")) {
    return imageUrl; // Use the URL directly, bypassing the api() wrapper.
  }
  // Otherwise, assume it's an old local path and use the api() wrapper to add the base URL.
  return api(imageUrl);
};

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
/* NOTE: The CSS remains unchanged from your original file. */
.blog-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 20px;
}

/* Updated CSS for consistent sizing */
.blog-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  /* Fixed height to prevent content from expanding the card */
  height: 400px;
}

.blog-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.blog-image {
  width: 100%;
  /* Fixed height to ensure all images are the same size */
  height: 200px;
  object-fit: cover;
}

.blog-content {
  padding: 16px;
  /* Allows the content to fill the remaining space */
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
  display: inline-block;
}

.blog-date {
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 0;
}
</style>
