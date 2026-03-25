import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { CreateDeviceBrand, DeviceBrand, UpdateDeviceBrand } from "./deviceBrand.types";
import { session } from "../../core/session";

export const deviceBrandRepository = {
  async list(): Promise<DeviceBrand[]> {
    const { data } = await http.get<DeviceBrand[]>(`${endpoints.deviceBrand}/all`, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async getById(id: number): Promise<DeviceBrand> {
    const { data } = await http.get<DeviceBrand>(`${endpoints.deviceBrand}/id/${id}`, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async create(payload: CreateDeviceBrand): Promise<DeviceBrand> {
    const { data } = await http.post<DeviceBrand>(`${endpoints.deviceBrand}/new`, payload, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async update(id: number, payload: UpdateDeviceBrand): Promise<DeviceBrand> {
    const { data } = await http.patch<DeviceBrand>(`${endpoints.deviceBrand}/update/${id}`, payload, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async remove(id: number): Promise<void> {
    await http.delete(`${endpoints.deviceBrand}/delete/${id}`, {headers: {
      Authorization: session.getToken(),
    }});
  },
};
