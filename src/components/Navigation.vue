<template>
  <div>
    <header>
      <nav ref="navbar">
        <div class="branding">
          <img src="../images/ha-logo-main.jpg" alt="Logo" />
        </div>
        <ul v-show="!mobile" class="navigation-links">
          <li><router-link class="link" to="/">Home</router-link></li>
          <li>
            <router-link class="link" to="/consultation"
              >Consultation</router-link
            >
          </li>
          <li><router-link class="link" to="/ulearn">ULearn</router-link></li>
          <li><router-link class="link" to="/blog">Blog</router-link></li>
          <li><router-link class="link" to="/shop">Shop</router-link></li>
          <li><router-link class="link" to="/about">About</router-link></li>
          <li>
            <a class="link link-subscribe" @click.prevent="openModal" href="#"
              >Subscribe</a
            >
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
              <router-link class="link" to="/" @click="closeMobileNav"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                class="link"
                to="/consultation"
                @click="closeMobileNav"
                >Consultation</router-link
              >
            </li>
            <li>
              <router-link class="link" to="/ulearn" @click="closeMobileNav"
                >ULearn</router-link
              >
            </li>
            <li>
              <router-link class="link" to="/blog" @click="closeMobileNav"
                >Blog</router-link
              >
            </li>
            <li>
              <router-link class="link" to="/shop" @click="closeMobileNav"
                >Shop</router-link
              >
            </li>
            <li>
              <router-link class="link" to="/about" @click="closeMobileNav"
                >About</router-link
              >
            </li>
            <li>
              <a
                class="link link-subscribe"
                href="#"
                @click.prevent="(openModal(), closeMobileNav())"
                >Subscribe</a
              >
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
                <p>Thank you for subscribing. We'll keep you updated.</p>
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
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreen);
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    closeMobileNav() {
      this.mobileNav = false;
    },
    handleClickOutside(event) {
      const mobileNavMenu = this.$refs.mobileNavMenu;
      const hamburgerIcon = this.$refs.hamburgerIcon
        ? this.$refs.hamburgerIcon.$el
        : null;
      if (
        mobileNavMenu &&
        !mobileNavMenu.contains(event.target) &&
        hamburgerIcon &&
        !hamburgerIcon.contains(event.target)
      ) {
        this.closeMobileNav();
      }
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 850) {
        // Slightly wider mobile breakpoint for safety
        this.mobile = true;
      } else {
        this.mobile = false;
        this.mobileNav = false;
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async subscribe() {
      this.isSubscribing = true;
      try {
        const res = await fetch(api("/api/subscribe"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email }),
        });
        if (res.ok) {
          this.isSubscribed = true;
          this.email = "";
        } else {
          this.message = "An error occurred.";
          this.messageClass = "error";
        }
      } catch (err) {
        this.message = "Check your connection.";
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
  top: 0;
  left: 0;
  width: 100%;
  height: 85px; /* Increased height for better balance */
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between; /* Logo left, Links right */
    align-items: center;
    width: 100%;
    padding: 0 5%;
    margin: 0 auto;
    transition: 0.5s ease all;

    @media (min-width: 1200px) {
      max-width: 1200px;
      padding: 0; /* Aligns perfectly with the 1200px cards below */
    }

    .branding {
      flex-shrink: 0;
      img {
        width: 60px; /* Slightly larger to anchor the design */
        border-radius: 50%;
        display: block;
      }
    }

    .navigation-links {
      display: flex;
      list-style: none;
      align-items: center;
      margin: 0;
      padding: 0;
      flex: 1; /* Takes up available space */
      justify-content: flex-end; /* Pushes list items to the right */

      li {
        text-transform: uppercase;
        margin-left: 30px; /* Base spacing */

        @media (min-width: 1100px) {
          margin-left: 45px; /* Wide spacing to fill the 1200px bar */
        }
      }
    }

    .link {
      font-size: 14px;
      font-weight: 400;
      color: #111;
      text-decoration: none;
      transition: 0.3s ease all;
      letter-spacing: 0.5px;
    }

    .link:hover:not(.link-subscribe) {
      color: #078537;
    }

    .link-subscribe {
      border: 2px solid #2e8b57;
      border-radius: 25px;
      padding: 10px 28px;
      font-weight: 400;
      color: #2e8b57 !important;
      background-color: white;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      white-space: nowrap;

      &:hover {
        background-color: #2e8b57;
        color: white !important;
        transform: translateY(-2px);
      }
    }

    .icon {
      display: flex;
      align-items: center;
      .hamburger-icon {
        cursor: pointer;
        font-size: 24px;
        transition: 0.5s ease all;
      }
      .icon-active {
        transform: rotate(180deg);
      }
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 280px;
      height: 100%;
      top: 0;
      left: 0;
      background-color: white;
      padding: 100px 40px;
      box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);

      li {
        margin: 20px 0;
        margin-left: 0;
      }
    }
  }
}

/* Animations */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: 0.8s ease all;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(-280px);
}
.mobile-nav-enter-to {
  transform: translateX(0);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 850px;
  width: 90%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 2.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 10;
  color: #333;
}
.modal-layout {
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.modal-image-side {
  flex: 1;
  min-height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.modal-form-side {
  flex: 1.2;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.full-width-btn {
  width: 100%;
  background: #105212;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  transition: background 0.3s;
  &:hover {
    background: #078537;
  }
}
.error {
  color: #dc3545;
  margin-top: 15px;
  font-weight: 500;
}
</style>
