import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { CreateServiceOrder, ServiceOrder, UpdateServiceOrder } from "./serviceOrder.types";
import { session } from "../../core/session";

export const serviceOrderRepository = {
  async list(): Promise<ServiceOrder[]> {
    const { data } = await http.get<ServiceOrder[]>(`${endpoints.serviceOrder}/all`, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async getById(id: number): Promise<ServiceOrder> {
    const { data } = await http.get<ServiceOrder>(`${endpoints.serviceOrder}/id/${id}`, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async create(payload: CreateServiceOrder): Promise<ServiceOrder> {
    const { data } = await http.post<ServiceOrder>(`${endpoints.serviceOrder}/create`, payload, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async update(id: number, payload: UpdateServiceOrder): Promise<ServiceOrder> {
    const { data } = await http.patch<ServiceOrder>(`${endpoints.serviceOrder}/update/${id}`, payload, {headers: {
      Authorization: session.getToken(),
    }});
    return data;
  },

  async delete(id: number): Promise<void> {
    await http.delete(`${endpoints.serviceOrder}/delete/${id}`, {headers: {
      Authorization: session.getToken(),
    }});
  },
};
