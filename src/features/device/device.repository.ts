import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { CreateDevice, Device, UpdateDevice } from "./device.types";
import { session } from "../../core/session";

export const deviceRepository = {
  async list(): Promise<Device[]> {
    const { data } = await http.get<Device[]>(`${endpoints.device}/all`, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async getById(id: number): Promise<Device> {
    const { data } = await http.get<Device>(`${endpoints.device}/id/${id}`, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async create(payload: CreateDevice): Promise<Device> {
    const { data } = await http.post<Device>(`${endpoints.device}/new`, payload, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async update(id: number, payload: UpdateDevice): Promise<Device> {
    const { data } = await http.patch<Device>(`${endpoints.device}/update/${id}`, payload, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async remove(id: number): Promise<void> {
    await http.delete(`${endpoints.device}/delete/${id}`, {headers: {
      Authorization: session.getToken(),
    }});
  },
};
