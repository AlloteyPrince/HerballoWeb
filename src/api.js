const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const api = (endpoint) => `${API_BASE}${endpoint}`;