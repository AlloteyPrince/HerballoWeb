<template>
  <router-link :to="`/blog/${post.slug}`" class="blog-card-link">
    <div class="blog-card">

      <img
        v-if="post.coverImage"
        :src="`http://localhost:5000${post.coverImage}`"
        alt="Cover Image"
        class="blog-image"
      />

      <div class="blog-content">
        <h2 class="blog-title">{{ post.title }}</h2>
        <p class="blog-snippet" v-html="postExcerpt"></p>

        <div class="blog-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>

        <p class="blog-date">{{ formatDate(post.createdAt) }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';
import { stripHtmlAndTruncate } from '../utils/helper'; // Adjust this path if helpers.js is in a different directory

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

// Directly call the utility function to create the processed excerpt
const postExcerpt = stripHtmlAndTruncate(props.post.content, 180); // Adjust char limit as needed

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
/* Added a new class for the router-link wrapper */
.blog-card-link {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit text color */
  display: block; /* Make the link block-level to wrap the card */
  margin-bottom: 20px; /* Add some spacing between cards if they're in a grid/list */
}

.blog-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensures cards in a grid have consistent height */
}

.blog-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* Indicate it's clickable on hover */
}

.blog-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.blog-content {
  padding: 16px;
  flex-grow: 1; /* Allows content area to grow and push date/tags to bottom if flexible */
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
  -webkit-line-clamp: 3; /* Limit to 3 lines. Adjust this number as needed. */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px; /* Add margin to separate from tags */
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