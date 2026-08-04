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
        <p class="intro">Fill out the details below to schedule your session.</p>
      </header>

      <!-- Logged-in user info (read-only) -->
      <div class="user-info-banner" v-if="user">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-details">
          <p class="user-name">{{ userFullName }}</p>
          <p class="user-email">{{ user.email }}</p>
        </div>
        <span class="verified-badge">✓ Verified</span>
      </div>

      <form @submit.prevent="submitBookingInfo" class="booking-form">

        <!-- Contact -->
        <div class="form-section">
          <h2>Contact Details</h2>
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

        <!-- Consultation Details -->
        <div class="form-section">
          <h2>Consultation Details</h2>
          <div class="form-group">
            <label for="purpose">Purpose of Consultation *</label>
            <div class="select-wrapper">
              <select id="purpose" v-model="form.purpose" required class="custom-select">
                <option value="" disabled selected>Select consultation type</option>
                <option value="general">General Enquiries About Herbal Medicines</option>
                <option value="research">Research Collaborations</option>
                <option value="clinical">Clinical / Health Consultations</option>
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
              <div v-for="(file, index) in uploadedFiles" :key="index" class="file-item">
                <span class="file-name">{{ file.name }}</span>
                <button type="button" class="remove-file" @click="removeFile(index)">×</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Schedule -->
        <div class="form-section">
          <h2>Schedule Your Appointment</h2>
          <p class="section-hint">Earliest available date is {{ minDateFormatted }}. We'll confirm your exact time within 24 hours of your request.</p>
          <Timedate
            v-model:date="form.preferred_date"
            v-model:time="form.time_of_day"
            :min-date="minDate"
          />
        </div>

        <!-- Preferences -->
        <div class="form-section no-border">
          <div class="form-row">
            <div class="form-group">
              <label for="callType">Preferred Call Type *</label>
              <div class="select-wrapper">
                <select id="callType" v-model="form.call_type" required class="custom-select">
                  <option value="voice">Voice Call (Audio only)</option>
                  <option value="video">Video Call</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="hearAbout">Where did you hear about us? *</label>
              <div class="select-wrapper">
                <select id="hearAbout" v-model="form.hear_about" required class="custom-select">
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

        <!-- Error message -->
        <div v-if="errorMsg" class="error-banner">
          ⚠️ {{ errorMsg }}
        </div>

        <div class="form-actions">
          <button type="button" @click="goBack" class="btn-outline">Back</button>
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
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const fileInput = ref(null)
const bookingSubmitted = ref(false)
const uploadedFiles = ref([])
const errorMsg = ref('')

const form = reactive({
  phone: '',
  purpose: '',
  description: '',
  preferred_date: '',
  time_of_day: '',
  call_type: 'video',
  hear_about: '',
})

// Pull user's full name from user metadata
const userFullName = computed(() => {
  const meta = user.value?.user_metadata
  if (!meta) return ''
  return `${meta.first_name || ''} ${meta.last_name || ''}`.trim() || user.value?.email
})

const userInitials = computed(() => {
  const meta = user.value?.user_metadata
  if (!meta) return '?'
  const f = meta.first_name?.[0] || ''
  const l = meta.last_name?.[0] || ''
  return (f + l).toUpperCase() || user.value?.email?.[0]?.toUpperCase() || '?'
})

onMounted(() => {
  if (process.client) {
    if (localStorage.getItem('herballo_consent_agreed') !== 'true') {
      navigateTo('/consultation')
    }
  }
})

// minDate = day after tomorrow
const minDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  return d.toISOString().split('T')[0]
})

const minDateFormatted = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
})

const isFormValid = computed(() =>
  form.phone &&
  form.purpose &&
  form.preferred_date &&
  form.time_of_day &&
  form.call_type &&
  form.hear_about
)

const handleFileSelect = (e) => addFiles(Array.from(e.target.files))
const handleFileDrop = (e) => addFiles(Array.from(e.dataTransfer.files))
const addFiles = (files) => {
  files.forEach((f) => {
    if (f.size <= 10 * 1024 * 1024) uploadedFiles.value.push(f)
    else alert('File too large (>10MB)')
  })
}
const removeFile = (i) => uploadedFiles.value.splice(i, 1)

const submitBookingInfo = async () => {
  bookingSubmitted.value = true
  errorMsg.value = ''

  try {
    // Read the authenticated user directly from the session. The useSupabaseUser()
    // ref can be empty when this handler fires, which would send a null client_id
    // and fail the row-level security check.
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser) {
      navigateTo('/login')
      return
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        client_id:      authUser.id,
        phone:          form.phone,
        purpose:        form.purpose,
        notes:          form.description,
        preferred_date: form.preferred_date,
        time_of_day:    form.time_of_day,
        call_type:      form.call_type,
        hear_about:     form.hear_about,
        status:         'pending',
      })
      .select()
      .single()

    if (error) throw error

    if (process.client) {
      localStorage.setItem(
        'pending_booking_data',
        JSON.stringify({
          ...form,
          bookingId: data.id,
          userName: userFullName.value,
          userEmail: authUser.email,
        })
      )
    }

    navigateTo('/consultation/summary')
  } catch (err) {
    errorMsg.value = err.message || 'Something went wrong. Please try again.'
  } finally {
    bookingSubmitted.value = false
  }
}

const goBack = () => navigateTo('/consultation')
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
    span { color: #105212; }
  }
}
.line {
  flex: 1;
  height: 2px;
  background: #e2e8f0;
  margin: 0 12px;
  margin-top: -26px;
  &.active { background: #105212; }
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
  margin-bottom: 2rem;
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

/* User Info Banner */
.user-info-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f0f7f0;
  border: 1px solid #c6e6c7;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  margin-bottom: 2.5rem;

  .user-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #105212;
    color: #fff;
    font-weight: 800;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .user-details {
    flex: 1;
    .user-name {
      font-weight: 700;
      color: #1e293b;
      font-size: 0.95rem;
      margin: 0 0 2px;
    }
    .user-email {
      font-size: 0.82rem;
      color: #64748b;
      margin: 0;
    }
  }
  .verified-badge {
    font-size: 0.78rem;
    font-weight: 700;
    color: #105212;
    background: #d1f0d2;
    padding: 4px 10px;
    border-radius: 50px;
  }
}

.form-section {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 2rem;
  margin-bottom: 2.5rem;
  &.no-border { border: none; }
  h2 {
    font-size: 1.25rem;
    color: #105212;
    margin-bottom: 0.5rem;
    font-weight: 800;
  }
  .section-hint {
    font-size: 0.84rem;
    color: #64748b;
    margin-bottom: 1.5rem;
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
  &::placeholder { color: #94a3b8; }
  &:hover { border-color: #105212; }
  &:focus {
    outline: none;
    border-color: #105212;
    box-shadow: 0 0 0 4px rgba(16, 82, 18, 0.1);
    background: #fff;
  }
}

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
  &:focus { border-radius: 12px; }
}

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
.uploaded-files {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  .file-name { font-size: 0.85rem; color: #334155; }
  .remove-file {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    &:hover { color: #ef4444; }
  }
}

.error-banner {
  background: #fff5f5;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

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
  .booking-card { padding: 2.5rem 1.5rem; }
  .form-actions { flex-direction: column-reverse; }
  .progress-bar span { display: none; }
}
</style>