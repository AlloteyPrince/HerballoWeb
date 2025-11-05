<template>
  <div class="summary-wrapper">
    <div class="summary-card">
      <div class="summary-header">
        <h1>Booking Summary</h1>
        <p class="summary-intro">
          Please review your consultation booking details below. If everything
          looks correct, proceed to payment. Otherwise, you can go back to make
          changes.
        </p>
      </div>

      <div v-if="bookingData" class="summary-content">
        <div class="summary-section">
          <h2>Personal Information</h2>
          <div class="summary-grid">
            <div class="summary-item">
              <strong>Full Name:</strong>
              <span>{{ bookingData.fullName }}</span>
            </div>
            <div class="summary-item">
              <strong>Email:</strong>
              <span>{{ bookingData.email }}</span>
            </div>
            <div class="summary-item">
              <strong>Phone Number:</strong>
              <span>{{ bookingData.phone }}</span>
            </div>
          </div>
        </div>

        <div class="summary-section">
          <h2>Consultation Details</h2>
          <div class="summary-grid">
            <div class="summary-item">
              <strong>Purpose:</strong>
              <span>{{ getPurposeLabel(bookingData.purpose) }}</span>
            </div>
            <div class="summary-item" v-if="bookingData.description">
              <strong>Description:</strong>
              <span>{{ bookingData.description }}</span>
            </div>
            <div class="summary-item">
              <strong>Call Type:</strong>
              <span>{{ getCallTypeLabel(bookingData.callType) }}</span>
            </div>
          </div>
        </div>

        <div class="summary-section">
          <h2>Appointment Schedule</h2>
          <div class="schedule-highlight">
            <div class="schedule-item">
              <svg
                class="schedule-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                  stroke-width="2"
                />
                <line x1="16" y1="2" x2="16" y2="6" stroke-width="2" />
                <line x1="8" y1="2" x2="8" y2="6" stroke-width="2" />
                <line x1="3" y1="10" x2="21" y2="10" stroke-width="2" />
              </svg>
              <div>
                <strong>Date:</strong>
                <span>{{ formatDate(bookingData.date) }}</span>
              </div>
            </div>
            <div class="schedule-item">
              <svg
                class="schedule-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" stroke-width="2" />
                <polyline points="12,6 12,12 16,14" stroke-width="2" />
              </svg>
              <div>
                <strong>Time:</strong>
                <span>{{ formatTime(bookingData.time) }} (GMT)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="summary-section" v-if="bookingData.files && bookingData.files.length > 0">
          <h2>Uploaded Documents</h2>
          <div class="documents-list">
            <div v-for="(file, index) in bookingData.files" :key="index" class="document-item">
              <svg
                class="document-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  stroke-width="2"
                />
                <polyline points="14,2 14,8 20,8" stroke-width="2" />
              </svg>
              <div class="document-info">
                <span class="document-name">{{ file }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="summary-section">
          <h2>Additional Information</h2>
          <div class="summary-grid">
            <div class="summary-item">
              <strong>First-time consultation:</strong>
              <span>{{ bookingData.isFirstTime ? "Yes" : "No" }}</span>
            </div>
            <div class="summary-item">
              <strong>How did you hear about us:</strong>
              <span>{{ getHearAboutLabel(bookingData.hearAbout) }}</span>
            </div>
            <div class="summary-item" v-if="bookingData.specialRequests">
              <strong>Special Requests:</strong>
              <span>{{ bookingData.specialRequests }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-data">
        <p>No booking data found. Please go back and fill out the form.</p>
      </div>

      <div class="summary-actions">
        <button type="button" @click="goBackToBooking" class="btn-secondary">
          <svg
            class="btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 12H5" stroke-width="2" />
            <path d="M12 19l-7-7 7-7" stroke-width="2" />
          </svg>
          Back to Edit Booking
        </button>
        <button
          type="button"
          @click="proceedToPayment"
          class="btn-primary"
          :disabled="!bookingData || loading"
        >
          <span v-if="loading">Processing Payment...</span>
          <span v-else>
            Proceed to Payment
            <svg
              class="btn-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M5 12h14" stroke-width="2" />
              <path d="M12 5l7 7-7 7" stroke-width="2" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookingSummary",
  data() {
    return {
      bookingData: null,
      loading: false, // NEW: Added a loading state for the button
    };
  },
  mounted() {
    this.loadBookingData();
  },
  methods: {
    // --- Data Loading and Formatting methods (All fine, no changes needed) ---
    loadBookingData() {
      try {
        // MODIFIED: Fetching data from router params instead of session storage
        if (this.$route.params.bookingData) {
          this.bookingData = JSON.parse(this.$route.params.bookingData);
        } else {
          // If no data found, redirect back to booking form
          this.$router.push("/consultation/booking");
        }
      } catch (error) {
        console.error("Error loading booking data:", error);
        this.$router.push("/consultation/booking");
      }
    },

    getPurposeLabel(purpose) {
      const purposes = {
        general: "General Enquiries About Herbal Medicines",
        research: "Research Collaborations",
        clinical: "Clinical / Health Consultations",
      };
      return purposes[purpose] || purpose;
    },

    getCallTypeLabel(callType) {
      const types = {
        voice: "Voice Call (Audio only)",
        video: "Video Call",
      };
      return types[callType] || callType;
    },

    getHearAboutLabel(hearAbout) {
      const sources = {
        google: "Google Search",
        "social-media": "Social Media (Facebook, Instagram, Twitter)",
        referral: "Referral from Friend/Family",
        "healthcare-provider": "Healthcare Provider",
        "online-article": "Online Article/Blog",
        advertisement: "Advertisement",
        conference: "Conference/Event",
        university: "University/Academic Institution",
        other: "Other",
      };
      return sources[hearAbout] || hearAbout;
    },

    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    formatTime(timeString) {
      if (!timeString) return "";
      const [startTime] = timeString.split("-");
      return `${this.convertTo12Hour(startTime)}`;
    },

    convertTo12Hour(time24) {
      const [hours, minutes] = time24.split(":");
      const hour12 = hours % 12 || 12;
      const ampm = hours < 12 ? "AM" : "PM";
      return `${hour12}:${minutes} ${ampm}`;
    },

    // --- Action methods ---
    goBackToBooking() {
      // Navigates back to the booking form
      this.$router.push("/consultation/booking");
    },

    // MODIFIED: This method now initiates payment instead of just navigating
    async proceedToPayment() {
      if (!this.bookingData || this.loading) return;

      this.loading = true;

      try {
        const response = await fetch("/api/bookings/paystack/initialize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: this.bookingData.bookingId, // Pass the bookingId to the backend
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Redirect the user to the Paystack payment page
          window.location.href = data.authorization_url;
        } else {
          // Handle error from backend
          throw new Error(data.message || "Failed to initialize payment");
        }
      } catch (error) {
        console.error("Payment initialization error:", error);
        alert("Error initiating payment: " + error.message);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Your existing styles are all fine and do not need changes */
.summary-wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
  min-height: 100vh;
  background: #f8fdf8;
}

.summary-card {
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.summary-header {
  background: linear-gradient(135deg, #105212, #1a7d1e);
  color: white;
  padding: 2rem;
  text-align: center;
}

.summary-header h1 {
  font-size: 2.2rem;
  margin: 0 0 0.5rem 0;
}

.summary-intro {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.summary-content {
  padding: 2rem;
}

.summary-section {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e8f5e8;
}

.summary-section:last-of-type {
  border-bottom: none;
}

.summary-section h2 {
  font-size: 1.4rem;
  color: #105212;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.summary-section h2::before {
  content: "";
  width: 4px;
  height: 1.4rem;
  background: #105212;
  border-radius: 2px;
}

.summary-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.summary-item strong {
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-item span {
  color: #555;
  font-size: 1rem;
  padding: 0.5rem 0;
}

.schedule-highlight {
  background: linear-gradient(135deg, #e8f5e8, #f0fdf0);
  border: 2px solid #105212;
  border-radius: 12px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.schedule-icon {
  width: 24px;
  height: 24px;
  color: #105212;
  flex-shrink: 0;
}

.schedule-item div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.schedule-item strong {
  color: #105212;
  font-weight: 600;
}

.schedule-item span {
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.document-icon {
  width: 20px;
  height: 20px;
  color: #105212;
  flex-shrink: 0;
}

.document-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.document-name {
  font-weight: 500;
  color: #333;
}

.document-size {
  font-size: 0.85rem;
  color: #666;
}

.important-notice {
  background: linear-gradient(135deg, #fff3cd, #ffeaa7);
  border: 1px solid #d4a574;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.important-notice h3 {
  color: #856404;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.important-notice h3::before {
  content: "⚠️";
  font-size: 1.2rem;
}

.important-notice ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #856404;
}

.important-notice li {
  margin-bottom: 0.5rem;
}

.no-data {
  padding: 2rem;
  text-align: center;
  color: #666;
  font-style: italic;
}

.summary-actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 2rem;
  background: #f8fdf8;
  border-top: 1px solid #e8f5e8;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  text-decoration: none;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.btn-primary {
  background: linear-gradient(135deg, #105212, #1a7d1e);
  color: white;
  border-color: #105212;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #0c3d0e, #155519);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 82, 18, 0.3);
}

.btn-primary:disabled {
  background: #8fbf8f;
  border-color: #8fbf8f;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-secondary {
  background-color: transparent;
  color: #105212;
  border-color: #105212;
}

.btn-secondary:hover {
  background-color: #105212;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 82, 18, 0.2);
}

@media (max-width: 768px) {
  .summary-card {
    margin: 1rem;
  }

  .summary-header {
    padding: 1.5rem;
  }

  .summary-header h1 {
    font-size: 1.8rem;
  }

  .summary-content {
    padding: 1.5rem;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .schedule-highlight {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .summary-actions {
    flex-direction: column;
    padding: 1.5rem;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>