import type { DeviceBrand } from "../deviceBrand/deviceBrand.types";
import type { DeviceModel } from "../deviceModel/deviceModel.types";
import type { ServiceOrder } from "../serviceOrder/serviceOrder.types";

export type DeviceCategory = 'cellphone' | 'laptop' | 'pc' | 'tablet';

export type Device = {
  id: number;
  problemDescription: string;
  category: DeviceCategory;
  brand: DeviceBrand;
  model: DeviceModel;
  initialDiagnosis: InitialDiagnosis;
  handedAccessories: HandedAccessories;
  serviceOrder: ServiceOrder;
};

export type InitialDiagnosis = {
  externalState: string;
  turnsOn?: boolean;
  audio?: string;
  screen?: 'ok' | 'damaged' | 'no_video';
  battery?: 'ok' | 'damaged' |'swollen' | 'not_charging';
  rearCamera?: 'ok' | 'damaged' | 'not_working';
  frontalCamera?: 'ok' | 'damaged' | 'not_working';
  touch: 'ok' | 'damaged' | 'phantom_touch' | 'not_working';
}

export type HandedAccessories = {
  charger: boolean;
  cable: boolean;
  case: boolean;
  storageDevice?:'sd_card' | 'flash_drive' | 'external_hdd' | 'external_ssd';
}

export type CreateDevice = {
  problemDescription: string;
  category: DeviceCategory;
  brandId: number;
  modelId: number;
  initialDiagnosis: InitialDiagnosis;
  handedAccessories: HandedAccessories;
}

export type UpdateDevice = Partial<CreateDevice>