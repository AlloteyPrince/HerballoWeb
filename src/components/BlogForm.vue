<template>
  <div class="blog-form">
    <h3>Create new blog post</h3>

    <form @submit.prevent="handleSubmit">
      <input v-model="title" type="text" placeholder="Title" required />
      <input v-model="tags" type="text" placeholder="Tags (comma separated)" />
      <input type="file" @change="handleFileUpload" />

      <br>


      <!-- Author Info -->
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
      <input type="file" @change="handleAuthorAvatarUpload" />

      <!-- Quill Editor -->
      <QuillEditor
        ref="quillRef"
        v-model:content="content"
        contentType="html"
        class="quill"
        :options="editorOptions"
        theme="snow"
        @ready="onEditorReady"
      />

      <button type="submit">Submit Post</button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { api } from "@/api";
import { ref, onMounted } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";



const title = ref("");
const slug = ref("");
const tags = ref("");
const content = ref("");
const message = ref("");
const error = ref("");
const coverImage = ref(null);
const quillRef = ref(null);
const editorReady = ref(false);
const authorName = ref('');
const authorBio = ref('');
const authorAvatar = ref(null);

const emit = defineEmits(["postCreated"]);

// Editor options - simplified to avoid initialization issues
const editorOptions = ref({
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  },
});

const onEditorReady = (editor) => {
  console.log("Editor ready:", editor);
  editorReady.value = true;

  // Now that editor is ready, we can set up custom handlers
  setupImageHandler(editor);
};

const setupImageHandler = (editor) => {
  const toolbar = editor.getModule("toolbar");
  if (toolbar) {
    toolbar.addHandler("image", () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
          const res = await fetch(api('api/upload'), {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          const imageUrl = api(`api/data.imageUrl`);

          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, "image", imageUrl);
          }
        } catch (err) {
          console.error("Image upload failed:", err);
          error.value = "Failed to upload image";
        }
      };
    });
  }
};

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(api('/api/upload'), {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    coverImage.value = data.imageUrl;
  } catch (err) {
    console.error("Image upload failed:", err);
    error.value = "Failed to upload cover image";
  }
};

const handleAuthorAvatarUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(api('/api/upload'), {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    authorAvatar.value = data.imageUrl;
  } catch (err) {
    console.error("Author avatar upload failed:", err);
    error.value = "Failed to upload author avatar";
  }
};

const handleSubmit = async () => {
  message.value = "";
  error.value = "";

  if (!content.value || content.value.trim() === "") {
    error.value = "Content cannot be empty.";
    return;
  }

  const blogData = {
    title: title.value,
    slug: slug.value,
    tags: (tags.value || "").split(",").map((t) => t.trim()),
    content: content.value,
    coverImage: coverImage.value,
    author: {
    name: authorName.value,
    bio: authorBio.value,
    avatar: authorAvatar.value,
  },
  };

  console.log("Submitting blog:", blogData);

  try {
    const res = await fetch(api('/api/posts'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(blogData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Server error:", data);
      error.value = data.message || "Failed to create post";
    } else {
      message.value = "✅ Blog post created!";
      emit("postCreated");
      // Reset form
      title.value = "";
      slug.value = "";
      tags.value = "";
      content.value = "";
      coverImage.value = null;
    }
  } catch (err) {
    console.error("❌ Request error:", err);
    error.value = "❌ Something went wrong";
  }
};
</script>

<style scoped>
.blog-form {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.quill {
  margin-bottom: 16px;
  background: white;
  border-radius: 6px;
  border: 1px solid #ccc;
  overflow: hidden;
  min-height: 200px;
}

button {
  padding: 10px 16px;
  background-color: #2ecc71;
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
