<template>
  <div class="blog-form">
    <h3>Create New Blog Post</h3>

    <form @submit.prevent="handleSubmit">
      <input v-model="title" type="text" placeholder="Title" required />
      <input v-model="tags" type="text" placeholder="Tags (comma separated)" />
      <input type="file" @change="handleCoverUpload" />

      <input v-model="authorName" type="text" placeholder="Author Name" required />
      <textarea v-model="authorBio" placeholder="Author Bio" required></textarea>
      <input type="file" @change="handleAuthorAvatarUpload" />

      <QuillEditor v-model:content="content" contentType="html" theme="snow" />

      <button type="submit">Submit Post</button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { uploadFile, parseTags } from "@/helpers/helper.js";
import { api } from "@/api";

const title = ref("");
const tags = ref("");
const content = ref("");
const authorName = ref("");
const authorBio = ref("");
const coverImage = ref(null);
const authorAvatar = ref(null);
const message = ref("");
const error = ref("");

const handleCoverUpload = async (e) => {
  try {
    coverImage.value = await uploadFile(e.target.files[0], localStorage.getItem("token"));
  } catch (err) {
    error.value = "Failed to upload cover image";
  }
};

const handleAuthorAvatarUpload = async (e) => {
  try {
    authorAvatar.value = await uploadFile(e.target.files[0], localStorage.getItem("token"));
  } catch (err) {
    error.value = "Failed to upload author avatar";
  }
};

const handleSubmit = async () => {
  error.value = "";
  message.value = "";

  if (!content.value.trim()) {
    error.value = "Content cannot be empty.";
    return;
  }

  const postData = {
    title: title.value,
    tags: parseTags(tags.value),
    content: content.value,
    coverImage: coverImage.value,
    author: {
      name: authorName.value,
      bio: authorBio.value,
      avatar: authorAvatar.value,
    },
  };

  try {
    const res = await fetch(api("/api/posts"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    });
    const data = await res.json();

    if (!res.ok) {
      error.value = data.message || "Failed to create post";
    } else {
      message.value = "✅ Blog post created!";
      // Reset form
      title.value = "";
      tags.value = "";
      content.value = "";
      coverImage.value = null;
      authorAvatar.value = null;
    }
  } catch (err) {
    error.value = "❌ Something went wrong";
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
