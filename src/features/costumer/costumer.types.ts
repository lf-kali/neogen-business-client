export type Costumer = {
  id: number;
  name: string;
  phone?: string;
  email?: string;
};

export type CreateCostumer = {
  name: string;
  phone?: string;
  email?: string;
};

export type UpdateCostumer = Partial<CreateCostumer>;
