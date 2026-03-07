import type { ServiceOrder } from "../serviceOrder/serviceOrder.types";

export type Technician = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profilePicture: string;
  serviceOrders: ServiceOrder[];
};

export type CreateTechnician = {
  name: string;
  email: string;
  password: string,
  phone?: string;
  address?: string;
  profilePicture?: string;
};

export type UpdateTechnician = Partial<CreateTechnician>;
