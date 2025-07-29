// frontend/src/utils/helper.js

import { api } from '@/api'; // ✅ Import api helper

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
