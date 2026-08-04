<template>
  <div class="payment-wrapper">
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
          <div class="dot">4</div>
          <span>Payment</span>
        </div>
      </div>
    </div>

    <div class="payment-card">
      <header class="payment-header">
        <div class="momo-badge">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/MTN_MoMo_logo.png/320px-MTN_MoMo_logo.png" alt="MTN MoMo" class="momo-logo" />
        </div>
        <h1>Complete Your Payment</h1>
        <p class="intro">Send <strong>GHS 300.00</strong> to the MTN MoMo number below, then enter your transaction ID to confirm your booking.</p>
      </header>

      <!-- MoMo Details -->
      <div class="momo-card">
        <div class="momo-row">
          <div class="momo-label">
            <span class="momo-icon">📱</span>
            <span>MTN MoMo Number</span>
          </div>
          <div class="momo-number-row">
            <span class="momo-number">{{ revealed ? momoNumber : maskedNumber }}</span>
            <button type="button" class="reveal-btn" @click="revealed = !revealed">
              {{ revealed ? '🙈 Hide' : '👁️ Tap to reveal' }}
            </button>
            <button type="button" class="copy-btn" @click="copyNumber" :class="{ copied }">
              {{ copied ? '✓ Copied' : '📋 Copy' }}
            </button>
          </div>
        </div>
        <div class="momo-divider"></div>
        <div class="momo-row">
          <div class="momo-label">
            <span class="momo-icon">💰</span>
            <span>Amount to Send</span>
          </div>
          <span class="momo-amount">GHS 300.00</span>
        </div>
      </div>

      <!-- Step by step instructions -->
      <div class="steps-section">
        <h2>How to Pay</h2>
        <div class="steps-list">
          <div class="step-item">
            <div class="step-num">1</div>
            <div class="step-text">
              <p>Open your <strong>MTN Mobile Money</strong> app or dial <strong>*170#</strong> on your phone.</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-num">2</div>
            <div class="step-text">
              <p>Select <strong>Transfer Money</strong> → <strong>MoMo User</strong>.</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-num">3</div>
            <div class="step-text">
              <p>Enter the MoMo number above and send exactly <strong>GHS 300.00</strong>.</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-num">4</div>
            <div class="step-text">
              <p>You'll receive an <strong>SMS confirmation</strong> with a transaction ID. Enter it below.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction ID Form -->
      <div class="transaction-section">
        <h2>Enter Transaction ID</h2>
        <p class="transaction-hint">This is the reference number in the SMS you received after payment e.g. <em>1234567890</em></p>

        <div class="form-group">
          <label for="transactionId">Transaction ID *</label>
          <input
            id="transactionId"
            type="text"
            v-model="transactionId"
            placeholder="e.g. 1234567890"
            :class="{ 'input-error': touched && !transactionId }"
            @blur="touched = true"
          />
          <p v-if="touched && !transactionId" class="field-error">Please enter your transaction ID</p>
        </div>

        <div v-if="errorMsg" class="error-banner">
          ⚠️ {{ errorMsg }}
        </div>

        <div class="form-actions">
          <button type="button" @click="goBack" class="btn-outline">Back</button>
          <button
            type="button"
            class="btn-primary"
            :disabled="!transactionId || submitting"
            @click="submitPayment"
          >
            <span v-if="submitting">Confirming...</span>
            <span v-else>Confirm Payment</span>
          </button>
        </div>

        <p class="security-note">
          🔒 Your payment details are kept secure. We'll verify your transaction and confirm your booking within 24 hours.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const momoNumber = '0270751657'
const maskedNumber = '0270 **** **57'
const revealed = ref(false)
const copied = ref(false)
const transactionId = ref('')
const submitting = ref(false)
const touched = ref(false)
const errorMsg = ref('')

const copyNumber = async () => {
  try {
    await navigator.clipboard.writeText(momoNumber)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // fallback for older browsers
    const el = document.createElement('textarea')
    el.value = momoNumber
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}

const submitPayment = async () => {
  touched.value = true
  if (!transactionId.value.trim()) return

  submitting.value = true
  errorMsg.value = ''

  try {
    // Get booking ID from localStorage
    const savedData = localStorage.getItem('pending_booking_data')
    if (!savedData) {
      navigateTo('/consultation/booking')
      return
    }
    const bookingData = JSON.parse(savedData)

    // Read the authenticated user directly; the useSupabaseUser() ref can be empty
    // when this handler fires.
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser) {
      navigateTo('/login')
      return
    }

    // Update the booking in Supabase with transaction ID
    const { error } = await supabase
      .from('bookings')
      .update({
        transaction_id: transactionId.value.trim(),
        payment_status: 'unpaid', // stays unpaid until you verify manually
        status: 'pending',
      })
      .eq('id', bookingData.bookingId)
      .eq('client_id', authUser.id)

    if (error) throw error

    // Save transaction ID to localStorage for success page
    localStorage.setItem(
      'pending_booking_data',
      JSON.stringify({ ...bookingData, transactionId: transactionId.value.trim() })
    )

    // Notify the Herballo admin inbox so they can verify the transaction.
    // Wrapped so a mail failure never blocks the customer's confirmation.
    try {
      await $fetch('/api/notify-booking', {
        method: 'POST',
        body: { ...bookingData, transactionId: transactionId.value.trim() },
      })
    } catch (notifyErr) {
      console.error('Booking notification email failed:', notifyErr)
    }

    navigateTo('/consultation/success')
  } catch (err) {
    errorMsg.value = err.message || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}

const goBack = () => navigateTo('/consultation/summary')

useHead({ title: 'Complete Payment | Herballo' })
</script>

<style scoped lang="scss">
.payment-wrapper {
  background: #fdfdfb;
  padding: 3rem 1rem;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}

/* Progress */
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
.payment-card {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}

.payment-header {
  text-align: center;
  margin-bottom: 2.5rem;

  .momo-badge {
    margin-bottom: 1.25rem;
    .momo-logo {
      height: 40px;
      object-fit: contain;
    }
  }
  h1 {
    font-size: 2.2rem;
    font-weight: 900;
    color: #105212;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }
  .intro {
    color: #64748b;
    font-size: 1rem;
    strong { color: #105212; }
  }
}

/* MoMo Card */
.momo-card {
  background: #fffbeb;
  border: 1.5px solid #fde68a;
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  margin-bottom: 2.5rem;
}
.momo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.momo-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: #78350f;
  font-size: 0.9rem;
  .momo-icon { font-size: 1.1rem; }
}
.momo-number-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.momo-number {
  font-size: 1.15rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: 1px;
  font-family: monospace;
}
.reveal-btn {
  background: none;
  border: 1.5px solid #f59e0b;
  color: #92400e;
  border-radius: 50px;
  padding: 4px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #fef3c7; }
}
.copy-btn {
  background: #f59e0b;
  border: none;
  color: #fff;
  border-radius: 50px;
  padding: 4px 14px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #d97706; }
  &.copied { background: #105212; }
}
.momo-divider {
  height: 1px;
  background: #fde68a;
  margin: 1.25rem 0;
}
.momo-amount {
  font-size: 1.4rem;
  font-weight: 900;
  color: #105212;
}

/* Steps */
.steps-section {
  margin-bottom: 2.5rem;
  h2 {
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1.25rem;
  }
}
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.step-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .step-num {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #105212;
    color: #fff;
    font-weight: 800;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .step-text p {
    color: #475569;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    strong { color: #1e293b; }
  }
}

/* Transaction Form */
.transaction-section {
  border-top: 1px solid #f1f5f9;
  padding-top: 2rem;

  h2 {
    font-size: 1.2rem;
    color: #105212;
    font-weight: 800;
    margin-bottom: 0.4rem;
  }
  .transaction-hint {
    font-size: 0.84rem;
    color: #64748b;
    margin-bottom: 1.5rem;
    em { color: #94a3b8; }
  }
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
  input {
    width: 100%;
    padding: 1rem 1.2rem;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    font-size: 1rem;
    color: #1e293b;
    transition: all 0.2s;
    background: #fff;
    font-family: monospace;
    letter-spacing: 1px;
    &::placeholder { color: #94a3b8; font-family: 'Inter', sans-serif; letter-spacing: 0; }
    &:hover { border-color: #105212; }
    &:focus {
      outline: none;
      border-color: #105212;
      box-shadow: 0 0 0 4px rgba(16, 82, 18, 0.1);
    }
    &.input-error { border-color: #ef4444; }
  }
}
.field-error {
  color: #ef4444;
  font-size: 0.82rem;
  margin-top: 0.4rem;
  font-weight: 600;
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
  margin-bottom: 1.5rem;
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
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  &:hover { background: #f0f7f0; }
}

.security-note {
  text-align: center;
  font-size: 0.82rem;
  color: #94a3b8;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .payment-card { padding: 2rem 1.25rem; }
  .form-actions { flex-direction: column-reverse; }
  .progress-bar span { display: none; }
  .momo-row { flex-direction: column; align-items: flex-start; }
  .payment-header h1 { font-size: 1.8rem; }
}
</style>