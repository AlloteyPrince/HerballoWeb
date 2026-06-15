<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header text-center mb-6">
        <h1 class="brand-title">Herballo</h1>
        <p class="text-gray-600">{{ isSignUp ? 'Create your account' : 'Sign in to continue' }}</p>
      </div>

      <!-- TAB SWITCHER -->
      <div class="tab-switcher">
        <button
          @click="switchMode(false)"
          :class="['tab-btn', !isSignUp ? 'tab-active' : '']"
        >
          Sign In
        </button>
        <button
          @click="switchMode(true)"
          :class="['tab-btn', isSignUp ? 'tab-active' : '']"
        >
          Sign Up
        </button>
      </div>

      <!-- SIGN IN FORM -->
      <form v-if="!isSignUp" @submit.prevent="signIn" class="login-form">
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
          <input v-model="password" type="password" class="form-input" placeholder="••••••••" />
        </div>
        <button type="submit" :disabled="isLoading" class="submit-btn">
          <span v-if="!isLoading">Sign In</span>
          <span v-else class="loader"></span>
        </button>
      </form>

      <!-- SIGN UP FORM -->
      <form v-else @submit.prevent="signUp" class="login-form">
        <div class="form-group">
          <label class="form-label">First Name</label>
          <input
            v-model="firstName"
            type="text"
            class="form-input"
            placeholder="Your first name"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Last Name</label>
          <input
            v-model="lastName"
            type="text"
            class="form-input"
            placeholder="Your last name"
          />
        </div>
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
          <label class="form-label">Mobile Number</label>
          <input
            v-model="mobile"
            type="tel"
            class="form-input"
            placeholder="e.g. 0244000000"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-input" placeholder="Min. 6 characters" />
        </div>
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input v-model="confirmPassword" type="password" class="form-input" placeholder="Repeat password" />
        </div>
        <button type="submit" :disabled="isLoading" class="submit-btn">
          <span v-if="!isLoading">Create Account</span>
          <span v-else class="loader"></span>
        </button>
      </form>

      <!-- SUCCESS STATE -->
      <div v-if="success" class="success-box">
        <div class="success-icon">✅</div>
        <p>{{ success }}</p>
      </div>

      <!-- ERROR -->
      <p v-if="error" class="error-text">{{ error }}</p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const supabase = useSupabaseClient();
const route = useRoute();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const firstName = ref("");
const lastName = ref("");
const mobile = ref("");
const isLoading = ref(false);
const isSignUp = ref(false);
const error = ref("");
const success = ref("");

const switchMode = (signup: boolean) => {
  isSignUp.value = signup;
  error.value = "";
  success.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  firstName.value = "";
  lastName.value = "";
  mobile.value = "";
};

const signIn = async () => {
  error.value = "";
  success.value = "";
  if (!email.value || !password.value) {
    error.value = "Please enter your email and password.";
    return;
  }
  isLoading.value = true;
  const { error: err } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  isLoading.value = false;
  if (err) {
    if (err.message.includes('Invalid login credentials')) {
      error.value = "Incorrect email or password. Please try again.";
    } else if (err.message.includes('Email not confirmed')) {
      error.value = "Please check your email and confirm your account first.";
    } else {
      error.value = err.message;
    }
  } else {
    const redirect = route.query.redirect as string || "/consultation";
    await navigateTo(redirect);
  }
};

const signUp = async () => {
  error.value = "";
  success.value = "";
  if (!firstName.value || !lastName.value || !email.value || !mobile.value || !password.value) {
    error.value = "Please fill in all fields.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }
  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters.";
    return;
  }
  isLoading.value = true;
  const { error: err } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: firstName.value,
        last_name: lastName.value,
        full_name: `${firstName.value} ${lastName.value}`,
        mobile: mobile.value,
      },
      emailRedirectTo: `${window.location.origin}/confirm`
    }
  });
  isLoading.value = false;
  if (err) {
    error.value = err.message;
  } else {
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
  max-width: 420px;
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  padding: 2rem;
}

.brand-title {
  color: #105212;
  font-size: 1.8rem;
  font-weight: 800;
}

.tab-switcher {
  display: flex;
  background: #f1f5f1;
  border-radius: 50px;
  padding: 4px;
  margin-bottom: 2rem;
}

.tab-btn {
  flex: 1;
  padding: 0.6rem;
  border: none;
  background: transparent;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;
}

.tab-active {
  background: #105212;
  color: white;
}

.login-form { margin-bottom: 1rem; }

.form-group { margin-bottom: 1rem; }

.form-label {
  display: block;
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 0.4rem;
}

.form-input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: #105212; }
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #105212, #22c55e);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 52px;
  margin-top: 1.5rem;
  &:disabled { background: #ccc; cursor: not-allowed; }
  &:hover:not(:disabled) { transform: translateY(-2px); }
}

.success-box {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  margin-top: 1rem;
  .success-icon { font-size: 2rem; margin-bottom: 0.5rem; }
  p { color: #166534; font-size: 0.95rem; line-height: 1.6; }
}

.error-text {
  color: #dc2626;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
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
  to { transform: rotate(360deg); }
}
</style>