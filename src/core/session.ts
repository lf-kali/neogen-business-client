const TOKEN_KEY = "neogen.token";

function normalizeJwtToken(token: string): string {
  const trimmed = token.trim();
  // Backend retorna `Bearer <jwt>`; aqui guardamos apenas o JWT.
  return trimmed.replace(/^Bearer\s+/i, "").trim();
}

export const session = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, normalizeJwtToken(token));
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};
