<template>
  <div>
    <header class="blog-nav">
      <nav ref="navbar">
        <router-link to="/" class="branding">
          <img src="../images/ha-logo-main.jpg" alt="Herballo Logo" />
        </router-link>
        <ul v-show="!mobile" class="navigation">
          <li><router-link class="link" to="/ulearn">Library</router-link></li>
          <li><router-link class="link" to="/shop">Shop</router-link></li>
          <li><router-link class="link" to="/about">About</router-link></li>
          <li><router-link class="link" to="/contact">Contact</router-link></li>
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
              <router-link class="link" to="/ulearn" @click="closeMobileNav"
                >Library</router-link
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
              <router-link class="link" to="/contact" @click="closeMobileNav"
                >Contact</router-link
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

    <div class="hero-and-controls-wrapper">
      <section class="hero">
        <p class="hero-big">Herballo Stories & Ideas</p>
        <p class="hero-sub">
          Stay informed and inspired with herbal medicine news and insights that
          cuts accross.
        </p>
      </section>

      <div class="controls-wrapper">
        <div class="controls">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search blog posts..."
          />
          <select v-model="selectedTag">
            <option value="">All Tags</option>
            <option v-for="tag in uniqueTags" :key="tag" :value="tag">
              #{{ tag }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <section class="blog-page">
      <div v-if="loading" class="blog-message">Loading posts...</div>
      <div v-else-if="error" class="blog-message error">{{ error }}</div>
      <div v-else-if="filteredPosts.length === 0" class="blog-message">
        No matching posts found.
      </div>

      <div class="blog-grid">
        <BlogCardPV1
          v-for="post in filteredPosts"
          :key="post._id"
          :post="post"
        />
      </div>
    </section>

    <VFooter />

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button @click="closeModal" class="close-btn">&times;</button>
        <div class="modal-layout">
          <div class="modal-image-side">
            <img
              src="../images/popup-img.png"
              alt="Subscription Promotion"
            />
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
  </div>
</template>

<script setup>
import { api } from "../api";
import { ref, computed, onMounted } from "vue";
import BlogCardPV1 from "../components/BlogCardPV1.vue";
import VFooter from "../components/VFooter.vue";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const selectedTag = ref("");

// Pop-up logic
const showModal = ref(false);
const email = ref("");
const message = ref(null);
const messageClass = ref("");
const isSubscribing = ref(false);
const isSubscribed = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const checkAndShowModal = () => {
  const hasSeenPopup = localStorage.getItem("herballoPopupShown");

  if (!hasSeenPopup) {
    setTimeout(() => {
      showModal.value = true;
      localStorage.setItem("herballoPopupShown", "true");
    }, 45000); // 45 seconds
  }
};

const subscribe = async () => {
  message.value = null;
  messageClass.value = "";
  isSubscribing.value = true;
  isSubscribed.value = false;

  try {
    const res = await fetch(api("/api/subscribe"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
    });

    const data = await res.json();

    if (res.ok) {
      isSubscribed.value = true;
      email.value = "";
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

const mobile = ref(false);
const mobileNav = ref(false);

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};
const closeMobileNav = () => {
  mobileNav.value = false;
};

const checkScreen = () => {
  mobile.value = window.innerWidth <= 750;
  if (!mobile.value) mobileNav.value = false;
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);

  // Calls the timed pop-up on page load
  checkAndShowModal();

  // Fetches blog posts
  async function fetchPosts() {
    try {
      const res = await fetch(api("/api/posts"));
      const data = await res.json();
      posts.value = data.reverse();
    } catch (err) {
      error.value = "Failed to load blog posts.";
    } finally {
      loading.value = false;
    }
  }
  fetchPosts();
});

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesTag =
      !selectedTag.value || post.tags.includes(selectedTag.value);

    return matchesSearch && matchesTag;
  });
});

const uniqueTags = computed(() => {
  const allTags = posts.value.flatMap((post) => post.tags || []);
  return [...new Set(allTags)];
});
</script>

<style scoped lang="scss">
/* Your existing styles for the blog page and modal are all here. */
.blog-nav {
  background-color: white;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.06);
  color: rgb(17, 17, 17);

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    width: 90%;
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
      font-size: 14px;
      transition: 0.3s ease;
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

    li {
      text-transform: uppercase;
      padding: 16px 0 16px 16px;
      margin-left: 16px;
      display: inline-flex;
    }

    .branding img {
      width: 50px;
      border-radius: 50%;
    }

    .navigation {
      display: flex;
      align-items: center;
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
        transition: transform 0.4s ease;
        color: black;
      }
    }

    .icon-active {
      transform: rotate(90deg);
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
        padding-left: 0;
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: all 0.5s ease;
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

/* ========== BLOG PAGE ========== */
.hero-and-controls-wrapper {
  position: relative;
  z-index: 1;
  background-color: #f8f9fa;
  margin-top: 60px; /* Aligns content correctly below fixed nav */
}

.hero {
  background: url("../images/blog-hero.png") center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 60px 20px;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 750px) {
    min-height: 85vh; /* Increased height for mobile */
  }

  @media (min-width: 751px) {
    height: 50vh;
    min-height: auto;
  }

  .hero-big {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

    @media (max-width: 750px) {
      line-height: 1.2;
    }
  }

  .hero-sub {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
}
.blog-page {
  padding: 60px 20px 60px 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}
.controls-wrapper {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 20px;

  @media (max-width: 750px) {
    margin-top: 20px; /* Adds top margin on mobile */
  }

  @media (min-width: 751px) {
    margin: 0 auto;
    margin-top: -50px;
  }
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (min-width: 600px) {
    flex-direction: row;
  }
}

.controls input,
.controls select {
  padding: 10px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
}

.blog-message {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
}

.blog-message.error {
  color: #c0392b;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
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
