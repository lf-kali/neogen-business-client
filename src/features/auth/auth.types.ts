export type LoginRequest = {
  email: string;
  password: string;
};

// Ajuste conforme o retorno real do seu Nest (ex.: access_token)
export type LoginResponse = {
  access_token: string;
};
