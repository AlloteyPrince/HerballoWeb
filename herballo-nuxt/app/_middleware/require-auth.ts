export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  // Never block the login page
  if (to.path === '/login') return

  // If user is already loaded and exists, allow through
  if (user.value) return

  // If undefined (still loading), wait for the session to resolve
  if (user.value === undefined) {
    const { data } = await supabase.auth.getSession()
    if (data.session) return // session exists, allow through
    return navigateTo('/login')
  }

  // User is definitively null — not logged in
  if (user.value === null) {
    return navigateTo('/login')
  }
})