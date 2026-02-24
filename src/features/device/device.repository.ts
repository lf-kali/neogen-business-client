import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { CreateDevice, Device, UpdateDevice } from "./device.types";

export const deviceRepository = {
  async list(): Promise<Device[]> {
    const { data } = await http.get<Device[]>(endpoints.device);
    return data;
  },

  async getById(id: number): Promise<Device> {
    const { data } = await http.get<Device>(`${endpoints.device}/${id}`);
    return data;
  },

  async create(payload: CreateDevice): Promise<Device> {
    const { data } = await http.post<Device>(endpoints.device, payload);
    return data;
  },

  async update(id: number, payload: UpdateDevice): Promise<Device> {
    const { data } = await http.patch<Device>(`${endpoints.device}/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await http.delete(`${endpoints.device}/${id}`);
  },
};
