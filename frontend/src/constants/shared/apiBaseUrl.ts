export const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api'
    : (import.meta.env.VITE_API_URL ?? '');
