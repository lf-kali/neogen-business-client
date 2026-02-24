import axios from "axios";
import { env } from "../../core/env";
import { session } from "../../core/session";

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 20_000,
});

http.interceptors.request.use((config) => {
  const token = session.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    // Ponto único para tratar 401/403/500 no futuro.
    return Promise.reject(error);
  }
);
