<template>
  <div class="dashboard-wrapper">
    <aside class="sidebar">
      <h2>Herballo Admin</h2>
      <ul>
        <li
          v-for="item in menu"
          :key="item.key"
          :class="{ active: section === item.key }"
          @click="section = item.key"
        >
          {{ item.label }}
        </li>
      </ul>
      <button @click="logout">Logout</button>
    </aside>

    <main class="main-content">
      <div v-if="section === 'home'">
        <h1>Welcome back, Admin 👋</h1>
        <p>This is your control center for managing Herballo content.</p>

        <div class="dashboard-cards">
          <SubscribersCard />
          <DashBlogCard />
          <SendNewsletterCard @navigate="handleNavigation" />
        </div>
      </div>

      <div v-else-if="section === 'blog'">
        <div class="blog-header">
          <h2>Manage Blog Posts</h2>
          <button @click="showForm = !showForm">
            {{ showForm ? "← Back to Blog List" : "➕ Add New Blog" }}
          </button>
        </div>

        <div v-if="showForm">
          <BlogForm @postCreated="onPostCreated" />
        </div>

        <div v-else>
          <BlogList :refreshKey="refreshKey" />
        </div>
      </div>

      <div v-else-if="section === 'consultation'">
        <h2>Consultation Management</h2>
        <p>Placeholder: Manage appointments and patient history.</p>
      </div>

      <div v-else-if="section === 'library'">
        <h2>Medicinal Plant Library</h2>
        <p>Placeholder: Add, view, and update plant records.</p>
      </div>

      <div v-else-if="section === 'subscribers'">
        <h2>Subscriber List</h2>
        <p>Placeholder: View and manage email subscribers.</p>
        <SubManagement />
      </div>

      <div v-else-if="section === 'emailing'">
        <h2>Email Campaigns</h2>
        <p>Placeholder: Create and send newsletters.</p>
        <NewsletterSender />
      </div>

      <div v-else-if="section === 'settings'">
        <h2>Settings</h2>
        <p>Placeholder: Site settings, profile, branding, etc.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BlogForm from "@/components/BlogForm.vue";
import BlogList from "@/components/BlogList.vue";
import SubManagement from "@/pages/admin/SubManagement.vue";
import SubscribersCard from "@/components/admin/SubscribersCard.vue";
import DashBlogCard from "@/components/admin/DashBlogCard.vue";
import SendNewsletterCard from "@/components/admin/SendNewsletterCard.vue"; // Added this import
import NewsletterSender from "@/pages/admin/NewsletterSender.vue"; // New: Imported the component

const router = useRouter();
const section = ref("home");
const showForm = ref(false);
const refreshKey = ref(0);

const onPostCreated = () => {
  showForm.value = false;
  refreshKey.value += 1;
};

// New: Function to handle navigation from child components
const handleNavigation = (targetSection) => {
  section.value = targetSection;
};

const menu = [
  { key: "home", label: "Dashboard" },
  { key: "blog", label: "Blog" },
  { key: "consultation", label: "Consultation" },
  { key: "library", "label": "Library" },
  { key: "subscribers", label: "Subscribers" },
  { key: "emailing", label: "Emailing" },
  { key: "settings", label: "Settings" },
];

const logout = () => {
  localStorage.removeItem("token");
  router.push("/admin/login");
};
</script>

<style scoped>
/* ... (existing styles, no changes needed here) ... */
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.blog-header button {
  padding: 10px 14px;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  background: #f6f7f9;
}

.sidebar {
  width: 240px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;
}

.sidebar li:hover,
.sidebar li.active {
  background-color: #1e2d3a;
}

.sidebar button {
  margin-top: auto;
  padding: 10px;
  background: #e74c3c;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.main-content {
  flex-grow: 1;
  padding: 40px;
}

.main-content h1,
.main-content h2 {
  margin-bottom: 1rem;
}

.dashboard-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .dashboard-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  .sidebar ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .main-content {
    padding: 20px;
  }
}
</style>