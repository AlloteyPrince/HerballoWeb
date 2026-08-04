<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button @click="closeModal" class="close-btn">&times;</button>
      <div class="modal-layout">
        <div class="modal-image-side">
          <img src="/images/popup-img.png" alt="Subscription Promotion" />
        </div>

        <div class="modal-form-side">
          <div class="modal-body">
            <div v-if="!isSubscribed">
              <h3>Stay Updated!</h3>
              <p>
                Subscribe to our newsletter and get notified about our latest
                content.
              </p>

              <form @submit.prevent="subscribe">
                <input
                  type="email"
                  v-model="email"
                  placeholder="Your email address"
                  required
                />
                <button
                  type="submit"
                  :disabled="isSubscribing"
                  class="full-width-btn"
                >
                  {{ isSubscribing ? "Subscribing..." : "Subscribe" }}
                </button>
              </form>

              <p v-if="message" :class="messageClass">{{ message }}</p>
            </div>

            <div v-else class="welcome-message">
              <h3>Welcome to the Herballo family!</h3>
              <p>
                Thank you for subscribing. We'll keep you updated with our
                latest news and exclusive offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "@/api"; // Adjust the path as necessary

const showModal = ref(false);
const email = ref("");
const message = ref(null);
const messageClass = ref("");
const isSubscribing = ref(false);
const isSubscribed = ref(false); // New state variable to control the view

const checkAndShowModal = () => {
  const hasSeenPopup = localStorage.getItem("herballoPopupShown");

  if (!hasSeenPopup) {
    setTimeout(() => {
      showModal.value = true;
      localStorage.setItem("herballoPopupShown", "true");
    }, 45000); // 45 seconds
  }
};

const closeModal = () => {
  showModal.value = false;
};

const subscribe = async () => {
  message.value = null;
  messageClass.value = "";
  isSubscribing.value = true;
  isSubscribed.value = false; // Reset in case of a retry

  try {
    const res = await fetch(api("/api/subscribe"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
    });

    const data = await res.json();

    if (res.ok) {
      isSubscribed.value = true;
      email.value = ""; // Clear the input field
    } else if (res.status === 409) {
      message.value =
        "We already have your details, but please stay around for more great content!";
      messageClass.value = "info";
    } else {
      message.value =
        data.message || "An error occurred. Please try again later.";
      messageClass.value = "error";
    }
  } catch (err) {
    message.value = "An error occurred. Please check your connection.";
    messageClass.value = "error";
  } finally {
    isSubscribing.value = false;
  }
};

onMounted(() => {
  checkAndShowModal();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 800px; /* Increased max-width for the two-column layout */
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden; /* Ensures image corners are hidden */
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #333;
  z-index: 10; /* Ensures it's above the image */
}

/* New Flexbox layout for the modal content */
.modal-layout {
  display: flex;
  flex-direction: column; /* Stacks vertically on smaller screens */
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row; /* Two columns on desktop */
  }
}

.modal-image-side {
  flex: 1; /* Takes up one part of the space */
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the area without distortion */
    display: block;
  }

  /* Give the image some height on mobile */
  @media (max-width: 767px) {
    height: 180px;
  }
}

.modal-form-side {
  flex: 1; /* Takes up the other part of the space */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-body h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.modal-body p {
  color: #666;
  margin-bottom: 1rem;
}

.modal-body form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-body input {
  padding: 10px;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-body button {
  padding: 10px 20px;
  border: none;
  background-color: #105212;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

/* New style for the full-width button */
.full-width-btn {
  width: 100%;
}

.success {
  color: #105212;
}
.info {
  color: #5cb85c;
}
.error {
  color: #dc3545;
}

.welcome-message h3 {
  color: #105212;
  font-size: 1.8rem;
}
</style>
