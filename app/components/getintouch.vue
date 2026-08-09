<template>
  <section class="get-in-touch">
    <h2>Get in Touch</h2>
    <div class="icons">
      <a
        v-for="link in socialLinks"
        :key="link.name"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="link.name"
      >
        <img :src="link.img" :alt="link.name" />
      </a>
    </div>
  </section>
</template>

<script setup>
// Fallback used if the site_settings row hasn't loaded (or isn't configured yet).
const FALLBACK_LINKS = {
  youtube_url: 'https://www.youtube.com/@HerballoCo',
  linkedin_url: 'https://www.linkedin.com/company/herballo/',
  tiktok_url: 'https://www.tiktok.com/@Herballo',
  twitter_url: 'https://x.com/princeo43022643',
  contact_email: 'info@herballo.co',
};

const supabase = useSupabaseClient();
const { data: settings } = await useAsyncData('site-settings-social', async () => {
  const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).single();
  if (error) return null;
  return data;
});

const socialLinks = computed(() => {
  const s = { ...FALLBACK_LINKS, ...(settings.value || {}) };
  return [
    { name: 'YouTube', href: s.youtube_url, img: '/images/yt-logo.png' },
    { name: 'LinkedIn', href: s.linkedin_url, img: '/images/linkedin.png' },
    { name: 'TikTok', href: s.tiktok_url, img: '/images/tiktoklogo.png' },
    { name: 'Email', href: `mailto:${s.contact_email}`, img: '/images/email-logo.png' },
    { name: 'Twitter', href: s.twitter_url, img: '/images/x-logo.png' },
  ].filter((link) => link.href);
});
</script>

<style scoped>
.get-in-touch {
  max-width: 400px;
  margin: 2rem auto;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #3e3f3f;
}

h2 {
  margin-bottom: 1rem;
  font-weight: 600;
}

.icons {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.icons a img {
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.3s ease;
  filter: grayscale(30%);
}

.icons a:hover img,
.icons a:focus img {
  filter: grayscale(0);
  transform: scale(1.15);
  outline: none;
}
</style>