import { http } from "../../api/http/http";
import { endpoints } from "../../api/http/endpoints";
import type { CreateTechnician, Technician, UpdateTechnician } from "./technician.types";

export const technicianRepository = {
  async list(): Promise<Technician[]> {
    const { data } = await http.get<Technician[]>(endpoints.technician);
    return data;
  },

  async getById(id: number): Promise<Technician> {
    const { data } = await http.get<Technician>(`${endpoints.technician}/${id}`);
    return data;
  },

  async create(payload: CreateTechnician): Promise<Technician> {
    const { data } = await http.post<Technician>(endpoints.technician, payload);
    return data;
  },

  async update(id: number, payload: UpdateTechnician): Promise<Technician> {
    const { data } = await http.patch<Technician>(`${endpoints.technician}/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await http.delete(`${endpoints.technician}/${id}`);
  },
};
