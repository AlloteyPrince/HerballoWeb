// src/helpers/helper.js

const API_URL = import.meta.env.VITE_API_URL;

export async function uploadFile(file, token = null) {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("image", file);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Upload failed:", data);
      throw new Error(data.message || "Upload failed");
    }

    // Ensure URL is correct
    if (data.imageUrl.startsWith("http")) return data.imageUrl;
    return `${API_URL}${data.imageUrl}`;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
}

// Convert comma-separated tags to array
export function parseTags(tagsString) {
  if (!tagsString) return [];
  return tagsString
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

// Format date nicely
export function formatDate(date) {
  if (!date) return "";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}
