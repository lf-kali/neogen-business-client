import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { LoginRequest, LoginResponse } from "./auth.types";

export const authRepository = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await http.post<LoginResponse>(endpoints.auth.login, payload);
    return data;
  },
};
