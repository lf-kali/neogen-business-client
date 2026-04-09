import type { PortableDevice } from "../../device/types/device.types";
import type { DeviceModel } from "../../deviceModel/deviceModel.types";

export type DeviceBrand = {
  id: number;
  name: string;
  devices: PortableDevice[];
  models: DeviceModel[]
};

export type CreateDeviceBrand = {
  name: string;
};

export type UpdateDeviceBrand = Partial<CreateDeviceBrand>;
