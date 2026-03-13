import type { Device } from "../device/device.types";
import type { DeviceBrand } from "../deviceBrand/deviceBrand.types";

export type DeviceModel = {
  id: number;
  name: string;
  brand: DeviceBrand;
  devices: Device[];
};

export type CreateDeviceModel = {
  name: string;
  brandId: number;
};

export type UpdateDeviceModel = Partial<CreateDeviceModel>;
