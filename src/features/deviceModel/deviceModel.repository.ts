import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { CreateDeviceModel, DeviceModel, UpdateDeviceModel } from "./deviceModel.types";
import { session } from "../../core/session";

export const deviceModelRepository = {
  async list(): Promise<DeviceModel[]> {
    const { data } = await http.get<DeviceModel[]>(`${endpoints.deviceModel}/all`, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async getById(id: number): Promise<DeviceModel> {
    const { data } = await http.get<DeviceModel>(`${endpoints.deviceModel}/id/${id}`, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async create(payload: CreateDeviceModel): Promise<DeviceModel> {
    const { data } = await http.post<DeviceModel>(`${endpoints.deviceModel}/new`, payload, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async update(id: number, payload: UpdateDeviceModel): Promise<DeviceModel> {
    const { data } = await http.patch<DeviceModel>(`${endpoints.deviceModel}/update/${id}`, payload, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async remove(id: number): Promise<void> {
    await http.delete(`${endpoints.deviceModel}/delete/${id}`, {headers: {
      Authorization: session.getToken(),
    }});
  },
};
