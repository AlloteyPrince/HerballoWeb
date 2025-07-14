<template>
  <div>
    <header class="blog-nav">
      <nav ref="navbar">
        <div class="branding">
          <img src="../images/ha-logo-main.jpg" alt="Herballo Logo" />
        </div>
        <ul v-show="!mobile" class="navigation">
          <li><router-link class="link" to="/">Home</router-link></li>
          <li><a href="#subscribe" class="link">Subscribe</a></li>
          <li><a href="#donate" class="link" >Donate</a></li>
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
            <li><router-link class="link" to="/" @click="closeMobileNav">Home</router-link></li>
            <li><a class="link" href="#subscribe" @click="closeMobileNav">Subscribe</a></li>
            <li><a class="link" href="#donate" @click="closeMobileNav">Donate</a></li>
          </ul>
        </transition>
      </nav>
    </header>

    <section class="blog-page">
      <h1 class="blog-header">Herballo Blog</h1>

      <div class="controls">
        <input v-model="searchQuery" type="text" placeholder="Search blog posts..." />
        <select v-model="selectedTag">
          <option value="">All Tags</option>
          <option v-for="tag in uniqueTags" :key="tag" :value="tag">#{{ tag }}</option>
        </select>
      </div>

      <div v-if="loading" class="blog-message">Loading posts...</div>
      <div v-else-if="error" class="blog-message error">{{ error }}</div>
      <div v-else-if="filteredPosts.length === 0" class="blog-message">No matching posts found.</div>

      <div class="blog-grid">
        <BlogCardPV1 v-for="post in filteredPosts" :key="post._id" :post="post" />
      </div>
    </section>

    <VFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// *** UPDATED IMPORT STATEMENT ***
import BlogCardPV1 from '../components/BlogCardPV1.vue' // Import the new public card component
import VFooter from '../components/VFooter.vue'

const posts = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedTag = ref('')

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/posts')
    const data = await res.json()
    posts.value = data.reverse()
  } catch (err) {
    error.value = 'Failed to load blog posts.'
  } finally {
    loading.value = false
  }
})

const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesTag =
      !selectedTag.value || post.tags.includes(selectedTag.value)

    return matchesSearch && matchesTag
  })
})

const uniqueTags = computed(() => {
  const allTags = posts.value.flatMap(post => post.tags || [])
  return [...new Set(allTags)]
})

// Navigation logic (no changes here)
const mobile = ref(false)
const mobileNav = ref(false)

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
}
const closeMobileNav = () => {
  mobileNav.value = false
}

const checkScreen = () => {
  mobile.value = window.innerWidth <= 750
  if (!mobile.value) mobileNav.value = false
}
onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})
</script>

<style scoped lang="scss">
/* Your existing styles remain unchanged */

/* ========== NAVBAR ========== */
.blog-nav {
  background-color: white;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.06);
  color: rgb(17, 17, 17);

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
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

    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
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
.blog-page {
  padding: 120px 20px 60px 20px; /* top padding to avoid overlap with nav */
  background-color: #f8f9fa;
  min-height: 100vh;
}

.blog-header {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.controls {
  display: flex;
  gap: 16px;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto 24px auto;
}

.controls input,
.controls select {
  padding: 10px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
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
</style>