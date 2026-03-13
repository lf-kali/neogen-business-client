import type { DeviceBrand } from "../deviceBrand/deviceBrand.types";
import type { DeviceModel } from "../deviceModel/deviceModel.types";
import type { ServiceOrder } from "../serviceOrder/serviceOrder.types";

export type Device = {
  id: number;
  problemDescription: string;
  category: 'cellphone' | 'laptop' | 'pc' | 'tablet';
  brand: DeviceBrand;
  model: DeviceModel;
  initialDiagnosis: InitialDiagnosis;
  serviceOrder: ServiceOrder;
};

export type CreateDevice = {
  problemDescription: string;
  category: 'cellphone' | 'laptop' | 'pc' | 'tablet';
  brandId: number;
  modelId: number;
  initialDiagnosis: InitialDiagnosis;
  serviceOrderId: number;
};


export type InitialDiagnosis = {
    id: number;
    handedAccessories: {
        charger: boolean,
        cable: boolean,
        case: boolean,
        storageDevice: 'sd_card' | 'flash_drive' | 'external_hdd' | 'external_ssd' | null,
    }
    externalState: string;
    turnsOn: boolean;
    audio: 'ok' | string;
    screen: 'ok' | 'cracked' | 'leaking' | 'no_video';
    battery: 'ok' | 'swollen' | 'not_charging';
    rearCamera: 'ok' | 'damaged' | 'not_working';
    frontalCamera: 'ok' | 'damaged' | 'not_working';
    touch: 'ok' | 'phantom_touch' | 'not_working';
    device: Device;
}

export type UpdateDevice = Partial<CreateDevice>;
