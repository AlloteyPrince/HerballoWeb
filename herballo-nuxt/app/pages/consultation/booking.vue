<template>
  <div class="booking-wrapper">
    <div class="progress-container">
      <div class="progress-bar">
        <div class="step active">
          <div class="dot">✓</div>
          <span>Consent</span>
        </div>
        <div class="line active"></div>
        <div class="step active">
          <div class="dot">2</div>
          <span>Details</span>
        </div>
        <div class="line"></div>
        <div class="step">
          <div class="dot">3</div>
          <span>Review</span>
        </div>
        <div class="line"></div>
        <div class="step">
          <div class="dot">4</div>
          <span>Payment</span>
        </div>
      </div>
    </div>

    <div class="booking-card">
      <header class="booking-header">
        <h1>Book Your Consultation</h1>
        <p class="intro">
          Fill out the details below to schedule your session.
        </p>
      </header>

      <form @submit.prevent="submitBookingInfo" class="booking-form">
        <div class="form-section">
          <h2>Personal Information</h2>
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input
              type="text"
              id="name"
              v-model="form.fullName"
              required
              placeholder="Enter your full name"
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                placeholder="email@example.com"
              />
            </div>
            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                required
                placeholder="+233..."
              />
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Consultation Details</h2>
          <div class="form-group">
            <label for="purpose">Purpose of Consultation *</label>
            <div class="select-wrapper">
              <select
                id="purpose"
                v-model="form.purpose"
                required
                class="custom-select"
              >
                <option value="" disabled selected>
                  Select consultation type
                </option>
                <option value="general">
                  General Enquiries About Herbal Medicines
                </option>
                <option value="research">Research Collaborations</option>
                <option value="clinical">
                  Clinical / Health Consultations
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="description">Brief Description</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="3"
              placeholder="How can we help?"
            ></textarea>
          </div>

          <div class="form-group">
            <label>Upload Documents (Max 10MB)</label>
            <div
              class="upload-area"
              @click="$refs.fileInput.click()"
              @dragover.prevent
              @drop.prevent="handleFileDrop"
            >
              <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.png"
                style="display: none"
              />
              <div class="upload-content">
                <span class="icon">📁</span>
                <p>Click or drag medical reports here</p>
              </div>
            </div>
            <div v-if="uploadedFiles.length > 0" class="uploaded-files">
              <div
                v-for="(file, index) in uploadedFiles"
                :key="index"
                class="file-item"
              >
                <span class="file-name">{{ file.name }}</span>
                <button
                  type="button"
                  class="remove-file"
                  @click="removeFile(index)"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Schedule Your Appointment</h2>
          <Timedate
            v-model:date="form.date"
            v-model:time="form.time"
            :available-slots="availableSlots"
            :loading="loadingSlots"
            :min-date="minDate"
            @update:date="onDateChange"
          />
        </div>

        <div class="form-section no-border">
          <div class="form-row">
            <div class="form-group">
              <label for="callType">Preferred Call Type *</label>
              <div class="select-wrapper">
                <select
                  id="callType"
                  v-model="form.callType"
                  required
                  class="custom-select"
                >
                  <option value="voice">Voice Call (Audio only)</option>
                  <option value="video">Video Call</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="hearAbout">Where did you hear about us? *</label>
              <div class="select-wrapper">
                <select
                  id="hearAbout"
                  v-model="form.hearAbout"
                  required
                  class="custom-select"
                >
                  <option value="" disabled selected>Select an option</option>
                  <option value="google">Google</option>
                  <option value="social-media">Social Media</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="goBack" class="btn-outline">
            Back
          </button>
          <button
            type="submit"
            class="btn-primary"
            :disabled="!isFormValid || bookingSubmitted"
          >
            {{ bookingSubmitted ? "Processing..." : "Proceed to Summary" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const fileInput = ref(null);
const bookingSubmitted = ref(false);
const loadingSlots = ref(false);
const availableSlots = ref([]);
const uploadedFiles = ref([]);

const form = reactive({
  fullName: "",
  email: "",
  phone: "",
  purpose: "",
  description: "",
  date: "",
  time: "",
  callType: "video",
  hearAbout: "",
});

onMounted(() => {
  if (process.client) {
    if (localStorage.getItem("herballo_consent_agreed") !== "true")
      navigateTo("/consultation");
  }
});

const isFormValid = computed(
  () =>
    form.fullName &&
    form.email &&
    form.phone &&
    form.date &&
    form.time &&
    form.purpose
);
const minDate = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
});

const handleFileSelect = (e) => addFiles(Array.from(e.target.files));
const handleFileDrop = (e) => addFiles(Array.from(e.dataTransfer.files));
const addFiles = (files) => {
  files.forEach((f) => {
    if (f.size <= 10 * 1024 * 1024) uploadedFiles.value.push(f);
    else alert("File too large (>10MB)");
  });
};
const removeFile = (i) => uploadedFiles.value.splice(i, 1);

const onDateChange = async (date) => {
  form.date = date;
  loadingSlots.value = true;
  try {
    availableSlots.value = await $fetch(
      `/api/bookings/availability?date=${date}`
    );
  } catch (e) {
    console.error(e);
  } finally {
    loadingSlots.value = false;
  }
};

const submitBookingInfo = async () => {
  bookingSubmitted.value = true;
  const formData = new FormData();
  Object.keys(form).forEach((k) => formData.append(k, form[k]));
  uploadedFiles.value.forEach((f) => formData.append("files", f));
  try {
    const res = await $fetch("/api/bookings", {
      method: "POST",
      body: formData,
    });
    if (process.client) {
      localStorage.setItem(
        "pending_booking_data",
        JSON.stringify({ ...form, bookingId: res.bookingId })
      );
    }
    navigateTo("/consultation/summary");
  } catch (err) {
    alert(err.message);
  } finally {
    bookingSubmitted.value = false;
  }
};
const goBack = () => navigateTo("/consultation");
</script>

<style scoped lang="scss">
.booking-wrapper {
  background: #fdfdfb;
  padding: 3rem 1rem;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}

/* Progress Tracker */
.progress-container {
  max-width: 800px;
  margin: 0 auto 2.5rem;
}
.progress-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  .dot {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #e2e8f0;
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
  }
  span {
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  &.active {
    .dot {
      background: #105212;
      border-color: #105212;
      color: #fff;
    }
    span {
      color: #105212;
    }
  }
}
.line {
  flex: 1;
  height: 2px;
  background: #e2e8f0;
  margin: 0 12px;
  margin-top: -26px;
  &.active {
    background: #105212;
  }
}

/* Card */
.booking-card {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}
.booking-header {
  text-align: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 2.4rem;
    font-weight: 900;
    color: #105212;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }
  .intro {
    color: #64748b;
    font-size: 1.1rem;
  }
}

.form-section {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 2rem;
  margin-bottom: 2.5rem;
  &.no-border {
    border: none;
  }
  h2 {
    font-size: 1.25rem;
    color: #105212;
    margin-bottom: 1.5rem;
    font-weight: 800;
  }
}
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}
.form-group {
  margin-bottom: 1.5rem;
  label {
    display: block;
    font-weight: 700;
    color: #334155;
    margin-bottom: 0.6rem;
    font-size: 0.9rem;
  }
}

/* Modern Input Styling */
input,
textarea,
.custom-select {
  width: 100%;
  padding: 1rem 1.2rem;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #fff;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  &::placeholder {
    color: #94a3b8;
  }
  &:hover {
    border-color: #105212;
  }
  &:focus {
    outline: none;
    border-color: #105212;
    box-shadow: 0 0 0 4px rgba(16, 82, 18, 0.1);
    background: #fff;
  }
}

/* Dropdown specific fixes to avoid "Windows 2000" look */
.select-wrapper {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    right: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23105212' stroke-width='3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
  }
}

.custom-select {
  appearance: none;
  cursor: pointer;
  padding-right: 3.5rem !important;
  background-color: #fff !important;
  line-height: 1.5;

  /* Modern browsers focus ring fix */
  &:focus {
    border-radius: 12px;
  }
}

/* File Upload Area */
.upload-area {
  border: 2px dashed #e2e8f0;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: #105212;
    background: #f0f7f0;
  }
  .icon {
    font-size: 2rem;
    margin-bottom: 10px;
    display: block;
  }
  p {
    color: #475569;
    font-weight: 600;
    font-size: 0.95rem;
  }
}

/* Buttons */
.form-actions {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}
.btn-primary {
  flex: 2;
  background: #105212;
  color: white;
  border: none;
  padding: 1.25rem;
  border-radius: 50px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover:not(:disabled) {
    background: #0d420f;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(16, 82, 18, 0.15);
  }
  &:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
  }
}
.btn-outline {
  flex: 1;
  background: white;
  color: #105212;
  border: 2px solid #105212;
  padding: 1.25rem;
  border-radius: 50px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #f0f7f0;
    transform: translateY(-2px);
  }
}

@media (max-width: 600px) {
  .booking-card {
    padding: 2.5rem 1.5rem;
  }
  .form-actions {
    flex-direction: column-reverse;
  }
  .progress-bar span {
    display: none;
  }
}
</style>
