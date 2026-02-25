import type { ServiceOrder } from "../serviceOrder/serviceOrder.types";

export type Costumer = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  serviceOrders: ServiceOrder[]
};

export type CreateCostumer = {
  name: string;
  email?: string;
  phone?: string;
  address: string;
  cep: string;
  cpf: string;
  cnpj?: string;
};

export type UpdateCostumer = Partial<CreateCostumer>;
