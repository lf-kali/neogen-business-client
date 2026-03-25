import { endpoints } from "../../api/http/endpoints"
import { http } from "../../api/http/http"
import { session } from "../../core/session";
import type { CreateProduct, Product, UpdateProduct } from "./product.types"


export const productRepository = {
    async list(): Promise<Product[]> {
        const { data } = await http.get<Product[]>(`${endpoints.product}/all`, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async getById(id: number): Promise<Product> {
        const { data } = await http.get<Product>(`${endpoints.product}/id/${id}`, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async create(payload: CreateProduct): Promise<Product> {
        const { data } = await http.post<Product>(`${endpoints.product}/new`, payload, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async update(payload: UpdateProduct): Promise<Product> {
        const { data } = await http.patch<Product>(`${endpoints.product}/update`, payload, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async delete(id: number): Promise<void> {
        await http.delete(`${endpoints.product}/delete/${id}`, {headers: {
            Authorization: session.getToken(),
        }})
    }
}