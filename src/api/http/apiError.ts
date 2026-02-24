import type { AxiosError } from "axios";

export type ApiError = {
  status?: number;
  message: string;
  details?: unknown;
};

export function toApiError(err: unknown): ApiError {
  const ax = err as AxiosError<any>;

  const status = ax?.response?.status;
  const data = ax?.response?.data;

  const message =
    (Array.isArray(data?.message) ? data.message.join("\n") : data?.message) ||
    data?.error ||
    ax?.message ||
    "Erro inesperado";

  return { status, message, details: data };
}
