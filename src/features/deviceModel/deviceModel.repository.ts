import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { CreateDeviceModel, DeviceModel, UpdateDeviceModel } from "./deviceModel.types";

export const deviceModelRepository = {
  async list(): Promise<DeviceModel[]> {
    const { data } = await http.get<DeviceModel[]>(endpoints.deviceModel);
    return data;
  },

  async getById(id: number): Promise<DeviceModel> {
    const { data } = await http.get<DeviceModel>(`${endpoints.deviceModel}/${id}`);
    return data;
  },

  async create(payload: CreateDeviceModel): Promise<DeviceModel> {
    const { data } = await http.post<DeviceModel>(endpoints.deviceModel, payload);
    return data;
  },

  async update(id: number, payload: UpdateDeviceModel): Promise<DeviceModel> {
    const { data } = await http.patch<DeviceModel>(`${endpoints.deviceModel}/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await http.delete(`${endpoints.deviceModel}/${id}`);
  },
};
