export const SITE_URL = "https://herballo.co";
/** Wide (1200x630) share-preview image for Open Graph / Twitter Card tags. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-banner.jpg`;
/** Square-ish brand mark for JSON-LD `logo` fields (Organization, Article publisher) — not the share banner. */
export const BRAND_LOGO = `${SITE_URL}/images/herballo-logo.png`;

interface PageSeoOptions {
  /** Full, human-facing page title. Include "Herballo" if you want exact control; otherwise it is appended automatically. */
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/conditions/diabetes" */
  path: string;
  image?: string;
  keywords?: string;
  type?: "website" | "article";
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * Sets title, description, canonical, Open Graph and Twitter Card tags for a page
 * in one call so no page forgets canonical/twitter/keywords again.
 */
export function usePageSeo(options: PageSeoOptions) {
  const url = `${SITE_URL}${options.path}`;
  const image = options.image || DEFAULT_OG_IMAGE;

  useSeoMeta({
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    robots: options.robots || "index, follow, max-image-preview:large",
    author: options.author || "Herballo",
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: url,
    ogImage: image,
    ogType: options.type || "website",
    ogSiteName: "Herballo",
    ogLocale: "en_GH",
    twitterCard: "summary_large_image",
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: image,
    articlePublishedTime: options.type === "article" ? options.publishedTime : undefined,
    articleModifiedTime: options.type === "article" ? options.modifiedTime : undefined,
  });

  useHead({
    link: [{ rel: "canonical", href: url }],
  });
}

/** Injects one JSON-LD <script type="application/ld+json"> block for structured data. */
export function useJsonLd(schema: Record<string, unknown> | (() => Record<string, unknown>)) {
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: () => JSON.stringify(typeof schema === "function" ? schema() : schema),
      },
    ],
  });
}
