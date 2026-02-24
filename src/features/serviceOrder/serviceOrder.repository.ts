import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { CreateServiceOrder, ServiceOrder, UpdateServiceOrder } from "./serviceOrder.types";

export const serviceOrderRepository = {
  async list(): Promise<ServiceOrder[]> {
    const { data } = await http.get<ServiceOrder[]>(endpoints.serviceOrder);
    return data;
  },

  async getById(id: number): Promise<ServiceOrder> {
    const { data } = await http.get<ServiceOrder>(`${endpoints.serviceOrder}/${id}`);
    return data;
  },

  async create(payload: CreateServiceOrder): Promise<ServiceOrder> {
    const { data } = await http.post<ServiceOrder>(endpoints.serviceOrder, payload);
    return data;
  },

  async update(id: number, payload: UpdateServiceOrder): Promise<ServiceOrder> {
    const { data } = await http.patch<ServiceOrder>(`${endpoints.serviceOrder}/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await http.delete(`${endpoints.serviceOrder}/${id}`);
  },
};
