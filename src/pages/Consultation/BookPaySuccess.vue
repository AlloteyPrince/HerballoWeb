<template>
  <div class="success-wrapper">
    <div class="success-card">
      <div class="success-icon">
        <svg
          class="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            class="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            class="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <h1 class="success-title">Booking Confirmed!</h1>
      <p class="success-message">
        Thank you for your payment. Your consultation is now officially booked.
      </p>
      <div class="success-details">
        <p>
          <strong>Booking Reference:</strong> {{ bookingId }}
        </p>
        <p>
          We've sent a confirmation email to
          <strong>{{ userEmail }}</strong> with all the details. Please check
          your inbox.
        </p>
      </div>
      <router-link to="/" class="btn-home">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookPaySuccess",
  data() {
    return {
      bookingId: null,
      userEmail: "your-email-here", // This will be fetched from the API
    };
  },
  async mounted() {
    // Get the booking reference from the URL query parameters
    const reference = this.$route.query.reference;

    if (reference) {
      this.bookingId = reference;
      try {
        // You can call an API endpoint on your server to get the booking details
        // This is a good practice to ensure the data is verified and comes from your server
        const response = await axios.get(
          `/api/bookings/details/${this.bookingId}`
        );
        const bookingData = response.data;
        this.userEmail = bookingData.email;
        // Optionally, you could display more details here
      } catch (error) {
        console.error("Error fetching booking details:", error);
        // Handle case where booking details can't be fetched
      }
    }
  },
};
</script>

<style scoped>
.success-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem 1rem;
  background-color: #f8fdf8;
}

.success-card {
  text-align: center;
  padding: 3rem 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

.success-icon {
  margin: 0 auto 1.5rem;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #1a7d1e;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
  background: #1a7d1e;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #1a7d1e;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

.success-title {
  font-size: 2.5rem;
  color: #105212;
  margin: 0 0 1rem;
}

.success-message {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.success-details {
  background: #f8fdf8;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e8f5e8;
  margin-bottom: 2rem;
  text-align: left;
}

.success-details strong {
  color: #105212;
}

.btn-home {
  display: inline-block;
  padding: 0.875rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  background: #105212;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s ease;
}

.btn-home:hover {
  background: #0c3d0e;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 25px #1a7d1e;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
</style>