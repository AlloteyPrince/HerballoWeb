// helper.js

/**
 * Upload a file to the backend (Cloudinary) and return the image URL
 */
export async function uploadFile(file, token = null) {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("image", file);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
      method: "POST",
      headers,
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Upload failed");
    }

    return data.imageUrl; // full URL from backend
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
}

/**
 * Correct the image URL: prepend backend URL only if relative
 */
export function correctImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${import.meta.env.VITE_API_URL}${url}`;
}

/**
 * Parse comma-separated tags into array
 */
export function parseTags(tagsString) {
  if (!tagsString) return [];
  return tagsString
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

/**
 * Format a date nicely
 */
export function formatDate(date) {
  if (!date) return "";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}
