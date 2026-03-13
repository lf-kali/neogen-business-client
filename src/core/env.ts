export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "https://neogen-erp-server.onrender.com/",
} as const;
