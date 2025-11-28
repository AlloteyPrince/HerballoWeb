<template>
  <div class="edit-post">
    <h2>Edit Blog Post</h2>

    <form @submit.prevent="handleUpdate">
      <input v-model="title" type="text" placeholder="Title" required />
      <input v-model="tags" type="text" placeholder="Tags (comma separated)" />

      <label>Change Cover Image (Optional):</label>
      <input type="file" @change="handleCoverUpload" />
      <p v-if="coverImageUrl">Current Image: {{ coverImageUrl }}</p>

      <input v-model="authorName" type="text" placeholder="Author Name" required />
      <textarea v-model="authorBio" placeholder="Author Bio" required></textarea>

      <label>Change Author Avatar (Optional):</label>
      <input type="file" @change="handleAuthorAvatarUpload" />
      <p v-if="authorAvatarUrl">Current Avatar: {{ authorAvatarUrl }}</p>

      <QuillEditor v-model:content="content" contentType="html" theme="snow" />

      <button type="submit">Update Post</button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { uploadFile, parseTags, correctImageUrl } from "@/helpers/helper.js";
import { api } from "@/api";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const title = ref("");
const tags = ref("");
const content = ref("");
const authorName = ref("");
const authorBio = ref("");
const coverImageUrl = ref("");
const authorAvatarUrl = ref("");
const message = ref("");
const error = ref("");

onMounted(async () => {
  try {
    const postId = route.params.id;
    const res = await fetch(api(`/api/posts/${postId}`));
    const data = await res.json();
    title.value = data.title;
    tags.value = data.tags.join(", ");
    content.value = data.content;
    authorName.value = data.author.name;
    authorBio.value = data.author.bio;
    coverImageUrl.value = correctImageUrl(data.coverImage);
    authorAvatarUrl.value = correctImageUrl(data.author.avatar);
  } catch (err) {
    error.value = "Failed to fetch post data";
  }
});

const handleCoverUpload = async (e) => {
  try {
    coverImageUrl.value = await uploadFile(e.target.files[0], localStorage.getItem("token"));
  } catch (err) {
    error.value = "Failed to upload cover image";
  }
};

const handleAuthorAvatarUpload = async (e) => {
  try {
    authorAvatarUrl.value = await uploadFile(e.target.files[0], localStorage.getItem("token"));
  } catch (err) {
    error.value = "Failed to upload author avatar";
  }
};

const handleUpdate = async () => {
  error.value = "";
  message.value = "";

  const postData = {
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
    const postId = route.params.id;
    const res = await fetch(api(`/api/posts/${postId}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    });
    const data = await res.json();
    if (!res.ok) error.value = data.message || "Failed to update post";
    else {
      message.value = "✅ Post updated successfully!";
      setTimeout(() => router.push(`/admin/blog/${postId}`), 1000);
    }
  } catch (err) {
    error.value = "❌ Something went wrong";
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
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.success { color: green; margin-top: 10px; }
.error { color: red; margin-top: 10px; }
</style>
