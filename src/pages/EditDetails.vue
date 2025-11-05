<template>
  <div class="edit-post">
    <h2>Edit Blog Post</h2>

    <form @submit.prevent="handleUpdate">
      <input v-model="title" type="text" placeholder="Title" required />
      <input v-model="slug" type="text" placeholder="Slug" required />
      <input v-model="tags" type="text" placeholder="Tags (comma separated)" />

      <label for="coverImage">Change Cover Image (Optional):</label>
      <input
        type="file"
        @change="handleCoverImageUpload"
        id="coverImage"
        accept="image/*"
      />
      <p v-if="currentCoverImage" class="info-text">
        Current Image: {{ currentCoverImage }}
      </p>

      <input
        v-model="authorName"
        type="text"
        placeholder="Author Name"
        required
      />
      <textarea
        v-model="authorBio"
        placeholder="Author Bio"
        required
      ></textarea>

      <label for="authorAvatar">Change Author Avatar (Optional):</label>
      <input
        type="file"
        @change="handleAuthorAvatarUpload"
        id="authorAvatar"
        accept="image/*"
      />
      <p v-if="currentAuthorAvatar" class="info-text">
        Current Avatar: {{ currentAuthorAvatar }}
      </p>

      <quill-editor v-model:content="content" contentType="html" />

      <button type="submit">Update Post</button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { api } from "@/api";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const route = useRoute();
const router = useRouter();

// Refs for form data
const title = ref("");
const slug = ref("");
const tags = ref("");
const content = ref("");
const authorName = ref("");
const authorBio = ref("");
const message = ref("");
const error = ref("");

// Refs for image URLs (will be saved in the database)
const currentCoverImage = ref(null); // Holds the URL for the post
const currentAuthorAvatar = ref(null); // Holds the URL for the author

// --- UPLOAD LOGIC ---

// Reuses the upload logic from your Create component
const uploadFile = async (file, uploadRef, errorMessage) => {
  if (!file) return;
  error.value = "";
  const formData = new FormData();
  formData.append("image", file); // Must match your /api/upload endpoint's expected field name

  try {
    const res = await fetch(api("/api/upload"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add Auth if required for upload
      },
      body: formData,
    });
    const data = await res.json();

    // Assuming your upload endpoint returns { imageUrl: 'uploads/file.jpg' }
    uploadRef.value = data.imageUrl;
    message.value = "Image uploaded and ready for save.";
  } catch (err) {
    console.error("Image upload failed:", err);
    error.value = errorMessage;
  }
};

const handleCoverImageUpload = (e) => {
  const file = e.target.files[0];
  uploadFile(file, currentCoverImage, "Failed to upload cover image");
};

const handleAuthorAvatarUpload = (e) => {
  const file = e.target.files[0];
  uploadFile(file, currentAuthorAvatar, "Failed to upload author avatar");
};

// --- FETCH LOGIC ---

onMounted(async () => {
  const postId = route.params.id;
  if (!postId) {
    error.value = "Error: Post ID not found in route.";
    return;
  }

  try {
    // FIX 1: Correctly use the postId variable for fetching data
    const res = await fetch(api(`api/posts/${postId}`));

    if (!res.ok) {
      throw new Error("Failed to fetch post details");
    }

    const data = await res.json();

    // Populate text fields
    title.value = data.title;
    slug.value = data.slug;
    tags.value =
      data.tags && Array.isArray(data.tags) ? data.tags.join(", ") : "";
    content.value = data.content;

    // Populate image URLs for display/submission
    currentCoverImage.value = data.coverImage;
    authorName.value = data.author ? data.author.name : "";
    authorBio.value = data.author ? data.author.bio : "";
    currentAuthorAvatar.value = data.author ? data.author.avatar : null;
  } catch (err) {
    console.error("Fetch error:", err);
    error.value = "Failed to fetch blog post";
  }
});

// --- UPDATE LOGIC ---

const handleUpdate = async () => {
  const postId = route.params.id;
  if (!postId) {
    error.value = "Error: Post ID not found for update.";
    return;
  }

  error.value = "";
  message.value = "";

  const updatePayload = {
    title: title.value,
    slug: slug.value,
    tags: tags.value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0),
    content: content.value,
    // CRITICAL: Send the *URL* of the newly uploaded (or existing) image
    coverImage: currentCoverImage.value,
    author: {
      name: authorName.value,
      bio: authorBio.value,
      avatar: currentAuthorAvatar.value,
    },
  };

  try {
    // FIX 2: Correctly use the postId variable for the PUT request
    const res = await fetch(api(`api/posts/${postId}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Send as JSON payload
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatePayload),
    });

    if (!res.ok) {
      const data = await res.json();
      error.value = data.message || "Failed to update";
    } else {
      message.value = "✅ Post updated! Thumbnails re-uploaded.";
      setTimeout(() => router.push(`/admin/blog/${route.params.id}`), 1000);
    }
  } catch (err) {
    error.value = "Error updating post";
    console.error(err);
  }
};
</script>

<style scoped>
.edit-post {
  max-width: 700px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}
input[type="text"],
textarea {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
label {
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: 600;
}
input[type="file"] {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  padding: 0;
  border: none;
}
.info-text {
  font-size: 0.8em;
  color: #666;
  margin-top: -15px;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
button {
  padding: 10px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.success {
  color: green;
  margin-top: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
