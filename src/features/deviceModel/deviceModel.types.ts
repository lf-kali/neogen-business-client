export type DeviceModel = {
  id: number;
  // TODO: alinhar com src/device-model/dto/* do server
};

export type CreateDeviceModel = {
  // TODO
};

export type UpdateDeviceModel = Partial<CreateDeviceModel>;
