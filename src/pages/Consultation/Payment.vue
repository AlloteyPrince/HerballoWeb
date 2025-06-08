<template>
  <div class="payment-page">
    <div class="card">
      <h1>Complete Your Payment</h1>
      <p>Please provide your details to proceed with the payment.</p>

      <form @submit.prevent="payWithPaystack">
        <div class="form-group">
          <label for="email">Email Address:</label>
          <input
            type="email"
            id="email"
            v-model="paymentDetails.email"
            required
            readonly
            placeholder="e.g., your.email@example.com"
          />
        </div>

        <div class="form-group">
          <label for="amount">Amount (GHS):</label>
          <input
            type="number"
            id="amount"
            :value="paymentDetails.amount"
            readonly
          />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Processing..." : "Pay Now" }}
        </button>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PaystackPop from "@paystack/inline-js";

export default {
  name: "PaymentPage",
  data() {
    return {
      paymentDetails: {
        amount: 250, // Static amount
        email: "",
      },
      loading: false,
      errorMessage: "",
      paystackPublicKey: process.env.VUE_APP_PAYSTACK_PUBLIC_API_KEY, // <-- IMPORTANT: REPLACE THIS!
    };
  },
  mounted() {
    // Get email from bookingData
    const bookingData = JSON.parse(sessionStorage.getItem("bookingData"));
    if (bookingData && bookingData.email) {
      this.paymentDetails.email = bookingData.email;
    }
  },
  methods: {
    generateReference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return `PS_${text}_${Date.now()}`;
    },
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    async payWithPaystack() {
      this.loading = true;
      this.errorMessage = "";

      // Basic client-side validation
      if (!this.paymentDetails.amount || this.paymentDetails.amount <= 0) {
        this.errorMessage = "Payment amount cannot be zero or negative.";
        this.loading = false;
        return;
      }
      if (
        !this.paymentDetails.email ||
        !this.isValidEmail(this.paymentDetails.email)
      ) {
        this.errorMessage = "Please provide a valid email address.";
        this.loading = false;
        return;
      }

      const transactionReference = this.generateReference(); // Generate a local reference

      try {
        if (typeof PaystackPop === "undefined") {
          this.errorMessage =
            "Paystack SDK not loaded. Please check your public/index.html.";
          this.loading = false;
          return;
        }

        const handler = PaystackPop.setup({
          key: this.paystackPublicKey, // Your Paystack Public Key
          email: this.paymentDetails.email,
          amount: this.paymentDetails.amount * 100, // Paystack expects amount in kobo/pesewas
          ref: transactionReference, // Use the generated reference
          // Removed first_name and last_name from here

          onClose: () => {
            this.loading = false;
            console.log("Paystack payment window closed.");
          },
          callback: async (response) => {
            this.loading = false;
            console.log("Paystack callback response:", response);

            
            alert(`Payment Successful! Transaction Reference: ${response.reference}`);

            // Send booking data to FormSubmit
            const bookingData = JSON.parse(
              sessionStorage.getItem("bookingData")
            );
            if (bookingData) {
              const formData = new FormData();
              // Append all bookingData properties (except uploadedFiles)
              for (const key in bookingData) {
                if (key !== "uploadedFiles" && bookingData.hasOwnProperty(key)) {
                  formData.append(key, bookingData[key]);
                }
              }
              // Append Paystack reference for tracking
              formData.append('paystack_reference', response.reference);
              formData.append('payment_status', 'success');
              formData.append('payment_amount_ghs', this.paymentDetails.amount);


              // Note: You can only send metadata about files, not the files themselves
              // with FormSubmit from the frontend.
              if (bookingData.uploadedFiles && bookingData.uploadedFiles.length > 0) {
                 bookingData.uploadedFiles.forEach((file, idx) => {
                   formData.append(`file_${idx + 1}_name`, file.name);
                   formData.append(`file_${idx + 1}_type`, file.type);
                   // If you need the actual file, you need a backend for upload.
                 });
              } else {
                 formData.append('uploaded_files', 'None');
              }

              try {
                const formSubmitResponse = await fetch("https://formsubmit.co/info@herballo.co", {
                  method: "POST",
                  body: formData,
                });

                if (formSubmitResponse.ok) {
                  alert("Booking data successfully sent to FormSubmit.");
                } else {
                alert("Failed to send booking data to FormSubmit:", formSubmitResponse.statusText);
                  this.errorMessage = "Payment successful, but failed to send booking details.";
                }
              } catch (formSubmitError) {
                console.error("Network error sending booking data to FormSubmit:", formSubmitError);
                this.errorMessage = "Payment successful, but a network error occurred sending booking details.";
              }
            } else {
              console.warn("No booking data found in session storage.");
            }

            this.resetForm();
            this.$router.push("/consultation/bookpaysuccess");
          },
          onError: (error) => {
            this.loading = false;
            this.errorMessage =
              error.message || "An unexpected error occurred during payment.";
            console.error("Paystack Pop Error:", error);
            alert(`Payment failed: ${this.errorMessage}`);
          },
        });

        handler.openIframe(); // Open the Paystack payment popup
      } catch (error) {
        this.loading = false;
        this.errorMessage = "Could not initiate payment. Please try again.";
        console.error("Error during Paystack setup:", error);
      }
    },
    resetForm() {
      this.paymentDetails = {
        amount: 250,
        email: "",
      };
      this.errorMessage = "";
    },
  },
};
</script>

<style scoped>
/* Main container for the entire payment page, centered */
.payment-page {
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center; /* Vertically center */
  min-height: 100vh; /* Take full viewport height */
  background-color: #f4f7f6;
  padding: 20px;
  box-sizing: border-box; /* Include padding in height calculation */
}

/* Styles for the payment card */
.card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 450px;
  width: 100%;
  text-align: center; /* Center text within the card */
}

h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2em;
}

p {
  color: #666;
  margin-bottom: 25px;
  line-height: 1.5;
}

/* Form group styling */
.form-group {
  margin-bottom: 20px;
  text-align: left; /* Align labels and inputs to the left within the group */
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #444;
  font-size: 0.95em;
}

input[type="number"],
input[type="email"],
input[type="text"] {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box; /* Include padding and border in the element's total width */
  font-size: 1em;
  color: #333;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input[type="number"]:focus,
input[type="email"]:focus,
input[type="text"]:focus {
  border-color: #28a745; /* Green focus border */
  box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25); /* Green focus shadow */
  outline: none;
}

/* Green Button */
button {
  width: 100%;
  padding: 15px;
  background-color: #28a745; /* A pleasant green */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px; /* Space above button */
}

button:hover:not(:disabled) {
  background-color: #218838; /* Darker green on hover */
  transform: translateY(-2px); /* Slight lift on hover */
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.8;
}

/* Error message styling */
.error-message {
  color: #dc3545; /* Red for error */
  background-color: #f8d7da; /* Light red background */
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  padding: 12px;
  margin-top: 20px;
  text-align: center;
  font-size: 0.9em;
}
</style>