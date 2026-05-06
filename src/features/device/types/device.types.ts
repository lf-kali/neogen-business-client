import type { DeviceBrand } from "../../deviceBrand/types/deviceBrand.types";
import type { DeviceModel } from "../../deviceModel/deviceModel.types";
import type { ServiceOrder } from "../../serviceOrder/serviceOrder.types";

export type DeviceCategory = 'Cellphone' | 'Laptop';

export interface PortableDevice {
  id: number;
  problemDescription: string;
  entryDate: string;
  brand: DeviceBrand;
  model: DeviceModel;
  initialDiagnosis: InitialDiagnosis;
  handedAccessories: HandedAccessories;
  serviceOrders?: ServiceOrder[];
  type?: DeviceCategory,
};

export type InitialDiagnosis = {
  externalState: string;
  turnsOn?: boolean;
  audio?: string;
  screen?: 'ok' | 'damaged' | 'no_video';
  battery?: 'ok' | 'damaged' |'swollen' | 'not_charging';
  rearCamera?: 'ok' | 'damaged' | 'not_working';
  frontalCamera?: 'ok' | 'damaged' | 'not_working';
  touch?: 'ok' | 'damaged' | 'phantom_touch' | 'not_working';
  notes?: string
}

export type HandedAccessories = {
  charger: boolean;
  cable: boolean;
  case: boolean;
  storageDevice?:'sd_card' | 'flash_drive' | 'external_hdd' | 'external_ssd';
  other?: string;
}

export type CreatePortableDevice = {
  problemDescription: string;
  category: DeviceCategory;
  brandId: number;
  modelId: number;
  initialDiagnosis: InitialDiagnosis;
  handedAccessories: HandedAccessories;
}

export type UpdatePortableDevice = Partial<CreatePortableDevice>