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
        <div class="check-ring">✓</div>
      </div>

      <header class="success-header">
        <h1>Payment Successful!</h1>
        <p>
          Your consultation has been booked and your payment was processed
          securely.
        </p>
      </header>

      <div class="success-details">
        <div class="detail-row">
          <span>Amount Paid</span>
          <strong>GHS 250.00</strong>
        </div>
        <div class="detail-row">
          <span>Status</span>
          <span class="status-badge">Confirmed</span>
        </div>
      </div>

      <div class="next-steps">
        <h3>What happens next?</h3>
        <ul>
          <li>
            <span class="bullet">1</span>
            <p>
              <strong>Check your email:</strong> A confirmation receipt has been
              sent to your inbox.
            </p>
          </li>
          <li>
            <span class="bullet">2</span>
            <p>
              <strong>Meeting Invite:</strong> Our team will review your session
              and send a calendar invite with the meeting link.
            </p>
          </li>
          <li>
            <span class="bullet">3</span>
            <p>
              <strong>Preparation:</strong> If you uploaded documents, our
              consultant will review them prior to the call.
            </p>
          </li>
        </ul>
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
useHead({ title: "Booking Confirmed | Herballo" });

// Optional: You could add a confetti effect here if you like!
</script>

<style scoped lang="scss">
.success-wrapper {
  background: #fdfdfb;
  min-height: 100vh;
  padding: 3rem 1rem;
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

/* Success Card */
.success-card {
  max-width: 550px;
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
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #f0f7f0;
    color: #105212;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-weight: bold;
    border: 2px solid #105212;
  }
}

.success-header {
  margin-bottom: 2rem;
  h1 {
    font-size: 2.2rem;
    font-weight: 900;
    color: #105212;
    margin-bottom: 0.75rem;
  }
  p {
    color: #64748b;
    font-size: 1.1rem;
    line-height: 1.5;
  }
}

.success-details {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    &:first-child {
      border-bottom: 1px solid #e2e8f0;
    }
    span {
      color: #64748b;
      font-weight: 600;
    }
    strong {
      color: #1e293b;
      font-weight: 800;
    }
    .status-badge {
      background: #105212;
      color: white;
      padding: 2px 12px;
      border-radius: 50px;
      font-size: 0.8rem;
    }
  }
}

.next-steps {
  text-align: left;
  margin-bottom: 2.5rem;
  h3 {
    font-size: 1.1rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 1.5rem;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.2rem;
      .bullet {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        background: #105212;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 800;
      }
      p {
        font-size: 0.95rem;
        color: #475569;
        margin: 0;
        line-height: 1.4;
        strong {
          color: #1e293b;
        }
      }
    }
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
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(16, 82, 18, 0.15);
  }
}

@media (max-width: 600px) {
  .success-card {
    padding: 2.5rem 1.5rem;
  }
  .progress-bar span {
    display: none;
  }
}
</style>
