export default defineNuxtConfig({
  compatibilityDate: "2026-05-21",
  srcDir: "app/",
  devtools: { enabled: true },
  // 1. SEO Site Configuration
  site: {
    url: "https://herballo.co",
    name: "Herballo",
    description:
      "Foundational resources for natural health and herbal medicine.",
    defaultLocale: "en",
  },
  // 2. App Configuration
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
      meta: [
        { property: "og:site_name", content: "Herballo" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://herballo.co/logo.png" },
      ],
    },
  },
  // 3. Modules List
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/sitemap",
    "@nuxtjs/supabase",
  ],
  // 4. Supabase Configuration
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: [
        "/",
        "/about",
        "/blog",
        "/blog/*",
        "/contact",
        "/education",
        "/events",
        "/glossary",
        "/privacypolicy",
        "/productdev",
        "/resources",
        "/shop",
        "/termsofuse",
        "/ulearn",
        "/ulearn/*",
        "/pdflibrary",
        "/pdflibrary/*",
        "/admin",
        "/admin/*",
      ],
    },
  },
  // 5. Global CSS
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  // 6. Tailwind Configuration
  tailwindcss: {
    configPath: "../tailwind.config.js",
    exposeConfig: true,
    viewer: true,
  },
  // 7. Build & Transpilation
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/vue-fontawesome",
    ],
  },
  // 8. Sitemap Settings
  sitemap: {
    autoLastmod: true,
    exclude: ["/_nuxt/**", "/admin/**"],
    sources: ['/api/__sitemap__/urls'],
  },
  // 9. Auto-imports
  imports: {
    dirs: ["lib"],
  },
});