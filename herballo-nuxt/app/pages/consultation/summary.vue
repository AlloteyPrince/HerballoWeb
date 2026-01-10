<template>
  <div class="summary-wrapper">
    <div class="progress-container">
      <div class="progress-bar">
        <div class="step active">
          <div class="dot">✓</div>
          <span>Consent</span>
        </div>
        <div class="line active"></div>
        <div class="step active">
          <div class="dot">✓</div>
          <span>Details</span>
        </div>
        <div class="line active"></div>
        <div class="step active">
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

    <div class="summary-card">
      <header class="summary-header">
        <h1>Review Your Booking</h1>
        <p class="intro">
          Please check your details. Payment is processed securely via Paystack.
        </p>
      </header>

      <div v-if="bookingData" class="summary-content">
        <div class="summary-section">
          <h2>Personal Information</h2>
          <div class="info-grid">
            <div class="info-group">
              <label>Full Name</label>
              <p>{{ bookingData.fullName }}</p>
            </div>
            <div class="info-group">
              <label>Email Address</label>
              <p>{{ bookingData.email }}</p>
            </div>
            <div class="info-group">
              <label>Phone Number</label>
              <p>{{ bookingData.phone }}</p>
            </div>
            <div class="info-group">
              <label>Service</label>
              <p class="capitalize">{{ bookingData.purpose }}</p>
            </div>
          </div>
        </div>

        <div class="summary-section">
          <h2>Appointment Schedule</h2>
          <div class="schedule-card">
            <div class="schedule-detail">
              <span class="icon">📅</span>
              <div>
                <label>Date</label>
                <p>{{ formatDate(bookingData.date) }}</p>
              </div>
            </div>
            <div class="schedule-divider"></div>
            <div class="schedule-detail">
              <span class="icon">⏰</span>
              <div>
                <label>Time (GMT)</label>
                <p>{{ formatTime(bookingData.time) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="summary-section no-border"
          v-if="bookingData.fileNames && bookingData.fileNames.length > 0"
        >
          <h2>Attached Documents</h2>
          <div class="docs-list">
            <span
              v-for="(file, index) in bookingData.fileNames"
              :key="index"
              class="doc-tag"
            >
              📄 {{ file }}
            </span>
          </div>
        </div>

        <div class="summary-actions">
          <button
            type="button"
            @click="goBack"
            class="btn-outline"
            :disabled="loading"
          >
            Edit Details
          </button>
          <button
            type="button"
            @click="initiatePaystack"
            class="btn-primary"
            :disabled="loading"
          >
            <span v-if="loading">Processing...</span>
            <span v-else>Pay GHS 250.00 Now</span>
          </button>
        </div>
      </div>

      <div v-else class="no-data">
        <p>Loading booking session...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const bookingData = ref(null);
const loading = ref(false);

onMounted(() => {
  if (process.client) {
    const savedData = localStorage.getItem("pending_booking_data");
    if (savedData) {
      bookingData.value = JSON.parse(savedData);
    } else {
      navigateTo("/consultation/booking");
    }
  }
});

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const formatTime = (t) => {
  if (!t) return "";
  const [start] = t.split("-");
  const [hours, minutes] = start.split(":");
  const h = hours % 12 || 12;
  const ampm = hours < 12 ? "AM" : "PM";
  return `${h}:${minutes} ${ampm}`;
};

const initiatePaystack = () => {
  if (!window.PaystackPop) {
    alert("Payment gateway is still loading. Please wait a second.");
    return;
  }
  loading.value = true;

  const handler = PaystackPop.setup({
    key: config.public.paystackPublicKey,
    email: bookingData.value.email,
    amount: 250 * 100, // GHS 250
    currency: "GHS",
    ref: "HB_" + Math.floor(Math.random() * 1000000000 + 1),
    callback: (response) => {
      handlePostPayment(response.reference);
    },
    onClose: () => {
      loading.value = false;
    },
  });
  handler.openIframe();
};

const handlePostPayment = async (payRef) => {
  try {
    const formData = new FormData();
    formData.append(
      "_subject",
      "New Booking Confirmed - " + bookingData.value.fullName
    );
    formData.append("_template", "table");
    formData.append("_captcha", "false");
    // This triggers the email to the user as a "Reply-To" and receipt
    formData.append("_replyto", bookingData.value.email);

    // Email Content
    formData.append(
      "Confirmation",
      "We have successfully received your payment. Our team will contact you shortly with the consultation link."
    );
    formData.append("Name", bookingData.value.fullName);
    formData.append("Email", bookingData.value.email);
    formData.append("Date", formatDate(bookingData.value.date));
    formData.append("Time", formatTime(bookingData.value.time));
    formData.append("Payment Reference", payRef);
    formData.append("Status", "PAID (GHS 250.00)");

    // Background submission to FormSubmit
    await fetch("https://formsubmit.co/ajax/info@herballo.co", {
      method: "POST",
      body: formData,
    });

    localStorage.removeItem("pending_booking_data");
    navigateTo("/consultation/success");
  } catch (err) {
    console.error("Submission error:", err);
    // Navigate anyway because the user has already paid
    navigateTo("/consultation/success");
  }
};

const goBack = () => navigateTo("/consultation/booking");

useHead({ title: "Review Your Booking | Herballo" });
</script>

<style scoped lang="scss">
.summary-wrapper {
  background: #fdfdfb;
  padding: 3rem 1rem;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}

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

.summary-card {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}
.summary-header {
  text-align: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 2.2rem;
    color: #105212;
    font-weight: 900;
  }
  .intro {
    color: #64748b;
  }
}

.summary-section {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 2rem;
  margin-bottom: 2.5rem;
  &.no-border {
    border: none;
  }
  h2 {
    font-size: 1.1rem;
    color: #105212;
    margin-bottom: 1.5rem;
    font-weight: 800;
    text-transform: uppercase;
  }
}
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}
.info-group {
  label {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 700;
  }
  p {
    font-size: 1rem;
    color: #1e293b;
    font-weight: 600;
    margin-top: 4px;
  }
}

.schedule-card {
  background: #f0f7f0;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  border: 1px solid #d1e2d1;
}
.schedule-detail {
  display: flex;
  align-items: center;
  gap: 1rem;
  .icon {
    font-size: 1.5rem;
  }
  p {
    font-weight: 800;
    color: #105212;
    margin: 0;
  }
}
.schedule-divider {
  width: 1px;
  height: 35px;
  background: #d1e2d1;
}

.docs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}
.doc-tag {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  color: #475569;
}

.summary-actions {
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
  transition: 0.3s;
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(16, 82, 18, 0.15);
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
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f0f7f0;
  }
}

.capitalize {
  text-transform: capitalize;
}
@media (max-width: 600px) {
  .summary-actions {
    flex-direction: column-reverse;
  }
  .schedule-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .schedule-divider {
    display: none;
  }
  .progress-bar span {
    display: none;
  }
}
</style>
