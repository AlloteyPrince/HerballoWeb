export default defineNuxtRouteMiddleware(async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // On a hard refresh the session may not have resolved yet.
  if (user.value === undefined) {
    await supabase.auth.getSession();
  }

  if (!user.value) {
    return navigateTo("/admin/login");
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return navigateTo("/admin/login");
  }

  // Being signed in isn't enough — must also be on the admin allowlist.
  // The server independently re-checks this on every admin API call too.
  const { isAdmin } = await $fetch<{ isAdmin: boolean }>("/api/admin/whoami", {
    headers: { Authorization: `Bearer ${session.access_token}` },
  }).catch(() => ({ isAdmin: false }));

  if (!isAdmin) {
    await supabase.auth.signOut();
    return navigateTo("/admin/login");
  }
});
