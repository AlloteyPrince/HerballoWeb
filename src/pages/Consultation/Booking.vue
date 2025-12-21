<template>
  <div class="booking-wrapper">
    <div class="booking-card">
      <h1>Book Your Consultation</h1>
      <p class="intro">
        Please fill out the form below to schedule your consultation with our
        herbal medicine experts.
      </p>

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
          <div class="form-group">
            <label for="email">Email Address *</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              placeholder="Enter your email address"
            />
          </div>
          <div class="form-group">
            <label for="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              v-model="form.phone"
              required
              placeholder="Enter your phone number"
            />
            <p class="phone-notice">
              <strong>Note:</strong> We may contact you via WhatsApp or schedule
              a video call based on your preference and availability.
            </p>
          </div>
        </div>

        <div class="form-section">
          <h2>Consultation Details</h2>
          <div class="form-group">
            <label for="purpose">Purpose of Consultation *</label>
            <select id="purpose" v-model="form.purpose" required>
              <option value="">Select consultation type</option>
              <option value="general">
                General Enquiries About Herbal Medicines
              </option>
              <option value="research">Research Collaborations</option>
              <option value="clinical">Clinical / Health Consultations</option>
            </select>
          </div>
          <div class="form-group">
            <label for="description">Brief Description</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              placeholder="Please provide a brief description of your consultation needs..."
            ></textarea>
          </div>
          <div class="form-group">
            <label for="documents">Upload Documents or Reports</label>
            <div
              class="upload-area"
              @click="$refs.fileInput.click()"
              @dragover.prevent
              @drop="handleFileDrop"
            >
              <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                style="display: none"
              />
              <div class="upload-content">
                <svg
                  class="upload-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                    stroke-width="2"
                  />
                  <polyline points="7,10 12,15 17,10" stroke-width="2" />
                  <line x1="12" y1="15" x2="12" y2="3" stroke-width="2" />
                </svg>
                <p>Click to upload files or drag and drop</p>
                <p class="upload-hint">
                  PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB each)
                </p>
              </div>
            </div>

            <div v-if="uploadedFiles.length > 0" class="uploaded-files">
              <h4>Uploaded Files:</h4>
              <div
                v-for="(file, index) in uploadedFiles"
                :key="index"
                class="file-item"
              >
                <span class="file-name">{{ file.name }}</span>
                <button
                  type="button"
                  @click="removeFile(index)"
                  class="remove-file"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Schedule Your Appointment</h2>
          <div class="combined-notice">
            <h3>Important Information</h3>
            <ul class="notice-list">
              <li class="notice-item">
                <svg
                  class="notice-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" stroke-width="2" />
                  <path d="M12 6v6l4 2" stroke-width="2" />
                </svg>
                <span
                  ><strong>Session Duration:</strong> All consultation sessions
                  are limited to a maximum of 1 hour</span
                >
              </li>
              <li class="notice-item">
                <svg
                  class="notice-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" stroke-width="2" />
                  <polyline points="12,6 12,12 16,14" stroke-width="2" />
                </svg>
                <span
                  ><strong>Timezone:</strong> All times are in Ghana Standard
                  Time (GMT)</span
                >
              </li>
              <li class="notice-item">
                <svg
                  class="notice-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" stroke-width="2" />
                  <path d="m9 12 2 2 4-4" stroke-width="2" />
                </svg>
                <span
                  ><strong>Advance Booking Required:</strong> Appointments must
                  be booked at least 24 hours in advance</span
                >
              </li>
            </ul>
          </div>

          <TimeDate
            :date="form.date"
            :time="form.time"
            :available-slots="availableSlots"
            :loading="loadingSlots"
            :min-date="minDate"
            @update:date="onDateChange"
            @update:time="onTimeChange"
          />
        </div>

        <div class="form-section">
          <h2>Additional Information</h2>
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.isFirstTime" />
              This is my first consultation with Herballo
            </label>
          </div>
          <div class="form-group">
            <label for="callType">Preferred Call Type *</label>
            <select id="callType" v-model="form.callType" required>
              <option value="">Select your preference</option>
              <option value="voice">Voice Call (Audio only)</option>
              <option value="video">Video Call</option>
            </select>
          </div>
          <div class="form-group">
            <label for="specialRequests"
              >Special Requests or Accessibility Needs</label
            >
            <textarea
              id="specialRequests"
              v-model="form.specialRequests"
              rows="3"
              placeholder="Any special accommodations, accessibility needs, or specific requests..."
            ></textarea>
          </div>
          <div class="form-group">
            <label for="hearAbout">Where did you hear about us? *</label>
            <select id="hearAbout" v-model="form.hearAbout" required>
              <option value="">Select an option</option>
              <option value="google">Google Search</option>
              <option value="social-media">
                Social Media (Facebook, Instagram, Twitter)
              </option>
              <option value="referral">Referral from Friend/Family</option>
              <option value="healthcare-provider">Healthcare Provider</option>
              <option value="online-article">Online Article/Blog</option>
              <option value="advertisement">Advertisement</option>
              <option value="conference">Conference/Event</option>
              <option value="university">
                University/Academic Institution
              </option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="goBack" class="btn-secondary">
            Back to Consent
          </button>
          <button
            type="submit"
            class="btn-primary"
            :disabled="!isFormValid || bookingSubmitted"
          >
            {{ submitButtonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TimeDate from "@/components/TimeDate.vue";

export default {
  name: "BookingForm",
  components: { TimeDate },
  data() {
    return {
      form: {
        fullName: "",
        email: "",
        phone: "",
        purpose: "",
        hearAbout: "",
        description: "",
        date: "",
        time: "",
        isFirstTime: false,
        callType: "",
        specialRequests: "",
      },
      uploadedFiles: [],
      availableSlots: [],
      loadingSlots: false,
      bookingSubmitted: false,
      submitButtonText: "Continue",
    };
  },
  computed: {
    minDate() {
      const today = new Date();
      const minBookingDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      return minBookingDate.toISOString().split("T")[0];
    },
    isFormValid() {
      return (
        this.form.fullName.trim() !== "" &&
        this.form.email.trim() !== "" &&
        this.form.phone.trim() !== "" &&
        this.form.purpose !== "" &&
        this.form.hearAbout !== "" &&
        this.form.callType !== "" &&
        this.form.date !== "" &&
        this.form.time !== ""
      );
    },
  },
  watch: {
    form: {
      handler() {
        if (!this.isFormValid) {
          this.submitButtonText = "Please complete the form";
        } else {
          // MODIFIED: Text now reflects the new flow
          this.submitButtonText = "Proceed to Summary";
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // Methods for date, time, and file uploads are all fine and do not need changes
    onDateChange(date) {
      this.form.date = date;
      this.fetchAvailableSlots();
      this.form.time = "";
    },
    onTimeChange(time) {
      this.form.time = time;
    },

    async fetchAvailableSlots() {
      if (!this.form.date) return;
      this.loadingSlots = true;
      this.form.time = "";

      try {
        const response = await fetch(
          `/api/bookings/availability?date=${this.form.date}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          this.availableSlots = await response.json();
        } else {
          throw new Error("Failed to fetch available slots");
        }
      } catch (error) {
        console.error("Error fetching available slots:", error);
        alert(
          "Unable to check slot availability. Please verify your selection with our team."
        );
        this.availableSlots = [];
      }
      this.loadingSlots = false;
    },

    handleFileSelect(event) {
      const files = Array.from(event.target.files);
      this.addFiles(files);
    },
    handleFileDrop(event) {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      this.addFiles(files);
    },
    addFiles(files) {
      files.forEach((file) => {
        if (file.size <= 10 * 1024 * 1024) {
          this.uploadedFiles.push(file);
        } else {
          alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
        }
      });
    },
    removeFile(index) {
      this.uploadedFiles.splice(index, 1);
    },

    async submitBookingInfo() {
      if (!this.isFormValid) {
        alert("Please fill in all required fields.");
        return;
      }
      
      this.bookingSubmitted = true;
      this.submitButtonText = "Processing...";

      try {
        const formData = new FormData();
        
        for (const key in this.form) {
          if (key !== 'date' && key !== 'time') {
            formData.append(key, this.form[key]);
          }
        }
        
        const combinedDateTime = new Date(`${this.form.date}T${this.form.time}:00`);
        formData.append('bookingDateTime', combinedDateTime.toISOString());

        this.uploadedFiles.forEach((file) => {
          formData.append(`files`, file);
        });

        // MODIFIED: We now send the booking info to the backend...
        const response = await fetch("/api/bookings", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          // MODIFIED: Instead of confirming, we log the received bookingId
          console.log("Pending booking saved:", data.bookingId);
          
          // TODO: Pass all form data to the next page (Summary)
          // You could use a Vuex store, or pass it via router state
          this.$router.push({
            name: "ConsultationSummary",
            params: {
              bookingData: JSON.stringify({
                ...this.form,
                files: this.uploadedFiles.map(f => f.name), // Store file names for summary
                bookingId: data.bookingId,
              }),
            },
          });

        } else {
          throw new Error(data.message || "Failed to submit booking");
        }
      } catch (error) {
        console.error("Booking submission error:", error);
        alert("Error submitting booking: " + error.message);
      } finally {
        this.bookingSubmitted = false;
        this.submitButtonText = "Proceed to Summary";
      }
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
/* All your existing styles here */
.booking-wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
}

.booking-card {
  width: 100%;
  max-width: 800px;
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #105212;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #105212;
}

.intro {
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.form-section {
  margin-bottom: 2.5rem;
}

.form-section h2 {
  font-size: 1.3rem;
  color: #105212;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e8f5e8;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #105212;
}

.phone-notice {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  font-style: italic;
}

.checkbox-label {
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500 !important;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto !important;
  margin: 0;
  transform: scale(1.2);
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.upload-area:hover {
  border-color: #105212;
  background-color: #f9fdf9;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: #105212;
}

.upload-hint {
  font-size: 0.9rem;
  color: #666;
}

.uploaded-files {
  margin-top: 1rem;
}

.uploaded-files h4 {
  margin-bottom: 0.5rem;
  color: #105212;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.file-name {
  font-size: 0.9rem;
}

.remove-file {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
}

.combined-notice {
  background: linear-gradient(135deg, #e8f5e8, #f0fdf0);
  border: 2px solid #105212;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.combined-notice h3 {
  color: #105212;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.combined-notice h3::before {
  content: "ℹ️";
  font-size: 1.2rem;
}

.notice-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notice-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #105212;
  font-size: 0.95rem;
}

.notice-item:last-child {
  margin-bottom: 0;
}

.notice-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
  color: #105212;
}

.loading-slots {
  padding: 0.75rem;
  text-align: center;
  color: #666;
  font-style: italic;
}

.no-slots,
.date-error {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-style: italic;
}

.no-slots {
  color: #dc3545;
}

.date-error {
  color: #d4a574;
  font-weight: 500;
}

.schedule-type-badge {
  display: inline-block;
  background: #e8f5e8;
  color: #105212;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 8px;
  border: 1px solid #105212;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0c3d0e;
  border-color: #0c3d0e;
}

.btn-primary:disabled {
  background-color: #8fbf8f;
  border-color: #8fbf8f;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: transparent;
  color: #105212;
  border-color: #105212;
}

.btn-secondary:hover {
  background-color: #105212;
  color: white;
}

@media (max-width: 768px) {
  .booking-card {
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .notice-item {
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
  }

  .notice-icon {
    margin-top: 0;
  }
}
</style>