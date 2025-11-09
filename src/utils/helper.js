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
export function correctContentUrls(htmlContent, backendBaseUrl = 'https://herballo-api.onrender.com') {
    if (!htmlContent) return '';

    // 1. Correct Image/Link HREFs missing the protocol (e.g., "www.example.com")
    // This regex finds href/src attributes that start with "www" or a common domain pattern but not http/https
    // and prepends http://
    let correctedHtml = htmlContent.replace(
        /(href|src)="(\s*(?:www\.|[a-zA-Z0-9-]+\.(?:com|org|net|co|io)[a-zA-Z0-9-]*\b)[^"]*)"/g, 
        (match, attr, url) => {
            if (url.toLowerCase().startsWith('http')) {
                return match; // Already absolute
            }
            if (url.startsWith('/')) {
                return match; // Is a relative internal path, ignore this step
            }
            return `${attr}="http://${url.trim()}"`; // Prepend protocol
        }
    );

    // 2. Correct Old Local Image Paths (e.g., '17626367895-herbal medicine research.jpg')
    // This regex targets filenames without leading path information in src attributes.
    // NOTE: This part is highly speculative and best fixed by re-uploading the post's content.
    // However, if your API still returns old local filenames, we use the backendBaseUrl and the api() helper.
    // For now, let's keep it simple and assume re-uploading the content is the final fix, 
    // and this function primarily addresses link protocols.

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