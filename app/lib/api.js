const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Helper function to format the URL correctly
export const api = (endpoint) => {
    const cleanBase = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${cleanBase}${cleanEndpoint}`;
};

/** * BLOG & POSTS 
 */
export const getPostBySlug = async (slug) => {
    const response = await fetch(api(`/posts/slug/${slug}`));
    if (!response.ok) throw new Error('Post not found');
    return await response.json();
};

export const getAllPosts = async () => {
    const response = await fetch(api('/posts'));
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
};

/** * COMMENTS 
 */
export const getCommentsByPostId = async (postId) => {
    const response = await fetch(api(`/comments/post/${postId}`));
    if (!response.ok) return []; 
    return await response.json();
};

export const submitComment = async (commentData) => {
    const response = await fetch(api('/comments'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
    });
    if (!response.ok) throw new Error('Failed to submit comment');
    return await response.json();
};

/** * RATINGS (The fix for your current error)
 */
export const submitRating = async (ratingData) => {
    const response = await fetch(api('/ratings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ratingData),
    });
    if (!response.ok) throw new Error('Failed to submit rating');
    return await response.json();
};

// Added this in case your page uses it to show stars
export const getAverageRating = async (postId) => {
    const response = await fetch(api(`/ratings/average/${postId}`));
    if (!response.ok) return { average: 0 };
    return await response.json();
};