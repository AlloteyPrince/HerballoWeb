// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// export const api = (endpoint) => `${API_BASE}${endpoint}`;



const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const api = (endpoint) => {
    // 1. Remove trailing slash from API_BASE if it exists
    const cleanBase = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
    
    // 2. Ensure endpoint starts with a slash
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // 3. Combine the two
    return `${cleanBase}${cleanEndpoint}`;
};