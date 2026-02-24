import { useState } from "react";
import { session } from "../../core/session";
import { toApiError, type ApiError } from "../../api/http/apiError";
import { authRepository } from "./auth.repository";
import type { LoginRequest } from "./auth.types";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function login(payload: LoginRequest) {
    setLoading(true);
    setError(null);

    try {
      const res = await authRepository.login(payload);
      session.setToken(res.access_token);
      return res;
    } catch (e) {
      const apiErr = toApiError(e);
      setError(apiErr);
      throw apiErr;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
