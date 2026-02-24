import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { CreateDeviceBrand, DeviceBrand, UpdateDeviceBrand } from "./deviceBrand.types";

export const deviceBrandRepository = {
  async list(): Promise<DeviceBrand[]> {
    const { data } = await http.get<DeviceBrand[]>(endpoints.deviceBrand);
    return data;
  },

  async getById(id: number): Promise<DeviceBrand> {
    const { data } = await http.get<DeviceBrand>(`${endpoints.deviceBrand}/${id}`);
    return data;
  },

  async create(payload: CreateDeviceBrand): Promise<DeviceBrand> {
    const { data } = await http.post<DeviceBrand>(endpoints.deviceBrand, payload);
    return data;
  },

  async update(id: number, payload: UpdateDeviceBrand): Promise<DeviceBrand> {
    const { data } = await http.patch<DeviceBrand>(`${endpoints.deviceBrand}/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await http.delete(`${endpoints.deviceBrand}/${id}`);
  },
};
