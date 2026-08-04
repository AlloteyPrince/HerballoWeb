<template>
  <div class="admin-wrapper">
    <div class="admin-card">
      <h1 class="brand">Herballo</h1>
      <p class="subtitle">Create New Admin</p>

      <form @submit.prevent="handleCreateUser">
        <input
          type="text"
          v-model="form.username"
          placeholder="New Username"
          required
        />
        <input
          type="password"
          v-model="form.password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          v-model="form.confirmPassword"
          placeholder="Confirm Password"
          required
        />

        <button type="submit" :disabled="loading">
          {{ loading ? "Creating Account..." : "Create Admin" }}
        </button>

        <Transition name="fade">
          <p v-if="error" class="error">{{ error }}</p>
        </Transition>
        <Transition name="fade">
          <p v-if="success" class="success">Admin created successfully!</p>
        </Transition>
      </form>
    </div>
  </div>
</template>

<script setup>
// In Nuxt 3, these are auto-imported, but we define the logic here
const router = useRouter();
const config = useRuntimeConfig();

const form = ref({
  username: "",
  password: "",
  confirmPassword: "",
});

const error = ref(null);
const success = ref(false);
const loading = ref(false);

const handleCreateUser = async () => {
  error.value = null;
  success.value = false;

  if (form.value.password !== form.value.confirmPassword) {
    error.value = "Passwords do not match.";
    return;
  }

  loading.value = true;

  try {
    // Note: Make sure your backend has this /register route ready!
    await $fetch("/api/auth/register", {
      baseURL: config.public.apiBase,
      method: "POST",
      body: {
        username: form.value.username,
        password: form.value.password,
      },
    });

    success.value = true;
    form.value = { username: "", password: "", confirmPassword: "" };

    // Redirect after 2 seconds
    setTimeout(() => router.push("/admin"), 2000);
  } catch (err) {
    console.error("Registration Error:", err);
    error.value = err.data?.message || "Failed to create admin.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.admin-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: #f8f9fa;
}

.admin-card {
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.brand {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #105212;
}

.subtitle {
  font-size: 1.2rem;
  color: #777;
  margin-bottom: 1.5rem;
}

form input {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  background-color: #f1f3f5;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
}

form input:focus {
  background-color: #fff;
  border-color: #105212;
  box-shadow: 0 0 0 3px rgba(16, 82, 18, 0.1);
}

button {
  width: 100%;
  padding: 12px;
  background-color: #105212;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0c3d0e;
}

.error {
  color: #e74c3c;
  margin-top: 15px;
  font-size: 0.95rem;
}

.success {
  color: #105212;
  margin-top: 15px;
  font-size: 0.95rem;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
