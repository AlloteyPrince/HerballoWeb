// app/lib/helper.ts

/**
 * In Nuxt, we can access the config using useRuntimeConfig()
 * For the helper file, we'll keep it simple or use a constant.
 */
const API_URL = "https://your-render-backend.onrender.com"; 

// 1. Strip HTML tags and Truncate
export const stripHtmlAndTruncate = (html: string | undefined, limit: number): string => {
  if (!html) return "";
  const plainText = html.replace(/<[^>]*>/g, "");
  if (plainText.length <= limit) return plainText;
  return plainText.substring(0, limit) + "...";
};

// 2. Correct Image URL
export function correctImageUrl(url: string | undefined): string {
  if (!url) return "/images/default-thumbnail.jpg";
  if (url.startsWith("http")) return url;
  
  const separator = url.startsWith("/") ? "" : "/";
  return `${API_URL}${separator}${url}`;
}

// 3. Format Date
export function formatDate(date: string | Date | undefined): string {
  if (!date) return "";
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}

// 4. Parse Tags
export function parseTags(tagsString: string | undefined): string[] {
  if (!tagsString) return [];
  return tagsString
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}