import { endpoints } from "../../api/http/endpoints";
import { http } from "../../api/http/http";
import { session } from "../../core/session";
import type { CreateProductCategory, ProductCategory, UpdateProductCategory } from "./productCategory.types";

export const ProductCategoryRepository = {
    async list(): Promise<ProductCategory[]> {
        const { data } = await http.get<ProductCategory[]>(`${endpoints.productCategory}/all`, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async getById(id: number): Promise<ProductCategory> {
        const { data } = await http.get<ProductCategory>(`${endpoints.productCategory}/id/${id}`, {headers: {
            Authorization: session.getToken(),
        }});
        return data
    },

    async create(payload: CreateProductCategory): Promise<ProductCategory> {
        const { data } = await http.post<ProductCategory>(`${endpoints.productCategory}/new`, payload, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async update(id: number, payload: UpdateProductCategory): Promise<ProductCategory> {
        const { data } = await http.patch<ProductCategory>(`${endpoints.productCategory}/update/${id}`, payload, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },

    async delete(id: number): Promise<void> {
        const { data } = await http.delete(`${endpoints.productCategory}/delete/${id}`, {headers: {
            Authorization: session.getToken(),
        }});
        return data;
    },
}