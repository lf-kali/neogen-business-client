import { endpoints } from "../../../api/http/endpoints";
import { http } from "../../../api/http/http";
import { session } from "../../../core/session";
import type { PortableDevice } from "../types/device.types";

export const portableDeviceSearchRepository = {
    async list(): Promise<PortableDevice[]> {
      const { data } = await http.get<PortableDevice[]>(`${endpoints.portableDeviceSearch}/all`, {headers: {
        Authorization: session.getToken(),
      }});
      return data;
    },

    async getById(id: number): Promise<PortableDevice> {
      const { data } = await http.get<PortableDevice>(`${endpoints.portableDeviceSearch}/id/${id}`, {headers: {
        Authorization: session.getToken(),
      }});
      return data;
    },
} as const;