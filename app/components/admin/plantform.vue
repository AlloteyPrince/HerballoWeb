<template>
  <div class="plant-form">
    <h3>Add New Plant</h3>
    <form @submit.prevent="handleSubmit">
      <label>Common Name</label>
      <input v-model="form.commonName" placeholder="e.g. Orange" required />

      <label>Scientific Name</label>
      <input v-model="form.scientificName" placeholder="e.g. Citrus sinensis" required />

      <label>Family <span class="optional">(optional)</span></label>
      <input v-model="form.family" placeholder="e.g. Rutaceae" />

      <label>Other Common Names <span class="hint">(one per line)</span></label>
      <textarea v-model="form.otherCommonNames" rows="2" placeholder="Naranja&#10;Portakal"></textarea>

      <label>Tagline</label>
      <textarea v-model="form.tagline" rows="2" placeholder="A short one- to two-sentence summary" required></textarea>

      <label>Photos <span class="hint">(you can select multiple)</span></label>
      <input type="file" accept="image/*" multiple @change="handleFileUpload" />
      <div v-if="form.imageUrl.length" class="thumb-row">
        <div v-for="(img, i) in form.imageUrl" :key="img" class="thumb">
          <img :src="img" :alt="`Photo ${i + 1}`" />
          <button type="button" class="thumb-remove" @click="form.imageUrl.splice(i, 1)">×</button>
        </div>
      </div>
      <p v-if="uploading" class="uploading-note">Uploading...</p>

      <label>Primary Health Benefits <span class="hint">(one per line)</span></label>
      <textarea v-model="form.primaryHealthBenefits" rows="3"></textarea>

      <label>Key Active Compounds <span class="hint">(one per line)</span></label>
      <textarea v-model="form.keyActiveCompounds" rows="3"></textarea>

      <label>Common Preparations <span class="hint">(one per line)</span></label>
      <textarea v-model="form.commonPreparations" rows="3"></textarea>

      <label>Specific Warnings <span class="hint">(one per line)</span></label>
      <textarea v-model="form.specificWarnings" rows="3"></textarea>

      <label>Additional Info <span class="optional">(optional)</span></label>
      <textarea v-model="form.additionalInfo" rows="2"></textarea>

      <label>Read More Link <span class="optional">(optional)</span></label>
      <input v-model="form.readMoreLink" type="url" placeholder="https://..." />

      <button type="submit" :disabled="loading || uploading">
        {{ loading ? "Adding..." : "Add Plant" }}
      </button>
    </form>

    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
const emit = defineEmits(['plantCreated']);

const loading = ref(false);
const uploading = ref(false);
const message = ref("");
const error = ref("");

const emptyForm = () => ({
  commonName: "",
  scientificName: "",
  family: "",
  otherCommonNames: "",
  tagline: "",
  imageUrl: [],
  primaryHealthBenefits: "",
  keyActiveCompounds: "",
  commonPreparations: "",
  specificWarnings: "",
  additionalInfo: "",
  readMoreLink: "",
});

const form = ref(emptyForm());

const linesToArray = (s) => s.split("\n").map((l) => l.trim()).filter(Boolean);

const handleFileUpload = async (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  uploading.value = true;
  error.value = "";
  try {
    for (const file of files) {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "plants");
      const { url } = await adminFetch('/api/admin/upload', { method: 'POST', body });
      form.value.imageUrl.push(url);
    }
  } catch (err) {
    error.value = "Failed to upload one or more photos";
  } finally {
    uploading.value = false;
    e.target.value = "";
  }
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = "";
  message.value = "";

  try {
    await adminFetch('/api/admin/plants', {
      method: "POST",
      body: {
        commonName: form.value.commonName,
        scientificName: form.value.scientificName,
        family: form.value.family || null,
        otherCommonNames: linesToArray(form.value.otherCommonNames),
        tagline: form.value.tagline,
        imageUrl: form.value.imageUrl,
        primaryHealthBenefits: linesToArray(form.value.primaryHealthBenefits),
        keyActiveCompounds: linesToArray(form.value.keyActiveCompounds),
        commonPreparations: linesToArray(form.value.commonPreparations),
        specificWarnings: linesToArray(form.value.specificWarnings),
        additionalInfo: form.value.additionalInfo,
        readMoreLink: form.value.readMoreLink,
      },
    });

    message.value = "✅ Plant added successfully!";
    emit('plantCreated');
    form.value = emptyForm();
  } catch (err) {
    error.value = err.data?.statusMessage || "Failed to add plant";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.plant-form {
  max-width: 100%;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #334155;
  font-size: 0.9rem;
}

.optional, .hint {
  font-weight: 400;
  color: #94a3b8;
  font-size: 0.8rem;
}

input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-family: inherit;
}

.thumb-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.thumb {
  position: relative;
  width: 90px;
  height: 90px;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.thumb-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #dc2626;
  color: white;
  border: none;
  cursor: pointer;
  line-height: 1;
  font-size: 0.9rem;
}

.uploading-note {
  color: #64748b;
  font-size: 0.85rem;
  margin: -8px 0 16px;
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
