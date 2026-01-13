<template>
  <header>
    <nav>
      <div class="branding">
        <NuxtLink to="/">
          <img
            src="/images/herballo-logo.png"
            alt="Herballo - Natural Health and Herbal Medicine"
          />
        </NuxtLink>
      </div>

      <ul v-show="!isMobile" class="navigation-links">
        <li><NuxtLink class="link" to="/">Home</NuxtLink></li>
        <li>
          <NuxtLink class="link" to="/consultation">Consultation</NuxtLink>
        </li>

        <li
          class="dropdown-wrapper"
          @mouseenter="showDropdown = true"
          @mouseleave="showDropdown = false"
        >
          <div class="link dropdown-trigger" to="/resources">
            Resources <span class="arrow">▾</span>
          </div>
          <Transition name="dropdown">
            <ul v-show="showDropdown" class="dropdown-menu">
              <li><NuxtLink to="/ulearn">ULearn - Plant Library</NuxtLink></li>
              <li><NuxtLink to="/blog">Health Blog</NuxtLink></li>
              <li><NuxtLink to="/glossary">Glossary</NuxtLink></li>
              <li><NuxtLink to="/pdflibrary">PDF Library</NuxtLink></li>
            </ul>
          </Transition>
        </li>

        <li><NuxtLink class="link" to="/about">About</NuxtLink></li>

        <li>
          <a class="link link-subscribe" href="#" @click.prevent="openModal">
            Subscribe
          </a>
        </li>
      </ul>

      <div class="icon" v-show="isMobile">
        <font-awesome-icon
          icon="fas fa-bars"
          class="hamburger-icon"
          :class="{ 'icon-active': mobileNav }"
          @click="toggleMobileNav"
        />
      </div>

      <Transition name="mobile-nav">
        <div
          v-show="mobileNav"
          class="mobile-nav dropdown-nav"
          ref="mobileNavMenu"
        >
          <div class="mobile-nav-header">
            <span class="close-menu" @click="closeMobileNav">&times;</span>
          </div>

          <ul class="mobile-nav-list">
            <li>
              <NuxtLink class="link mobile-link" to="/" @click="closeMobileNav"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                class="link mobile-link"
                to="/consultation"
                @click="closeMobileNav"
                >Consultation</NuxtLink
              >
            </li>

            <li class="mobile-resources-accordion">
              <div
                class="mobile-link accordion-trigger"
                @click="toggleResourcesAccordion"
              >
                Resources
                <span
                  class="accordion-arrow"
                  :class="{ 'arrow-open': resourcesOpen }"
                  >▾</span
                >
              </div>
              <Transition name="accordion">
                <ul v-show="resourcesOpen" class="accordion-content">
                  <li>
                    <NuxtLink
                      class="link mobile-link sub-link"
                      to="/ulearn"
                      @click="closeMobileNav"
                      >ULearn - Plant Library</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="link mobile-link sub-link"
                      to="/blog"
                      @click="closeMobileNav"
                      >Blog</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="link mobile-link sub-link"
                      to="/glossary"
                      @click="closeMobileNav"
                      >Glossary</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="link mobile-link sub-link"
                      to="/pdflibrary"
                      @click="closeMobileNav"
                      >PDF Library</NuxtLink
                    >
                  </li>
                </ul>
              </Transition>
            </li>

            <li>
              <NuxtLink
                class="link mobile-link"
                to="/about"
                @click="closeMobileNav"
                >About</NuxtLink
              >
            </li>

            <li class="mt-20">
              <a
                class="link link-subscribe mobile-subscribe"
                href="#"
                @click.prevent="handleSubscribeMobile"
              >
                Subscribe
              </a>
            </li>
          </ul>
        </div>
      </Transition>

      <Transition name="fade">
        <div
          v-if="mobileNav && isMobile"
          class="nav-overlay"
          @click="closeMobileNav"
        ></div>
      </Transition>
    </nav>

    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-btn" @click="closeModal">&times;</button>
          <div class="modal-layout">
            <div class="modal-image-side">
              <img src="/images/popup-img.png" alt="Subscription Promotion" />
            </div>
            <div class="modal-form-side">
              <div class="modal-body">
                <div v-if="!isSubscribed">
                  <h3>Stay Updated!</h3>
                  <p>Subscribe to our newsletter for latest updates.</p>
                  <form @submit.prevent="subscribe">
                    <input
                      type="email"
                      v-model="email"
                      placeholder="Email address"
                      required
                    />
                    <button
                      type="submit"
                      class="full-width-btn"
                      :disabled="isSubscribing"
                    >
                      {{ isSubscribing ? "Subscribing…" : "Subscribe" }}
                    </button>
                  </form>
                  <p v-if="message" :class="messageClass">{{ message }}</p>
                </div>
                <div v-else class="welcome-message">
                  <h3>Welcome! 🌿</h3>
                  <p>You're all set.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const config = useRuntimeConfig();
const isMobile = ref(false);
const mobileNav = ref(false);
const showModal = ref(false);
const showDropdown = ref(false);
const resourcesOpen = ref(false);
const email = ref("");
const message = ref(null);
const messageClass = ref("");
const isSubscribing = ref(false);
const isSubscribed = ref(false);

const checkScreen = () => {
  if (process.client) {
    isMobile.value = window.innerWidth <= 950;
    if (!isMobile.value) mobileNav.value = false;
  }
};

const toggleMobileNav = (e) => {
  e.stopPropagation();
  mobileNav.value = !mobileNav.value;
};

const toggleResourcesAccordion = () => {
  resourcesOpen.value = !resourcesOpen.value;
};

const closeMobileNav = () => (mobileNav.value = false);
const handleSubscribeMobile = () => {
  openModal();
  closeMobileNav();
};
const openModal = () => (showModal.value = true);
const closeModal = () => {
  showModal.value = false;
  isSubscribed.value = false;
  message.value = null;
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
});

const subscribe = async () => {
  isSubscribing.value = true;
  message.value = null;
  try {
    const res = await fetch(`${config.public.apiBase}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
    });
    if (!res.ok) throw new Error();
    isSubscribed.value = true;
    email.value = "";
  } catch {
    message.value = "Try again.";
    messageClass.value = "error";
  } finally {
    isSubscribing.value = false;
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

header {
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  z-index: 1000;
  display: flex;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 5%;
    margin: 0 auto;
    @media (min-width: 1200px) {
      max-width: 1200px;
      padding: 0;
    }

    .branding img {
      width: 60px;
      border-radius: 50%;
      display: block;
    }

    .navigation-links {
      display: flex;
      list-style: none;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
      li {
        margin-left: 25px;
        @media (min-width: 1100px) {
          margin-left: 35px;
        }
      }
    }

    /* Desktop Dropdown Styles */
    .dropdown-wrapper {
      position: relative;
      height: 85px;
      display: flex;
      align-items: center;

      .dropdown-trigger {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
      }
      &:hover .arrow {
        transform: rotate(180deg);
        color: #078537;
      }
    }

    .dropdown-menu {
      position: absolute;
      top: 85px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      min-width: 240px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      border-radius: 0 0 12px 12px;
      list-style: none;
      padding: 15px 0;
      border-top: 4px solid #105212;

      li {
        margin: 0 !important;
        a {
          padding: 12px 25px;
          display: block;
          font-size: 15px;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          &:hover {
            background: #f0f7f0;
            color: #105212;
          }
        }
      }
    }

    .link {
      font-size: 16px;
      color: #111;
      text-decoration: none;
      font-weight: 600;
      transition: 0.3s ease all;
    }
    .link:hover:not(.link-subscribe) {
      color: #078537;
    }

    .link-subscribe {
      border: 2px solid #105212;
      border-radius: 30px;
      padding: 12px 35px;
      color: #105212 !important;
      font-weight: 700;
      &:hover {
        background: #105212;
        color: white !important;
        transform: translateY(-2px);
      }
    }

    /* Mobile Icon & Drawer */
    .icon {
      display: flex;
      align-items: center;
      height: 85px;
      z-index: 1002;
      .hamburger-icon {
        cursor: pointer;
        font-size: 24px;
        color: #111;
        transition: 0.5s ease;
      }
      .icon-active {
        transform: rotate(180deg);
      }
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 80%;
      max-width: 400px;
      height: 100vh;
      top: 0;
      left: 0;
      background: white;
      z-index: 1001;

      .mobile-nav-header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 85px;
        padding: 0 25px;
        .close-menu {
          font-size: 40px;
          cursor: pointer;
          color: #333;
        }
      }

      .mobile-nav-list {
        list-style: none;
        padding: 20px 30px;
        overflow-y: auto;
        li {
          margin-bottom: 30px;
          .mobile-link {
            font-size: 1.2rem;
            font-weight: 600;
            color: #333;
          }
        }

        /* Mobile Accordion Styles */
        .mobile-resources-accordion {
          margin-bottom: 20px;
          background: #f8f9fa;
          border-radius: 12px;
          padding: 15px 18px;

          .accordion-trigger {
            font-size: 1.2rem;
            font-weight: 600;
            color: #333;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;

            .accordion-arrow {
              transition: transform 0.3s ease;
              font-size: 1.6rem;
              color: #078537;
              margin-left: 10px;
            }

            .arrow-open {
              transform: rotate(180deg);
            }
          }

          .accordion-content {
            list-style: none;
            padding: 0;
            margin: 0;
            overflow: hidden;

            li {
              margin-bottom: 12px;
              margin-top: 12px;

              &:first-child {
                margin-top: 15px;
              }

              .sub-link {
                padding: 10px 15px;
                margin-left: 0;
                display: block;
                background: white;
                border-radius: 8px;
                font-size: 1.05rem;
                transition: all 0.2s ease;

                &:hover {
                  background: #e8f5e9;
                  transform: translateX(4px);
                }
              }
            }
          }
        }

        .mt-20 {
          margin-top: 20px;
        }
      }
    }

    .nav-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
  }
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
}
.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 850px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 2.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #333;
  z-index: 10;
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
  padding: 3rem 2rem;
  h3 {
    font-size: 1.8rem;
    font-weight: 800;
    color: #105212;
    margin-bottom: 0.5rem;
  }
  p {
    color: #4a5568;
    margin-bottom: 1.5rem;
  }
  input {
    width: 100%;
    padding: 15px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
}
.full-width-btn {
  width: 100%;
  background: #105212;
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #078537;
  }
  &:disabled {
    opacity: 0.6;
  }
}
.error {
  color: #e53e3e;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Transitions */
.dropdown-enter-active {
  transition: all 0.4s ease;
  transition-delay: 0.45s;
}
.dropdown-leave-active {
  transition: all 0.3s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}

/* Accordion Transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.5s ease;
  transform-origin: top;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0.8);
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 300px;
  transform: scaleY(1);
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
