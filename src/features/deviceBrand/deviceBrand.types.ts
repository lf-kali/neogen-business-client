import type { Device } from "../device/device.types";
import type { DeviceModel } from "../deviceModel/deviceModel.types";

export type DeviceBrand = {
  id: number;
  name: string;
  devices: Device[];
  models: DeviceModel[]
};

export type CreateDeviceBrand = {
  name: string;
};

export type UpdateDeviceBrand = Partial<CreateDeviceBrand>;
