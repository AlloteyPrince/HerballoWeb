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

      <ClientOnly>
        <QuillEditor
          ref="quillRef"
          v-model:content="body"
          content-type="html"
          class="quill"
          :options="editorOptions"
          theme="snow"
          @ready="onEditorReady"
        />
        <template #fallback>
          <div class="quill-placeholder">Loading Editor...</div>
        </template>
      </ClientOnly>

      <button type="submit" :disabled="sending">
        {{ sending ? "Sending..." : "Send Newsletter" }}
      </button>
      
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
// Nuxt auto-imports: ref, useRouter, useRuntimeConfig
const config = useRuntimeConfig();
const router = useRouter();
const token = useCookie('auth_token');

const subject = ref("");
const body = ref("");
const message = ref("");
const error = ref("");
const sending = ref(false);
const quillRef = ref(null);

// Editor configuration
const editorOptions = {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  },
};

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
          // Using $fetch with the base URL from config
          const data = await $fetch('/api/upload', {
            baseURL: config.public.apiBase,
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          });

          // Helper to ensure full URL
          const imageUrl = data.imageUrl.startsWith('http') 
            ? data.imageUrl 
            : `${config.public.apiBase}${data.imageUrl}`;

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
  if (!body.value || body.value.trim() === "") {
    error.value = "Message body cannot be empty.";
    return;
  }

  message.value = "";
  error.value = "";
  sending.value = true;

  try {
    await $fetch("/api/newsletter", {
      baseURL: config.public.apiBase,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        subject: subject.value,
        body: body.value,
      },
    });

    message.value = "✅ Newsletter sent successfully!";
    subject.value = "";
    body.value = "";
    if (quillRef.value) {
      quillRef.value.setHTML("");
    }

    // Since this is a component in your dashboard, 
    // we might just want to switch the view rather than a full router push
    // But if you want to navigate back to the main management view:
    setTimeout(() => {
      // Logic to switch 'section' in index.vue or redirect
      router.push("/admin"); 
    }, 2000);

  } catch (err) {
    error.value = err.data?.message || "❌ Something went wrong";
  } finally {
    sending.value = false;
  }
};
</script>

<style scoped>
/* Scoped styles are largely the same, but matched to Herballo palette */
.newsletter-form {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
}

input[type="text"] {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  outline: none;
}

input:focus { border-color: #105212; }

.quill {
  margin-bottom: 16px;
  min-height: 300px;
}

.quill-placeholder {
  height: 300px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  color: #94a3b8;
}

button {
  padding: 12px 24px;
  background-color: #105212;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.success { color: #059669; margin-top: 10px; }
.error { color: #dc2626; margin-top: 10px; }
</style>