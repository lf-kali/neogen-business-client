import { technicianRepository } from "../features/technician/technician.repository";

const TOKEN_KEY = "neogen.token";
const EMAIL_KEY = "neogen.technicianEmail";
const TOKEN_EXPIRATION_KEY = "neogen.tokenExpiration"

function normalizeJwtToken(token: string): string {
  const trimmed = token.trim();
  // Backend retorna `Bearer <jwt>`; aqui guardamos apenas o JWT.
  return trimmed.replace(/^Bearer\s+/i, "").trim();
}

export interface UserSession {
  id: number;
  name: string;
  email: string;
  profilePicture?: string | null;
  token: string;
}


export const emptySession: UserSession = {
  id: 0,
  name: '',
  email: '',
  profilePicture: '',
  token: '',
}

export const session = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getEmail(): string | null {
    return localStorage.getItem(EMAIL_KEY);
  },

  getTokenExpiration(): Date | null {
    const value = localStorage.getItem(TOKEN_EXPIRATION_KEY);
    if (!value) return null;

    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? null : date;

  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, normalizeJwtToken(token));
  },

  setEmail(email: string) {
    localStorage.setItem(EMAIL_KEY, email)
  },

  setTokenExpiration(expiration: Date = new Date(Date.now() + (8 * 60 * 60 * 1000))) {
    localStorage.setItem(TOKEN_EXPIRATION_KEY, expiration.toISOString())
  },

  get() {
    return {
      email: this.getEmail(),
      token: this.getToken(),
      expiration: this.getTokenExpiration(),
    }
  },

  store(email: string, token: string, expiration?: Date | undefined){
    this.setEmail(email);
    this.setToken(token);
    this.setTokenExpiration(expiration);
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(TOKEN_EXPIRATION_KEY);
  },

  async checkIn(): Promise <UserSession> {
    const {email, token, expiration} = this.get()

    const incompleteData = email === null || token === null || expiration === null
    if(incompleteData) return emptySession;

    const tokenExpirated = new Date(Date.now()) >= expiration;
    if (tokenExpirated) return emptySession;

    let data;

    try {
      const res = await technicianRepository.getByEmail(email);
      data = {
        id: res.id,
        name: res.name,
        email: res.email,
        profilePicture: res.profilePicture,
        token: `Bearer ${this.getToken}`
      }
    } catch (error: any) {
      if(!error.toString().includes('401')){
        console.error(error);
      }
      data = emptySession;
    }

    return data;
  },
};
