<template>
  <div>
    <header>
      <nav ref="navbar">
        <div class="branding">
          <img src="../images/ha-logo-main.jpg" alt="" />
        </div>
        <ul v-show="!mobile" class="navigation">
          <li><router-link class="link" to="/">Home</router-link></li>
          <li>
            <router-link class="link" to="/consultation">Consultation</router-link>
          </li>
          <li><router-link class="link" to="/ulearn">ULearn</router-link></li>
          
          <li><router-link class="link" to="/blog">Blog</router-link></li>
          <li><router-link class="link" to="/shop">Shop</router-link></li>
          <li><router-link class="link" to="/about">About</router-link></li>
          <li>
            <a class="link link-subscribe" @click.prevent="openModal" href="#">Subscribe</a>
          </li>
        </ul>
        <div class="icon">
          <font-awesome-icon
            icon="fas fa-bars"
            @click="toggleMobileNav"
            v-show="mobile"
            class="hamburger-icon"
            ref="hamburgerIcon"
            :class="{ 'icon-active': mobileNav }"
          />
        </div>
        <transition name="mobile-nav">
          <ul
            v-show="mobileNav"
            class="mobile-nav dropdown-nav"
            ref="mobileNavMenu"
          >
            <li>
              <router-link class="link" to="/" @click="closeMobileNav">Home</router-link>
            </li>
            
            <li>
              <router-link class="link" to="/consultation" @click="closeMobileNav">Consultation</router-link>
            </li>
            <li>
              <router-link class="link" to="/ulearn" @click="closeMobileNav">ULearn</router-link>
            </li>
            <li>
              <router-link class="link" to="/blog" @click="closeMobileNav">Blog</router-link>
            </li>
            <li>
              <router-link class="link" to="/shop" @click="closeMobileNav">Shop</router-link>
            </li>
            <li>
              <router-link class="link" to="/about" @click="closeMobileNav">About</router-link>
            </li>
            <li>
              <a class="link link-subscribe" href="#" @click.prevent="openModal(), closeMobileNav()">Subscribe</a>
            </li>
          </ul>
        </transition>
      </nav>
    </header>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button @click="closeModal" class="close-btn">&times;</button>
        <div class="modal-layout">
          <div class="modal-image-side">
            <img src="../images/popup-img.png" alt="Subscription Promotion" />
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
                  <button type="submit" :disabled="isSubscribing" class="full-width-btn">
                    {{ isSubscribing ? "Subscribing..." : "Subscribe" }}
                  </button>
                </form>

                <p v-if="message" :class="messageClass">{{ message }}</p>
              </div>

              <div v-else class="welcome-message">
                <h3>Welcome to the Herballo family!</h3>
                <p>
                  Thank you for subscribing. We'll keep you updated with our latest
                  news and exclusive offers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../api";

export default {
  name: "navigation",
  data() {
    return {
      mobile: false,
      mobileNav: false,
      windowWidth: null,
      
      // New data for the modal
      showModal: false,
      email: "",
      message: null,
      messageClass: "",
      isSubscribing: false,
      isSubscribed: false,
    };
  },
  watch: {
    mobileNav(newValue) {
      if (newValue) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    // No scroll event listener needed now
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreen);
    document.removeEventListener("click", this.handleClickOutside); // Ensure cleanup
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    closeMobileNav() {
      // New method to close nav
      this.mobileNav = false;
    },
    handleClickOutside(event) {
      // Check if the click occurred outside the mobile navigation menu AND outside the hamburger icon
      const mobileNavMenu = this.$refs.mobileNavMenu;
      // Access the actual DOM element for Font Awesome component
      const hamburgerIcon = this.$refs.hamburgerIcon
        ? this.$refs.hamburgerIcon.$el
        : null;

      if (
        mobileNavMenu &&
        !mobileNavMenu.contains(event.target) &&
        hamburgerIcon && // Ensure hamburgerIcon exists
        !hamburgerIcon.contains(event.target)
      ) {
        this.closeMobileNav();
      }
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
      } else {
        this.mobile = false;
        this.mobileNav = false; // Reset mobile nav state when switching to desktop
      }
    },

    // New methods for the modal
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async subscribe() {
      this.message = null;
      this.messageClass = "";
      this.isSubscribing = true;
      this.isSubscribed = false;

      try {
        const res = await fetch(api("/api/subscribe"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email }),
        });

        const data = await res.json();

        if (res.ok) {
          this.isSubscribed = true;
          this.email = "";
        } else if (res.status === 409) {
          this.message =
            "We already have your details, but please stay around for more great content!";
          this.messageClass = "info";
        } else {
          this.message =
            data.message || "An error occurred. Please try again later.";
          this.messageClass = "error";
        }
      } catch (err) {
        this.message = "An error occurred. Please check your connection.";
        this.messageClass = "error";
      } finally {
        this.isSubscribing = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: white;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.06);
  color: rgb(17, 17, 17);

  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    width: 90%;
    transition: 0.5s ease all;
    margin: 0 auto;

    @media (min-width: 1140px) {
      max-width: 1140px;
    }

    ul {
      list-style: none;
    }

    .link {
      font-weight: 500;
      color: rgb(17, 17, 17);
      text-decoration: none;
    }

    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }

    .link {
      font-size: 14px;
      transition: 0.5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: rgb(7, 133, 55);
        border-color: rgb(17, 17, 17);
      }
    }

    .link-subscribe {
      border: 1px solid #2e8b57;
      border-radius: 4px;
      padding: 8px 16px;
      font-weight: 600;
      background-color: #2e8b57;
      color: white;
      transition: all 0.3s ease;
      border-bottom: none;
      cursor: pointer;

      &:hover {
        background-color: #1e6b3c;
        color: white;
        border-color: #1e6b3c;
        transform: scale(1.05);
      }
    }

    .branding {
      display: flex;
      align-items: center;

      img {
        width: 50px;
        border-radius: 50%;
        transition: all 0.5s ease;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;

      .hamburger-icon {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
        color: black;
      }
    }

    .icon-active {
      transform: rotate(180deg);
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      top: 0;
      left: 0;
      background-color: white;

      padding-top: 60px;
      padding-left: 30px;

      li {
        margin-left: 0;
        .link {
          color: rgb(17, 17, 17);
        }
      }
    }
    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: all 1s ease;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
      transform: translateX(0);
    }
  }
}

/* Subscription Pop-up Styles */
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
  max-width: 800px; 
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden; 
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
  z-index: 10; 
}

.modal-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.modal-image-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 767px) {
    height: 180px;
  }
}

.modal-form-side {
  flex: 1;
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