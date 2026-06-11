<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center p-8 bg-white rounded-xl shadow-md max-w-md w-full">
      <h2 class="text-2xl font-bold text-green-800 mb-3">Confirming your account...</h2>
      <p class="text-gray-500">Please wait while we verify your email.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    await router.push('/consultation')
  } else {
    await router.push('/login')
  }
})
</script>