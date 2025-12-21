<template>
  <div class="blog-form">
    <h3>Create Blog Post</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="title" placeholder="Title" required />
      <input v-model="tags" placeholder="Tags (comma separated)" />
      <input type="file" @change="handleFileUpload" />
      <input v-model="authorName" placeholder="Author Name" required />
      <textarea v-model="authorBio" placeholder="Author Bio" required></textarea>
      <input type="file" @change="handleAuthorAvatarUpload" />
      <textarea v-model="content" placeholder="Content" required></textarea>
      <button type="submit">Create Post</button>
    </form>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uploadFile, parseTags } from "../utils/helper.js";

const title = ref("");
const tags = ref("");
const content = ref("");
const authorName = ref("");
const authorBio = ref("");
const coverImage = ref(null);
const authorAvatar = ref(null);
const message = ref("");
const error = ref("");

const handleFileUpload = async (e) => {
  try {
    coverImage.value = await uploadFile(e.target.files[0]);
  } catch (err) {
    error.value = "Failed to upload cover image";
  }
};
const handleAuthorAvatarUpload = async (e) => {
  try {
    authorAvatar.value = await uploadFile(e.target.files[0]);
  } catch (err) {
    error.value = "Failed to upload avatar";
  }
};

const handleSubmit = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        tags: parseTags(tags.value),
        content: content.value,
        coverImage: coverImage.value,
        author: { name: authorName.value, bio: authorBio.value, avatar: authorAvatar.value },
      }),
    });
    if (!res.ok) throw new Error("Failed to create post");
    message.value = "✅ Post created!";
    title.value = tags.value = content.value = authorName.value = authorBio.value = "";
    coverImage.value = authorAvatar.value = null;
  } catch (err) {
    error.value = err.message;
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
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
}
input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  padding: 10px 16px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.success { color: green; margin-top: 10px; }
.error { color: red; margin-top: 10px; }
</style>
