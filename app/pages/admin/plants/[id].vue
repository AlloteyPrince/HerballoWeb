<template>
  <div class="edit-plant-container">
    <div class="header-row">
      <button @click="router.back()" class="btn-back">← Back to Dashboard</button>
      <h3>Edit Plant</h3>
    </div>

    <form v-if="!pending && plant" @submit.prevent="handleUpdate" class="edit-form">
      <label>Common Name</label>
      <input v-model="form.commonName" required />

      <label>Scientific Name</label>
      <input v-model="form.scientificName" required />

      <label>Family <span class="optional">(optional)</span></label>
      <input v-model="form.family" />

      <label>Other Common Names <span class="hint">(one per line)</span></label>
      <textarea v-model="form.otherCommonNames" rows="2"></textarea>

      <label>Tagline</label>
      <textarea v-model="form.tagline" rows="2" required></textarea>

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
      <input v-model="form.readMoreLink" type="url" />

      <div class="action-footer">
        <button type="submit" :disabled="updating || uploading" class="btn-update">
          {{ updating ? "Updating..." : "Save Changes" }}
        </button>
        <button type="button" :disabled="deleting" class="btn-delete" @click="handleDelete">
          {{ deleting ? "Deleting..." : "Delete Plant" }}
        </button>
        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </form>

    <div v-else-if="pending" class="loading-state">Loading plant details...</div>
    <div v-else class="loading-state">Plant not found.</div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const plantId = route.params.id;

const updating = ref(false);
const deleting = ref(false);
const uploading = ref(false);
const message = ref("");
const error = ref("");

const form = ref({
  commonName: "", scientificName: "", family: "", otherCommonNames: "",
  tagline: "", imageUrl: [], primaryHealthBenefits: "", keyActiveCompounds: "",
  commonPreparations: "", specificWarnings: "", additionalInfo: "", readMoreLink: "",
});

const { data: plant, pending } = await useAsyncData(
  `admin-plant-${plantId}`,
  () => adminFetch(`/api/admin/plants/${plantId}`)
);

const arrayToLines = (a) => (Array.isArray(a) ? a.join("\n") : "");
const linesToArray = (s) => s.split("\n").map((l) => l.trim()).filter(Boolean);

if (plant.value) {
  form.value = {
    commonName: plant.value.common_name,
    scientificName: plant.value.scientific_name,
    family: plant.value.family || "",
    otherCommonNames: arrayToLines(plant.value.other_common_names),
    tagline: plant.value.tagline,
    imageUrl: [...(plant.value.image_url || [])],
    primaryHealthBenefits: arrayToLines(plant.value.primary_health_benefits),
    keyActiveCompounds: arrayToLines(plant.value.key_active_compounds),
    commonPreparations: arrayToLines(plant.value.common_preparations),
    specificWarnings: arrayToLines(plant.value.specific_warnings),
    additionalInfo: plant.value.additional_info || "",
    readMoreLink: plant.value.read_more_link || "",
  };
}

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

const handleUpdate = async () => {
  updating.value = true;
  message.value = "";
  error.value = "";

  try {
    await adminFetch(`/api/admin/plants/${plantId}`, {
      method: "PUT",
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
    message.value = "✅ Plant updated successfully!";
  } catch (err) {
    error.value = err.data?.statusMessage || "Update failed";
  } finally {
    updating.value = false;
  }
};

const handleDelete = async () => {
  if (!confirm("Are you sure you want to delete this plant? This cannot be undone.")) return;

  deleting.value = true;
  try {
    await adminFetch(`/api/admin/plants/${plantId}`, { method: "DELETE" });
    router.push("/admin");
  } catch (err) {
    error.value = err.data?.statusMessage || "Delete failed";
    deleting.value = false;
  }
};

definePageMeta({
  layout: false,
  middleware: 'admin',
});
</script>

<style scoped>
.edit-plant-container {
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
}

.header-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 2rem;
}

.btn-back {
  background: none;
  border: 1px solid #ccc;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
}

.edit-form {
  max-width: 700px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #334155;
}

.optional, .hint {
  font-weight: 400;
  color: #94a3b8;
  font-size: 0.8rem;
}

input, textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.thumb-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1.5rem;
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
  margin: -1rem 0 1.5rem;
}

.action-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn-update {
  background: #105212;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-delete {
  background: #fee2e2;
  color: #dc2626;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-delete:hover { background: #dc2626; color: white; }

.success { color: #10b981; font-weight: bold; }
.error { color: #ef4444; font-weight: bold; }
</style>
