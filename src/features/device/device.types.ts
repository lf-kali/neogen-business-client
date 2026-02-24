export type Device = {
  id: number;
  // TODO: alinhar com src/device/dto/* do server
};

export type CreateDevice = {
  // TODO
};

export type UpdateDevice = Partial<CreateDevice>;
