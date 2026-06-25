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
          Please review your details below. A one-time fee of <strong>GHS 300</strong> is required to confirm your consultation.
        </p>
      </header>

      <div v-if="bookingData" class="summary-content">

        <!-- Personal Information -->
        <div class="summary-section">
          <h2>Personal Information</h2>
          <div class="info-grid">
            <div class="info-group">
              <label>Full Name</label>
              <p>{{ userFullName }}</p>
            </div>
            <div class="info-group">
              <label>Email Address</label>
              <p>{{ user?.email }}</p>
            </div>
            <div class="info-group">
              <label>Phone Number</label>
              <p>{{ bookingData.phone }}</p>
            </div>
            <div class="info-group">
              <label>Consultation Type</label>
              <p class="capitalize">{{ purposeLabel }}</p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="summary-section" v-if="bookingData.description">
          <h2>Brief Description</h2>
          <p class="description-text">{{ bookingData.description }}</p>
        </div>

        <!-- Schedule -->
        <div class="summary-section">
          <h2>Appointment Schedule</h2>
          <div class="schedule-card">
            <div class="schedule-detail">
              <span class="icon">📅</span>
              <div>
                <label>Preferred Date</label>
                <p>{{ formatDate(bookingData.preferred_date) }}</p>
              </div>
            </div>
            <div class="schedule-divider"></div>
            <div class="schedule-detail">
              <span class="icon">{{ timeIcon }}</span>
              <div>
                <label>Time of Day</label>
                <p class="capitalize">{{ bookingData.time_of_day }}</p>
              </div>
            </div>
            <div class="schedule-divider"></div>
            <div class="schedule-detail">
              <span class="icon">📞</span>
              <div>
                <label>Call Type</label>
                <p class="capitalize">{{ bookingData.call_type === 'video' ? 'Video Call' : 'Voice Call' }}</p>
              </div>
            </div>
          </div>
          <p class="schedule-note">⏳ We will confirm your exact time within 24 hours of receiving your booking.</p>
        </div>

        <!-- Payment Summary -->
        <div class="summary-section no-border">
          <h2>Payment Summary</h2>
          <div class="payment-breakdown">
            <div class="payment-row">
              <span>Consultation Fee</span>
              <span>GHS 300.00</span>
            </div>
            <div class="payment-row total">
              <span>Total</span>
              <span>GHS 300.00</span>
            </div>
          </div>
          <div class="momo-note">
            <span class="momo-icon">📱</span>
            <p>Payment is via <strong>MTN Mobile Money</strong>. You'll be guided through the steps on the next page.</p>
          </div>
        </div>

        <div class="summary-actions">
          <button type="button" @click="goBack" class="btn-outline">
            Edit Details
          </button>
          <button type="button" @click="proceedToPayment" class="btn-primary">
            Proceed to Payment
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
const user = useSupabaseUser()
const bookingData = ref(null)

const userFullName = computed(() => {
  const meta = user.value?.user_metadata
  if (!meta) return ''
  return `${meta.first_name || ''} ${meta.last_name || ''}`.trim() || user.value?.email
})

const purposeLabel = computed(() => {
  const map = {
    general: 'General Enquiries About Herbal Medicines',
    research: 'Research Collaborations',
    clinical: 'Clinical / Health Consultations',
  }
  return map[bookingData.value?.purpose] || bookingData.value?.purpose || ''
})

const timeIcon = computed(() => {
  const icons = { morning: '🌅', afternoon: '☀️', evening: '🌙' }
  return icons[bookingData.value?.time_of_day] || '⏰'
})

onMounted(() => {
  if (process.client) {
    const savedData = localStorage.getItem('pending_booking_data')
    if (savedData) {
      bookingData.value = JSON.parse(savedData)
    } else {
      navigateTo('/consultation/booking')
    }
  }
})

const formatDate = (d) => {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  return new Date(+y, +m - 1, +day).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const proceedToPayment = () => navigateTo('/consultation/payment')
const goBack = () => navigateTo('/consultation/booking')

useHead({ title: 'Review Your Booking | Herballo' })
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
    margin-bottom: 0.5rem;
  }
  .intro {
    color: #64748b;
    font-size: 1rem;
    strong { color: #105212; }
  }
}

.summary-section {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 2rem;
  margin-bottom: 2.5rem;
  &.no-border { border: none; }
  h2 {
    font-size: 0.8rem;
    color: #94a3b8;
    margin-bottom: 1.25rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
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
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  p {
    font-size: 1rem;
    color: #1e293b;
    font-weight: 600;
    margin-top: 4px;
  }
}

.description-text {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  background: #f8fafc;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  border: 1px solid #f1f5f9;
}

.schedule-card {
  background: #f0f7f0;
  border-radius: 14px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  border: 1px solid #c6e6c7;
  flex-wrap: wrap;
}
.schedule-detail {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 120px;
  .icon { font-size: 1.5rem; }
  label {
    font-size: 0.72rem;
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
    margin-bottom: 2px;
  }
  p {
    font-weight: 800;
    color: #105212;
    margin: 0;
    font-size: 0.95rem;
  }
}
.schedule-divider {
  width: 1px;
  height: 40px;
  background: #c6e6c7;
}
.schedule-note {
  font-size: 0.82rem;
  color: #64748b;
  margin-top: 1rem;
  padding-left: 0.25rem;
}

/* Payment Breakdown */
.payment-breakdown {
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.25rem;
}
.payment-row {
  display: flex;
  justify-content: space-between;
  padding: 0.9rem 1.25rem;
  font-size: 0.95rem;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
  &:last-child { border: none; }
  &.total {
    background: #f0f7f0;
    font-weight: 800;
    font-size: 1.05rem;
    color: #105212;
  }
}

.momo-note {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  .momo-icon { font-size: 1.4rem; flex-shrink: 0; }
  p {
    font-size: 0.88rem;
    color: #92400e;
    margin: 0;
    line-height: 1.5;
    strong { color: #78350f; }
  }
}

.summary-actions {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
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
  &:hover {
    background: #0d420f;
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
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  &:hover { background: #f0f7f0; }
}

.capitalize { text-transform: capitalize; }

.no-data {
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
}

@media (max-width: 600px) {
  .summary-card { padding: 2rem 1.25rem; }
  .summary-actions { flex-direction: column-reverse; }
  .schedule-card { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .schedule-divider { display: none; }
  .progress-bar span { display: none; }
}
</style>