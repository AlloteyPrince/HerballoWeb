export default defineNuxtConfig({
  compatibilityDate: "2026-05-21",
  srcDir: "app/",
  devtools: { enabled: true },
  // Server-only secrets (never exposed to the browser).
  // Values are read from .env at runtime.
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    bookingFromEmail: process.env.BOOKING_FROM_EMAIL || "onboarding@resend.dev",
    bookingNotifyEmail: process.env.BOOKING_NOTIFY_EMAIL,
    // Admin panel: comma-separated allowlist of Supabase account emails permitted into /admin.
    adminEmails: process.env.ADMIN_EMAILS || "",
    // Service-role Supabase key — server-only, bypasses RLS. Used solely by
    // server/api/admin/** routes for writes the public anon key can't do.
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
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
      htmlAttrs: { lang: "en" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      titleTemplate: (title) =>
        title && !title.includes("Herballo") ? `${title} | Herballo` : title || "Herballo",
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/images/herballo-logo.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://vhyzuqcthnpqrrtfxeyj.supabase.co" },
      ],
      meta: [
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { name: "theme-color", content: "#105212" },
        { name: "format-detection", content: "telephone=no" },
        { name: "apple-mobile-web-app-title", content: "Herballo" },
        { property: "og:site_name", content: "Herballo" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_GH" },
        { property: "og:image", content: "https://herballo.co/images/og-banner.jpg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    },
  },
  // 3. Modules List
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/supabase",
  ],
  // 3b. Robots.txt configuration
  // Note: only /admin is disallowed here (crawl-blocked entirely). Pages like
  // /login, /confirm and the consultation flow instead use a per-page
  // `noindex` meta tag so Google can still crawl and honour it — combining
  // robots.txt disallow with meta noindex on the same page is a conflicting
  // signal (the crawler never gets far enough to see the noindex tag).
  robots: {
    groups: [
      {
        userAgent: ["*"],
        disallow: ["/admin", "/admin/*"],
        allow: "/",
      },
    ],
    sitemap: "https://herballo.co/sitemap.xml",
  },
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
        // "/resources",
        "/shop",
        "/termsofuse",
        "/ulearn",
        "/ulearn/*",
        "/pdflibrary",
        "/pdflibrary/*",
        "/admin",
        "/admin/*",
        "/conditions/hypertension",
        "/conditions/diabetes",
        "/api/__sitemap__/urls",
        "/consultation",
        "/resources",
        "/medrequest"
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
    exclude: [
      "/_nuxt/**",
      "/admin/**",
      "/login",
      "/confirm",
      "/consultation/booking",
      "/consultation/payment",
      "/consultation/success",
      "/consultation/summary",
      "/unsuscribe",
      "/education",
      "/glossary",
      "/events",
      "/contact",
      "/productdev",
      "/shop",
    ],
    sources: ['/api/__sitemap__/urls'],
    defaults: {
      changefreq: "weekly",
      priority: 0.7,
    },
  },
  // 9. Auto-imports
  imports: {
    dirs: ["lib"],
  },
  // 10. Nitro / Deployment target (explicit so SSR output is correct regardless of build environment)
  nitro: {
    preset: "netlify",
  },
});