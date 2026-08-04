<template>
  <div class="bg-[#fdfdfb] min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
      
      <div class="text-[#105212] font-bold text-2xl mb-6">Herballo</div>

      <div v-if="loading" class="text-gray-500">
        <p class="text-lg">Processing your request...</p>
      </div>

      <div v-else-if="success">
        <div class="w-12 h-12 bg-green-50 text-[#105212] rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
          ✓
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Unsubscribed Successfully</h2>
        <p class="text-sm text-gray-500 mb-6">
          You have been removed from our marketing mailing list. You won't receive any more promotional emails from us.
        </p>
        <NuxtLink to="/blog" class="inline-block bg-[#105212] text-white text-xs font-bold px-6 py-3 rounded-xl no-underline hover:bg-[#0a360b] transition-colors">
          Return to Blog
        </NuxtLink>
      </div>

      <div v-else>
        <div class="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
          ✕
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p class="text-sm text-gray-500 mb-6">
          We couldn't automatically find your email subscription identifier. Please enter your email below to manually unsubscribe.
        </p>
        <form @submit.prevent="handleManualUnsubscribe" class="space-y-3">
          <input 
            v-model="manualEmail" 
            type="email" 
            placeholder="your@email.com" 
            required
            class="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#105212]"
          />
          <button type="submit" class="w-full bg-[#105212] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#0a360b] transition-colors">
            Confirm Unsubscribe
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const route = useRoute()

const loading = ref(true)
const success = ref(false)
const manualEmail = ref('')

const processUnsubscribe = async (emailAddress) => {
  if (!emailAddress) {
    loading.value = false
    return
  }

  const { error } = await supabase
    .from('subscribers')
    .update({ status: 'unsubscribed' })
    .eq('email', emailAddress.toLowerCase().trim())

  if (!error) {
    success.value = true
  }
  loading.value = false
}

const handleManualUnsubscribe = () => {
  loading.value = true
  processUnsubscribe(manualEmail.value)
}

onMounted(() => {
  // Automatically check if the email parameter exists in the URL (?email=...)
  const emailFromUrl = route.query.email
  if (emailFromUrl) {
    processUnsubscribe(emailFromUrl)
  } else {
    loading.value = false
  }
})
</script>