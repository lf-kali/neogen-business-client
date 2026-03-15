export type ServiceOrderStatus = 'confirmed' | 'acquiring_parts' | 'ongoing' | 'finished';

export type ServiceOrder = {
  id: number;
  deadline: string;
  status: ServiceOrderStatus;
  entryDate: string;
  techNotes: string;
  closureDate: string | null;
};

export type CreateServiceOrder = {
  // TODO
};

export type UpdateServiceOrder = Partial<CreateServiceOrder>;
