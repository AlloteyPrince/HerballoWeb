<template>
  <div class="success-wrapper">
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
          <div class="dot">✓</div>
          <span>Review</span>
        </div>
        <div class="line active"></div>
        <div class="step active">
          <div class="dot">✓</div>
          <span>Payment</span>
        </div>
      </div>
    </div>

    <div class="success-card">
      <div class="success-icon">
        <div class="check-ring">🌿</div>
      </div>

      <header class="success-header">
        <h1>Booking Request Received!</h1>
        <p>
          Thank you for choosing Herballo. We've received your booking request
          and payment details. Our team will verify your payment and confirm
          your consultation within <strong>24 hours</strong>.
        </p>
      </header>

      <!-- Booking Details -->
      <div class="success-details">
        <div class="detail-row" v-if="bookingData?.bookingId">
          <span>Booking Reference</span>
          <strong class="ref-id">{{ shortId }}</strong>
        </div>
        <div class="detail-row" v-if="bookingData?.preferred_date">
          <span>Preferred Date</span>
          <strong>{{ formatDate(bookingData.preferred_date) }}</strong>
        </div>
        <div class="detail-row" v-if="bookingData?.time_of_day">
          <span>Time of Day</span>
          <strong class="capitalize">{{ bookingData.time_of_day }}</strong>
        </div>
        <div class="detail-row">
          <span>Amount</span>
          <strong>GHS 300.00</strong>
        </div>
        <div class="detail-row">
          <span>Payment Status</span>
          <span class="status-badge pending">⏳ Pending Verification</span>
        </div>
        <div class="detail-row">
          <span>Consultation Valid For</span>
          <span class="validity-badge">📅 1 Month</span>
        </div>
      </div>

      <!-- What happens next -->
      <div class="next-steps">
        <h3>What happens next?</h3>
        <ul>
          <li>
            <span class="bullet">1</span>
            <p>
              <strong>Payment Verification:</strong> We'll confirm your MTN MoMo
              transaction within <strong>24 hours</strong> of your request.
            </p>
          </li>
          <li>
            <span class="bullet">2</span>
            <p>
              <strong>Scheduling:</strong> Once verified, we'll reach out to
              confirm your exact consultation time based on your preferred date
              and time of day.
            </p>
          </li>
          <li>
            <span class="bullet">3</span>
            <p>
              <strong>Preparation:</strong> Our herbalist will review your
              details and any documents you uploaded before the session.
            </p>
          </li>
          <li>
            <span class="bullet">4</span>
            <p>
              <strong>Your Consultation:</strong> Connect with our expert via
              your preferred call type. Your session is valid for
              <strong>1 month</strong> from the date of booking.
            </p>
          </li>
        </ul>
      </div>

      <!-- Herballo note -->
      <div class="herballo-note">
        <p>
          🌱 At <strong>Herballo</strong>, we blend traditional African botanical
          knowledge with modern science to deliver personalised herbal wellness
          guidance — just for you.
        </p>
      </div>

      <div class="actions">
        <button @click="navigateTo('/')" class="btn-primary">
          Return to Homepage
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const bookingData = ref(null)

onMounted(() => {
  if (process.client) {
    const savedData = localStorage.getItem('pending_booking_data')
    if (savedData) {
      bookingData.value = JSON.parse(savedData)
      // Clear localStorage now that booking is complete
      localStorage.removeItem('pending_booking_data')
      localStorage.removeItem('herballo_consent_agreed')
    }
  }
})

const shortId = computed(() => {
  if (!bookingData.value?.bookingId) return ''
  return 'HB-' + bookingData.value.bookingId.slice(0, 8).toUpperCase()
})

const formatDate = (d) => {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  return new Date(+y, +m - 1, +day).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

useHead({ title: 'Booking Confirmed | Herballo' })
</script>

<style scoped lang="scss">
.success-wrapper {
  background: #fdfdfb;
  min-height: 100vh;
  padding: 3rem 1rem;
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
    background: #105212;
    border: 2px solid #105212;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
  }
  span {
    font-size: 0.75rem;
    font-weight: 700;
    color: #105212;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}
.line {
  flex: 1;
  height: 2px;
  background: #105212;
  margin: 0 12px;
  margin-top: -26px;
}

.success-card {
  max-width: 580px;
  margin: 0 auto;
  background: white;
  padding: 3.5rem 3rem;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.success-icon {
  margin-bottom: 1.5rem;
  .check-ring {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #f0f7f0;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border: 2px solid #c6e6c7;
  }
}

.success-header {
  margin-bottom: 2rem;
  h1 {
    font-size: 2rem;
    font-weight: 900;
    color: #105212;
    margin-bottom: 0.75rem;
    letter-spacing: -0.5px;
  }
  p {
    color: #64748b;
    font-size: 1rem;
    line-height: 1.6;
    strong { color: #105212; }
  }
}

.success-details {
  background: #f8fafc;
  border-radius: 16px;
  padding: 0.5rem 1.5rem;
  margin-bottom: 2.5rem;
  text-align: left;

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 0;
    border-bottom: 1px solid #f1f5f9;
    gap: 1rem;
    &:last-child { border: none; }

    span:first-child {
      color: #64748b;
      font-weight: 600;
      font-size: 0.9rem;
      flex-shrink: 0;
    }
    strong {
      color: #1e293b;
      font-weight: 800;
      font-size: 0.95rem;
      text-align: right;
    }
    .ref-id {
      font-family: monospace;
      color: #105212;
      font-size: 0.9rem;
    }
  }
}

.status-badge {
  padding: 3px 12px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  &.pending {
    background: #fef9c3;
    color: #854d0e;
    border: 1px solid #fde68a;
  }
}

.validity-badge {
  background: #f0f7f0;
  color: #105212;
  padding: 3px 12px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid #c6e6c7;
}

.capitalize { text-transform: capitalize; }

.next-steps {
  text-align: left;
  margin-bottom: 2rem;
  h3 {
    font-size: 1rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  li {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    .bullet {
      flex-shrink: 0;
      width: 26px;
      height: 26px;
      background: #105212;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 800;
      margin-top: 1px;
    }
    p {
      font-size: 0.9rem;
      color: #475569;
      margin: 0;
      line-height: 1.6;
      strong { color: #1e293b; }
    }
  }
}

.herballo-note {
  background: #f0f7f0;
  border: 1px solid #c6e6c7;
  border-radius: 14px;
  padding: 1.25rem;
  margin-bottom: 2rem;
  p {
    font-size: 0.88rem;
    color: #475569;
    line-height: 1.6;
    margin: 0;
    strong { color: #105212; }
  }
}

.btn-primary {
  width: 100%;
  background: #105212;
  color: white;
  border: none;
  padding: 1.25rem;
  border-radius: 50px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(16, 82, 18, 0.15);
  }
}

@media (max-width: 600px) {
  .success-card { padding: 2.5rem 1.5rem; }
  .progress-bar span { display: none; }
}
</style>