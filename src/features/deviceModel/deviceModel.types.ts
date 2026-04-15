import type { PortableDevice } from "../device/types/device.types";
import type { DeviceBrand } from "../deviceBrand/types/deviceBrand.types";

export type DeviceModel = {
  id: number;
  name: string;
  brand: DeviceBrand;
  devices: PortableDevice[];
};

export type CreateDeviceModel = {
  name: string;
  brandId: number;
};

export type UpdateDeviceModel = Partial<CreateDeviceModel>;
