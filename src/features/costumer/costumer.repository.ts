import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { Costumer, CreateCostumer, UpdateCostumer } from "./costumer.types";

export const costumerRepository = {
  async list(): Promise<Costumer[]> {
    const { data } = await http.get<Costumer[]>(endpoints.costumer);
    return data;
  },

  async getById(id: number): Promise<Costumer> {
    const { data } = await http.get<Costumer>(`${endpoints.costumer}/${id}`);
    return data;
  },

  async create(payload: CreateCostumer): Promise<Costumer> {
    const { data } = await http.post<Costumer>(endpoints.costumer, payload);
    return data;
  },

  async update(id: number, payload: UpdateCostumer): Promise<Costumer> {
    const { data } = await http.patch<Costumer>(`${endpoints.costumer}/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await http.delete(`${endpoints.costumer}/${id}`);
  },
};
