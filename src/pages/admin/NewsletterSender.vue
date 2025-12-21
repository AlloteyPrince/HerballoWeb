<template>
  <div class="newsletter-form">
    <h3>Send a Newsletter</h3>

    <form @submit.prevent="handleSubmit">
      <input
        v-model="subject"
        type="text"
        placeholder="Email Subject"
        required
      />

      <QuillEditor
        ref="quillRef"
        v-model:content="body"
        contentType="html"
        class="quill"
        :options="editorOptions"
        theme="snow"
        @ready="onEditorReady"
      />

      <button type="submit" :disabled="sending">
        {{ sending ? "Sending..." : "Send Newsletter" }}
      </button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { api } from "@/api";
import { ref } from "vue";
import { useRouter } from "vue-router"; // Import useRouter
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const subject = ref("");
const body = ref("");
const message = ref("");
const error = ref("");
const sending = ref(false); // New state variable for button control
const quillRef = ref(null);
const router = useRouter(); // Use the router instance

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
          const res = await fetch(api("api/upload"), {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          const imageUrl = api(data.imageUrl);
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

const handleSubmit = async () => {
  message.value = "";
  error.value = "";
  sending.value = true;

  if (!body.value || body.value.trim() === "") {
    error.value = "Message body cannot be empty.";
    sending.value = false;
    return;
  }

  const newsletterData = {
    subject: subject.value,
    body: body.value,
  };

  try {
    const res = await fetch(api("/api/newsletter"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsletterData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Server error:", data);
      error.value = data.message || "Failed to send newsletter";
    } else {
      message.value = "✅ Newsletter sent successfully!";
      // Reset form
      subject.value = "";
      body.value = "";
      if (quillRef.value) {
        quillRef.value.setHTML("");
      }

      // Automatically navigate back to the subscriber list page
      setTimeout(() => {
        router.push({ name: "SubscriptionManagement" });
      }, 2000); // 2-second delay to show the success message
    }
  } catch (err) {
    console.error("❌ Request error:", err);
    error.value = "❌ Something went wrong";
  } finally {
    sending.value = false;
  }
};
</script>

<style scoped>
.newsletter-form {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

input[type="text"] {
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

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
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