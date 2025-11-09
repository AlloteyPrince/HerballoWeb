<template>
  <div class="blog-details" v-if="post">
    <div class="header-actions">
      <button class="edit-btn" @click="editPost">✏️ Edit</button>
      <button @click="handleShare" class="share-button">
        <i class="fas fa-share-alt"></i> Share Public Link
      </button>
    </div>
    <p
      v-if="shareMessage"
      :class="{
        'success-message': shareSuccess,
        'error-message': !shareSuccess,
      }"
    >
      {{ shareMessage }}
    </p>

    <img
      v-if="post.image"
      :src="getFinalImageUrl(post.image)"
      alt="Cover"
      class="cover-image"
    />

    <h2>{{ post.title }}</h2>
    <p class="tags">#{{ post.tags.join(" #") }}</p>

    <div class="blog-content" v-html="correctContentUrls(post.content)"></div>

    <div class="rating">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{ active: star <= currentRating }"
        @click="ratePost(star)"
        >★</span
      >
      <p v-if="ratingMessage" class="rating-message">{{ ratingMessage }}</p>
    </div>

    <div class="author-box" v-if="post.author">
      <img :src="api(post.author.avatar)" alt="Author" class="author-avatar" />
      <div>
        <h4>{{ post.author.name }}</h4>
        <p class="author-bio">{{ post.author.bio }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from "../api";
// FIX 3: Import the new helper functions
import { correctContentUrls } from "../utils/helper";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const post = ref(null);
const currentRating = ref(0);
const ratingMessage = ref("");
const route = useRoute();
const router = useRouter();

// Replace with real auth logic
const userId = localStorage.getItem("userId");

// ⭐ NEW: Share states
const shareMessage = ref(null);
const shareSuccess = ref(true);

// FIX 1 PART 2: Function to safely load images (copied from BlogCardPV1 logic)
const getFinalImageUrl = (imageUrl) => {
  if (imageUrl && imageUrl.startsWith("http")) {
    return imageUrl;
  }
  // NOTE: If images are breaking inside the content (which is why we use correctContentUrls),
  // you might need to adjust this logic if post.image still contains an old path.
  // For now, this is the correct logic for the featured image field.
  return api(imageUrl);
};

const editPost = () => {
  router.push(`/admin/blog/edit/${route.params.id}`);
};

const ratePost = async (star) => {
  try {
    const res = await fetch(api(`/api/posts/${route.params.id}/rate`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        value: star,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      ratingMessage.value = data.message || "Failed to rate.";
    } else {
      currentRating.value = star;
      ratingMessage.value = "✅ Thanks for rating!";
    }
  } catch (err) {
    ratingMessage.value = "❌ Could not submit rating.";
    console.error(err);
  }
};

// ⭐ NEW: Share Functionality
const handleShare = async () => {
  shareMessage.value = null; // Clear previous messages
  if (!post.value || !post.value.slug) {
    shareSuccess.value = false;
    shareMessage.value = "❌ Post slug not available for sharing.";
    setTimeout(() => (shareMessage.value = null), 3000);
    return;
  }

  const publicBaseUrl = "http://localhost:8080"; // <<< ADJUST FOR PRODUCTION!
  const urlToShare = `${publicBaseUrl}/blog/${post.value.slug}`;

  const titleToShare = post.value.title || "Check out this blog post!";
  const textToShare = post.value.content
    ? post.value.content.substring(0, 100) + "..."
    : "Read more on our blog!";

  if (navigator.share) {
    // Use Web Share API if available
    try {
      await navigator.share({
        title: titleToShare,
        text: textToShare,
        url: urlToShare,
      });
      shareSuccess.value = true;
      shareMessage.value = "✅ Public post shared successfully!";
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
          "❌ Failed to share public post. Trying to copy link instead...";
        await copyLink(urlToShare); // Fallback to copy link
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
    shareMessage.value = "✅ Public link copied to clipboard!";
    setTimeout(() => (shareMessage.value = null), 3000);
  } catch (err) {
    console.error("Failed to copy link:", err);
    shareSuccess.value = false;
    shareMessage.value =
      "❌ Failed to copy link. Please copy it manually: " + url;
  }
};

onMounted(async () => {
  try {
    const res = await fetch(api(`/api/posts/${route.params.id}`));
    const data = await res.json();
    post.value = data;

    // Optional: Set user's previous rating
    const userRating = data.ratings?.find((r) => r.userId === userId);
    currentRating.value = userRating?.value || 0;
  } catch (err) {
    console.error("Failed to load post:", err);
  }
});
</script>

<style scoped>
/* NOTE: CSS remains unchanged */
.blog-details {
  max-width: 700px;
  margin: 40px auto;
  background: white;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  position: relative;
}
.header-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 20px;
}
.blog-details h2 {
  margin-bottom: 10px;
}
.tags {
  color: #3498db;
  margin-bottom: 20px;
  display: block;
}
.cover-image {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}
.edit-btn {
  padding: 10px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}
.share-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}
.share-button:hover {
  background-color: #218838;
}
.share-button i {
  margin-right: 8px;
}
p.success-message {
  color: green;
  margin-top: -10px;
  margin-bottom: 15px;
  text-align: right;
  font-size: 0.9em;
}
p.error-message {
  color: red;
  margin-top: -10px;
  margin-bottom: 15px;
  text-align: right;
  font-size: 0.9em;
}
.blog-content img {
  max-width: 100% !important;
  height: auto !important;
  border-radius: 10px;
  object-fit: contain;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  display: block;
}
.author-box {
  display: flex;
  align-items: center;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
}
.author-bio {
  color: #444;
  font-size: 14px;
}
.rating {
  margin: 30px 0 20px;
  font-size: 26px;
}
.star {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s ease;
}
.star.active {
  color: gold;
}
.rating-message {
  font-size: 14px;
  color: green;
  margin-top: 8px;
}
</style>
