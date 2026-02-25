export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  name: string;
  email: string;
  profilePicture?: string | null;
  token: string;
};
