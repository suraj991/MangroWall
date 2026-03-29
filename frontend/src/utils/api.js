// Base URL for all API and image requests.
// Set VITE_API_URL in your .env file (local) or Vercel environment variables (production).
// Example: VITE_API_URL=https://your-backend.up.railway.app

export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
