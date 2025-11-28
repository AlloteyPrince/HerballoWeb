<template>
  <div class="blog-form">
    <h3>Create New Blog Post</h3>

    <form @submit.prevent="handleSubmit">
      <!-- Title -->
      <input v-model="title" type="text" placeholder="Title" required />

      <!-- Tags -->
      <input v-model="tags" type="text" placeholder="Tags (comma separated)" />

      <!-- Cover Image -->
      <label>Cover Image:</label>
      <input type="file" @change="handleCoverImageUpload" />
      <p v-if="coverImageUrl" class="info-text">Selected file ready for upload</p>

      <!-- Author Info -->
      <input v-model="authorName" type="text" placeholder="Author Name" required />
      <textarea v-model="authorBio" placeholder="Author Bio" required></textarea>
      <label>Author Avatar:</label>
      <input type="file" @change="handleAuthorAvatarUpload" />
      <p v-if="authorAvatarUrl" class="info-text">Selected file ready for upload</p>

      <!-- Quill Editor -->
      <QuillEditor
        v-model:content="content"
        contentType="html"
        class="quill"
      />

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
const coverImageUrl = ref(null);
const authorAvatarUrl = ref(null);
const message = ref("");
const error = ref("");

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

const handleSubmit = async () => {
  error.value = "";
  message.value = "";

  if (!title.value.trim() || !content.value.trim()) {
    error.value = "Title and content are required.";
    return;
  }

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
      return;
    }

    message.value = "✅ Blog post created successfully!";
    // Reset form
    title.value = "";
    tags.value = "";
    content.value = "";
    coverImageUrl.value = null;
    authorName.value = "";
    authorBio.value = "";
    authorAvatarUrl.value = null;
  } catch (err) {
    console.error(err);
    error.value = "Something went wrong while creating the post.";
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
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #27ae60;
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
