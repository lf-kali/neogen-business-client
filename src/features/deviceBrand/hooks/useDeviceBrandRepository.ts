import { endpoints } from "../../../api/http/endpoints";
import { http } from "../../../api/http/http";
import { session } from "../../../core/session";
import type { DeviceCategory } from "../../device/types/device.types";
import type { CreateDeviceBrand, DeviceBrand, UpdateDeviceBrand } from "../types/deviceBrand.types";

export type DeviceBrandRepository = {
    readonly list: () => Promise<DeviceBrand[]>;
    readonly getById: (id: number) => Promise<DeviceBrand>;
    readonly create: (payload: CreateDeviceBrand) => Promise<DeviceBrand>;
    readonly update: (id: number, payload: UpdateDeviceBrand) => Promise<DeviceBrand>;
    readonly remove: (id: number) => Promise<void>;
}

export const useDeviceBrandRepository = (deviceType: DeviceCategory): DeviceBrandRepository => {
    const endpointMap: Record<DeviceCategory, string> = {
        Cellphone: endpoints.portableDeviceBrands.cellphoneBrand,
        Laptop: endpoints.portableDeviceBrands.laptopBrand,
    };

    const endpoint = endpointMap[deviceType];

    return {
      async list(): Promise<DeviceBrand[]> {
        const { data } = await http.get<DeviceBrand[]>(`${endpoint}/all`, {headers: {
          Authorization: session.getToken(),
        }});
        return data;
      },
    
      async getById(id: number): Promise<DeviceBrand> {
        const { data } = await http.get<DeviceBrand>(`${endpoint}/id/${id}`, {headers: {
          Authorization: session.getToken(),
        }});
        return data;
      },
    
      async create(payload: CreateDeviceBrand): Promise<DeviceBrand> {
        const { data } = await http.post<DeviceBrand>(`${endpoint}/new`, payload, {headers: {
          Authorization: session.getToken(),
        }});
        return data;
      },
    
      async update(id: number, payload: UpdateDeviceBrand): Promise<DeviceBrand> {
        const { data } = await http.patch<DeviceBrand>(`${endpoint}/update/${id}`, payload, {headers: {
          Authorization: session.getToken(),
        }});
        return data;
      },
    
      async remove(id: number): Promise<void> {
        await http.delete(`${endpoint}/delete/${id}`, {headers: {
          Authorization: session.getToken(),
        }});
      },
    } as const;
}