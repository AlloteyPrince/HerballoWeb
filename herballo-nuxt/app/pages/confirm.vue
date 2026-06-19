<template>
  <div class="confirm-page">
    <div class="confirm-card">
      <div class="confirm-icon">{{ statusIcon }}</div>
      <h2 class="confirm-title">{{ statusTitle }}</h2>
      <p class="confirm-sub">{{ statusMessage }}</p>
      <div v-if="showLoader" class="loader"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const router = useRouter()

const statusIcon = ref('🌿')
const statusTitle = ref('Confirming your account...')
const statusMessage = ref('Please wait while we verify your email.')
const showLoader = ref(true)

const showError = () => {
  statusIcon.value = '⚠️'
  statusTitle.value = 'Link expired or already used'
  statusMessage.value = 'This confirmation link may have expired. Please sign up again or request a new link.'
  showLoader.value = false
}

onMounted(async () => {
  const timeout = setTimeout(() => showError(), 8000)

  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      clearTimeout(timeout)
      subscription.unsubscribe()

      const firstName = session.user.user_metadata?.first_name || ''
      statusIcon.value = '✅'
      statusTitle.value = `Welcome${firstName ? ', ' + firstName : ''}!`
      statusMessage.value = 'Your email has been confirmed. Taking you to sign in...'
      showLoader.value = false

      setTimeout(async () => {
        await supabase.auth.signOut()
        await router.push('/login?confirmed=true')
      }, 2000)
    }
  })
})
</script>

<style scoped lang="scss">
.confirm-page {
  min-height: 100vh;
  background: #fdfdfb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
.confirm-card {
  max-width: 420px;
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  padding: 2.5rem 2rem;
  text-align: center;
}
.confirm-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.confirm-title {
  color: #105212;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.confirm-sub {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.loader {
  width: 28px;
  height: 28px;
  border: 3px solid #e8f0e8;
  border-radius: 50%;
  border-top-color: #105212;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>