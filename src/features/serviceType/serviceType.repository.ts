import { endpoints } from "../../api/http/endpoints";
import { http } from "../../api/http/http";
import { session } from "../../core/session";
import type { CreateServiceType, ServiceType, UpdateServiceType } from "./serviceType.types";

export const serviceTypeRepository = {
    async list(): Promise<ServiceType[]> {
        const { data } = await http.get(`${endpoints.serviceType}/all`, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async getById(id: number): Promise<ServiceType> {
        const { data } = await http.get(`${endpoints.serviceType}/id/${id}`, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async create(payload: CreateServiceType): Promise<ServiceType> {
        const {data} = await http.post(`${endpoints.serviceType}/new`, payload, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async update(id: number, payload: UpdateServiceType): Promise<ServiceType> {
        const {data} = await http.post(`${endpoints.serviceType}/update/${id}`, payload, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async delete(id: number): Promise<void> {
        const {data} = await http.delete(`${endpoints.serviceType}/delete/${id}`, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    }
}