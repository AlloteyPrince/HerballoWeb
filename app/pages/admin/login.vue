<template>
  <div class="admin-wrapper">
    <img src="/images/herballo-logo.png" alt="Herballo" class="admin-logo" />

    <div class="admin-card">
      <h1 class="brand">Herballo</h1>
      <p class="subtitle">Admin Login</p>

      <form @submit.prevent="handleLogin">
        <input
          type="email"
          v-model="form.email"
          placeholder="Email"
          autocomplete="username"
          required
        />
        <div class="password-wrapper">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            placeholder="Password"
            autocomplete="current-password"
            required
          />
          <button type="button" class="eye-btn" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <Transition name="fade">
          <p v-if="error" class="error">{{ error }}</p>
        </Transition>
      </form>
    </div>
  </div>
</template>

<script setup>
useHead({ title: 'Admin Login | Herballo', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const router = useRouter();
const supabase = useSupabaseClient();

const form = ref({
  email: "",
  password: ""
});

const error = ref(null);
const loading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  error.value = null;
  loading.value = true;

  try {
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: form.value.email,
      password: form.value.password,
    });

    if (signInError) {
      error.value = "Incorrect email or password.";
      return;
    }

    // Sign-in succeeded, but only allowlisted emails may enter /admin —
    // the server independently re-checks this on every admin API call too.
    const { isAdmin } = await $fetch('/api/admin/whoami', {
      headers: { Authorization: `Bearer ${data.session.access_token}` },
    });

    if (!isAdmin) {
      error.value = "This account is not authorized for admin access.";
      await supabase.auth.signOut();
      return;
    }

    router.push("/admin");
  } catch (err) {
    console.error("Login Error:", err);
    error.value = "Login failed. Please try again.";
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  layout: false
});
</script>

<style scoped>

.admin-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.admin-logo {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: 44px;
}

.eye-btn {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  line-height: 1;
  opacity: 0.6;
}

.eye-btn:hover {
  opacity: 1;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>