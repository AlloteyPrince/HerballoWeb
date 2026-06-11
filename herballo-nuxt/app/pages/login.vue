<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header text-center mb-6">
        <h1 class="brand-title">Herballo</h1>
        <p class="text-gray-600">Sign in to book your Herbal Consultation</p>
      </div>
      <form @submit.prevent="signIn" class="login-form">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-input"
            placeholder="you@example.com"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-input" />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-green-600 text-white py-3 rounded-lg font-bold disabled:bg-gray-400 flex items-center justify-center"
        >
          <span v-if="!isLoading">Sign in</span>
          <span v-else class="loader"></span>
        </button>
        <p class="mt-4 text-center text-sm">
          Don't have an account?
          <button
            @click="signUp"
            type="button"
            class="text-green-700 font-semibold underline"
          >
            Sign up
          </button>
        </p>
      </form>
      <p v-if="error" class="mt-4 text-red-600 text-sm text-center">
        {{ error }}
      </p>
      <p v-if="success" class="mt-4 text-green-700 text-sm text-center font-medium">
        {{ success }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const error = ref("");
const success = ref("");

const signIn = async () => {
  error.value = "";
  success.value = "";
  isLoading.value = true;
  const { error: err } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  isLoading.value = false;
  if (err) {
    // Make the error message friendlier
    if (err.message.includes('Invalid login credentials')) {
      error.value = "Incorrect email or password. Please try again.";
    } else if (err.message.includes('Email not confirmed')) {
      error.value = "Please check your email and confirm your account first.";
    } else {
      error.value = err.message;
    }
  } else {
    await navigateTo("/consultation");
  }
};

const signUp = async () => {
  error.value = "";
  success.value = "";
  isLoading.value = true;
  const { error: err } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: `${window.location.origin}/confirm`
    }
  });
  isLoading.value = false;
  if (err) {
    error.value = err.message;
  } else {
    // Don't navigate — tell them to check email
    success.value = "Account created! Please check your email to confirm your account, then come back to sign in.";
  }
};
</script>

<style scoped lang="scss">
.login-page {
  min-height: calc(100vh - 85px);
  background: #fdfdfb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
.login-container {
  max-width: 400px;
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
}
.login-header {
  .brand-title {
    color: #105212;
    font-size: 1.8rem;
    font-weight: 800;
  }
}
.form-group {
  margin-bottom: 1rem;
}
.form-label {
  display: block;
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 0.4rem;
}
.form-input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  &:focus {
    border-color: #105212;
  }
}
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
