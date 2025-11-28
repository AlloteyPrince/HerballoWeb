<template>
  <div class="blog-form">
    <h3>Edit Blog Post</h3>

    <form @submit.prevent="handleUpdate">
      <!-- Title -->
      <input v-model="title" type="text" placeholder="Title" required />

      <!-- Tags -->
      <input v-model="tags" type="text" placeholder="Tags (comma separated)" />

      <!-- Cover Image -->
      <label>Cover Image (Optional):</label>
      <input type="file" @change="handleCoverImageUpload" />
      <p v-if="coverImageUrl" class="info-text">Current or new image ready</p>

      <!-- Author Info -->
      <input v-model="authorName" type="text" placeholder="Author Name" required />
      <textarea v-model="authorBio" placeholder="Author Bio" required></textarea>
      <label>Author Avatar (Optional):</label>
      <input type="file" @change="handleAuthorAvatarUpload" />
      <p v-if="authorAvatarUrl" class="info-text">Current or new avatar ready</p>

      <!-- Quill Editor -->
      <QuillEditor
        v-model:content="content"
        contentType="html"
        class="quill"
      />

      <button type="submit">Update Post</button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { uploadFile, parseTags } from "@/helpers/helper.js";
import { api } from "@/api";

const route = useRoute();
const router = useRouter();

const title = ref("");
const tags = ref("");
const content = ref("");
const authorName = ref("");
const authorBio = ref("");
const coverImageUrl = ref(null);
const authorAvatarUrl = ref(null);
const message = ref("");
const error = ref("");

const postId = route.params.id;

// Fetch post details on mount
onMounted(async () => {
  if (!postId) {
    error.value = "Post ID not found";
    return;
  }

  try {
    const res = await fetch(api(`/api/posts/${postId}`));
    if (!res.ok) throw new Error("Failed to fetch post");
    const data = await res.json();

    title.value = data.title;
    tags.value = data.tags?.join(", ") || "";
    content.value = data.content || "";
    coverImageUrl.value = data.coverImage || null;
    authorName.value = data.author?.name || "";
    authorBio.value = data.author?.bio || "";
    authorAvatarUrl.value = data.author?.avatar || null;
  } catch (err) {
    console.error(err);
    error.value = "Failed to load post details";
  }
});

// Handle image uploads
const handleCoverImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    coverImageUrl.value = await uploadFile(file, localStorage.getItem("token"));
  } catch (err) {
    error.value = "Failed to upload cover image";
    console.error(err);
  }
};

const handleAuthorAvatarUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    authorAvatarUrl.value = await uploadFile(file, localStorage.getItem("token"));
  } catch (err) {
    error.value = "Failed to upload author avatar";
    console.error(err);
  }
};

// Update post
const handleUpdate = async () => {
  error.value = "";
  message.value = "";

  if (!title.value.trim() || !content.value.trim()) {
    error.value = "Title and content are required.";
    return;
  }

  const updateData = {
    title: title.value,
    tags: parseTags(tags.value),
    content: content.value,
    coverImage: coverImageUrl.value,
    author: {
      name: authorName.value,
      bio: authorBio.value,
      avatar: authorAvatarUrl.value,
    },
  };

  try {
    const res = await fetch(api(`/api/posts/${postId}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();
    if (!res.ok) {
      error.value = data.message || "Failed to update post";
      return;
    }

    message.value = "✅ Post updated successfully!";
    setTimeout(() => router.push(`/admin/blog/${postId}`), 1000);
  } catch (err) {
    console.error(err);
    error.value = "Something went wrong while updating the post.";
  }
};
</script>

<style scoped>
.blog-form {
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
  margin-bottom: 12px;
}
.info-text {
  font-size: 0.8em;
  color: #666;
  margin-bottom: 12px;
}
.quill {
  margin-bottom: 16px;
  min-height: 200px;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}
button {
  padding: 10px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #2980b9;
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
