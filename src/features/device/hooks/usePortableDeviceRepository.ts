import { http } from "../../../api/http/http";
import { endpoints } from "../../../api/http/endpoints";
import type { CreatePortableDevice, DeviceCategory, PortableDevice, UpdatePortableDevice } from "../types/device.types";
import { session } from "../../../core/session";

export type PortableDeviceRepository = {
    readonly list: () => Promise<PortableDevice[]>;
    readonly getById: (id: number) => Promise<PortableDevice>;
    readonly create: (payload: CreatePortableDevice) => Promise<PortableDevice>;
    readonly update: (id: number, payload: UpdatePortableDevice) => Promise<PortableDevice>;
    readonly remove: (id: number) => Promise<void>;
}

export const usePortableDeviceRepository = (deviceType: DeviceCategory): PortableDeviceRepository => {

  const endpointMap: Record<DeviceCategory, string> = {
    Cellphone: endpoints.portableDevices.cellphone,
    Laptop: endpoints.portableDevices.laptop,
  }

  const endpoint = endpointMap[deviceType];
  
  return {
    async list(): Promise<PortableDevice[]> {
      const { data } = await http.get<PortableDevice[]>(`${endpoint}/all`, {headers: {
        Authorization: session.getToken(),
      }});
      return data;
    },

    async getById(id: number): Promise<PortableDevice> {
      const { data } = await http.get<PortableDevice>(`${endpoint}/id/${id}`, {headers: {
        Authorization: session.getToken(),
      }});
      return data;
    },

    async create(payload: CreatePortableDevice): Promise<PortableDevice> {
      const { data } = await http.post<PortableDevice>(`${endpoint}/new`, payload, {headers: {
        Authorization: session.getToken(),
      }});
      return data;
    },

    async update(id: number, payload: UpdatePortableDevice): Promise<PortableDevice> {
      const { data } = await http.patch<PortableDevice>(`${endpoint}/update/${id}`, payload, {headers: {
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