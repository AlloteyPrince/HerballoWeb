// helper.js

/**
 * Upload a file to the server.
 * Returns the final image URL after successful upload.
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
      console.error("Upload failed:", data);
      throw new Error(data.message || "Upload failed");
    }

    return data.imageUrl; // Backend should return { imageUrl: "https://..." }
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
}

/**
 * Convert comma-separated tags string into array
 * Usage: parseTags("tag1, tag2") => ["tag1", "tag2"]
 */
export function parseTags(tagsString) {
  if (!tagsString) return [];
  return tagsString
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

/**
 * Format a date into a readable string
 * Usage: formatDate(new Date()) => "Nov 28, 2025"
 */
export function formatDate(date) {
  if (!date) return "";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}

/**
 * Ensure the image URL is complete.
 * If a relative path is provided, prepend the API URL.
 * Example: "/uploads/file.jpg" => "https://yourapi.com/uploads/file.jpg"
 */
export function getFinalImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("https")) return url;
  return `${import.meta.env.VITE_API_URL}${url}`;
}
