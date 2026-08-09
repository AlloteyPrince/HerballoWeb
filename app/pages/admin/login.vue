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
          <button
            type="button"
            class="eye-btn"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            @click="showPassword = !showPassword"
          >
            <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a20.3 20.3 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <path d="M1 1l22 22" />
            </svg>
          </button>
        </div>
        <button type="submit" class="submit-btn" :disabled="loading">
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
  min-height: 100vh;
  background: linear-gradient(180deg, #f4f8f4 0%, #eef3ee 100%);
  padding: 24px;
}

.admin-logo {
  width: 76px;
  height: 76px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 24px;
  background: #fff;
  padding: 4px;
  box-shadow: 0 6px 20px rgba(16, 82, 18, 0.15);
}

.admin-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  padding: 40px 36px;
  box-shadow: 0 20px 40px -12px rgba(16, 82, 18, 0.15);
  text-align: center;
}

.brand {
  font-size: 1.9rem;
  font-weight: 800;
  margin: 0 0 0.25rem;
  color: #105212;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 0.95rem;
  color: #8a8f8a;
  margin: 0 0 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

form input {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid #e9ecef;
  border-radius: 10px;
  background-color: #f8f9f8;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

form input:focus {
  background-color: #fff;
  border-color: #105212;
  box-shadow: 0 0 0 3px rgba(16, 82, 18, 0.12);
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: 46px;
}

.eye-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 4px;
  width: 38px;
  height: auto;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
  color: #9aa19a;
  transition: color 0.15s;
}

.eye-btn svg {
  width: 19px;
  height: 19px;
}

.eye-btn:hover {
  color: #105212;
}

.submit-btn {
  width: 100%;
  padding: 13px;
  background-color: #105212;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 6px;
  transition: background 0.2s ease, transform 0.15s ease;
}

.submit-btn:disabled {
  background-color: #a7b3a7;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0c3d0e;
}

.error {
  color: #d64545;
  margin-top: 4px;
  font-size: 0.88rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>