// frontend/src/utils/helper.js

import { api } from '@/api'; 

// Utility: Strip HTML + Truncate
export function stripHtmlAndTruncate(htmlString, maxLength) {
  if (!htmlString) return '';

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  let text = tempDiv.textContent || tempDiv.innerText || '';

  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim();
    const lastSpace = text.lastIndexOf(' ');
    if (lastSpace > 0 && lastSpace < text.length - 1) {
        text = text.substring(0, lastSpace);
    }
    text += '...';
  }

  return text;
}

// 🆕 NEW UTILITY: Corrects relative URLs in post content to prevent broken links and images 
export function correctContentUrls(
  htmlContent,
  backendBaseUrl = 'https://herballo-api.onrender.com'
) {
    if (!htmlContent) return '';

    let correctedHtml = htmlContent;

    // 1️⃣ Correct relative src/href for local images/files that don't start with http
    correctedHtml = correctedHtml.replace(
      /(src|href)="(?!http)([^"]+)"/g,
      (match, attr, url) => {
        const trimmedUrl = url.trim();
        if (trimmedUrl.startsWith('/')) {
          // Already relative to root, prepend backendBaseUrl
          return `${attr}="${backendBaseUrl}${trimmedUrl}"`;
        } else {
          // Otherwise, just assume backendBaseUrl + / + file
          return `${attr}="${backendBaseUrl}/${trimmedUrl}"`;
        }
      }
    );

    // 2️⃣ Optional: Correct hrefs starting with www but missing protocol
    correctedHtml = correctedHtml.replace(
      /(href)="(www\.[^"]+)"/g,
      (match, attr, url) => `${attr}="http://${url}"`
    );

    return correctedHtml;
}

// ✅ Get post by slug
export async function getPostBySlug(slug) {
  try {
    const response = await fetch(api(`/api/posts/slug/${slug}`));
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    throw error;
  }
}

// ✅ Get comments by post ID
export async function getCommentsByPostId(postId) {
  try {
    const response = await fetch(api(`/api/posts/${postId}/comments`));
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

// ✅ Submit comment
export async function submitComment(postId, commentData) {
  try {
    const response = await fetch(api(`/api/posts/${postId}/comments`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
}

// ✅ Submit rating
export async function submitRating(postId, ratingValue) {
  try {
    const response = await fetch(api(`/api/posts/${postId}/rate`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: ratingValue }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
}
