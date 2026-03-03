import type { ServiceOrder } from "../serviceOrder/serviceOrder.types";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  name: string;
  email: string;
  profilePicture?: string | null;
  serviceOrders: ServiceOrder[];
  token: string;
};
