export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

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
    pageTransition: { name: "page", mode: "out-in" },
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
    "nuxt-site-config",
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  // 4. Global CSS
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],

  // 5. Tailwind Configuration
  tailwindcss: {
    configPath: "../tailwind.config.js",
    exposeConfig: true,
    viewer: true,
  },

  // 6. Build & Transpilation
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/vue-fontawesome",
    ],
  },

  // 7. Sitemap Settings
  sitemap: {
    autoLastmod: true,
    exclude: ["/_nuxt/**", "/admin/**"],
  },

  // 8. Auto-imports
  imports: {
    dirs: ["lib"],
  },

  // 9. Runtime Config (For your Render API)
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE || "https://herballo-api.onrender.com",
    },
  },
});
