<template>
  <div class="blog-form">
    <h3>Create New Blog Post</h3>

    <form @submit.prevent="handleSubmit">
      <input v-model="title" type="text" placeholder="Title" required />
      <input
        v-model="slug"
        type="text"
        placeholder="Slug (e.g. herbal-energy-tips)"
        required
      />
      <input v-model="tags" type="text" placeholder="Tags (comma-separated)" />

      <!-- Placeholder for content input -->
      <textarea
        v-model="content"
        placeholder="Blog content..."
        rows="8"
      ></textarea>

      <button type="submit">Submit Post</button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
const slug = ref("");
const tags = ref("");
const content = ref("");
const message = ref("");
const error = ref("");

const emit = defineEmits(["postCreated"]);

const handleSubmit = async () => {
  message.value = "";
  error.value = "";

  try {
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title.value,
        slug: slug.value,
        tags: tags.value.split(",").map((t) => t.trim()),
        content: content.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      error.value = data.message || "Failed to create post";
    } else {
      message.value = "✅ Blog post created!";
      emit("postCreated"); // notify parent to switch back
      title.value = "";
      slug.value = "";
      tags.value = "";
      content.value = "";
    }
  } catch (err) {
    error.value = "❌ Something went wrong";
  }
};
</script>

<style scoped>
.blog-form {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

input,
textarea {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 10px 16px;
  background-color: #2ecc71;
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
