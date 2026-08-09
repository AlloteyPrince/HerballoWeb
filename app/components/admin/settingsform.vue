<template>
  <div class="settings-form">
    <p class="intro">
      These links power the social icons in the site footer — update them here
      instead of editing code.
    </p>

    <div v-if="pending">Loading settings...</div>

    <form v-else @submit.prevent="handleSave">
      <label>YouTube URL</label>
      <input v-model="form.youtube_url" type="url" placeholder="https://www.youtube.com/@HerballoCo" />

      <label>LinkedIn URL</label>
      <input v-model="form.linkedin_url" type="url" placeholder="https://www.linkedin.com/company/herballo/" />

      <label>TikTok URL</label>
      <input v-model="form.tiktok_url" type="url" placeholder="https://www.tiktok.com/@Herballo" />

      <label>X / Twitter URL</label>
      <input v-model="form.twitter_url" type="url" placeholder="https://x.com/yourhandle" />

      <label>Contact Email</label>
      <input v-model="form.contact_email" type="email" placeholder="info@herballo.co" />

      <button type="submit" :disabled="saving">
        {{ saving ? "Saving..." : "Save Settings" }}
      </button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
const saving = ref(false);
const message = ref("");
const error = ref("");

const form = ref({
  youtube_url: "",
  linkedin_url: "",
  tiktok_url: "",
  twitter_url: "",
  contact_email: "",
});

const { data: settings, pending } = await useAsyncData(
  'admin-settings',
  () => adminFetch('/api/admin/settings')
);

if (settings.value) {
  form.value = {
    youtube_url: settings.value.youtube_url || "",
    linkedin_url: settings.value.linkedin_url || "",
    tiktok_url: settings.value.tiktok_url || "",
    twitter_url: settings.value.twitter_url || "",
    contact_email: settings.value.contact_email || "",
  };
}

const handleSave = async () => {
  saving.value = true;
  message.value = "";
  error.value = "";

  try {
    await adminFetch('/api/admin/settings', { method: 'PUT', body: form.value });
    message.value = "✅ Settings saved. Live on the site immediately.";
  } catch (err) {
    error.value = err.data?.statusMessage || "Failed to save settings";
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.settings-form {
  max-width: 500px;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.intro {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #334155;
  font-size: 0.9rem;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-family: inherit;
}

button {
  padding: 12px 24px;
  background: #105212;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

button:disabled { opacity: 0.7; cursor: not-allowed; }

.success { color: #059669; font-weight: 500; margin-top: 10px; }
.error { color: #dc2626; font-weight: 500; margin-top: 10px; }
</style>
