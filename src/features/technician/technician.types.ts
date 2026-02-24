export type Technician = {
  id: number;
  // TODO: alinhar com src/technician/dto/* do server
};

export type CreateTechnician = {
  // TODO
};

export type UpdateTechnician = Partial<CreateTechnician>;
