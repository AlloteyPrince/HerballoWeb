<template>
  <div class="login-page">
    <!-- SNACKBAR -->
    <transition name="snack">
      <div v-if="snackbar.show" :class="['snackbar', `snackbar--${snackbar.type}`]">
        <span class="snackbar-icon">{{ snackbar.type === 'success' ? '✅' : '⚠️' }}</span>
        {{ snackbar.message }}
      </div>
    </transition>

    <div class="login-container">

      <!-- CHECK EMAIL SCREEN -->
      <div v-if="showCheckEmail" class="check-email-screen">
        <div class="leaf-icon">🌿</div>
        <h2 class="welcome-title">Welcome to Herballo, {{ firstName }}!</h2>
        <p class="welcome-sub">Your journey to natural wellness starts here. We're glad you're with us.</p>
        <div class="divider"></div>
        <div class="email-instruction">
          <div class="email-icon">📬</div>
          <p>We've sent a confirmation link to</p>
          <p class="email-highlight">{{ email }}</p>
          <p>Click the link in your inbox to activate your account, then come back to sign in.</p>
        </div>
        <p class="spam-note">Can't find it? Check your spam or junk folder.</p>
        <button class="resend-btn" :disabled="resendCooldown > 0" @click="resendEmail">
          {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend confirmation email' }}
        </button>
      </div>

      <!-- AUTH FORMS -->
      <template v-else>
        <div class="login-header text-center mb-6">
          <h1 class="brand-title">Herballo</h1>
          <p class="brand-sub">{{ isSignUp ? 'Create your account' : 'Sign in to continue' }}</p>
        </div>

        <!-- TAB SWITCHER -->
        <div class="tab-switcher">
          <button @click="switchMode(false)" :class="['tab-btn', !isSignUp ? 'tab-active' : '']">
            Sign In
          </button>
          <button @click="switchMode(true)" :class="['tab-btn', isSignUp ? 'tab-active' : '']">
            Sign Up
          </button>
        </div>

        <!-- SIGN IN FORM -->
        <form v-if="!isSignUp" @submit.prevent="signIn" class="login-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-input" placeholder="you@example.com" />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="password-wrapper">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="••••••••"
              />
              <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
          <p v-if="error" class="error-text">{{ error }}</p>
          <button type="submit" :disabled="isLoading" class="submit-btn">
            <span v-if="!isLoading">Sign In</span>
            <span v-else class="loader"></span>
          </button>
        </form>

        <!-- SIGN UP FORM -->
        <form v-else @submit.prevent="signUp" class="login-form">
          <div class="form-group">
            <label class="form-label">First Name</label>
            <input v-model="firstName" type="text" class="form-input" placeholder="Your first name" />
          </div>
          <div class="form-group">
            <label class="form-label">Last Name</label>
            <input v-model="lastName" type="text" class="form-input" placeholder="Your last name" />
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-input" placeholder="you@example.com" />
          </div>

          <!-- PASSWORD WITH HINTS -->
          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="password-wrapper">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="Min. 8 characters"
                @input="checkPasswordStrength"
              />
              <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <!-- Password hints -->
            <div v-if="password.length > 0" class="password-hints">
              <p :class="['hint', passwordChecks.length ? 'hint--pass' : 'hint--fail']">
                {{ passwordChecks.length ? '✓' : '✗' }} At least 8 characters
              </p>
              <p :class="['hint', passwordChecks.number ? 'hint--pass' : 'hint--fail']">
                {{ passwordChecks.number ? '✓' : '✗' }} At least one number
              </p>
              <p :class="['hint', passwordChecks.upper ? 'hint--pass' : 'hint--fail']">
                {{ passwordChecks.upper ? '✓' : '✗' }} At least one uppercase letter
              </p>
              <p :class="['hint', passwordChecks.special ? 'hint--pass' : 'hint--fail']">
                {{ passwordChecks.special ? '✓' : '✗' }} At least one special character (!@#$%^&*)
              </p>
            </div>
          </div>

          <!-- CONFIRM PASSWORD WITH MATCH INDICATOR -->
          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <div class="password-wrapper">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :class="['form-input', confirmPasswordClass]"
                placeholder="Repeat password"
              />
              <button type="button" class="eye-btn" @click="showConfirmPassword = !showConfirmPassword">
                {{ showConfirmPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <p v-if="confirmPassword.length > 0" :class="['hint', passwordsMatch ? 'hint--pass' : 'hint--fail']">
              {{ passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match' }}
            </p>
          </div>

          <p v-if="error" class="error-text">{{ error }}</p>
          <button type="submit" :disabled="isLoading || !canSubmitSignup" class="submit-btn">
            <span v-if="!isLoading">Create Account</span>
            <span v-else class="loader"></span>
          </button>
        </form>
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

const supabase = useSupabaseClient()
const route = useRoute()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const isLoading = ref(false)
const isSignUp = ref(false)
const error = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showCheckEmail = ref(false)
const resendCooldown = ref(0)

const snackbar = reactive({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

const passwordChecks = reactive({
  length: false,
  number: false,
  upper: false,
  special: false
})

const checkPasswordStrength = () => {
  passwordChecks.length = password.value.length >= 8
  passwordChecks.number = /\d/.test(password.value)
  passwordChecks.upper = /[A-Z]/.test(password.value)
  passwordChecks.special = /[!@#$%^&*]/.test(password.value)
}

const passwordsMatch = computed(() =>
  confirmPassword.value.length > 0 && password.value === confirmPassword.value
)

const confirmPasswordClass = computed(() => {
  if (confirmPassword.value.length === 0) return ''
  return passwordsMatch.value ? 'input--match' : 'input--mismatch'
})

const allPasswordChecksPassed = computed(() =>
  passwordChecks.length && passwordChecks.number && passwordChecks.upper && passwordChecks.special
)

const canSubmitSignup = computed(() =>
  allPasswordChecksPassed.value && passwordsMatch.value
)

const showSnackbar = (message: string, type: 'success' | 'error' = 'success') => {
  snackbar.message = message
  snackbar.type = type
  snackbar.show = true
  setTimeout(() => { snackbar.show = false }, 4000)
}

const switchMode = (signup: boolean) => {
  isSignUp.value = signup
  error.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  firstName.value = ''
  lastName.value = ''
  showPassword.value = false
  showConfirmPassword.value = false
}

const startResendCooldown = () => {
  resendCooldown.value = 60
  const interval = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) clearInterval(interval)
  }, 1000)
}

const resendEmail = async () => {
  const { error: err } = await supabase.auth.resend({
    type: 'signup',
    email: email.value
  })
  if (err) {
    showSnackbar('Could not resend email. Please try again.', 'error')
  } else {
    showSnackbar('Confirmation email resent! Check your inbox.')
    startResendCooldown()
  }
}

const signIn = async () => {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password.'
    return
  }
  isLoading.value = true
  const { error: err } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  isLoading.value = false
  if (err) {
    if (err.message.includes('Invalid login credentials')) {
      error.value = 'Incorrect email or password. Please try again.'
    } else if (err.message.includes('Email not confirmed')) {
      error.value = 'Please confirm your email first. Check your inbox for the link we sent you.'
    } else {
      error.value = err.message
    }
  } else {
    const redirect = route.query.redirect as string || '/consultation'
    await navigateTo(redirect)
  }
}

const signUp = async () => {
  error.value = ''
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    error.value = 'Please fill in all fields.'
    return
  }
  if (!allPasswordChecksPassed.value) {
    error.value = 'Please make sure your password meets all requirements.'
    return
  }
  if (!passwordsMatch.value) {
    error.value = 'Passwords do not match.'
    return
  }
  isLoading.value = true
  const { error: err } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: firstName.value,
        last_name: lastName.value,
        full_name: `${firstName.value} ${lastName.value}`
      },
      emailRedirectTo: `${window.location.origin}/confirm`
    }
  })
  isLoading.value = false
  if (err) {
    error.value = err.message
  } else {
    showCheckEmail.value = true
    startResendCooldown()
  }
}

onMounted(() => {
  if (route.query.confirmed === 'true') {
    showSnackbar('Email confirmed! You can now sign in. 🌿')
  }
})
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

/* SNACKBAR */
.snackbar {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.85rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 9999;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  white-space: nowrap;
  &--success { background: #105212; color: white; }
  &--error { background: #dc2626; color: white; }
}
.snack-enter-active, .snack-leave-active { transition: all 0.3s ease; }
.snack-enter-from, .snack-leave-to { opacity: 0; transform: translateX(-50%) translateY(-10px); }

/* CONTAINER */
.login-container {
  max-width: 420px;
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  padding: 2rem;
}

/* CHECK EMAIL SCREEN */
.check-email-screen {
  text-align: center;
  padding: 1rem 0;
}
.leaf-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.welcome-title {
  color: #105212;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.welcome-sub {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.divider {
  height: 1px;
  background: #e8f0e8;
  margin-bottom: 1.5rem;
}
.email-instruction {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  p { color: #166534; font-size: 0.9rem; margin-bottom: 0.25rem; line-height: 1.5; }
}
.email-highlight {
  font-weight: 700 !important;
  font-size: 0.95rem !important;
  word-break: break-all;
}
.spam-note {
  color: #999;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
}
.resend-btn {
  background: none;
  border: 1.5px solid #105212;
  color: #105212;
  border-radius: 50px;
  padding: 0.6rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover:not(:disabled) { background: #105212; color: white; }
  &:disabled { border-color: #ccc; color: #ccc; cursor: not-allowed; }
}

/* HEADER */
.brand-title {
  color: #105212;
  font-size: 1.8rem;
  font-weight: 800;
}
.brand-sub {
  color: #666;
  margin-top: 0.25rem;
  font-size: 0.95rem;
}

/* TABS */
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
.tab-active { background: #105212; color: white; }

/* FORM */
.login-form { margin-bottom: 1rem; }
.form-group { margin-bottom: 1rem; }
.form-label {
  display: block;
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 0.4rem;
  font-weight: 500;
}

/* PASSWORD WRAPPER */
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.eye-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  line-height: 1;
  opacity: 0.6;
  &:hover { opacity: 1; }
}

/* INPUT */
.form-input {
  width: 100%;
  padding: 0.7rem 2.5rem 0.7rem 1rem;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  &:focus { border-color: #105212; }
}
.input--mismatch {
  border-color: #dc2626 !important;
  &:focus { border-color: #dc2626 !important; }
}
.input--match {
  border-color: #16a34a !important;
  &:focus { border-color: #16a34a !important; }
}

/* PASSWORD HINTS */
.password-hints {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.hint {
  font-size: 0.76rem;
  margin: 0;
  transition: color 0.2s;
}
.hint--pass { color: #16a34a; }
.hint--fail { color: #dc2626; }

/* SUBMIT */
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

/* ERROR */
.error-text {
  color: #dc2626;
  font-size: 0.88rem;
  text-align: center;
  margin-top: 0.75rem;
  background: #fef2f2;
  border-radius: 8px;
  padding: 0.6rem 1rem;
}

/* LOADER */
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>