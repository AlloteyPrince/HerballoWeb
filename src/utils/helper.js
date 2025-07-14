// frontend/src/utils/helper.js (or frontend/src/helper.js)

// Utility function to strip HTML and truncate text (your existing function)
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

// ⭐ NEW FUNCTIONS: API Interaction Functions
// Ensure your backend is running on http://localhost:5000
const API_BASE_URL = 'http://localhost:5000/api/posts';

// Function to get a single post by its SLUG
export async function getPostBySlug(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/slug/${slug}`);
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

// Function to get all comments for a post by its ID
export async function getCommentsByPostId(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/${postId}/comments`);
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

// Function to submit a new comment to a post by its ID
export async function submitComment(postId, commentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData), // commentData should contain { name, comment }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Backend should return the new comment or a success message
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
}

// Function to submit a rating for a post by its ID
export async function submitRating(postId, ratingValue) {
  try {
    const response = await fetch(`${API_BASE_URL}/${postId}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: ratingValue }), // Only send the rating value
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Backend should return updated ratings/average
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
}